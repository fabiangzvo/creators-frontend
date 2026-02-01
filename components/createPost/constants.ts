import {
  Rocket,
  Users,
  MonitorPlay,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Music,
  Youtube
} from "lucide-react";

export const STRATEGIES_LIST = [
    {
      id: "global",
      title: "Lanzamiento Global",
      description: "4 Canales",
      icon: Rocket,
      channels: [Linkedin, Twitter, Facebook, Instagram],
    },
    {
      id: "marketing",
      title: "Equipo de Marketing",
      description: "2 Canales",
      icon: Users,
      channels: [Linkedin, Twitter],
    },
    {
      id: "video",
      title: "Video Primero",
      description: "3 Canales",
      icon: MonitorPlay,
      channels: [Music, Youtube, Instagram],
    },
];
