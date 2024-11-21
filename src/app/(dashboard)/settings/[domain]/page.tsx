"use client";
import { onGetCurrentDomainInfo } from "@/services/settings";
import BotTrainingForm from "@/components/forms/settings/bot-training";
import SettingsForm from "@/components/forms/settings/form";
import InfoBar from "@/components/infobar";
import ProductTable from "@/components/products";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { DOMAIN_MENU } from "@/constants/menu";
import TabsMenu from "@/components/tabs/intex";
import { TabsContent } from "@/components/ui/tabs";
import { ChatbotSettings } from "@/components/forms/settings/chatbot-settings";
import ChatbotIntegration from "@/components/forms/settings/playground";
import PremiumBadge from "@/icons/premium-badge";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/loader";

type Props = { params: { domain: string } };

const DomainSettingsPage = ({ params }: Props) => {
  const [domain, setDomain] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchDomainInfo = async () => {
      const domainInfo = await onGetCurrentDomainInfo(params.domain);
      if (!domainInfo) {
        redirect("/dashboard");
      } else {
        setDomain(domainInfo);
      }
    };

    const loadDomainInfo = async () => {
      setLoading(true);
      await fetchDomainInfo();
      setLoading(false);
    };

    loadDomainInfo();
  }, [params.domain]);

  if (!domain) {
    return null;
  }

  return (
    <Loader loading={loading}>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-4">
        <TabsMenu triggers={DOMAIN_MENU}>
          <TabsContent value="settings">
            <TabsTitle title="Settings" />
            <SettingsForm
              plan={domain.subscription?.plan!}
              id={domain.domains[0].id}
              name={domain.domains[0].name}
            />
          </TabsContent>
          <TabsContent value="chatbot">
            <TabsTitle title="Chatbot" isBatch />
            <ChatbotSettings
              chatBot={domain.domains[0].chatBot}
              id={domain.domains[0].id}
            />
          </TabsContent>
          <TabsContent value="training">
            <TabsTitle title="Bot Training" />
            <BotTrainingForm id={domain.domains[0].id} />
          </TabsContent>
          <TabsContent value="products">
            <TabsTitle title="Products" />
            <ProductTable
              id={domain.domains[0].id}
              products={domain.domains[0].products || []}
            />
          </TabsContent>
          <TabsContent value="playground">
            <TabsTitle title="Playground" />
            <ChatbotIntegration id={domain.domains[0].id} />
          </TabsContent>
        </TabsMenu>
      </div>
    </Loader>
  );
};

export default DomainSettingsPage;

const TabsTitle = ({
  title,
  isBatch = false,
}: {
  title: string;
  isBatch?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex gap-4 items-center">
        <h2 className="font-bold text-2xl">{title}</h2>
        {isBatch && (
          <div className="flex gap-1 bg-transparent rounded-full px-3 py-1 text-xs items-center font-bold border border-yellow-500">
            <PremiumBadge />
            Premium
          </div>
        )}
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
};
