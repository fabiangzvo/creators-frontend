import { FormDataType } from "../../types";

export interface StepFooterProps {
  onComplete: (data: FormDataType) => Promise<void>;
}
