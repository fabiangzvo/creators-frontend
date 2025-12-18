import { validators } from "@/components/formStepper/validators";
import { StepConfig, FieldType } from "@/components/formStepper/types";
import ConfirmationStep from "./components/confirmationStep";

export const FIELD_LIST: StepConfig[] = [
  {
    id: "personal",
    title: "Información personal",
    description: "Completa tus datos básicos",
    layout: "single",
    fields: [
      {
        name: "firstName",
        label: "Nombre",
        type: FieldType.TEXT,
        placeholder: "Juan",
        validations: [
          validators.required,
          validators.minLength(2, "Mínimo 2 caracteres"),
        ],
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
