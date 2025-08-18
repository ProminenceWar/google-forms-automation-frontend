import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FSOData } from './useFileUpload';

const FSO_STORAGE_KEY = 'fso_data';

export interface FSODetailData extends FSOData {
  clientPhone?: string;
  clientEmail?: string;
  technician?: string;
  scheduleDate?: string;
  notes?: string;
  attachments?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export const useFSOData = () => {
  const [fsoList, setFsoList] = useState<FSOData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar FSOs del almacenamiento local
  const loadFSOs = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedFSOs = await AsyncStorage.getItem(FSO_STORAGE_KEY);
      if (storedFSOs) {
        const parsedFSOs: FSOData[] = JSON.parse(storedFSOs);
        setFsoList(parsedFSOs);
      } else {
        // Datos mock para desarrollo
        const mockFSOs: FSOData[] = [
          {
            id: 'fso_001',
            clientName: 'María González',
            orderNumber: 'ORD-78901',
            address: 'Calle Revolución 456, Col. Centro',
            serviceType: 'Mantenimiento de Red',
            status: 'completed',
            uploadedAt: '2025-08-15T10:30:00Z',
            processedAt: '2025-08-15T11:00:00Z',
            fileName: 'FSO_78901.pdf',
            fileSize: 2456789,
          },
          {
            id: 'fso_002',
            clientName: 'Carlos Rodríguez',
            orderNumber: 'ORD-78902',
            address: 'Av. Libertad 789, Col. Nueva',
            serviceType: 'Instalación Nueva',
            status: 'processing',
            uploadedAt: '2025-08-16T14:15:00Z',
            fileName: 'FSO_78902.pdf',
            fileSize: 1876543,
          },
          {
            id: 'fso_003',
            clientName: 'Ana Martínez',
            orderNumber: 'ORD-78903',
            address: 'Plaza Mayor 321, Col. Histórica',
            serviceType: 'Reparación de Fibra',
            status: 'pending',
            uploadedAt: '2025-08-17T09:45:00Z',
            fileName: 'FSO_78903.pdf',
            fileSize: 3234567,
          },
        ];
        setFsoList(mockFSOs);
        await AsyncStorage.setItem(FSO_STORAGE_KEY, JSON.stringify(mockFSOs));
      }
    } catch (error) {
      console.error('Error loading FSOs:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar nuevo FSO
  const saveFSO = useCallback(
    async (fsoData: FSOData) => {
      try {
        const updatedList = [fsoData, ...fsoList];
        setFsoList(updatedList);
        await AsyncStorage.setItem(
          FSO_STORAGE_KEY,
          JSON.stringify(updatedList),
        );
      } catch (error) {
        console.error('Error saving FSO:', error);
      }
    },
    [fsoList],
  );

  // Obtener FSO por ID con detalles completos
  const getFSOById = useCallback(
    async (id: string): Promise<FSODetailData | null> => {
      try {
        const fso = fsoList.find(item => item.id === id);
        if (!fso) return null;

        // Simular datos adicionales del backend
        const detailData: FSODetailData = {
          ...fso,
          clientPhone: '+52 555 123 4567',
          clientEmail: 'cliente@email.com',
          technician: 'Pedro González',
          scheduleDate: '2025-08-20T09:00:00Z',
          notes:
            'Cliente requiere instalación en segundo piso. Acceso por escalera externa.',
          attachments: ['diagrama_instalacion.pdf', 'fotos_sitio.jpg'],
          coordinates: {
            latitude: 19.4326,
            longitude: -99.1332,
          },
        };

        return detailData;
      } catch (error) {
        console.error('Error getting FSO details:', error);
        return null;
      }
    },
    [fsoList],
  );

  // Actualizar estado de FSO
  const updateFSOStatus = useCallback(
    async (id: string, status: FSOData['status']) => {
      try {
        const updatedList = fsoList.map(fso =>
          fso.id === id
            ? {
                ...fso,
                status,
                processedAt:
                  status === 'completed'
                    ? new Date().toISOString()
                    : fso.processedAt,
              }
            : fso,
        );
        setFsoList(updatedList);
        await AsyncStorage.setItem(
          FSO_STORAGE_KEY,
          JSON.stringify(updatedList),
        );
      } catch (error) {
        console.error('Error updating FSO status:', error);
      }
    },
    [fsoList],
  );

  // Filtrar FSOs por estado
  const getFSOsByStatus = useCallback(
    (status?: FSOData['status']) => {
      if (!status) return fsoList;
      return fsoList.filter(fso => fso.status === status);
    },
    [fsoList],
  );

  // Formatear tamaño de archivo
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Formatear fecha
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  useEffect(() => {
    loadFSOs();
  }, [loadFSOs]);

  return {
    fsoList,
    isLoading,
    saveFSO,
    getFSOById,
    updateFSOStatus,
    getFSOsByStatus,
    formatFileSize,
    formatDate,
    refreshFSOs: loadFSOs,
  };
};
