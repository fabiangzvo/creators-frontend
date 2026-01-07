import { JSX } from 'react'
import { Card, CardBody, CardHeader } from "@heroui/card";

function PostTab(): JSX.Element {
  return (
    <Card className="h-full p-4" shadow='sm'>
      <CardHeader className="flex flex-col gap-1 items-start mb-4">
        <h2 className="font-bold text-foreground text-xl line-clamp-1">
          Publicaciones
        </h2>
        <p className='text-foreground/50'>Gestiona todas las publicaciones realizadas desde Creators.</p>
      </CardHeader>
      <CardBody>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </CardBody>
    </Card>
  )
}

export default PostTab