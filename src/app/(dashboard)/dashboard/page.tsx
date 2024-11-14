"use client";
import { getUserAppointments } from "@/services/appointment";
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from "@/services/dashboard";
import DashboardCard from "@/components/dashboard/cards";
import { PlanUsage } from "@/components/dashboard/plan-usage";
import InfoBar from "@/components/infobar";
import { Separator } from "@/components/ui/separator";
import CalIcon from "@/icons/cal-icon";
import EmailIcon from "@/icons/email-icon";
import PersonIcon from "@/icons/person-icon";
import { TransactionsIcon } from "@/icons/transactions-icon";
import { DollarSign } from "lucide-react";
import React, { useEffect } from "react";
import { BookUser } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { CalendarClock } from "lucide-react";
import { Banknote } from "lucide-react";
import { Wallet } from "lucide-react";
import { TourGuide } from "@/components/tour-guide/tour-guide";
import { set } from "date-fns";

type Props = {};

const Page = (props: Props) => {
  const [clients, setClients] = React.useState<number | null>(null);
  const [sales, setSales] = React.useState<number | null>(null);
  const [bookings, setBookings] = React.useState<number | null>(null);
  const [plan, setPlan] = React.useState<any>(null);
  const [transactions, setTransactions] = React.useState<any>(null);
  const [products, setProducts] = React.useState<number | null>(null);
  const [loded, setLoded] = React.useState<boolean>(false);

  useEffect(() => {
    setLoded(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const clients = (await getUserClients()) ?? 0;
      const sales = (await getUserBalance()) ?? 0;
      const bookings = (await getUserAppointments()) ?? 0;
      const plan = (await getUserPlanInfo()) ?? {};
      const transactions = (await getUserTransactions()) ?? { data: [] };
      const products = (await getUserTotalProductPrices()) ?? 0;

      setClients(clients);
      setSales(sales);
      setBookings(bookings);
      setPlan(plan);
      setTransactions(transactions);
      setProducts(products);
    }
    fetchData();
  }, []);

  if (!loded) {
    return null;
  }

  return (
    <>
      <TourGuide
        start={true}
        handleStartTour={() => {}}
        handleEndTour={() => {}}
      />
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<BookUser />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipline Value"
            icon={<CircleDollarSign />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<CalendarClock />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Total Sales"
            icon={<CircleDollarSign />}
          />
        </div>
        <div className="w-[96%] grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div className="flex items-center gap-2">
              <Banknote />
              <h2 className="font-bold text-2xl">Plan Usage</h2>
            </div>
            <p className="text-sm font-light">
              A detailed overview of your metrics, usage, customers and more
            </p>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full flex justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <Wallet />
                <p className="font-bold">Recent Transactions</p>
              </div>
              <p className="text-sm">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map(
                (transaction: {
                  id: React.Key | null | undefined;
                  calculated_statement_descriptor:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                  amount: number;
                }) => (
                  <div
                    className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
                    key={transaction.id}
                  >
                    <p className="font-bold">
                      {transaction.calculated_statement_descriptor}
                    </p>
                    <p className="font-bold text-xl">
                      ${transaction.amount / 100}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
