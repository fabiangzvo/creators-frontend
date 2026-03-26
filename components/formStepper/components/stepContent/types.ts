import { FormDataType, StepConfig } from "../../types";

import { Providers } from "@/types/providers";

export interface StepContentProps {
  stepConfig: StepConfig;
  onComplete: (data: FormDataType) => Promise<void>;
  provider: Providers;
}
