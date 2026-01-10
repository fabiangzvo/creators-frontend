import { JSX } from "react";
import { Link } from "@heroui/link";
import { twMerge } from "tailwind-merge";
import { Heart, Image, Video } from "lucide-react";

import { EmptyMessageProps } from "./types";

function EmptyMessage(props: EmptyMessageProps): JSX.Element {
  const { label, linkLabel, link, containerClassName } = props;

  return (
    <div className={twMerge("flex flex-col justify-center items-center h-full w-full", containerClassName)}>
      <div className="flex gap-4 mb-8">
        <div className="relative h-24 w-16 flex flex-col justify-center items-start rounded-lg -rotate-20 shadow-lg border border-foreground/20">
          <div className="bg-background h-full w-full rounded-md -z-10 flex justify-center items-center">
            <Image className="text-primary-500" size={50} strokeWidth={1} />
          </div>
          <div className="absolute -bottom-3 right-1 w-8 h-8 rounded-full bg-primary-100 flex justify-center items-center">
            <Heart className="text-primary-500 fill-primary-500" size={20} strokeWidth={1} />
          </div>
        </div>
        <div className="relative h-24 w-16 flex flex-col justify-center items-start rounded-lg shadow-lg border border-foreground/20">
          <div className="bg-background h-full w-full rounded-md flex justify-center items-center">
            <Image className="text-primary-500" size={45} strokeWidth={1.3} />
          </div>
          <div className="absolute -bottom-3 right-1 w-8 h-8 rounded-full bg-primary-200 flex justify-center items-center">
            <Heart className="text-primary-500 fill-background" size={20} strokeWidth={1} />
          </div>
        </div>
        <div className="relative h-24 w-16 flex flex-col justify-center items-start rounded-lg rotate-20 shadow-lg border border-foreground/20">
          <div className="bg-background h-full w-full rounded-md -z-10 flex justify-center items-center">
            <Image className="text-primary-500" size={50} strokeWidth={1} />
          </div>
          <div className="absolute -bottom-3 right-1 w-8 h-8 rounded-full bg-primary-100 flex justify-center items-center">
            <Heart className="text-primary-500 fill-primary-500" size={20} strokeWidth={1} />
          </div>
        </div>
      </div>
      <p className="text-foreground/70 text-lg" >{label}</p>
      <Link href={link} className="font-semibold text-lg">{linkLabel}</Link>
    </div>
  )
}

export default EmptyMessage