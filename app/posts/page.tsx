import { JSX } from "react";

import Banner from "@/components/banner";
import EmptyPostMessage from "@/components/emptyPostMessage";

function Posts(): JSX.Element {
  return (
    <div className="container flex flex-col pt-2 h-full">
      <Banner
        title="Publicaciones"
        description="Explora las publicaciones que has creado en los diferentes canales creados."
        link='/posts/create'
      />
      <EmptyPostMessage
        label="Todavía no has creado ninguna publicación."
        linkLabel="¡Crea publicación!"
        link="/posts/create"
        containerClassName="my-6"
      />
    </div>);
}

export default Posts;