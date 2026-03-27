"use client";

import { Fragment, JSX, Key, useCallback } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { MoreVertical } from "lucide-react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import { ACTIONS } from "../../constants";

import { ActionButtonProps } from "./types";
import { buttonVariants } from "./variants";

import { useConfirm } from "@/hooks/useConfirm";
import { changeStatus, deleteIntegration } from "@/actions/integration";

function ActionButton(props: ActionButtonProps): JSX.Element {
  const {
    integrationId,
    status,
    refresh = () => window.location.reload(),
  } = props;

  const router = useRouter();
  const { confirm, ConfirmDialog } = useConfirm();

  const handleAction = useCallback(
    async (action: Key) => {
      switch (action) {
        case "delete":
          confirm({
            title: "Eliminar canal",
            message: "¿Estás seguro de que deseas eliminar este canal?",
            confirmText: "Eliminar",
            cancelText: "Cancelar",
            isDangerous: true,
            onConfirm: async () => {
              const wasDeleted = await deleteIntegration(integrationId);

              refresh();
              addToast({
                variant: "flat",
                title: "Eliminar canal",
                description: wasDeleted
                  ? "Canal eliminado"
                  : "Error al eliminar canal",
                color: wasDeleted ? "success" : "danger",
              });
            },
          });
          break;
        case "status":
          const isActive = status === "active";

          confirm({
            title: isActive ? "Desactivar canal" : "Activar canal",
            message:
              "¿Estás seguro de que deseas " +
              (isActive ? "desactivar" : "activar") +
              " este canal?",
            confirmText: isActive ? "Desactivar" : "Activar",
            cancelText: "Cancelar",
            isDangerous: true,
            onConfirm: async () => {
              const wasUpdated = await changeStatus(integrationId);

              refresh();
              addToast({
                variant: "flat",
                title: "Actualizar estado",
                description: wasUpdated
                  ? "Estado actualizado"
                  : "Error al actualizar estado",
                color: wasUpdated ? "success" : "danger",
              });
            },
          });

          break;
        case "edit":
          router.push(`/channels/${integrationId}/edit`);
          break;
        default:
          console.error("action not supported", action);
      }
    },
    [integrationId, router, status],
  );

  return (
    <Fragment>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly color="primary" size="sm" variant="light">
            <MoreVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Acciones del canal"
          items={ACTIONS}
          variant="flat"
          onAction={handleAction}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              classNames={{
                base: buttonVariants({
                  variant: item.key === "delete" ? "danger" : "default",
                }),
              }}
              color={item.key === "delete" ? "danger" : "default"}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <ConfirmDialog />
    </Fragment>
  );
}

export default ActionButton;
