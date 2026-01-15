import { StepConfig } from "@/components/formStepper/types";
import StepFormat from "./components/steps/StepFormat";
import StepDetails from "./components/steps/StepDetails";
import StepDistribution from "./components/steps/StepDistribution";
import StepSchedule from "./components/steps/StepSchedule";
import StepReview from "./components/steps/StepReview";

export const createPostSteps: StepConfig[] = [
  {
    id: "format",
    title: "Crear publicación",
    description: "Crea una nueva publicación para tus canales.",
    component: StepFormat,
  },
  {
    id: "details",
    title: "Detalles de la publicación",
    description: "Agrega los detalles de tu publicación",
    component: StepDetails,
  },
  {
    id: "distribution",
    title: "Canales de Distribución",
    description: "Selecciona los canales donde quieres publicar",
    component: StepDistribution,
  },
  {
    id: "schedule",
    title: "AGENDA",
    component: StepSchedule,
  },
  {
    id: "review",
    title: "REVISIÓN",
    component: StepReview,
  },
];
