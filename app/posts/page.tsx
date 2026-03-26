import { JSX } from "react";

import Banner from "@/components/banner";
import EmptyPostMessage from "@/components/emptyPostMessage";

function Posts(): JSX.Element {
  return (
    <div className="container flex flex-col pt-2 h-full">
      <Banner
        description="Explora las publicaciones que has creado en los diferentes canales creados."
        link="/posts/create"
        title="Publicaciones"
      />
      <EmptyPostMessage
        containerClassName="my-6"
        label="Todavía no has creado ninguna publicación."
        link="/posts/create"
        linkLabel="¡Crea publicación!"
      />
    </div>
  );
}

export default Posts;
