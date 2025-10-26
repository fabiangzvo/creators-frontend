import { JSX } from "react";

export interface MenuItemProps {
  name: string;
  isExpanded: boolean;
  icon: JSX.Element;
  tooltip?: string;
  link?: string;
  fullRotate?: boolean;
  className?: string;
}
