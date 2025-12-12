"use client"

import { JSX, useMemo } from "react";

import { IconProps } from "./types";

export function YoutubeIcon(props: IconProps): JSX.Element {
  const { size = 36, className, isFilled = false } = props;

  const component = useMemo(() => isFilled ?
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        fill="currentColor"
      >
      </path>
    </svg> : <svg
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
      <path
        d="M21.8 8s-.2-1.4-.8-2c-.6-.7-1.3-.7-1.6-.8C16.4 5 12 5 12 5s-4.4 0-7.4.2c-.3 0-1 .1-1.6.8-.6.6-.8 2-.8 2S2 9.3 2 11v2c0 1.7.2 3 .2 3s.2 1.4.8 2c.6.7 1.4.7 1.8.8C7.6 19 12 19 12 19s4.4 0 7.4-.2c.3 0 1-.1 1.6-.8.6-.6.8-2 .8-2s.2-1.3.2-3v-2c0-1.7-.2-3-.2-3z"
      />
      <polygon
        points="10 9 16 12 10 15"
      />
    </svg>, [isFilled, className, size]);

  return component;
}