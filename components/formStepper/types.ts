import { ComponentType } from "react";
import { SelectionMode } from "@react-types/shared";

import { Providers } from "@/types/providers";

import { ValidationFunction } from "./validators";

export interface FormStepperProps {
  steps: StepConfig[];
  onComplete: (data: FormDataType) => Promise<void>;
  provider: Providers;
}

// ==================== FIELD TYPES ====================
export enum FieldType {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  TEL = "tel",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DATE = "date",
  FILE = "file",
  LIST = "list",
}

// ==================== FIELD CONFIG TYPES ====================
export interface SelectOption {
  value: string;
  label: string;
}

export interface ListOption {
  value: string;
  title: string;
  image: string;
  description?: string;
}

export type FormDataType = Record<string, any>;

export interface BaseFieldConfig {
  name: string;
  label?: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  defaultValue?: any;
  disabled?: boolean;
  className?: string;
  validations?: ValidationFunction[];
  condition?: (formData: FormDataType) => boolean;
  handleChange?: (value: any, formData: FormDataType) => void;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: FieldType.TEXTAREA;
  rows?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: FieldType.SELECT;
  options?: SelectOption[];
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: FieldType.RADIO;
  options?: SelectOption[];
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: FieldType.CHECKBOX;
  checkboxLabel?: string;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: FieldType.FILE;
  accept?: string[];
  isMultiple?: boolean;
}

export interface ListFieldConfig extends BaseFieldConfig {
  type: FieldType.LIST;
  options: Array<ListOption>;
  selection: SelectionMode;
}

export type FieldConfig =
  | BaseFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | RadioFieldConfig
  | CheckboxFieldConfig
  | FileFieldConfig
  | ListFieldConfig;

// ==================== FORM DATA TYPES ====================
export type FormErrors = Record<string, string | null>;
export type FormTouched = Record<string, boolean>;

// ==================== STEP CONFIG TYPES ====================
export enum LayoutEnum {
  GRID = "grid",
  SINGLE = "single",
}

export type LayoutType = `${LayoutEnum}`;

export interface StepComponentProps {
  provider: Providers;
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
