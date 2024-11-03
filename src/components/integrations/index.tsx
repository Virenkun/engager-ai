"use client";
import { INTEGRATION_LIST_ITEMS } from "@/constants/integrations";
import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";
import IntegrationTrigger from "./IntegrationTrigger";

type Props = {
  connections: {
    stripe: boolean;
  };
};

const IntegrationsList = ({ connections }: Props) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex">
              <div className="flex-1">
              <Image src={item?.logo} alt="Logo" width={90} height={90} />
              </div>
              <IntegrationTrigger
                connections={connections}
                title={item.title}
                descrioption={item.modalDescription}
                logo={item.logo}
                name={item.name}
              />
            </div>
            <CardDescription >{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationsList;
