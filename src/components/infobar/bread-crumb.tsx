"use client";
import useSideBar from "@/context/use-sidebar";
import React from "react";
import { Loader } from "../loader";
import { Switch } from "../ui/switch";

type Props = {};

const BreadCrumb = (props: Props) => {
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealtime,
    onExpand,
    page,
    onSignOut,
    realtime,
  } = useSideBar();
  return (
    <div className="flex flex-col ">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page === "conversation" && chatRoom && (
          <Loader loading={loading} className="p-0 inline">
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-violet-400"
            />
            <span
              className={
                realtime
                  ? `text-sm border-[2px] bg-green-100 font-medium  border-green-800 rounded-full px-4 py-1.5 w-30 text-green-800`
                  : `text-sm border-[2px] border-violet-800 bg-violet-200 rounded-full px-4 py-1.5 w-30 text-violet-800 font-medium`
              }
            >
              {realtime ? "Realtime" : "AI-Chat Bot"}
            </span>
          </Loader>
        )}
      </div>
      <p className="text-gray-500 text-sm mt-2">
        {page == "settings"
          ? "Manage your account settings, preferences and integrations"
          : page == "dashboard"
          ? "A detailed overview of your metrics, usage, customers and more"
          : page == "appointment"
          ? "View and edit all your appointments"
          : page == "email-marketing"
          ? "Send bulk emails to your customers"
          : page == "integration"
          ? "Connect third-party applications into Corinna-AI"
          : "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to."}
      </p>
    </div>
  );
};

export default BreadCrumb;
