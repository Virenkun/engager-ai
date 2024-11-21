"use client";
import Pricing from "@/components/dashboard/pricing";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <main>
        <NavBar />
        <section>
          <Pricing />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
