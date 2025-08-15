import { useState, useCallback } from 'react';
import { FormData, FormErrors, ApiResponse } from '../types';
import { validateForm, isFormValid, validateField } from '../utils/validation';
import { submitFormMock } from '../utils/api'; // Using mock for now

const initialFormData: FormData = {
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
  telefonoCliente: 0,
  nombreCliente: '',
  comentariosCaso: '',
};

export const useForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ApiResponse | null>(null);

  const updateField = useCallback(
    (name: keyof FormData, value: any) => {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      // Clear field error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }

      // Clear submit result when form is modified
      if (submitResult) {
        setSubmitResult(null);
      }
    },
    [errors, submitResult],
  );

  const validateFormData = useCallback(() => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [formData]);

  const validateSingleField = useCallback(
    (name: keyof FormData) => {
      const error = validateField(name, formData[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
      return !error;
    },
    [formData],
  );

  const isFormValidToSubmit = useCallback(() => {
    return isFormValid(formData);
  }, [formData]);

  const submitForm = useCallback(async () => {
    if (!validateFormData()) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitFormMock(formData);
      setSubmitResult(result);

      if (result.success) {
        // Reset form on successful submission
        setFormData(initialFormData);
        setErrors({});
      }

      return result.success;
    } catch (error) {
      const errorResult: ApiResponse = {
        success: false,
        message: 'Error inesperado. Intenta nuevamente.',
      };
      setSubmitResult(errorResult);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateFormData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitResult(null);
  }, []);

  const clearSubmitResult = useCallback(() => {
    setSubmitResult(null);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitResult,
    updateField,
    validateFormData,
    validateSingleField,
    isFormValidToSubmit,
    submitForm,
    resetForm,
    clearSubmitResult,
  };
};
