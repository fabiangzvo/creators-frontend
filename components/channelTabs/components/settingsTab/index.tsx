import { JSX, useCallback } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation';
import { addToast } from '@heroui/toast';

import { useConfirm } from "@/hooks/useConfirm"
import { changeStatus, deleteIntegration } from '@/actions/integration';

import { SettingTabProps } from './types';
import { Switch } from '@heroui/switch';
import { Power, Zap } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function SettingTab(props: SettingTabProps): JSX.Element {
  const { integrationId, status } = props;

  const router = useRouter();
  const { confirm, ConfirmDialog } = useConfirm();

  const handleDelete = useCallback(async () => {
    confirm({
      title: 'Eliminar canal',
      message: '¿Estás seguro de que deseas eliminar este canal?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      isDangerous: true,
      onConfirm: async () => {
        const wasDeleted = await deleteIntegration(integrationId);

        addToast({
          variant: "flat",
          title: "Eliminar canal",
          description: wasDeleted ? "Canal eliminado" : "Error al eliminar canal",
          color: wasDeleted ? "success" : "danger",
        });

        router.back();
      }
    })
  }, [router, integrationId])

  const handleStatus = useCallback(async () => {
    const isActive = status === 'active';

    confirm({
      title: isActive ? 'Desactivar canal' : 'Activar canal',
      message: '¿Estás seguro de que deseas ' + (isActive ? 'desactivar' : 'activar') + ' este canal?',
      confirmText: isActive ? 'Desactivar' : 'Activar',
      cancelText: 'Cancelar',
      isDangerous: false,
      onConfirm: async () => {
        const wasUpdated = await changeStatus(integrationId);

        router.refresh();
        addToast({
          variant: "flat",
          title: "Actualizar estado",
          description: wasUpdated ? "Estado actualizado" : "Error al actualizar estado",
          color: wasUpdated ? "success" : "danger",
        });
      }
    })
  }, [router, status, integrationId])

  return (
    <Card className="h-full pt-4" shadow='sm'>
      <CardHeader className="flex flex-col gap-1 items-start px-4 mb-4">
        <h2 className="font-bold text-foreground text-xl line-clamp-1">
          Configuración
        </h2>
        <p className='text-foreground/50'>Gestiona todas las publicaciones realizadas desde Creators.</p>
      </CardHeader>
      <CardBody className='px-4'>
        <div className='flex justify-between gap-4 my-2'>
          <div>
            <p className='font-semibold text-lg'>Estado: {status === 'active' ? 'Activo' : 'Deshabilitado'}</p>
            <p >Al apagar este canal, no se podrá publicar contenido nuevo pero se conservará toda la información.</p>
          </div>
          <Switch
            classNames={{ wrapper: twMerge(status === 'active' ? 'bg-primary-500' : 'bg-warning-500') }}
            color="primary"
            size="lg"
            isSelected={status === 'active'}
            onValueChange={handleStatus}
          />
        </div>
      </CardBody>
      <CardFooter className='px-4 bg-red-400/20  dark:bg-red-950/50 flex text-red-500 justify-between items-center gap-4 py-6'>
        <div>
          <p className='font-semibold text-lg'>Eliminar canal</p>
          <p className='text-red-800'>Al eliminar este canal, se desvinculará de tu cuenta en Creators. No se eliminará contenido ni información en la plataforma original (Facebook, Instagram, YouTube o TikTok).</p>
        </div>
        <Button
          className='text-white font-bold'
          color='danger'
          onPress={handleDelete}
          variant='solid'
        >
          Eliminar
        </Button>
      </CardFooter>
      <ConfirmDialog />
    </Card>
  )
}

export default SettingTab