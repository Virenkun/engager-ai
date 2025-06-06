import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/themes/theme-toggle";
import { NavigationItems } from "./navigation-items";

function NavBar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="sticky top-4 z-50 flex justify-center items-center">
      <div
        className={`flex-1 sticky top-0 max-w-screen-xl rounded-full z-50 flex gap-5 justify-between items-center px-7 py-3 font-bold border-b border-solid border-zinc-100 dark:border-none leading-[154.5%] max-md:flex-wrap max-md:px-5 backdrop-blur-xl ${
          isScrolled ? "bg-white/50 dark:bg-gray-900/50" : "bg-transparent"
        }`}
      >
        <Link href="/">
          <div className="flex gap-2 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700 dark:text-white">
            <Image
              src="/images/logo-ai.png"
              alt="LOGO"
              sizes="100vw"
              style={{
                width: "30px",
                height: "auto",
                margin: "0px 6px",
              }}
              width={0}
              height={0}
            />
            <span>Engager AI</span>
          </div>
        </Link>
        <NavigationItems />
        <div className="flex items-center justify-center gap-6">
          <ThemeToggle />
          <Link
            href="/auth/sign-in"
            className="text-neutral-700 dark:text-white"
          >
            <button>Log In</button>
          </Link>

          <Link
            href="/auth/sign-up"
            className="bg-violet-700 px-4 py-2 rounded-full text-white font-medium"
          >
            Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
