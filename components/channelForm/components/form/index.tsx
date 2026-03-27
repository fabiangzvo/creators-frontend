"use client";

import { JSX, useCallback, useEffect } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import { FIELD_LIST } from "../../fields";

import { FormProps } from "./types";

import { FormStepper } from "@/components/formStepper";
import { useFormStore } from "@/lib/store/form";
import { createIntegration } from "@/actions/integration";
import { IntegrationBody } from "@/types/integrations";
import { authClient } from "@/lib/auth-client";
import { FormDataType } from "@/types/form";
import { getProviderByName } from "@/lib/db/queries/provider";

interface FormData {
  name: string;
  image: { source: string }[];
  pageInfo: any;
  token: string;
  page: string[];
}

function Form(props: FormProps): JSX.Element {
  const { pages, token, provider } = props;
  const { useSession } = authClient;

  const { data: session } = useSession();
  const router = useRouter();
  const initializeStore = useFormStore((state) => state.initializeStore);
  const setFieldValue = useFormStore((state) => state.setFormData);

  const handleSubmit = useCallback(
    async (form: FormDataType) => {
      const data = form as FormData;

      const providerData = await getProviderByName(provider);

      if (!providerData) {
        addToast({
          variant: "flat",
          title: "Proveedor desconocido",
          description:
            "Ops! al parecer no soportamos el proveedor seleccionado.",
          color: "warning",
        });

        return;
      }

      const body: IntegrationBody = {
        name: data.name,
        accountId: data.pageInfo.value,
        providerId: providerData.id,
        userId: session?.user?.id!,
        image: data.image[0].source,
        token: data.token,
      };

      const response = await createIntegration(body);

      addToast({
        variant: "flat",
        title: "Creación de canales",
        description: response?.id
          ? "Se ha creado el canal"
          : "No se pudo crear el canal",
        color: response?.id ? "success" : "danger",
      });

      if (response?.id) router.push("/channels");
    },
    [session, router],
  );

  useEffect(() => {
    initializeStore(FIELD_LIST);

    setFieldValue("token", token);
    const [page] = pages;

    if (page) {
      setFieldValue("name", page.title || "");
      setFieldValue("pageInfo", page);
      setFieldValue("image", [{ source: page.image }]);
    }
  }, [pages, initializeStore, setFieldValue, token]);

  return (
    <FormStepper
      provider={provider}
      steps={FIELD_LIST}
      onComplete={handleSubmit}
    />
  );
}

export default Form;
