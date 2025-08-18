import { useState } from 'react';
import {
  pick,
  isErrorWithCode,
  errorCodes,
  types,
} from '@react-native-documents/picker';
import type { DocumentPickerResponse } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';

export interface FileUploadResult {
  success: boolean;
  fileName?: string;
  filePath?: string;
  error?: string;
}

export interface PDFFile {
  uri: string;
  name: string;
  type: string;
  size: number;
}

export interface FSOData {
  id: string;
  clientName: string;
  orderNumber: string;
  address: string;
  serviceType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: string;
  processedAt?: string;
  fileName: string;
  fileSize: number;
}

export interface ProcessedFSOResponse {
  success: boolean;
  message: string;
  data?: FSOData;
}

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);

  // Función principal para seleccionar archivos PDF
  const pickPDFDocument = async (): Promise<FileUploadResult> => {
    try {
      console.log('Intentando abrir DocumentPicker...');

      const result = await pick({
        type: [types.pdf],
        allowMultiSelection: false,
      });

      console.log('DocumentPicker result:', result);

      if (result && result.length > 0) {
        const file = result[0];
        console.log('Archivo seleccionado:', file);

        // Validar que sea un PDF
        if (
          !file.type?.includes('pdf') &&
          !file.name?.toLowerCase().endsWith('.pdf')
        ) {
          console.log('Error: No es un PDF válido');
          return {
            success: false,
            error: 'Por favor selecciona solo archivos PDF',
          };
        }

        // Validación de tamaño (máximo 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB en bytes
        if (file.size && file.size > maxSize) {
          console.log('Error: Archivo demasiado grande');
          return {
            success: false,
            error: 'El archivo es demasiado grande. Máximo 10MB permitido.',
          };
        }

        // Guardar el archivo seleccionado
        const pdfFile: PDFFile = {
          uri: file.uri,
          name: file.name || `FSO_${Date.now()}.pdf`,
          type: file.type || 'application/pdf',
          size: file.size || 0,
        };

        setSelectedFile(pdfFile);
        console.log('Archivo guardado exitosamente:', pdfFile);

        return {
          success: true,
          fileName: pdfFile.name,
          filePath: pdfFile.uri,
        };
      }

      console.log('No se seleccionó ningún archivo');
      return {
        success: false,
        error: 'No se seleccionó ningún archivo',
      };
    } catch (error: any) {
      console.log('Error en pickPDFDocument:', error);

      if (
        isErrorWithCode(error) &&
        error.code === errorCodes.OPERATION_CANCELED
      ) {
        console.log('Usuario canceló la selección');
        return { success: false, error: 'Selección cancelada' };
      }

      console.error('Error al seleccionar PDF:', error);
      return {
        success: false,
        error: `Error al seleccionar el archivo PDF: ${
          error.message || 'Desconocido'
        }`,
      };
    }
  };

  // Función alias para compatibilidad
  const pickDocument = pickPDFDocument;

  // Función para subir archivo al servidor
  const uploadFile = async (file: PDFFile): Promise<ProcessedFSOResponse> => {
    setUploading(true);
    setProgress(0);

    try {
      // Simular progreso de subida
      const progressInterval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Preparar FormData para envío
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type || 'application/pdf',
        name: file.name,
      } as any);

      // Simular llamada al servidor
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));

      clearInterval(progressInterval);
      setProgress(100);

      const mockResponse: ProcessedFSOResponse = {
        success: true,
        message: 'Archivo procesado exitosamente',
        data: {
          id: `fso_${Date.now()}`,
          clientName: 'Cliente de Ejemplo',
          orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
          address: 'Dirección extraída del PDF',
          serviceType: 'Fibra Óptica',
          status: 'completed',
          uploadedAt: new Date().toISOString(),
          processedAt: new Date().toISOString(),
          fileName: file.name,
          fileSize: file.size,
        },
      };

      setUploading(false);
      return mockResponse;
    } catch (error) {
      console.error('Error al subir archivo:', error);
      setUploading(false);
      setProgress(0);
      return {
        success: false,
        message: 'Error al procesar el archivo',
      };
    }
  };

  // Función para leer información del archivo
  const readFileInfo = async (filePath: string) => {
    try {
      const fileInfo = await RNFS.stat(filePath);
      return {
        success: true,
        size: fileInfo.size,
        isFile: fileInfo.isFile(),
        modificationTime: fileInfo.mtime,
        path: fileInfo.path,
        exists: true,
      };
    } catch (error) {
      console.error('Error al leer información del archivo:', error);
      return {
        success: false,
        error: 'Error al leer el archivo',
        exists: false,
      };
    }
  };

  // Función para validar si el archivo PDF es válido
  const validatePDFFile = async (
    file: PDFFile,
  ): Promise<{ isValid: boolean; error?: string }> => {
    try {
      // Verificar extensión
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        return {
          isValid: false,
          error: 'El archivo debe tener extensión .pdf',
        };
      }

      // Verificar tipo MIME
      if (file.type && !file.type.includes('pdf')) {
        return { isValid: false, error: 'El tipo de archivo no es PDF válido' };
      }

      // Verificar tamaño mínimo (al menos 1KB)
      if (file.size < 1024) {
        return {
          isValid: false,
          error: 'El archivo PDF parece estar corrupto o vacío',
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Error al validar PDF:', error);
      return { isValid: false, error: 'Error al validar el archivo PDF' };
    }
  };

  // Función para mostrar selector de archivos
  const showFilePicker = pickPDFDocument;

  // Función para remover archivo seleccionado
  const removeFile = () => {
    setSelectedFile(null);
    setProgress(0);
  };

  return {
    uploading,
    progress,
    selectedFile,
    isUploading: uploading,
    uploadProgress: progress,
    pickDocument,
    pickPDFDocument,
    uploadFile,
    readFileInfo,
    validatePDFFile,
    showFilePicker,
    removeFile,
  };
};
