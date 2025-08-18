import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateFormId } from '../utils/idGenerator';
import { FormData } from '../types';

export interface StoredForm {
  id: string;
  formData: FormData;
  orderNumber: string;
  clientName: string;
  technicianName: string;
  companyInspection: string;
  formType: string;
  status: 'completed' | 'pending' | 'draft';
  createdAt: string;
  updatedAt: string;
  clientRating?: number;
  comments?: string;
}

const FORMS_STORAGE_KEY = 'stored_forms';

export const useLocalStorage = () => {
  const saveForms = async (forms: StoredForm[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
    } catch (error) {
      console.error('Error saving forms to storage:', error);
      throw error;
    }
  };

  const loadForms = async (): Promise<StoredForm[]> => {
    try {
      const formsJson = await AsyncStorage.getItem(FORMS_STORAGE_KEY);
      const forms: StoredForm[] = formsJson ? JSON.parse(formsJson) : [];

      // Migrar formularios que no tienen ID en FormData
      const migratedForms = forms.map((form: StoredForm) => {
        if (form.formData && !form.formData.id) {
          return {
            ...form,
            formData: {
              ...form.formData,
              id: form.id, // Sincronizar el ID
            },
          };
        }
        return form;
      });

      // Si hubo migración, guardar los cambios
      const hasChanges = migratedForms.some(
        (form: StoredForm, index: number) =>
          JSON.stringify(form) !== JSON.stringify(forms[index]),
      );

      if (hasChanges) {
        await saveForms(migratedForms);
      }

      return migratedForms;
    } catch (error) {
      console.error('Error loading forms from storage:', error);
      return [];
    }
  };

  const saveForm = async (
    formData: Omit<StoredForm, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<StoredForm> => {
    try {
      const existingForms = await loadForms();
      const formId = generateFormId(); // Usar el generador de IDs

      const newForm: StoredForm = {
        ...formData,
        id: formId,
        // Asegurar que el FormData también tenga el ID
        formData: {
          ...formData.formData,
          id: formId,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedForms = [...existingForms, newForm];
      await saveForms(updatedForms);
      return newForm;
    } catch (error) {
      console.error('Error saving form:', error);
      throw error;
    }
  };

  const updateForm = async (
    id: string,
    updates: Partial<StoredForm>,
  ): Promise<StoredForm | null> => {
    try {
      const existingForms = await loadForms();
      const formIndex = existingForms.findIndex(form => form.id === id);

      if (formIndex === -1) {
        return null;
      }

      const updatedForm = {
        ...existingForms[formIndex],
        ...updates,
        // Asegurar que el FormData mantenga el ID correcto
        formData: {
          ...existingForms[formIndex].formData,
          ...updates.formData,
          id: id, // Mantener el ID consistente
        },
        updatedAt: new Date().toISOString(),
      };

      existingForms[formIndex] = updatedForm;
      await saveForms(existingForms);
      return updatedForm;
    } catch (error) {
      console.error('Error updating form:', error);
      throw error;
    }
  };

  const deleteForm = async (id: string): Promise<boolean> => {
    try {
      const existingForms = await loadForms();
      const filteredForms = existingForms.filter(form => form.id !== id);

      if (filteredForms.length === existingForms.length) {
        return false; // Form not found
      }

      await saveForms(filteredForms);
      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      throw error;
    }
  };

  const getFormById = async (id: string): Promise<StoredForm | null> => {
    try {
      console.log('getFormById called with ID:', id);
      const forms = await loadForms();
      console.log('Total forms loaded:', forms.length);
      console.log(
        'Available form IDs:',
        forms.map(f => f.id),
      );

      const foundForm = forms.find(form => form.id === id);
      console.log('Found form:', foundForm ? 'Yes' : 'No');

      if (foundForm) {
        console.log(
          'Form data structure:',
          Object.keys(foundForm.formData || {}),
        );
      }

      return foundForm || null;
    } catch (error) {
      console.error('Error getting form by id:', error);
      return null;
    }
  };

  return {
    saveForms,
    loadForms,
    saveForm,
    updateForm,
    deleteForm,
    getFormById,
  };
};
