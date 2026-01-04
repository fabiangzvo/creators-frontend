import { JSX } from 'react'
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Snippet } from "@heroui/snippet";

import { GeneralTabProps } from "./types";

function GeneralTab(props: GeneralTabProps): JSX.Element {
  const { apiKey, description, accountId } = props;

  return (
    <Card className="h-full p-4" shadow='sm'>
      <CardHeader className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-foreground text-xl line-clamp-1">
          Información del canal
        </h2>
        <p className='text-foreground/50'>Detalles y configuración del canal conectado</p>
      </CardHeader>
      <CardBody>
        <p className='mb-4 text-center'>{description || <span className='text-foreground/50'>Sin descripción</span>}</p>
        <div className='grid grid-cols-2 gap-2'>
          <div className="flex flex-col gap-2 mt-2">
            <span className='font-semibold'>Api Key</span>
            <Snippet
              classNames={{ base: "w-full", pre: "w-[95%] overflow-hidden pl-1", symbol: "hidden" }}
              size="sm"
              color="primary"
              variant="flat"
              tooltipProps={{ content: "Copiar llave" }}
            >
              {apiKey}
            </Snippet>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className='font-semibold'>ID de la cuenta</span>
            <Snippet
              classNames={{ base: "w-full", pre: "w-[95%] overflow-hidden pl-1", symbol: "hidden" }}
              size="sm"
              color="primary"
              variant="flat"
              tooltipProps={{ content: "Copiar ID de la cuenta" }}
            >
              {accountId}
            </Snippet>
          </div>
        </div>
      </CardBody>
    </Card>

  )
}

export default GeneralTab