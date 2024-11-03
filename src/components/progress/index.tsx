"use client";
import React from "react";

import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  label: string;
  end: number;
  credits: number;
};

export const ProgressBar = ({ label, end, credits }: ProgressBarProps) => {
  const value = (credits / end) * 100;
  return (
    // <div className="flex flex-col w-full md:w-7/12 gap-1">

    //   <h2 className="font-bold">{label}</h2>
    //   <div className="flex flex-col">
    //     <div className="flex justify-between text-sm">
    //       <p>{credits}</p>
    //       <p>{end}</p>
    //     </div>
    //     <Progress
    //       value={(credits / end) * 100}
    //       className="w-full"
    //     />
    //   </div>
    // </div>
    <div>
      <h2 className="font-bold">{label}</h2>
      <div>
       
        <div className="flex items-center gap-4">
        <div
          className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
          role="progressbar"
          aria-valuenow={credits}
          aria-valuemin={0}
          aria-valuemax={end}
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-violet-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-violet-600"
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <div>
          <span>{credits}/</span>
          <span>{end}</span>
        </div>
        </div>
        <div
          className={`inline-block mb-2 ms-[calc(${value}%-1.25rem)] py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500`}
        >
          {value}%
        </div>
      </div>
    </div>
  );
};
