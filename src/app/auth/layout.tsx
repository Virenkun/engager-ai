import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import LampDemo from "@/components/ui/lamp";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (user) redirect("/dashboard");

  return (
    <HeroHighlight>
      <div className="w-full ml-8 mt-16">
        <Link href="/">
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
              <ChevronLeft size={16} />
              <span>{`Back To Home`}</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-violet-600/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </Link>
      </div>
      <div className="flex flex-1 justify-center items-center">{children}</div>
    </HeroHighlight>
  );
};

export default Layout;
