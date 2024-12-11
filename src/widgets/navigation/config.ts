import { Group, Home, MessageSquare } from "lucide-react";

export const navItems = [
  {
    path: "/",
    label: "Главная",
    icon: Home,
    aliases: ["/users", "/users/edit"],
  },
  {
    path: "/groups",
    label: "Группы",
    icon: Group,
    aliases: ["/groups", "/groups/edit"],
  },
  {
    path: "/broadcasts",
    label: "Рассылки",
    icon: MessageSquare,
  },
];
