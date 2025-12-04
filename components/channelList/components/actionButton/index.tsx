import { JSX, Key, useCallback } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { Button } from "@heroui/button"
import { MoreVertical } from 'lucide-react'
import { clsx } from "clsx"

import { ACTIONS } from "../../constants"
import { ActionButtonProps } from "./types"

function ActionButton(props: ActionButtonProps): JSX.Element {
  const { integrationId } = props;

  const handleAction = useCallback((action: Key) => {
    console.log(integrationId, action);
  }, [integrationId]);

  return (
    <Dropdown >
      <DropdownTrigger>
        <Button variant="light" color='primary' size='sm' isIconOnly >
          <MoreVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Acciones del canal" variant='flat' items={ACTIONS} onAction={handleAction}>
        {(item) => (
          <DropdownItem
            key={item.key}
            classNames={{ base: clsx(item.key === "delete" ? "text-danger hover:text-danger-600" : "data-[hover=true]:text-primary-600") }}
            color={item.key === "delete" ? "danger" : "default"}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown >
  )
}

export default ActionButton