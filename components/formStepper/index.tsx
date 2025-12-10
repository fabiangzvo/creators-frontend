"use client"

import React, { useState, createContext, useContext, useEffect, ReactNode, ChangeEvent, JSX, ComponentType } from 'react';
import { ValidationFunction } from './validators';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { Image } from "@heroui/image";

// ==================== ZUSTAND TYPES ====================
export type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
export type GetState<T> = () => T;
export type Subscribe = (listener: () => void) => () => void;

export interface Store<T> {
  getState: GetState<T>;
  setState: SetState<T>;
  subscribe: Subscribe;
}

// ==================== FIELD TYPES ====================
export enum FIELD_TYPES {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  FILE = 'file',
  LIST = 'list',
}

// ==================== VALIDATOR TYPES ====================

// ==================== FIELD CONFIG TYPES ====================
export interface SelectOption {
  value: string;
  label: string;
}

export interface ListOption {
  value: string;
  title: string;
  image: string
  description?: string
}

export type FormDataType = Record<string, any>;

export interface BaseFieldConfig {
  name: string;
  label?: string;
  type: FIELD_TYPES;
  placeholder?: string;
  description?: string;
  hint?: string;
  defaultValue?: any;
  disabled?: boolean;
  className?: string;
  validations?: ValidationFunction[];
  condition?: (formData: FormDataType) => boolean;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPES.TEXTAREA;
  rows?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPES.SELECT;
  options?: SelectOption[];
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPES.RADIO;
  options?: SelectOption[];
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPES.CHECKBOX;
  checkboxLabel?: string;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPES.FILE;
  accept?: string;
}

export interface ListFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPES.LIST;
  options: Array<ListOption>;
}

export type FieldConfig = BaseFieldConfig | TextareaFieldConfig | SelectFieldConfig | RadioFieldConfig | CheckboxFieldConfig | FileFieldConfig | ListFieldConfig;

// ==================== STEP CONFIG TYPES ====================
export type LayoutType = 'grid' | 'single';

interface StepComponentProps {
  formData: FormDataType;
  errors: FormErrors;
  handleChange: (fieldName: string, value: any) => void;
  handleBlur: (fieldName: string) => void;
}

export interface StepConfig {
  id: string;
  title: string;
  stepName?: string;
  description?: string;
  layout?: LayoutType;
  fields?: FieldConfig[];
  component?: ComponentType<StepComponentProps>;
}

// ==================== FORM DATA TYPES ====================
export type FormErrors = Record<string, string | null>;
export type FormTouched = Record<string, boolean>;

// ==================== STORE STATE TYPES ====================
export interface FormStoreState {
  formData: FormDataType;
  errors: FormErrors;
  touched: FormTouched;
  currentStep: number;
  isSubmitting: boolean;
  steps: StepConfig[];
}

export interface FormStoreActions {
  setFormData: (fieldName: string, value: any) => void;
  setError: (fieldName: string, error: string | null) => void;
  setTouched: (fieldName: string, touched: boolean) => void;
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (value: boolean) => void;
  validateField: (field: FieldConfig, value: any) => string | null;
  validateCurrentStep: () => boolean;
  handleChange: (fieldName: string, value: any) => void;
  handleBlur: (fieldName: string) => void;
  nextStep: (onComplete: (data: FormDataType) => Promise<void>) => Promise<void>;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
}

export type FormStore = FormStoreState & FormStoreActions;

// ==================== COMPONENT PROPS TYPES ====================
export interface DynamicFieldProps {
  field: FieldConfig;
}

export interface StepIndicatorProps {
  steps: StepConfig[];
}

export interface StepContentProps {
  stepConfig: StepConfig;
  onComplete: (data: FormDataType) => Promise<void>;
}

export interface FormStepperProps {
  steps: StepConfig[];
  onComplete: (data: FormDataType) => Promise<void>;
}

export interface StepperProviderProps {
  children: ReactNode;
  store: Store<FormStore>;
}

// ==================== ZUSTAND IMPLEMENTATION ====================
function createStore<T>(createState: (set: SetState<T>, get: GetState<T>) => T): Store<T> {
  let state: T;
  const listeners = new Set<() => void>();

  const setState: SetState<T> = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (nextState !== state) {
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener());
    }
  };

  const getState: GetState<T> = () => state;

  const subscribe: Subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = createState(setState, getState);

  return { getState, setState, subscribe };
}

function useStore<T, U>(store: Store<T>, selector: (state: T) => U = (state) => state as unknown as U): U {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return store.subscribe(() => forceUpdate((n) => n + 1));
  }, [store]);

  return selector(store.getState());
}

const createFormStore = (steps: StepConfig[]): Store<FormStore> => {
  const initialFormData: FormDataType = {};
  steps.forEach(step => {
    if (step.fields) {
      step.fields.forEach(field => {
        initialFormData[field.name] = field.defaultValue || (field.type === FIELD_TYPES.CHECKBOX ? false : '');
      });
    }
  });

  return createStore<FormStore>((set, get) => ({
    formData: initialFormData,
    errors: {},
    touched: {},
    currentStep: 0,
    isSubmitting: false,
    steps,

    setFormData: (fieldName: string, value: any): void => {
      set((state) => ({
        formData: { ...state.formData, [fieldName]: value }
      }));
    },

    setError: (fieldName: string, error: string | null): void => {
      set((state) => ({
        errors: { ...state.errors, [fieldName]: error }
      }));
    },

    setTouched: (fieldName: string, touched: boolean): void => {
      set((state) => ({
        touched: { ...state.touched, [fieldName]: touched }
      }));
    },

    setCurrentStep: (step: number): void => set({ currentStep: step }),

    setIsSubmitting: (value: boolean): void => set({ isSubmitting: value }),

    validateField: (field: FieldConfig, value: any): string | null => {
      if (!field.validations) return null;

      for (const validation of field.validations) {
        const error = validation(value);
        if (error) return error;
      }
      return null;
    },

    validateCurrentStep: (): boolean => {
      const state = get();
      const currentFields = state.steps[state.currentStep].fields || [];
      const newErrors: FormErrors = {};
      let isValid = true;

      currentFields.forEach((field) => {
        if (field.disabled || (field.condition && !field.condition(state.formData))) {
          return;
        }

        const error = state.validateField(field, state.formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      });

      set((state) => ({
        errors: { ...state.errors, ...newErrors },
        touched: {
          ...state.touched,
          ...Object.fromEntries(currentFields.map(f => [f.name, true]))
        }
      }));

      return isValid;
    },

    handleChange: (fieldName: string, value: any): void => {
      const state = get();
      state.setFormData(fieldName, value);

      if (state.touched[fieldName]) {
        const field = state.steps.flatMap(s => s.fields).find(f => f?.name === fieldName);
        if (field) {
          const error = state.validateField(field, value);
          state.setError(fieldName, error);
        }
      }
    },

    handleBlur: (fieldName: string): void => {
      const state = get();
      state.setTouched(fieldName, true);
      const field = state.steps.flatMap(s => s.fields).find((f) => f?.name === fieldName);
      if (field) {
        const error = state.validateField(field, state.formData[fieldName]);
        state.setError(fieldName, error);
      }
    },

    nextStep: async (onComplete: (data: FormDataType) => Promise<void>): Promise<void> => {
      const state = get();
      const isValid = state.validateCurrentStep();
      const isLastStep = state.currentStep === state.steps.length - 1;

      if (isValid && !isLastStep) {
        state.setCurrentStep(state.currentStep + 1);
      } else if (isValid && isLastStep) {
        state.setIsSubmitting(true);
        try {
          await onComplete(state.formData);
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          state.setIsSubmitting(false);
        }
      }
    },

    prevStep: (): void => {
      const state = get();
      if (state.currentStep > 0) {
        state.setCurrentStep(state.currentStep - 1);
      }
    },

    goToStep: (step: number): void => {
      const state = get();
      if (step >= 0 && step < state.steps.length) {
        state.setCurrentStep(step);
      }
    },

    resetForm: (): void => {
      const state = get();
      const initialFormData: FormDataType = {};
      state.steps.forEach(step => {
        if (step.fields) {
          step.fields.forEach(field => {
            initialFormData[field.name] = field.defaultValue || (field.type === FIELD_TYPES.CHECKBOX ? false : '');
          });
        }
      });
      set({
        formData: initialFormData,
        errors: {},
        touched: {},
        currentStep: 0,
        isSubmitting: false,
      });
    },
  }));
};
// ==================== CONTEXT ====================
const StepperContext = createContext<Store<FormStore> | null>(null);

const StepperProvider: React.FC<StepperProviderProps> = ({ children, store }) => {
  return (
    <StepperContext.Provider value={store}>
      {children}
    </StepperContext.Provider>
  );
};

const useStepperStore = <T,>(selector: (state: FormStore) => T): T => {
  const store = useContext(StepperContext);
  if (!store) throw new Error('useStepperStore must be used within StepperProvider');
  return useStore(store, selector);
};

// ==================== FIELD COMPONENTS ====================
const DynamicField: React.FC<DynamicFieldProps> = ({ field }) => {
  const formData = useStepperStore((state) => state.formData);
  const errors = useStepperStore((state) => state.errors);
  const handleChange = useStepperStore((state) => state.handleChange);
  const handleBlur = useStepperStore((state) => state.handleBlur);

  const value = formData[field.name];
  const error = errors[field.name];

  if (field.condition && !field.condition(formData)) {
    return null;
  }

  const commonProps = {
    name: field.name,
    value: field.type === FIELD_TYPES.CHECKBOX ? undefined : value,
    checked: field.type === FIELD_TYPES.CHECKBOX ? value : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue = field.type === FIELD_TYPES.CHECKBOX
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      handleChange(field.name, newValue);
    },
    onBlur: () => handleBlur(field.name),
    disabled: field.disabled,
    placeholder: field.placeholder,
    className: `px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'
      }`,
  };

  const renderField = (): JSX.Element => {
    switch (field.type) {
      case FIELD_TYPES.TEXTAREA:
        return <textarea {...commonProps} rows={(field as TextareaFieldConfig).rows || 4} />;

      case FIELD_TYPES.SELECT:
        return (
          <select {...commonProps} className={`${commonProps.className} bg-white`}>
            {field.placeholder && <option value="">{field.placeholder}</option>}
            {(field as SelectFieldConfig).options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case FIELD_TYPES.RADIO:
        return (
          <div className="space-y-2">
            {(field as RadioFieldConfig).options?.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  disabled={field.disabled}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case FIELD_TYPES.CHECKBOX:
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...commonProps}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              {(field as CheckboxFieldConfig).checkboxLabel || field.label}
            </span>
          </label>
        );

      case FIELD_TYPES.FILE:
        return (
          <input
            type="file"
            name={field.name}
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleChange(field.name, file);
            }}
            onBlur={() => handleBlur(field.name)}
            disabled={field.disabled}
            accept={(field as FileFieldConfig).accept}
            className="text-sm text-gray-700"
          />
        );

      case FIELD_TYPES.LIST:
        const listField = field as ListFieldConfig

        return (
          <Listbox
            aria-label="facebook pages list"
            selectedKeys={commonProps.value}
            selectionMode="single"
            variant="faded"
            onSelectionChange={(e) => {
              handleChange(field.name, e)
            }}
            items={listField.options}
          >
            {(item) => (
              <ListboxItem
                key={item.value}
                showDivider
                classNames={{ selectedIcon: "[&_polyline]:stroke-primary-500 w-5 h-5" }}
                startContent={
                  item?.image && <Image
                    alt={item.title}
                    height={50}
                    width={50}
                    radius="sm"
                    src={item.image}

                  />
                }
                textValue={item.title}
              >
                <p className="text-base">{item.title}</p>
              </ListboxItem>
            )}
          </Listbox >);

      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${field.className || ''}`}>
      {field.type !== FIELD_TYPES.CHECKBOX && field.label && (
        <label className="text-sm font-medium text-gray-700">
          {field.label}
          {field.validations?.some(v => v.toString().includes('required')) && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}
      {field.description && (
        <p className="text-xs text-gray-500 -mt-1">{field.description}</p>
      )}
      {renderField()}
      {error && <span className="text-xs text-red-500">{error}</span>}
      {field.hint && !error && (
        <span className="text-xs text-gray-500">{field.hint}</span>
      )}
    </div>
  );
};

// ==================== STEPPER COMPONENTS ====================
const StepIndicator: React.FC<StepIndicatorProps> = ({ steps }) => {
  const currentStep = useStepperStore((state) => state.currentStep);
  const goToStep = useStepperStore((state) => state.goToStep);

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = index < currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <button
                type="button"
                onClick={() => isClickable && goToStep(index)}
                disabled={!isClickable}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  font-semibold transition-all duration-200 text-sm
                  ${isCompleted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md'
                    : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200 shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isCompleted ? '✓' : index + 1}
              </button>

              <div className="mt-2 text-center max-w-[100px]">
                <p className={`text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-600'}`}>
                  {step.stepName || `Paso ${index + 1}`}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className={`
                h-0.5 flex-1 mx-2 mb-10 transition-colors duration-200
                ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
              `} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const StepContent: React.FC<StepContentProps> = ({ stepConfig, onComplete }) => {
  const currentStep = useStepperStore((state) => state.currentStep);
  const steps = useStepperStore((state) => state.steps);
  const isSubmitting = useStepperStore((state) => state.isSubmitting);
  const nextStep = useStepperStore((state) => state.nextStep);
  const prevStep = useStepperStore((state) => state.prevStep);
  const formData = useStepperStore((state) => state.formData);
  const errors = useStepperStore((state) => state.errors);
  const handleChange = useStepperStore((state) => state.handleChange);
  const handleBlur = useStepperStore((state) => state.handleBlur);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const CustomComponent = stepConfig.component;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{stepConfig.title}</h2>
          {stepConfig.description && (
            <p className="text-sm text-gray-600 mt-1">{stepConfig.description}</p>
          )}
        </div>

        {CustomComponent ? (
          <CustomComponent
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        ) : (
          <div className={stepConfig.layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {stepConfig.fields?.map((field) => (
              <DynamicField key={field.name} field={field} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between p-6">
        <button
          type="button"
          onClick={prevStep}
          disabled={isFirstStep || isSubmitting}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${isFirstStep || isSubmitting
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
        >
          ← Anterior
        </button>

        <button
          type="button"
          onClick={() => nextStep(onComplete)}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              {isLastStep ? '✓ Finalizar' : 'Siguiente →'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const FormStepper: React.FC<FormStepperProps> = ({ steps, onComplete }) => {
  const [store] = useState(() => createFormStore(steps));
  const currentStep = useStore(store, (state) => state.currentStep);
  const currentStepConfig = steps[currentStep];

  return (
    <StepperProvider store={store}>
      <div className="w-full">
        <StepIndicator steps={steps} />
        <StepContent stepConfig={currentStepConfig} onComplete={onComplete} />
      </div>
    </StepperProvider>
  );
};


