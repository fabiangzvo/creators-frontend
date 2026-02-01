import { StepConfig } from "@/components/formStepper/types";
import StepFormat from "./components/steps/StepFormat";
import StepDetails from "./components/steps/StepDetails";
import StepDistribution from "./components/steps/StepDistribution";
import StepSchedule from "./components/steps/StepSchedule";
import StepReview from "./components/steps/StepReview";

export const createPostSteps: StepConfig[] = [
  {
    id: "format",
    stepName: "Medios",
    title: "Crear publicación",
    description: "Crea una nueva publicación para tus canales.",
    component: StepFormat,
  },
  {
    id: "details",
    stepName: "Editar",
    title: "Detalles de la publicación",
    description: "Agrega los detalles de tu publicación",
    component: StepDetails,
  },
  {
    id: "distribution",
    stepName: "Canales",
    component: StepDistribution,
  },
  {
    id: "schedule",
    stepName: "Agenda",
    title: "AGENDA",
    component: StepSchedule,
  },
  {
    id: "review",
    stepName: "Revisión",
    title: "REVISIÓN",
    component: StepReview,
  },
];
