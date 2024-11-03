import CalIcon from "@/icons/cal-icon";
import ChatIcon from "@/icons/chat-icon";
import DashboardIcon from "@/icons/dashboard-icon";
import EmailIcon from "@/icons/email-icon";
import HelpDeskIcon from "@/icons/help-desk-icon";
import IntegrationsIcon from "@/icons/integrations-icon";
import SettingsIcon from "@/icons/settings-icon";
import StarIcon from "@/icons/star-icon";
import TimerIcon from "@/icons/timer-icon";
import Image from "next/image";
import { LayoutDashboard } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import { PackagePlus } from 'lucide-react';
import { Settings } from 'lucide-react';
import { CalendarCheck } from 'lucide-react';
import { MailCheck } from 'lucide-react';
import { MailPlus } from 'lucide-react';
import { Mails } from 'lucide-react';
import { CalendarX2 } from 'lucide-react';
import { Star } from 'lucide-react';




type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Dashboard",
    // icon: <Image src="/images/dashboard.png" alt="dashboard" width={20} height={20} />,
    icon: <LayoutDashboard />,
    path: "dashboard",
  },
  {
    label: "Conversations",
    icon: <MessagesSquare />,
    path: "conversation",
  },
  {
    label: "Integrations",
    icon: <PackagePlus />,
    path: "integration",
  },
  {
    label: "Settings",
    icon: <Settings />,
    path: "settings",
  },
  {
    label: "Appointments",
    icon: <CalendarCheck />,
    path: "appointment",
  },
  {
    label: "Email Marketing",
    icon: <MailCheck />,
    path: "email-marketing",
  },
];

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "unread",
    icon: <MailPlus />,
  },
  {
    label: "all",
    icon: <Mails />,
  },
  {
    label: "expired",
    icon: <CalendarX2 />,
  },
  {
    label: "starred",
    icon: <Star />,
  },
];

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "help desk",
  },
  {
    label: "questions",
  },
];

export const APPOINTMENT_TABLE_HEADER = [
  "Name",
  "RequestedTime",
  "Added Time",
  "Domain",
];

export const EMAIL_MARKETING_HEADER = ["Id", "Email", "Answers", "Domain"];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "chat",
    icon: <Image src="/images/chat-bot.png" alt="chat" width={20} height={20} />,
  },
  {
    label: "helpdesk",
    icon: <HelpDeskIcon />,
  },
];
