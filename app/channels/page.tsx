"use client"

import { JSX } from "react";
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";

import { authClient } from "@/lib/auth-client";

function Channels(): JSX.Element {
  const client = authClient.useSession();

  return (
    <div className="container flex flex-col">
      <div className="grid grid-cols-2 mb-8">
        <h1 className="text-2xl font-bold">Canales</h1>
        <div className="flex justify-end">
          <Tooltip content="Crear canal" placement="bottom">
            <Button
              variant="solid"
              as={Link}
              color="primary"
              isIconOnly
              href="/channels/create"
            >
              <PlusIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-foreground/70" >Todavía no has conectado ningún canal.</p>
        <Link href="/channels/create" className="font-semibold">¡Crea una integración para empezar!</Link>
      </div>

    </div>
  );
}

export default Channels;