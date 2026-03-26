import { JSX } from "react";
import { Link } from "@heroui/link";
import { twMerge } from "tailwind-merge";

import { EmptyMessageProps } from "./types";

import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { TiktokIcon } from "@/components/icons/tiktok";

function EmptyMessage(props: EmptyMessageProps): JSX.Element {
  const { label, linkLabel, link, containerClassName } = props;

  return (
    <div
      className={twMerge(
        "flex flex-col justify-center items-center h-full w-full",
        containerClassName,
      )}
    >
      <div className="flex gap-4 mb-8">
        <div className="relative border h-24 w-16 flex justify-center items-center rounded-2xl -rotate-20 shadow-lg border-primary-500">
          <div className="bg-primary-50 h-10 w-10 rounded-2xl absolute -z-10" />
          <TiktokIcon className="text-primary-500" />
        </div>
        <div className="relative border h-24 w-16 flex justify-center items-center rounded-2xl shadow-lg shadow-primary-500/20 border-primary-500">
          <InstagramIcon className="text-primary-500" />
        </div>
        <div className="relative border h-24 w-16 flex justify-center items-center rounded-2xl rotate-20 shadow-lg border-primary-500">
          <div className="bg-primary-50 h-10 w-10 rounded-2xl absolute -z-10" />
          <FacebookIcon className="text-primary-500" />
        </div>
      </div>
      <p className="text-foreground/70 text-lg">{label}</p>
      <Link className="font-semibold text-lg" href={link}>
        {linkLabel}
      </Link>
    </div>
  );
}

export default EmptyMessage;
