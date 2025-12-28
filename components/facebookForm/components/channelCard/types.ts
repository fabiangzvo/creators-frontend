import { ReactNode } from "react";

export interface ChannelCardProps {
  image: string;
  title: string;
  subtitle: string;
  optionsComponent?: ReactNode;
  description?: string;
  pageLink?: string;
}
