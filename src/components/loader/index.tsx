import React from "react";
import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  return loading ? (
    <div
      className={cn(
        className || "w-full py-5 flex justify-center items-center h-full"
      )}
    >
      <div>
        <Spinner noPadding={noPadding} />
        <p className="text-gray-500 ml-2">
          Sit tight, we are loading your data...
        </p>
      </div>
    </div>
  ) : (
    children
  );
};
