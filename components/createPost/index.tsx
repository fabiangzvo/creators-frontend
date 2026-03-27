import StepFormat from "./components/stepFormat";
import StepDetails from "./components/stepDetails";
import StepDistribution from "./components/stepDistribution";
import StepSchedule from "./components/stepSchedule";
import StepReview from "./components/stepReview";

import { StepConfig } from "@/components/formStepper/types";

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
    title: "Canales de Distribución",
    description: "Selecciona los canales donde quieres publicar",
    component: StepSchedule,
  },
  {
    id: "review",
    title: "Revisa los detalles",
    description: "Verifica los detalles antes de publicar.",
    component: StepReview,
  },
];
