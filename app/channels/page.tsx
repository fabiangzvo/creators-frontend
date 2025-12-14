import { JSX } from "react";
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";

import ChannelList from "@/components/channelList";

function Channels(): JSX.Element {
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
      <ChannelList />
    </div>
  );
}

export default Channels;