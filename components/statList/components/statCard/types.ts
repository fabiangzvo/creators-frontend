import { ComponentType } from "react";
import { LucideProps } from "lucide-react";

export interface StatCardProps {
  title: string;
  content: number;
  Icon: ComponentType<LucideProps>;
}
