"use client"

import { IconProps } from "./types";

export const YoutubeIcon: React.FC<IconProps> = ({
  size = 36,
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.8 8s-.2-1.4-.8-2c-.6-.7-1.3-.7-1.6-.8C16.4 5 12 5 12 5s-4.4 0-7.4.2c-.3 0-1 .1-1.6.8-.6.6-.8 2-.8 2S2 9.3 2 11v2c0 1.7.2 3 .2 3s.2 1.4.8 2c.6.7 1.4.7 1.8.8C7.6 19 12 19 12 19s4.4 0 7.4-.2c.3 0 1-.1 1.6-.8.6-.6.8-2 .8-2s.2-1.3.2-3v-2c0-1.7-.2-3-.2-3z" />
      <polygon points="10 9 16 12 10 15" />
    </svg>
  );
};