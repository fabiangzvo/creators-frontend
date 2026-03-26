"use server";

import { JSX } from "react";

import Form from "./components/form";

import { getPages } from "@/actions/facebook";
import { FormProviderProps } from "@/types/providers";

async function FacebookForm(props: FormProviderProps): Promise<JSX.Element> {
  const { accessToken } = props;

  const data = await getPages(accessToken);

  if (!data || data.length === 0)
    return <div>No tienes páginas disponibles</div>;

  return (
    <div className="px-4">
      <Form
        pages={data.map((page) => ({
          value: page.id,
          title: page.name,
          image: page.picture.data.url,
        }))}
        token={accessToken}
      />
    </div>
  );
}

export default FacebookForm;
