"use client";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/hooks/settings/use-settings";
import React from "react";
import { DomainUpdate } from "./domain-update";
import CodeSnippet from "./code-snippet";
import PremiumBadge from "@/icons/premium-badge";
import EditChatbotIcon from "./edit-chatbot-icon";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

const WelcomeMessage = dynamic(
  () => import("./greetings-message").then((props) => props.default),
  {
    ssr: false,
  }
);

type Props = {
  id: string;
  name: string;
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

const SettingsForm = ({ id, name }: Props) => {
  const { register, onUpdateSettings, errors, loading } = useSettings(id);
  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
      <div className="flex flex-col gap-3">
        <DomainUpdate name={name} register={register} errors={errors} />
        <CodeSnippet id={id} />
      </div>
      <div className="flex gap-5 justify-end">
        <Button type="submit" className="w-[100px] h-[50px]">
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
