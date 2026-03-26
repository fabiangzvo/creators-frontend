import { JSX } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";

import EmptyMessage from "@/components/channelList/components/emptyMessage";

function PostTab(): JSX.Element {
  return (
    <Card className="h-full p-4" shadow="sm">
      <CardHeader className="flex flex-col gap-1 items-start mb-4">
        <h2 className="font-bold text-foreground text-xl line-clamp-1">
          Publicaciones
        </h2>
        <p className="text-foreground/50">
          Gestiona todas las publicaciones realizadas desde Creators.
        </p>
      </CardHeader>
      <CardBody>
        <EmptyMessage
          containerClassName="my-6"
          label="Todavía no has creado ninguna publicación."
          link="/posts/create"
          linkLabel="¡Crea la primera!"
        />
      </CardBody>
    </Card>
  );
}

export default PostTab;
