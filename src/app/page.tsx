"use client";
import NavBar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeaturesSection } from "@/components/hero/features-section";
import { CompanyScroller } from "@/components/dashboard/company-scroller";
import Pricing from "@/components/dashboard/pricing";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import TypingAnimation from "@/components/ui/typing-animation";
import SparklesText from "@/components/ui/sparkles-text";
import PulsatingButton from "@/components/ui/pulsating-button";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (userId) {
      router.push("/dashboard");
    }
  }, [router, userId]);
  return (
    <div>
      <main>
        <NavBar />
        <section>
          <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-3">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-slate-950 bg-white px-4 py-1 text-sm font-medium dark:text-white text-black backdrop-blur-3xl">
                Turn Conversations into Conversions with ProsperAI
              </span>
            </button>
            <TypingAnimation
              className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-8xl font-bold leading-none tracking-tighter text-transparent p-4"
              text="Engager AI"
            />
            <div className="mt-6 flex flex-col justify-center items-center">
              <SparklesText text="Turn Conversations into" />
              <SparklesText text="Conversions with Engager AI" />
            </div>
            <p className="text-center max-w-[900px] mb-10 text-xl mt-6">
              Engager AI is an AI-powered sales platform designed to streamline
              outreach, nurture leads, and drive revenue growth by turning every
              interaction into a strategic opportunity.
            </p>
            <Link href="/auth/sign-up">
              <PulsatingButton>Start For Free</PulsatingButton>
            </Link>
          </div>
        </section>

        <section className="mt-52">
          <div className="overflow-hidden dark:bg-black bg-inherit w-full">
            <MacbookScroll
              title={
                <span>
                  Get Access to Insightful Dashboard
                  <br /> With Metrics.
                </span>
              }
              src={`/images/hero.png`}
              showGradient={false}
            />
          </div>
        </section>
        <section className="flex justify-center items-center flex-col gap-4 my-60">
          <h2 className="text-4xl text-center font-bold">
            Trusted by the best companies
          </h2>
          <p className="text-muted-foreground text-center max-w-lg">
            Explore our insights on AI, technology, and optimizing your
            business.
          </p>
          <CompanyScroller />
        </section>

        <section className="flex justify-center items-center flex-col gap-4 mt-28">
          <Pricing />
        </section>
        <section className="mt-28 mb-16">
          <FeaturesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
