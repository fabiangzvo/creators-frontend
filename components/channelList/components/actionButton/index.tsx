import { Fragment, JSX, Key, useCallback } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { Button } from "@heroui/button"
import { MoreVertical } from 'lucide-react'
import { addToast } from "@heroui/toast"
import { useRouter } from "next/navigation"

import { deleteIntegration } from "@/actions/integration"
import { useConfirm } from "@/hooks/useConfirm"

import { ACTIONS } from "../../constants"
import { ActionButtonProps } from "./types"
import { buttonVariants } from "./variants"

function ActionButton(props: ActionButtonProps): JSX.Element {
  const { integrationId, refresh } = props;

  const router = useRouter();
  const { confirm, ConfirmDialog } = useConfirm();

  const handleAction = useCallback(async (action: Key) => {
    switch (action) {
      case "delete":
        confirm({
          title: 'Eliminar canal',
          message: '¿Estás seguro de que deseas eliminar este canal?',
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          isDangerous: true,
          onConfirm: async () => {
            const wasDeleted = await deleteIntegration(integrationId);

            refresh();
            addToast({
              variant: "flat",
              title: "Eliminar canal",
              description: wasDeleted ? "Canal eliminado" : "Error al eliminar canal",
              color: wasDeleted ? "success" : "danger",
            });
          }
        })
        break;
      case "edit":
        router.push(`/channels/${integrationId}/edit`);
        break;
      default:
        console.log("action not supported", action);
    }
  }, [integrationId, router]);

  return (<Fragment>
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
            classNames={{ base: buttonVariants({ variant: item.key === "delete" ? "danger" : "default" }) }}
            color={item.key === "delete" ? "danger" : "default"}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown >
    <ConfirmDialog />
  </Fragment>
  )
}

export default ActionButton