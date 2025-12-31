'use client'

import { JSX } from 'react'
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";

import SearchInput from "@/components/searchInput";

function Banner(): JSX.Element {
  return (
    <div className="grid grid-cols-2 mb-8">
      <h1 className="text-2xl font-bold">Canales</h1>
      <div className="flex justify-end gap-2">
        <SearchInput
          handleSearch={(e) => console.log(e)}
          variant="flat"
        />
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
  )
}

export default Banner