export interface FormData {
  // Campos obligatorios (required fields)
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo: string;
  experiencia: number;
  
  // Campos Sí/No (Yes/No fields)
  tieneExperienciaPrevia: boolean;
  disponibleInmediato: boolean;
  aceptaTerminos: boolean;
  recibirNotificaciones: boolean;
  trabajoRemoto: boolean;
}

export interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  cargo?: string;
  experiencia?: string;
  aceptaTerminos?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export type FormFieldType = 'text' | 'email' | 'phone' | 'number' | 'toggle';

export interface FormFieldConfig {
  name: keyof FormData;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
}