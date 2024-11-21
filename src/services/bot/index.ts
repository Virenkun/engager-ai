"use server";

import { client } from "@/lib/prisma";
import { extractEmailsFromString, extractURLfromString } from "@/lib/utils";
import { onRealTimeChat } from "../conversation";
import { clerkClient } from "@clerk/nextjs";
import { onMailer } from "../mailer";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Update your GROQ API key here
});

const MODEL: string = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";

export const onStoreConversations = async (
  id: string,
  message: string,
  role: "assistant" | "user"
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    });

    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};

let customerEmail: string | undefined;

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: "assistant" | "user"; content: string }[],
  author: "user",
  message: string
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message);
      if (extractedEmail) {
        customerEmail = extractedEmail[0];
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });
          if (newCustomer) {
            console.log("new customer made");
            const response = {
              role: "assistant",
              content: `Welcome aboard ${
                customerEmail.split("@")[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            };
            return { response };
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          );

          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            "user",
            author
          );

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            );

            onMailer(user.emailAddresses[0].emailAddress);

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        );

        const chatCompletion = await groq.chat.completions.create(
          {
            messages: [
              {
                role: "assistant",
                content: `
  **AI Sales Assistant Instructions**  
  
  1. **Purpose**: Your role is to assist the customer effectively by asking relevant questions from a predefined array, handling their responses, and guiding them toward appropriate actions such as booking an appointment or making a purchase.
  
  2. **Key Rules**:  
     - **Array of Questions**: The following is the array of questions to ask the customer:  
       [${chatBotDomain.filterQuestions
         .map((questions) => questions.question)
         .join(", ")}]  
     - **Important Keyword**:  
       - When asking a question from the array, always add the keyword **(complete)** at the **end of the question**. This keyword is crucial and must not be omitted.  
       - Only questions from the array qualify for this condition. No other questions should include this keyword.  
     - **Out-of-Context or Inappropriate Inputs**: If the customer provides a response that is irrelevant or inappropriate, respond respectfully by saying:  
       "This is beyond my scope, and I will get a real user to continue the conversation (realtime)."  
     - **Booking an Appointment**: If the customer agrees to book an appointment, redirect them to the appointment page using the following link:  
       http://localhost:3000/portal/${id}/appointment/${
                  checkCustomer?.customer[0].id
                }  
     - **Purchasing a Product**: If the customer expresses interest in buying a product, redirect them to the payment page using this link:  
       http://localhost:3000/portal/${id}/payment/${
                  checkCustomer?.customer[0].id
                }  
  
  3. **General Conduct**:  
     - Always maintain a polite and professional tone throughout the conversation.  
     - Progress the conversation systematically by asking one question at a time from the array.  
     - Ensure you actively listen to the customer's responses and guide them accordingly.  
  
  4. **Fallback**: If you're unsure how to handle a situation or if it goes beyond your capabilities, refer the customer to a human agent with the **(realtime)** keyword.  
  
  5. **Clarity in Actions**:  
     - Be clear and concise when asking questions or providing next steps.  
     - Avoid overwhelming the customer with too much information at once.  
  
  This structure will enhance customer satisfaction, ensure a smooth experience, and maintain clarity in interactions.
`,
              },
              ...chat,
              {
                role: "user",
                content: message,
              },
            ],
            model: MODEL,
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
          },
          // model: "gpt-3.5-turbo",
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.OPEN_AI_KEY,
            },
          }
        );

        if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: "assistant",
              content: chatCompletion.choices[0].message.content.replace(
                "(realtime)",
                ""
              ),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              "assistant"
            );

            return { response };
          }
        }
        if (chat[chat.length - 1].content.includes("(complete)")) {
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: "asc",
              },
            });
          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          );

          if (generatedLink) {
            const link = generatedLink[0];
            const response = {
              role: "assistant",
              content: `Great! you can follow the link to proceed`,
              link: link.slice(0, -1),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              "assistant"
            );

            return { response };
          }

          const response = {
            role: "assistant",
            content: chatCompletion.choices[0].message.content,
          };

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            "assistant"
          );

          return { response };
        }
      }
      console.log("No customer");
      const chatCompletion = await groq.chat.completions.create(
        {
          messages: [
            {
              role: "assistant",
              content: `
            You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
            Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

            Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

          `,
            },
            ...chat,
            {
              role: "user",
              content: message,
            },
          ],
          // model: "gpt-3.5-turbo",
          model: MODEL,
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.OPEN_AI_KEY,
          },
        }
      );

      if (chatCompletion) {
        const response = {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        };

        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
