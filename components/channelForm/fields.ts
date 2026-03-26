import ConfirmationStep from "./components/confirmationStep";

import { validators } from "@/components/formStepper/validators";
import { StepConfig, FieldType } from "@/components/formStepper/types";

export const FIELD_LIST: StepConfig[] = [
  {
    id: "aditional-info",
    title: "Información de adicional",
    description:
      "Completa la información de tu nueva integración antes de empezar a utilizarla ",
    layout: "grid",
    fields: [
      {
        name: "name",
        label: "Nombre",
        description:
          "Escribe un nombre fácil de reconocer para identificar y buscar esta integración.",
        type: FieldType.TEXT,
        placeholder: "nueva integración",
        validations: [
          validators.required,
          validators.minLength(2, "Mínimo 2 caracteres"),
        ],
      },
      {
        name: "image",
        label: "Imagen de la integración",
        type: FieldType.FILE,
        accept: ["image/*"],
        validations: [validators.required],
        className: "flex flex-col w-full h-full min-h-[82]",
      },
    ],
  },
  {
    id: "confirmation",
    stepName: "Confirmación",
    title: "Confirmación de datos",
    description: "Es importante que verifiques tus datos antes de continuar",
    layout: "grid",
    component: ConfirmationStep,
  },
];
