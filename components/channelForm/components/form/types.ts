import { ListOption } from "@/components/formStepper/types";
import { Providers } from "@/types/providers";

export interface FormProps {
  pages: ListOption[];
  token: string;
  provider: Providers;
}
