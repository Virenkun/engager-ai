"use client";
import React, { useState, useEffect } from "react";
import { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";
import Image from "next/image";

type State = {
  run: boolean;
  stepIndex: number;
  steps: Step[];
};

type Props = {
  start: boolean;
  handleStartTour: () => void;
  handleEndTour: () => void;
};

export const TourGuide = ({ start, handleStartTour, handleEndTour }: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const TOTAL_STEPS: number = 5;

  const genrateSteps = (val: number): Step[] => [
    {
      target: "body",
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome to Engager AI</h2>
          <p>
            Engager AI is an AI-powered sales platform designed to streamline
            outreach, nurture leads, and drive revenue growth by turning every
            interaction into a strategic opportunity.
          </p>
        </div>
      ),
      locale: { skip: "Skip Tutorial" },
      styles: {
        options: {
          zIndex: 10000,
          width: 800,
        },
      },
      placement: "center",
    },
    {
      target: "#step-2",
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-2">Menu</h2>
          <p>
            This is the menu where you can navigate to different sections of the
            application.
          </p>
        </div>
      ),
      styles: {
        options: {
          zIndex: 10000,
          width: 400,
        },
      },
      placement: "right",
    },
  ];

  const [{ run, steps }, setState] = useState<State>({
    run: start,
    stepIndex: 0,
    steps: genrateSteps(progress),
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      steps: genrateSteps(progress),
    }));
  }, [progress]);

  useEffect(() => {
    if (start) {
      setState((state) => ({
        ...state,
        run: true,
        stepIndex: 0,
      }));
    }
  }, [start]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, type } = data;

    if (type === EVENTS.TOUR_END) {
      handleEndTour();
      return;
    }

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setState((state) => ({
        ...state,
        stepIndex: index + (action === "prev" ? -1 : 1),
      }));
    }

    if (type === EVENTS.STEP_AFTER) {
      setProgress((prev) => prev + 1);
    }
  };

  return (
    <Joyride
      continuous
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      scrollToFirstStep
      debug
      showProgress
      showSkipButton
      styles={{
        options: {
          arrowColor: "#6d28d9",
          backgroundColor: "#000",
          overlayColor: "rgba(0, 0, 0, 0.3)",
          primaryColor: "#6d28d9",
          textColor: "#fff",
          width: 900,
          zIndex: 1000,
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0, 0.9)",
          backdropFilter: "blur(60px)",
          WebkitBackdropFilter: "blur(60px)",
          height: 300,
          borderRadius: 10,
          border: "1px solid #6d28d9",
        },
        tooltipContainer: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          height: "80%",
        },
        spotlight: {
          borderRadius: 4,
          border: "1px solid #6d28d9",
          padding: 6,
        },
        buttonNext: {
          padding: "10px 20px",
          outline: "none",
        },
        tooltipFooter: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          gap: 10,
        },
      }}
    />
  );
};
