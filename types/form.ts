import { FieldConfig } from "@/components/formStepper/types";

export interface FormDataType {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string | null;
}

export interface FormTouched {
  [key: string]: boolean;
}
export interface StepConfig {
  title: string;
  description?: string;
  fields?: FieldConfig[];
}

interface FormStoreState {
  formData: FormDataType;
  errors: FormErrors;
  touched: FormTouched;
  currentStep: number;
  isSubmitting: boolean;
  steps: StepConfig[];
}

interface FormStoreActions {
  setFormData: (fieldName: string, value: any) => void;
  setError: (fieldName: string, error: string | null) => void;
  setTouched: (fieldName: string, touched: boolean) => void;
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (value: boolean) => void;
  validateField: (field: FieldConfig, value: any) => string | null;
  validateCurrentStep: () => boolean;
  handleChange: (fieldName: string, value: any) => void;
  handleBlur: (fieldName: string) => void;
  nextStep: (
    onComplete: (data: FormDataType) => Promise<void>
  ) => Promise<void>;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  initializeStore: (steps: StepConfig[]) => void;
}

export type FormStore = FormStoreState & FormStoreActions;
