"use client";
import { onGetPaymentConnected } from "@/services/settings";
import InfoBar from "@/components/infobar";
import IntegrationsList from "@/components/integrations";

import { useEffect, useState } from "react";

const IntegrationsPage = () => {
  const [connections, setConnections] = useState({ stripe: false });

  useEffect(() => {
    const fetchData = async () => {
      const payment = await onGetPaymentConnected();
      setConnections({ stripe: payment ? true : false });
    };
    fetchData();
  }, []);

  return (
    <>
      <InfoBar />
      <IntegrationsList connections={connections} />
    </>
  );
};

export default IntegrationsPage;
