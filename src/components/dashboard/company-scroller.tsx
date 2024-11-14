import React from "react";
import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import Image from "next/image";

type Props = {};

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

export const companies = [
  {
    name: "Google",
    image: "/images/google.png",
  },
  {
    name: "Meta",
    image: "/images/meta.png",
  },
  {
    name: "Microsoft",
    image: "/images/ms.png",
  },
  {
    name: "Netflix",
    image: "/images/netflix.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  image,
}: //   name,
//   username,
//   body,
{
  image: string;
  //   name: string;
  //   username: string;
  //   body: string;
}) => {
  return (
    <Image
      src={image}
      width={150}
      height={150}
      alt="Logo"
      className="max-w-lg object-contain"
    />
  );
};

export function CompanyScroller() {
  return (
    <div className="relative flex h-[100px] w-3/4 flex-col items-center justify-center overflow-hidden rounded-lg  bg-transparent">
      <Marquee pauseOnHover className="[--duration:20s]">
        {companies.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee> */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div> */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}
