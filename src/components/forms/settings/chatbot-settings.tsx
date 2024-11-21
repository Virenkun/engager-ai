import React from "react";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/hooks/settings/use-settings";
import PremiumBadge from "@/icons/premium-badge";
import EditChatbotIcon from "./edit-chatbot-icon";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import dynamic from "next/dynamic";

type Props = {
  id: string;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

const WelcomeMessage = dynamic(
  () => import("./greetings-message").then((props) => props.default),
  {
    ssr: false,
  }
);

export const ChatbotSettings = ({ id, chatBot }: Props) => {
  const {
    register,
    onUpdateSettings,
    errors,
    onDeleteDomain,
    deleting,
    loading,
  } = useSettings(id);
  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
      <div className="flex flex-col gap-3 mt-5">
        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
            <EditChatbotIcon
              chatBot={chatBot}
              register={register}
              errors={errors}
            />
            <WelcomeMessage
              message={chatBot?.welcomeMessage!}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-1 relative ">
            <Image
              src="/images/bot-ui.png"
              className="sticky top-0"
              alt="bot-ui"
              width={530}
              height={769}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteDomain}
          variant="destructive"
          type="button"
          className="px-10 h-[50px]"
        >
          <Loader loading={deleting}>Delete Domain</Loader>
        </Button>
        <Button type="submit" className="w-[100px] h-[50px]">
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div>
    </form>
  );
};
