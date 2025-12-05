'use client';
import { useState, useCallback, JSX } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import clsx from 'clsx';

interface ConfirmConfig {
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

interface UseConfirmReturn {
  confirm: (config: ConfirmConfig) => void;
  ConfirmDialog: () => JSX.Element;
}

interface ConfirmState extends ConfirmConfig {
  isLoading: boolean;
}

export function useConfirm(): UseConfirmReturn {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState<ConfirmState>({
    title: '',
    message: '',
    onConfirm: () => { },
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    isDangerous: false,
    isLoading: false
  });

  const confirm = useCallback((config: ConfirmConfig) => {
    setState(prev => ({
      ...prev,
      ...config,
      isLoading: false
    }));
    onOpen();
  }, [onOpen]);

  const handleConfirm = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await state.onConfirm();
    } catch (error) {
      console.error('confirm error:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
      onOpenChange();
    }
  };

  const ConfirmDialog = (): JSX.Element => (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{state.title}</ModalHeader>
        <ModalBody>
          <p>{state.message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant='light'
            onPress={() => onOpenChange()}
          >
            {state.cancelText}
          </Button>
          <Button
            variant='solid'
            color={state.isDangerous ? 'danger' : 'primary'}
            onPress={handleConfirm}
            isLoading={state.isLoading}
            className={clsx(state.isDangerous && 'text-white')}
          >
            {state.confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { confirm, ConfirmDialog };
}