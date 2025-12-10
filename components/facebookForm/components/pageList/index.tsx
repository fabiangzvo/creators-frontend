"use client"
import { JSX, useState, useCallback } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Image } from "@heroui/image";

import { PageListProps } from "./types";

function PageList(props: PageListProps): JSX.Element {
  const { pages } = props;

  const [selectedKey, setSelectedKey] = useState<number[]>([])

  const handleSelection = useCallback((keys: any): void =>
    setSelectedKey([keys.values().next().value])
    , [])

  return (<Listbox
    disallowEmptySelection
    aria-label="select facebook page"
    selectedKeys={selectedKey}
    selectionMode="single"
    variant="faded"
    onSelectionChange={handleSelection}
    items={[...pages, {
      about: "string",
      name: "string",
      picture: {
        data: {
          url: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`,
          cache_key: "string",
          is_silhouette: true,
          height: 50,
          width: 50,
        },
      },
      id: 2,
    }, {
      about: "string",
      name: "otro",
      picture: {
        data: {
          url: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`,
          cache_key: "string",
          is_silhouette: true,
          height: 50,
          width: 50,
        },
      },
      id: 3,
    }]}
  >
    {(item) => (
      <ListboxItem
        key={item.id}
        showDivider
        classNames={{ selectedIcon: "[&_polyline]:stroke-primary-500 w-5 h-5" }}
        startContent={
          <Image
            alt={item.name}
            height={item.picture.data.height}
            width={item.picture.data.width}
            radius="sm"
            src={item.picture.data.url}

          />
        }
        textValue={item.name || "option"}
      >
        <p className="text-base">{item.name}</p>
      </ListboxItem>
    )}
  </Listbox >);
}

export default PageList;