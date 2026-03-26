"use client";

import { JSX, useCallback, useMemo } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import { FIELD_LIST } from "../../fields";

import { FormProps } from "./types";

import { FormStepper } from "@/components/formStepper";
import { validators } from "@/components/formStepper/validators";
import { FieldType, FormDataType } from "@/components/formStepper/types";
import { useFormStore } from "@/lib/store/form";
import { createIntegration } from "@/actions/integration";
import { IntegrationBody } from "@/types/integrations";
import { authClient } from "@/lib/auth-client";

interface FormData {
  name: string;
  image: { source: string }[];
  pageInfo: any;
  token: string;
  page: string[];
}

function Form(props: FormProps): JSX.Element {
  const { pages, token } = props;
  const { useSession } = authClient;

  const { data: session } = useSession();
  const router = useRouter();
  const initializeStore = useFormStore((state) => state.initializeStore);
  const setFieldValue = useFormStore((state) => state.setFormData);

  const handleSubmit = useCallback(
    async (form: FormDataType) => {
      const data = form as FormData;

      console.log(data);
      const body: IntegrationBody = {
        name: data.name,
        accountId: data.page[0],
        providerId: "bd7fe581-fe84-4b7d-948a-c700b05af639",
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

  const steps = useMemo(() => {
    const steps = [...FIELD_LIST];

    if (pages?.length > 1) {
      steps.unshift({
        id: "selectPage",
        title: "Seleccionar página",
        description: "Selecciona la página que deseas conectar a creators",
        layout: "single",
        fields: [
          {
            name: "page",
            label: "Seleccionar página",
            type: FieldType.LIST,
            options: pages,
            selection: "single",
            validations: [
              validators.custom(
                (value: any) => value.length > 0,
                "Debes seleccionar al menos una página.",
              ),
            ],
            handleChange: async (value: string[]) => {
              const selectedPage = value.map((id) =>
                pages.find((page) => page.value === id),
              );

              if (selectedPage[0]) {
                setFieldValue("name", selectedPage[0].title || "");
                setFieldValue("image", [{ source: selectedPage[0].image }]);
                setFieldValue("pageInfo", selectedPage[0]);
              }
            },
          },
        ],
      });
    }

    initializeStore(steps);
    setFieldValue("token", token);

    return steps;
  }, [pages, initializeStore, setFieldValue, token]);

  return (
    <FormStepper provider="facebook" steps={steps} onComplete={handleSubmit} />
  );
}

export default Form;
