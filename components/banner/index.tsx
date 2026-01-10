'use client'

import { JSX } from 'react'
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";

import SearchInput from "@/components/searchInput";

import { BannerProps } from './types';

function Banner(props: BannerProps): JSX.Element {
  const { title, description, link, handleSearch } = props

  return (
    <div className="grid grid-cols-2 mb-8 max-md:grid-cols-1 max-md:gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className=" text-foreground/50">{description}</p>
      </div>
      <div className="flex justify-end gap-4">
        {
          handleSearch &&
          <SearchInput
            handleSearch={handleSearch}
            variant="flat"
          />
        }
        {link && <Tooltip content="Crear canal" placement="bottom">
          <Button
            variant="solid"
            as={Link}
            color="primary"
            isIconOnly
            href={link}
          >
            <PlusIcon />
          </Button>
        </Tooltip>}
      </div>
    </div>
  )
}

export default Banner