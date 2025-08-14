import { FormData, ApiResponse } from '../types';
import { API_CONFIG } from './constants';

export const submitForm = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUBMIT_FORM}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: data.message || 'Formulario enviado exitosamente',
      data: data,
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    
    let message = 'Error al enviar el formulario';
    
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        message = 'Tiempo de espera agotado. Verifica tu conexión e intenta nuevamente.';
      } else if (error.message.includes('Network')) {
        message = 'Error de red. Verifica tu conexión a internet.';
      } else if (error.message.includes('HTTP error')) {
        message = 'Error del servidor. Intenta nuevamente más tarde.';
      }
    }
    
    return {
      success: false,
      message,
    };
  }
};

// Mock function for testing purposes when backend is not available
export const submitFormMock = async (formData: FormData): Promise<ApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random success/failure for testing
  const isSuccess = Math.random() > 0.2; // 80% success rate
  
  if (isSuccess) {
    return {
      success: true,
      message: 'Formulario enviado exitosamente',
      data: { id: Math.random().toString(36), ...formData },
    };
  } else {
    return {
      success: false,
      message: 'Error simulado del servidor. Intenta nuevamente.',
    };
  }
};