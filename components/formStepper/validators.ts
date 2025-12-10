export type ValidationFunction = (value: any) => string | null;

export interface Validators {
  required: (value: any, message?: string) => string | null;
  minLength: (min: number, message?: string) => ValidationFunction;
  maxLength: (max: number, message?: string) => ValidationFunction;
  email: (value: any, message?: string) => string | null;
  pattern: (regex: RegExp, message?: string) => ValidationFunction;
  min: (min: number, message?: string) => ValidationFunction;
  max: (max: number, message?: string) => ValidationFunction;
  custom: (fn: (value: any) => boolean, message?: string) => ValidationFunction;
}

export const validators: Validators = {
  required: (
    value: any,
    message: string = "Este campo es obligatorio"
  ): string | null => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return message;
    }
    return null;
  },

  minLength:
    (min: number, message?: string): ValidationFunction =>
    (value: any): string | null => {
      if (value && value.length < min) {
        return message || `Mínimo ${min} caracteres`;
      }
      return null;
    },

  maxLength:
    (max: number, message?: string): ValidationFunction =>
    (value: any): string | null => {
      if (value && value.length > max) {
        return message || `Máximo ${max} caracteres`;
      }
      return null;
    },

  email: (value: any, message: string = "Email inválido"): string | null => {
    if (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return message;
    }
    return null;
  },

  pattern:
    (regex: RegExp, message?: string): ValidationFunction =>
    (value: any): string | null => {
      if (value && !regex.test(value)) {
        return message || "Formato inválido";
      }
      return null;
    },

  min:
    (min: number, message?: string): ValidationFunction =>
    (value: any): string | null => {
      if (value && Number(value) < min) {
        return message || `Valor mínimo: ${min}`;
      }
      return null;
    },

  max:
    (max: number, message?: string): ValidationFunction =>
    (value: any): string | null => {
      if (value && Number(value) > max) {
        return message || `Valor máximo: ${max}`;
      }
      return null;
    },

  custom:
    (fn: (value: any) => boolean, message?: string): ValidationFunction =>
    (value: any): string | null => {
      if (!fn(value)) {
        return message || "Valor inválido";
      }
      return null;
    },
};
