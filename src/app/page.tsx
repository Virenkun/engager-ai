"use client";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { companies } from "@/constants/companies";
import { FeaturesSection } from "@/components/hero/features-section";
import { CompanyScroller } from "@/components/dashboard/company-scroller";
import Pricing from "@/components/dashboard/pricing";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import TypingAnimation from "@/components/ui/typing-animation";

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
            {/* <div className="text-8xl font-bold text-violet-950 dark:text-white">
              Engager AI
            </div> */}
            {/* <div className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-8xl font-bold leading-none tracking-tighter text-transparent p-4">
              Engager AI
            </div> */}
            <TypingAnimation
              className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-8xl font-bold leading-none tracking-tighter text-transparent p-4"
              text="Engager AI"
            />
            <p className="text-center max-w-[500px] mb-4">
              Engager AI is an AI-powered sales platform designed to streamline
              outreach, nurture leads, and drive revenue growth by turning every
              interaction into a strategic opportunity.
            </p>
            <Button className="bg-violet-700 text-white px-4 font-medium hover:bg-violet-800 mb-3">
              Start For Free
            </Button>
            {/* <Image
              src="/images/iphonecorinna.png"
              width={400}
              height={100}
              alt="Logo"
              className="max-w-lg object-contain"
            /> */}
          </div>
        </section>

        <section>
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

        <section className="flex justify-center items-center flex-col gap-4 mt-10">
          <h2 className="text-4xl text-center font-bold">
            {" "}
            Choose what fits you right
          </h2>
          <p className="text-muted-foreground text-center max-w-lg">
            Our straightforward pricing plans are tailored to meet your needs.
            If
            {" you're"} not ready to commit you can get started for free.
          </p>
        </section>

        <div className="flex  justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": card.title === "Unlimited",
              })}
            >
              <CardHeader>
                <CardTitle className="text-violet-600">{card.title}</CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card.title)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">
                  <span>/ month</span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-3">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-4">
                      <Image
                        src="/images/tick.png"
                        width={15}
                        height={10}
                        alt="check"
                        className="object-contain"
                      />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/dashbord?plan=${card.title}`}
                  className="bg-violet-700 border-violet-800 border-2 p-2 w-full text-white text-center font-bold rounded-md"
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* </Vortex> */}

        {/* <section className="flex justify-center items-center flex-col gap-4 mt-28">
          <h2 className="text-4xl text-center font-bold">
            Trusted by the best companies
          </h2>
          <p className="text-muted-foreground text-center max-w-lg">
            Explore our insights on AI, technology, and optimizing your
            business.
          </p>
          <div className="flex justify-center items-center gap-4">
            {companies.map((company) => (
              <Image
                key={company.name}
                src={company.image}
                width={150}
                height={150}
                alt="Logo"
                className="max-w-lg object-contain"
              />
            ))}
          </div>
        </section> */}
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
        {/* <section className="md:grid-cols-3 grid-cols-1 grid gap-5 container mt-8">
          {posts &&
            posts.map((post) => (
              <Link href={`/blogs/${post.id}`} key={post.id}>
                <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full hover:bg-gray-100">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={`${process.env.CLOUDWAYS_UPLOADS_URL}${post.image}`}
                      alt="post featured image"
                      fill
                    />
                  </div>
                  <div className="py-5 px-10 flex flex-col gap-5">
                    <CardDescription>
                      {getMonthName(post.createdAt.getMonth())}{" "}
                      {post.createdAt.getDate()} {post.createdAt.getFullYear()}
                    </CardDescription>
                    <CardTitle>{post.title}</CardTitle>
                    {parse(post.content.slice(4, 100))}...
                  </div>
                </Card>
              </Link>
            ))}
        </section> */}
        <section className="mt-28 mb-16">
          <FeaturesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
