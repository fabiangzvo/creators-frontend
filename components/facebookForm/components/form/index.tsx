"use client"

import { JSX, useCallback, useMemo } from 'react';

import { FIELD_TYPES, FormStepper } from '@/components/formStepper'

import { FormProps } from './types';
import { FIELD_LIST } from '../../fields';
import { validators } from '@/components/formStepper/validators';

function Form(props: FormProps): JSX.Element {
  const { pages } = props;

  const handleSubmit = useCallback(async (data: any) => {
    console.log('Formulario completado:', data);
  }, [])

  const steps = useMemo(() => {
    const steps = [...FIELD_LIST]

    if (pages.length > 0) {
      steps.unshift({
        id: "selectPage",
        title: "Seleccionar página",
        stepName: "Paso 1",
        description: "Selecciona la página que deseas conectar a creators",
        layout: "single",
        fields: [
          {
            name: "page",
            label: "Página",
            type: FIELD_TYPES.LIST,
            options: pages,
            validations: [validators.required]
          },
        ],
      })
    }
    return steps;
  }, [pages])

  return (
    <FormStepper steps={steps} onComplete={handleSubmit} />
  )
}

export default Form