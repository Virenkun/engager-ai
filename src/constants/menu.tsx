import HelpDeskIcon from "@/icons/help-desk-icon";
import Image from "next/image";
import {
  LayoutDashboard,
  MessagesSquare,
  PackagePlus,
  Settings,
  CalendarCheck,
  MailCheck,
  MailPlus,
  Mails,
  CalendarX2,
  Star,
} from "lucide-react";

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Dashboard",
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

export const DOMAIN_MENU: TABS_MENU_PROPS[] = [
  {
    label: "settings",
  },
  {
    label: "chatbot",
  },
  {
    label: "training",
  },
  {
    label: "products",
  },
  {
    label: "playground",
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
    label: "Chat",
    icon: (
      <Image src="/images/chat-bot.png" alt="chat" width={20} height={20} />
    ),
  },
  {
    label: "Helpdesk",
    icon: <HelpDeskIcon />,
  },
];
