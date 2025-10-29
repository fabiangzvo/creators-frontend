import { ChartLine, PanelLeftOpen, LayoutDashboard, Send, Image } from "lucide-react";

import { MenuItemProps } from "./components/menuItem/types";

export const MENU_ITEMS: (Omit<MenuItemProps, 'isExpanded'> & { key: string })[] = [
  {
    key: 'collapse',
    name: "Contraer",
    tooltip: "Expandir",
    icon: <PanelLeftOpen size={26} />,
    fullRotate: false,
    className: 'mb-6'
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: <LayoutDashboard size={26} />,
    link: '/dashboard',
  },
  {
    key: 'posts',
    name: 'Publicaciones',
    icon: <Image size={26} />,
    link: '/posts',
  },
  {
    key: 'channels',
    name: 'Canales',
    icon: <Send size={26} />,
    link: '/channels',
  },
  {
    key: 'stats',
    name: 'Estadísticas',
    icon: <ChartLine size={26} />,
    link: '/stats',
  }
]