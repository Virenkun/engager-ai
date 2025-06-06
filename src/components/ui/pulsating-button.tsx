"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = "#6d28d9",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        "relative w-[300px] h-[50px] text-center cursor-pointer flex justify-center items-center rounded-lg text-white font-medium dark:text-white bg-violet-700 dark:bg-violet-700 px-4 py-2",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10 text-lg">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}
