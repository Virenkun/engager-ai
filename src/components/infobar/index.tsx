import React from "react";
import BreadCrumb from "./bread-crumb";
import { ThemeToggle } from "@/themes/theme-toggle";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center py-1 pr-4 mb-8 ">
      <BreadCrumb />
      <div className="flex gap-3 items-center">
        <div>
          <ThemeToggle />
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default InfoBar;
