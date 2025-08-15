export interface FormData {
  // Preguntas del Formulario DGF
  email: string;
  numeroOrden: string;
  tipoFSO: string;
  companiaInspeccion: string;
  nombreTecnico: string;
  instalacionDireccionCorrecta: boolean;
  combaFTB: boolean;
  colocacionGripCorrecta: boolean;
  alturaDropCorrecta: boolean;
  puntoApoyoAdecuado: boolean;
  dropLibreEmpalme: boolean;
  metrosDrop: string;
  colocacionGanchosCorrecta: boolean;
  recorridoDropExteriorAdecuado: boolean;
  colocacionTestTerminalCorrecta: boolean;
  jackSuperficieCorrecto: boolean;
  routerUbicadoCorrectamente: boolean;
  potenciaCorrecta: string;
  puntuacionCliente: string;
  telefonoNombreCliente: string;
  comentariosCaso: string;
}

export interface FormErrors {
  email?: string;
  numeroOrden?: string;
  tipoFSO?: string;
  companiaInspeccion?: string;
  nombreTecnico?: string;
  instalacionDireccionCorrecta?: string;
  combaFTB?: string;
  colocacionGripCorrecta?: string;
  alturaDropCorrecta?: string;
  puntoApoyoAdecuado?: string;
  dropLibreEmpalme?: string;
  metrosDrop?: string;
  colocacionGanchosCorrecta?: string;
  recorridoDropExteriorAdecuado?: string;
  colocacionTestTerminalCorrecta?: string;
  jackSuperficieCorrecto?: string;
  routerUbicadoCorrectamente?: string;
  potenciaCorrecta?: string;
  puntuacionCliente?: string;
  telefonoNombreCliente?: string;
  comentariosCaso?: string;
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
