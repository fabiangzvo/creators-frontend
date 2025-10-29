import { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, } from "@heroui/dropdown";
import { User } from "@heroui/user";

import { ThemeSwitch } from "@/components/theme-switch";

import { UserOptionsProps } from "./types";

function UserOptions(_: UserOptionsProps): JSX.Element {

  return (
    <div className="absolute bottom-0 flex flex-col justify-center items-center gap-4 w-full">
      <ThemeSwitch />
      <div className={
        twMerge(
          "w-full flex justify-center items-center mb-6",
        )
      }>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              className='cursor-pointer'
              as="button"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              name=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat" disabledKeys={["profile"]}>
            <DropdownItem key="profile" className="h-14 gap-2 opacity-100">
              <p className="font-bold ">Signed in as</p>
              <p className="font-bold">Faguzman.97@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Profile</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default UserOptions