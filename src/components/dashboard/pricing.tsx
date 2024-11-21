"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "A basic plan for startups and individual users",
      monthlyPrice: 10,
      annualPrice: 100,
      features: [
        "AI-powered analytics",
        "Basic support",
        "5 projects limit",
        "Access to basic AI tools",
      ],
    },
    {
      name: "Premium",
      description: "A premium plan for growing businesses",
      monthlyPrice: 20,
      annualPrice: 200,
      features: [
        "Advanced AI insights",
        "Priority support",
        "Unlimited projects",
        "Access to all AI tools",
        "Custom integrations",
      ],
    },
    {
      name: "Enterprise",
      description:
        "An enterprise plan with advanced features for large organizations",
      monthlyPrice: 50,
      annualPrice: 500,
      features: [
        "Custom AI solutions",
        "24/7 dedicated support",
        "Unlimited projects",
        "Access to all AI tools",
        "Custom integrations",
        "Data security and compliance",
      ],
    },
    {
      name: "Ultimate",
      description: "The ultimate plan with all features for industry leaders",
      monthlyPrice: 80,
      annualPrice: 800,
      features: [
        "Bespoke AI development",
        "White-glove support",
        "Unlimited projects",
        "Priority access to new AI tools",
        "Custom integrations",
        "Highest data security and compliance",
      ],
    },
  ];

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="bg-transparent text-foreground min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <h1 className="text-5xl font-bold sm:text-6xl">
            Simple pricing for everyone.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose an{" "}
            <span className="text-foreground font-semibold">
              affordable plan
            </span>{" "}
            thats packed with the best features for engaging your audience,
            creating customer loyalty, and driving sales.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span
            className={isAnnual ? "text-foreground" : "text-muted-foreground"}
          >
            Annual
          </span>
          <Switch
            checked={!isAnnual}
            onCheckedChange={(checked) => setIsAnnual(!checked)}
          />
          <div className="flex items-center gap-4">
            <span
              className={
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              }
            >
              Monthly
            </span>
            <span className="bg-yellow-500/20 font-medium darK:text-yellow-500 text-yellow-600  text-xs px-3 py-2 rounded-full border border-yellow-400">
              2 MONTHS FREE
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`bg-card ${
                plan.name === "Premium" ? "border-violet-600" : "border-border"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm font-semibold text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      className="text-5xl font-bold"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-4xl font-bold">$</span>
                    </motion.span>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      className="text-5xl font-bold"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                      transition={{ duration: 0.2 }}
                    >
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? "year" : "month"}
                      className="text-muted-foreground"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={variants}
                      transition={{ duration: 0.2 }}
                    >
                      /{isAnnual ? "year" : "month"}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() => setIsAnnual(!isAnnual)}
                >
                  Subscribe
                </Button>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-base font-medium"
                    >
                      <BadgeCheck className="w-5 h-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
