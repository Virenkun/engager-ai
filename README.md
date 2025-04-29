# EngagerAI Chatbot Integration

**EngagerAI** is a smart, AI-powered chatbot designed to help businesses engage website visitors, gather essential contact information, send automated emails, and drive subscriptions. This SaaS chatbot is easy to integrate into any website, enabling businesses to connect with visitors 24/7 and convert engagement into valuable leads.

---

## Key Features

- **AI-Driven Conversations**: Engages visitors with natural, conversational interactions.
- **Lead Capture**: Collects essential contact information from visitors, such as names, emails, and phone numbers.
- **Automated Email Follow-ups**: Sends customized emails to leads based on conversation outcomes.
- **Subscription Redirect**: Directs interested users to a subscription or sign-up page seamlessly.
- **Easy Integration**: Simple setup process with code snippets for immediate website integration.

---

## Quick Start

### Step 1: Get API Credentials
Sign up for EngagerAI and obtain your API key and client ID for secure integration.

### Step 2: Integrate the Chatbot
1. **Add Script**: Copy the following script and add it to your website’s HTML within the `<head>` or `<body>` section:

    ```html
    <script src="https://cdn.EngagerAI.com/chatbot.js" data-client-id="YOUR_CLIENT_ID"></script>
    ```

2. **Initialize Chatbot**: Add the following code snippet to configure the chatbot.

    ```javascript
    <script>
      EngagerAIChatbot.init({
          apiKey: "YOUR_API_KEY",
          onLeadCapture: (leadInfo) => {
              console.log("Lead captured:", leadInfo);
          },
          onRedirect: (subscriptionUrl) => {
              window.location.href = subscriptionUrl;
          }
      });
    </script>
    ```

### Step 3: Customize Chatbot Settings (Optional)
Access the EngagerAI dashboard to customize chatbot appearance, tone, and responses.

---

## Usage

Once integrated, the chatbot will appear on your website and begin engaging visitors automatically. It will capture essential contact information, email it to your sales team, and redirect interested users to the subscription page.

EngagerAI - **Turn Conversations into Conversions!**
