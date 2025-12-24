"use client"

import { JSX, useCallback, useEffect } from 'react';
import { addToast } from '@heroui/toast';
import { useRouter } from 'next/navigation';

import { FormStepper } from '@/components/formStepper'
import { useFormStore } from '@/lib/store/form';
import { createIntegration } from '@/actions/integration';
import { IntegrationBody } from '@/types/integrations';
import { authClient } from "@/lib/auth-client";
import { FormDataType } from '@/types/form';

import { FormProps } from './types';
import { FIELD_LIST } from '../../fields';

interface FormData {
  name: string;
  image: { source: string }[];
  pageInfo: any;
  token: string;
  page: string[];
}

function Form(props: FormProps): JSX.Element {
  const { pages, token } = props;
  const { useSession } = authClient

  const { data: session } = useSession()
  const router = useRouter()
  const initializeStore = useFormStore((state) => state.initializeStore);
  const setFieldValue = useFormStore((state) => state.setFormData);

  const handleSubmit = useCallback(async (form: FormDataType) => {
    const data = form as FormData

    console.log(data);
    const body: IntegrationBody = {
      name: data.name,
      accountId: data.pageInfo.value,
      providerId: "24997ad2-e835-4899-a1a0-8bc74e10f748",
      userId: session?.user?.id!,
      image: data.image[0].source,
      token: data.token,
    }

    const response = await createIntegration(body)

    addToast({
      variant: "flat",
      title: "Creación de canales",
      description: response?.id ? "Se ha creado el canal" : "No se pudo crear el canal",
      color: response?.id ? "success" : "danger",
    });

    if (response?.id)
      router.push("/channels")
  }, [session, router])

  useEffect(() => {
    initializeStore(FIELD_LIST);
    setFieldValue("token", token);
    setFieldValue("name", pages[0].title || "");
    setFieldValue("pageInfo", pages[0]);
    setFieldValue("image", [{ source: pages[0].image }]);

  }, [pages, initializeStore, setFieldValue, token]);

  return (
    <FormStepper steps={FIELD_LIST} onComplete={handleSubmit} />
  )
}

export default Form