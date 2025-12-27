import { Providers } from "@/types/providers";

import { FormDataType, StepConfig } from "../../types";

export interface StepContentProps {
  stepConfig: StepConfig;
  onComplete: (data: FormDataType) => Promise<void>;
  provider: Providers;
}
