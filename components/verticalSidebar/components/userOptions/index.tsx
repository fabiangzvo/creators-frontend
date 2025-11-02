import { JSX } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, } from "@heroui/dropdown";
import { User } from "@heroui/user";

function UserOptions(): JSX.Element {
  return (
    <div className="flex justify-end items-center gap-4 w-full">
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
    )
}

export default UserOptions