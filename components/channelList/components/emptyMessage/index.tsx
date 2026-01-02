import { JSX } from "react";
import { Link } from "@heroui/link";

import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { TiktokIcon } from "@/components/icons/tiktok";

function EmptyMessage(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
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
      <p className="text-foreground/70 text-lg" >Todavía no has conectado ningún canal.</p>
      <Link href="/channels/create" className="font-semibold text-lg">¡Crea una integración para empezar!</Link>
    </div>
  )
}

export default EmptyMessage