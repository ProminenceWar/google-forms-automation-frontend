import { FormData, FormErrors } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Email
  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Formato de correo inválido';
  }

  if (!data.numeroOrden.trim()) {
    errors.numeroOrden = 'El número de orden es obligatorio';
  }
  if (!data.tipoFSO.trim()) {
    errors.tipoFSO = 'El tipo de FSO es obligatorio';
  }
  if (!data.companiaInspeccion.trim()) {
    errors.companiaInspeccion = 'La compañía de inspección es obligatoria';
  }
  if (!data.nombreTecnico.trim()) {
    errors.nombreTecnico = 'El nombre del técnico es obligatorio';
  }

  // Sí/No
  if (typeof data.instalacionDireccionCorrecta !== 'boolean') {
    errors.instalacionDireccionCorrecta = 'Campo obligatorio';
  }
  if (typeof data.combaFTB !== 'boolean') {
    errors.combaFTB = 'Campo obligatorio';
  }
  if (typeof data.colocacionGripCorrecta !== 'boolean') {
    errors.colocacionGripCorrecta = 'Campo obligatorio';
  }
  if (typeof data.alturaDropCorrecta !== 'boolean') {
    errors.alturaDropCorrecta = 'Campo obligatorio';
  }
  if (typeof data.puntoApoyoAdecuado !== 'boolean') {
    errors.puntoApoyoAdecuado = 'Campo obligatorio';
  }
  if (typeof data.dropLibreEmpalme !== 'boolean') {
    errors.dropLibreEmpalme = 'Campo obligatorio';
  }
  if (!data.metrosDrop.trim()) {
    errors.metrosDrop = 'Los metros de drop son obligatorios';
  } else if (isNaN(Number(data.metrosDrop))) {
    errors.metrosDrop = 'Debe ser un número';
  }
  if (typeof data.colocacionGanchosCorrecta !== 'boolean') {
    errors.colocacionGanchosCorrecta = 'Campo obligatorio';
  }
  if (typeof data.recorridoDropExteriorAdecuado !== 'boolean') {
    errors.recorridoDropExteriorAdecuado = 'Campo obligatorio';
  }
  if (typeof data.colocacionTestTerminalCorrecta !== 'boolean') {
    errors.colocacionTestTerminalCorrecta = 'Campo obligatorio';
  }
  if (typeof data.jackSuperficieCorrecto !== 'boolean') {
    errors.jackSuperficieCorrecto = 'Campo obligatorio';
  }
  if (typeof data.routerUbicadoCorrectamente !== 'boolean') {
    errors.routerUbicadoCorrectamente = 'Campo obligatorio';
  }

  if (!data.potenciaCorrecta.trim()) {
    errors.potenciaCorrecta = 'La potencia es obligatoria';
  }
  if (!data.puntuacionCliente.trim()) {
    errors.puntuacionCliente = 'La puntuación es obligatoria';
  } else if (isNaN(Number(data.puntuacionCliente))) {
    errors.puntuacionCliente = 'Debe ser un número';
  }
  if (!data.telefonoNombreCliente.trim()) {
    errors.telefonoNombreCliente =
      'El teléfono y nombre del cliente es obligatorio';
  }
  if (!data.comentariosCaso.trim()) {
    errors.comentariosCaso = 'Los comentarios del caso son obligatorios';
  }

  return errors;
};

export const isFormValid = (data: FormData): boolean => {
  const errors = validateForm(data);
  return Object.keys(errors).length === 0;
};

export const validateField = (
  name: keyof FormData,
  value: any,
): string | undefined => {
  // Crear un objeto con todos los campos de FormData inicializados
  const tempData: FormData = {
    email: '',
    numeroOrden: '',
    tipoFSO: '',
    companiaInspeccion: '',
    nombreTecnico: '',
    instalacionDireccionCorrecta: false,
    combaFTB: false,
    colocacionGripCorrecta: false,
    alturaDropCorrecta: false,
    puntoApoyoAdecuado: false,
    dropLibreEmpalme: false,
    metrosDrop: '',
    colocacionGanchosCorrecta: false,
    recorridoDropExteriorAdecuado: false,
    colocacionTestTerminalCorrecta: false,
    jackSuperficieCorrecto: false,
    routerUbicadoCorrectamente: false,
    potenciaCorrecta: '',
    puntuacionCliente: '',
    telefonoNombreCliente: '',
    comentariosCaso: '',
  };
  (tempData as any)[name] = value;
  const errors = validateForm(tempData);
  return errors[name as keyof FormErrors];
};
