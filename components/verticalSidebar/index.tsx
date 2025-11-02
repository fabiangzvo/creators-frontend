"use client";

import { useState, Key, useCallback, JSX, useMemo } from 'react';
import { Megaphone, } from "lucide-react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { twMerge } from "tailwind-merge";

import MenuItem from './components/menuItem';
import UserOptions from './components/userOptions';
import { MENU_ITEMS } from './constants';

export default function VerticalSidebar(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = useCallback((section: Key): void => {
    switch (section) {
      case "collapse":
        setIsExpanded(prev => !prev)
        break;
    }
  }, []);

  const items = useMemo(() => MENU_ITEMS.map((item) => <ListboxItem
    key={item.key}
    classNames={{
      base: twMerge("w-auto gap-0 p-1 [&_span]:text-center px-4", item.className),
    }}
    startContent={
      <MenuItem
        name={item.name}
        isExpanded={isExpanded}
        icon={item.icon}
        tooltip={item?.tooltip}
        fullRotate={item?.fullRotate}
      />
    }
    href={item?.link}
  >
    <span className={twMerge("font-semibold ml-2", isExpanded ? 'block' : 'hidden')}>{item.name}</span>
  </ListboxItem>
  ), [isExpanded]);

  return (
    <Listbox
      variant='faded'
      className={
        twMerge(
          "h-screen sticky top- transition-all duration-300 flex flex-col border-r-2 border-gray-300 dark:border-gray-700",
          isExpanded ? 'w-72' : 'w-16'
        )
      }
      topContent={
        <div
          className={
            twMerge(
              "w-full flex justify-center items-center p-3 px-4 mb-6",
              isExpanded ? 'w-full flex justify-between' : ''
            )
          }
        >
          <Megaphone size={26} className='text-primary-500' />
          <span className={twMerge("font-semibold text-lg w-full text-center transition-all duration-300", isExpanded ? 'block' : 'hidden')}>Creators</span>
        </div>
      }
      onAction={toggleSection}
      //bottomContent={<UserOptions isExpanded={isExpanded} />}
    >
      {items}
    </Listbox >
  );
}