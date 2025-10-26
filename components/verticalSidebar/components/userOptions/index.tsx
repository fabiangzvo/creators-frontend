import { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
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
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@tonyreichert</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
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