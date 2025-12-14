import { validators } from "@/components/formStepper/validators";
import { StepConfig, FieldType } from "@/components/formStepper/types";

export const FIELD_LIST: StepConfig[] = [
  {
    id: "personal",
    title: "Información personal",
    description: "Completa tus datos básicos",
    layout: "grid",
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
      {
        name: "lastName",
        label: "Apellido",
        type: FieldType.TEXT,
        placeholder: "Pérez",
        validations: [validators.required, validators.minLength(2)],
      },
      {
        name: "email",
        label: "Email",
        type: FieldType.EMAIL,
        placeholder: "juan@example.com",
        validations: [validators.required, validators.email],
        className: "md:col-span-2",
      },
      {
        name: "phone",
        label: "Teléfono",
        type: FieldType.TEL,
        placeholder: "1234567890",
        validations: [validators.required, validators.minLength(10)],
      },
      {
        name: "age",
        label: "Edad",
        type: FieldType.NUMBER,
        placeholder: "18",
        validations: [
          validators.required,
          validators.min(18, "Debes ser mayor de 18 años"),
          validators.max(100, "Edad inválida"),
        ],
      },
    ],
  },
];
