import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import {
  FormDataType,
  FormErrors,
  StepConfig,
  FormStore,
  AnimationStep,
  animationType,
} from "@/types/form";
import { FieldType, FieldConfig } from "@/components/formStepper/types";

const createInitialFormData = (steps: StepConfig[]): FormDataType => {
  const initialFormData: FormDataType = {};
  steps.forEach((step) => {
    if (step.fields) {
      step.fields.forEach((field) => {
        initialFormData[field.name] =
          field.defaultValue ||
          (field.type === FieldType.CHECKBOX ? false : "");
      });
    }
  });
  return initialFormData;
};

export const useFormStore = create<FormStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        formData: {},
        errors: {},
        touched: {},
        currentStep: 0,
        isSubmitting: false,
        steps: [],
        animation: AnimationStep.INITIAL,

        // Initialize store with steps configuration
        initializeStore: (steps: StepConfig[]) => {
          const initialFormData = createInitialFormData(steps);

          set({
            steps,
            formData: initialFormData,
            errors: {},
            touched: {},
            currentStep: 0,
            isSubmitting: false,
            animation: AnimationStep.INITIAL,
          });
        },

        // Basic setters
        setFormData: (fieldName: string, value: any) => {
          set((state) => ({
            formData: { ...state.formData, [fieldName]: value },
          }));
        },

        setError: (fieldName: string, error: string | null) => {
          set((state) => ({
            errors: { ...state.errors, [fieldName]: error },
          }));
        },

        setTouched: (fieldName: string, touched: boolean) => {
          set((state) => ({
            touched: { ...state.touched, [fieldName]: touched },
          }));
        },

        setCurrentStep: (step: number) => set({ currentStep: step }),

        setIsSubmitting: (value: boolean) => set({ isSubmitting: value }),

        setAnimation: (value: animationType) => set({ animation: value }),

        // Validation logic
        validateField: (field: FieldConfig, value: any): string | null => {
          if (!field.validations) return null;
          console.log({ field, value });
          for (const validation of field.validations) {
            const error = validation(value);
            if (error) return error;
          }
          return null;
        },

        validateCurrentStep: (): boolean => {
          const state = get();
          const currentFields = state.steps[state.currentStep]?.fields || [];
          const newErrors: FormErrors = {};
          let isValid = true;
          console.log({ currentFields });
          currentFields.forEach((field) => {
            // Skip disabled fields or fields that don't meet conditions
            if (
              field.disabled ||
              (field.condition && !field.condition(state.formData))
            ) {
              return;
            }

            const error = state.validateField(
              field,
              state.formData[field.name]
            );
            if (error) {
              newErrors[field.name] = error;
              isValid = false;
            }
          });

          // Update errors and mark all fields as touched
          set((state) => ({
            errors: { ...state.errors, ...newErrors },
            touched: {
              ...state.touched,
              ...Object.fromEntries(currentFields.map((f) => [f.name, true])),
            },
          }));

          return isValid;
        },

        // Event handlers
        handleChange: (fieldName: string, value: any) => {
          const state = get();
          state.setFormData(fieldName, value);
          // Validate on change only if field was already touched
          if (state.touched[fieldName]) {
            const field = state.steps
              .flatMap((s) => s.fields)
              .find((f) => f?.name === fieldName);

            if (field) {
              const error = state.validateField(field, value);
              state.setError(fieldName, error);
            }
          }
        },

        handleBlur: (fieldName: string) => {
          const state = get();
          state.setTouched(fieldName, true);

          const field = state.steps
            .flatMap((s) => s.fields)
            .find((f) => f?.name === fieldName);

          if (field) {
            const error = state.validateField(field, state.formData[fieldName]);
            state.setError(fieldName, error);
          }
        },

        // Navigation
        nextStep: async (onComplete: (data: FormDataType) => Promise<void>) => {
          const state = get();
          const isValid = state.validateCurrentStep();
          const isLastStep = state.currentStep === state.steps.length - 1;

          if (isValid && !isLastStep) {
            state.setCurrentStep(state.currentStep + 1);
            state.setAnimation(AnimationStep.LEFT);
          } else if (isValid && isLastStep) {
            state.setIsSubmitting(true);
            try {
              await onComplete(state.formData);
            } catch (error) {
              console.error("Error submitting form:", error);
            } finally {
              state.setIsSubmitting(false);
            }
          }
        },

        prevStep: () => {
          const state = get();
          if (state.currentStep > 0) {
            state.setCurrentStep(state.currentStep - 1);
            state.setAnimation(AnimationStep.RIGHT);
          }
        },

        goToStep: (step: number) => {
          const state = get();
          if (step >= 0 && step < state.steps.length) {
            state.setCurrentStep(step);
            state.setAnimation(
              step > state.currentStep
                ? AnimationStep.LEFT
                : AnimationStep.RIGHT
            );
          }
        },

        // Reset form to initial state
        resetForm: () => {
          const state = get();
          const initialFormData = createInitialFormData(state.steps);

          set({
            formData: initialFormData,
            errors: {},
            touched: {},
            currentStep: 0,
            isSubmitting: false,
          });
        },
      }),
      {
        storage: createJSONStorage(() => localStorage),
        name: "form",
        skipHydration: true,
      }
    )
  )
);

export const useFormData = () => useFormStore((state) => state.formData);
export const useFormErrors = () => useFormStore((state) => state.errors);
export const useFormTouched = () => useFormStore((state) => state.touched);
export const useCurrentStep = () => useFormStore((state) => state.currentStep);
export const useIsSubmitting = () =>
  useFormStore((state) => state.isSubmitting);
export const useSteps = () => useFormStore((state) => state.steps);

export const useFieldValue = (fieldName: string) =>
  useFormStore((state) => state.formData[fieldName]);

export const useFieldError = (fieldName: string) =>
  useFormStore((state) => state.errors[fieldName]);

export const useFieldTouched = (fieldName: string) =>
  useFormStore((state) => state.touched[fieldName]);

export const useField = (fieldName: string) =>
  useFormStore((state) => ({
    value: state.formData[fieldName],
    error: state.errors[fieldName],
    touched: state.touched[fieldName],
  }));
