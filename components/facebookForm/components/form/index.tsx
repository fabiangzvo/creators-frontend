"use client"

import { JSX, useCallback, useMemo } from 'react';

import { FormStepper } from '@/components/formStepper'
import { validators } from '@/components/formStepper/validators';
import { FieldType, FormDataType } from '@/components/formStepper/types';
import { useFormStore } from '@/lib/store/form';

import { FormProps } from './types';
import { FIELD_LIST } from '../../fields';
import axios from 'axios';

function Form(props: FormProps): JSX.Element {
  const { pages } = props;

  const initializeStore = useFormStore((state) => state.initializeStore);
  const setFieldValue = useFormStore((state) => state.setFormData);

  const handleSubmit = useCallback(async (data: any) => {
    console.log('Formulario completado:', data);
  }, [])

  const steps = useMemo(() => {
    const steps = [...FIELD_LIST]

    if (pages.length > 0) {
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
            validations: [validators.custom((value: any) => value.length > 0, "Debes seleccionar al menos una página.")],
            handleChange: async (value: string[]) => {
              const selectedPage = value.map((id) => pages.find(page => page.value === id));

              if (selectedPage[0]) {
                console.log(selectedPage[0].image)
                setFieldValue("name", selectedPage[0].title || "");

                setFieldValue("image", [{ source: selectedPage[0].image }]);
              }
            }
          },
        ],
      })
    }

    initializeStore(steps);

    return steps;
  }, [pages, initializeStore, setFieldValue]);

  return (
    <FormStepper steps={steps} onComplete={handleSubmit} />
  )
}

export default Form