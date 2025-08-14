import { FormData, FormErrors } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate required text fields
  if (!data.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio';
  } else if (data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Formato de email inválido';
  }

  if (!data.telefono.trim()) {
    errors.telefono = 'El teléfono es obligatorio';
  } else if (!PHONE_REGEX.test(data.telefono.replace(/\s/g, ''))) {
    errors.telefono = 'Formato de teléfono inválido';
  }

  if (!data.empresa.trim()) {
    errors.empresa = 'La empresa es obligatoria';
  } else if (data.empresa.trim().length < 2) {
    errors.empresa = 'La empresa debe tener al menos 2 caracteres';
  }

  if (!data.cargo.trim()) {
    errors.cargo = 'El cargo es obligatorio';
  } else if (data.cargo.trim().length < 2) {
    errors.cargo = 'El cargo debe tener al menos 2 caracteres';
  }

  // Validate experience (number field)
  if (data.experiencia < 0) {
    errors.experiencia = 'La experiencia no puede ser negativa';
  } else if (data.experiencia > 50) {
    errors.experiencia = 'La experiencia no puede ser mayor a 50 años';
  }

  // Validate required toggle fields
  if (!data.aceptaTerminos) {
    errors.aceptaTerminos = 'Debe aceptar los términos y condiciones';
  }

  return errors;
};

export const isFormValid = (data: FormData): boolean => {
  const errors = validateForm(data);
  return Object.keys(errors).length === 0;
};

export const validateField = (name: keyof FormData, value: any): string | undefined => {
  const tempData = {
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    experiencia: 0,
    tieneExperienciaPrevia: false,
    disponibleInmediato: false,
    aceptaTerminos: false,
    recibirNotificaciones: false,
    trabajoRemoto: false,
  };
  
  tempData[name] = value;
  const errors = validateForm(tempData);
  return errors[name as keyof FormErrors];
};