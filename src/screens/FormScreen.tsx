import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Heroicons
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FaceSmileIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

import { useForm } from '../hooks/useForm';
import { useLocalStorage, StoredForm } from '../hooks/useLocalStorage';
import { FormField } from '../components/FormField';
import { ToggleField } from '../components/ToggleField';
import { PickerField } from '../components/PickerField';
import { Button } from '../components/Button';
import { MessageBanner } from '../components/MessageBanner';
import { Colors, Spacing, Typography } from '../utils/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Definir los grupos de preguntas
const FORM_GROUPS = [
  {
    id: 1,
    title: 'Información Básica',
    icon: 'info',
    description: 'Datos generales del formulario',
    fields: [
      'email',
      'numeroOrden',
      'tipoFSO',
      'companiaInspeccion',
      'nombreTecnico',
    ],
  },
  {
    id: 2,
    title: 'Verificación de Instalación',
    icon: 'build',
    description: 'Validación de la instalación básica',
    fields: [
      'instalacionDireccionCorrecta',
      'combaFTB',
      'colocacionGripCorrecta',
      'alturaDropCorrecta',
    ],
  },
  {
    id: 3,
    title: 'Inspección de Drop',
    icon: 'cable',
    description: 'Revisión del cableado y conexiones',
    fields: [
      'puntoApoyoAdecuado',
      'dropLibreEmpalme',
      'metrosDrop',
      'colocacionGanchosCorrecta',
      'recorridoDropExteriorAdecuado',
    ],
  },
  {
    id: 4,
    title: 'Equipos y Terminales',
    icon: 'router',
    description: 'Verificación de equipos instalados',
    fields: [
      'colocacionTestTerminalCorrecta',
      'jackSuperficieCorrecto',
      'routerUbicadoCorrectamente',
    ],
  },
  {
    id: 5,
    title: 'Mediciones y Cliente',
    icon: 'assessment',
    description: 'Datos finales y del cliente',
    fields: [
      'potenciaCorrecta',
      'puntuacionCliente',
      'telefonoCliente',
      'nombreCliente',
      'comentariosCaso',
    ],
  },
];

export const FormScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { editFormId } = (route.params as { editFormId?: string }) || {};
  const isEditMode = !!editFormId;

  const {
    formData,
    errors,
    isSubmitting,
    submitResult,
    updateField,
    isFormValidToSubmit,
    submitForm,
    resetForm,
    clearSubmitResult,
    setFormData,
    validateFormData,
  } = useForm();

  const { saveForm, updateForm, getFormById } = useLocalStorage();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos del formulario si estamos en modo de edición
  useEffect(() => {
    if (isEditMode && editFormId) {
      loadFormForEdit();
    } else if (!isEditMode) {
      // Si no estamos en modo de edición, asegurar que el formulario esté limpio
      console.log('Not in edit mode, resetting form');
      resetForm();
    }
  }, [isEditMode, editFormId]);

  // Efecto adicional para detectar cambios en el modo de edición
  useEffect(() => {
    console.log('Edit mode changed:', { isEditMode, editFormId });
  }, [isEditMode, editFormId]);

  // Debug: Monitorear cambios en formData
  useEffect(() => {
    if (isEditMode) {
      console.log('FormData changed in edit mode:', {
        id: formData.id,
        numeroOrden: formData.numeroOrden,
        nombreTecnico: formData.nombreTecnico,
        nombreCliente: formData.nombreCliente,
        email: formData.email,
      });
    }
  }, [formData, isEditMode]);

  const loadFormForEdit = async () => {
    try {
      setIsLoading(true);
      console.log('=== LOAD FORM FOR EDIT ===');
      console.log('Edit Form ID:', editFormId);
      console.log('Current formData before load:', formData);

      const form = await getFormById(editFormId!);
      console.log('Form retrieved from storage:', form);

      if (form && form.formData) {
        // Asegurar que el FormData incluya el ID del formulario almacenado
        const formDataWithId = {
          ...form.formData,
          id: form.id, // Mantener la concordancia del ID
        };

        console.log('Form data to set:', formDataWithId);

        // Usar setFormData directamente para asegurar la actualización
        setFormData(formDataWithId);

        console.log('=== FORM DATA SET ===');
      } else {
        console.error(
          'No form found or no formData in form with ID:',
          editFormId,
        );
        console.log('Form object:', form);
      }
    } catch (error) {
      console.error('Error loading form for edit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Primero intentar enviar el formulario
      const success = await submitForm();

      if (success) {
        // Preparar los datos para guardar, manteniendo el ID si existe
        const formToSave = {
          formData: {
            ...formData,
            id: isEditMode && editFormId ? editFormId : formData.id, // Mantener el ID en edición
          },
          orderNumber: formData.numeroOrden || `ORD-${Date.now()}`,
          clientName: formData.nombreCliente || 'Cliente no especificado',
          technicianName: formData.nombreTecnico || 'Técnico no especificado',
          companyInspection:
            formData.companiaInspeccion || 'Compañía no especificada',
          formType: formData.tipoFSO || 'Tipo no especificado',
          status: 'completed' as const,
          clientRating: formData.puntuacionCliente
            ? parseInt(formData.puntuacionCliente)
            : undefined,
          comments: formData.comentariosCaso || undefined,
        };

        if (isEditMode && editFormId) {
          // Actualizar formulario existente
          await updateForm(editFormId, formToSave);
        } else {
          // Guardar nuevo formulario
          const savedForm = await saveForm(formToSave);
          // Actualizar el formData con el ID del formulario recién guardado
          updateField('id', savedForm.id);
        }

        // Solo resetear el formulario si NO estamos en modo de edición
        // En modo de edición, mantener los datos para futuras ediciones
        if (!isEditMode) {
          resetForm();
        }

        // Navegación en secuencia: primero a FormsList, luego a Home
        setTimeout(() => {
          // Primero ir a FormsListScreen para cerrar la vista de formulario
          navigation.navigate('FormsList' as never);
          
          // Después de un breve delay, ir a Home para mostrar el resultado
          setTimeout(() => {
            navigation.navigate('Home' as never);
          }, 500);
        }, 2000);
      } else {
        // Si la validación falla, navegar al primer campo con error
        navigateToFirstError();
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const navigateToFirstError = () => {
    const allErrors = validateFormData();
    if (Object.keys(allErrors).length === 0) return;

    // Encontrar el primer campo con error
    const firstErrorField = Object.keys(allErrors)[0];

    // Encontrar en qué paso está ese campo
    for (let i = 0; i < FORM_GROUPS.length; i++) {
      const group = FORM_GROUPS[i];
      if (group.fields.includes(firstErrorField)) {
        setCurrentStep(group.id);
        break;
      }
    }
  };

  // Nueva función para validar si se puede enviar (más flexible)
  const canSubmitForm = () => {
    // Campos mínimos requeridos para poder enviar
    const requiredFields = ['numeroOrden', 'nombreTecnico', 'nombreCliente'];

    return requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value && value.toString().trim() !== '';
    });
  };

  const handleNextStep = () => {
    if (currentStep < FORM_GROUPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentGroup = () => {
    return FORM_GROUPS.find(group => group.id === currentStep);
  };

  const isCurrentStepValid = () => {
    const currentGroup = getCurrentGroup();
    if (!currentGroup) return false;

    // Verificar si todos los campos requeridos del paso actual están completos
    return currentGroup.fields.every(fieldName => {
      const value = formData[fieldName as keyof typeof formData];
      if (typeof value === 'boolean') return true; // Los toggles siempre son válidos
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'number') return !isNaN(value) && value !== null;
      return value !== null && value !== undefined && value !== '';
    });
  };

  const renderFormFields = () => {
    const currentGroup = getCurrentGroup();
    if (!currentGroup) return null;

    return currentGroup.fields.map(fieldName => {
      switch (fieldName) {
        case 'email':
          return (
            <FormField
              key={fieldName}
              label="¿Cuál es el correo electrónico?"
              value={formData.email}
              onChangeText={text => updateField('email', text)}
              error={errors.email}
              required
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          );
        case 'numeroOrden':
          return (
            <FormField
              key={fieldName}
              label="¿Cuál es el número de orden?"
              value={formData.numeroOrden || ''}
              onChangeText={text => updateField('numeroOrden', text)}
              required
              placeholder="123456"
            />
          );
        case 'tipoFSO':
          return (
            <PickerField
              key={fieldName}
              label="¿Cuál es el tipo de FSO?"
              value={formData.tipoFSO || ''}
              onValueChange={value => updateField('tipoFSO', value)}
              options={[
                { label: 'Instalaciones', value: 'instalaciones' },
                { label: 'Tickets de Averia', value: 'tickets_averia' },
                { label: 'Retiro', value: 'retiro' },
                { label: 'Traslados', value: 'traslados' },
                { label: 'Reubicaciones', value: 'reubicaciones' },
                { label: 'Cambio de Equipo', value: 'cambio_equipo' },
                { label: 'Inspección', value: 'inspeccion' },
              ]}
              placeholder="Seleccione el tipo de FSO"
              required
              error={errors.tipoFSO}
            />
          );
        case 'companiaInspeccion':
          return (
            <FormField
              key={fieldName}
              label="¿Qué compañía realizó la inspección?"
              value={formData.companiaInspeccion || ''}
              onChangeText={text => updateField('companiaInspeccion', text)}
              required
              placeholder="Compañía XYZ"
            />
          );
        case 'nombreTecnico':
          return (
            <FormField
              key={fieldName}
              label="¿Cuál es el nombre del técnico?"
              value={formData.nombreTecnico || ''}
              onChangeText={text => updateField('nombreTecnico', text)}
              required
              placeholder="Juan Pérez"
            />
          );
        case 'instalacionDireccionCorrecta':
          return (
            <ToggleField
              key={fieldName}
              label="¿La instalación se realizó en la dirección correcta?"
              value={formData.instalacionDireccionCorrecta || false}
              onValueChange={value =>
                updateField('instalacionDireccionCorrecta', value)
              }
              required
            />
          );
        case 'combaFTB':
          return (
            <ToggleField
              key={fieldName}
              label="¿Se hizo comba en FTB?"
              value={formData.combaFTB || false}
              onValueChange={value => updateField('combaFTB', value)}
              required
            />
          );
        case 'colocacionGripCorrecta':
          return (
            <ToggleField
              key={fieldName}
              label="¿La colocación del grip es correcta?"
              value={formData.colocacionGripCorrecta || false}
              onValueChange={value =>
                updateField('colocacionGripCorrecta', value)
              }
              required
            />
          );
        case 'alturaDropCorrecta':
          return (
            <ToggleField
              key={fieldName}
              label="¿La altura del drop es la correcta?"
              value={formData.alturaDropCorrecta || false}
              onValueChange={value => updateField('alturaDropCorrecta', value)}
              required
            />
          );
        case 'puntoApoyoAdecuado':
          return (
            <ToggleField
              key={fieldName}
              label="¿El punto de apoyo está adecuadamente colocado?"
              value={formData.puntoApoyoAdecuado || false}
              onValueChange={value => updateField('puntoApoyoAdecuado', value)}
              required
            />
          );
        case 'dropLibreEmpalme':
          return (
            <ToggleField
              key={fieldName}
              label="¿El drop está libre de empalme?"
              value={formData.dropLibreEmpalme || false}
              onValueChange={value => updateField('dropLibreEmpalme', value)}
              required
            />
          );
        case 'metrosDrop':
          return (
            <FormField
              key={fieldName}
              label="¿Cuántos metros de drop se utilizaron?"
              value={formData.metrosDrop || ''}
              onChangeText={text => updateField('metrosDrop', text)}
              required
              placeholder="20"
              keyboardType="numeric"
            />
          );
        case 'colocacionGanchosCorrecta':
          return (
            <ToggleField
              key={fieldName}
              label="¿La colocación de los ganchos es correcta?"
              value={formData.colocacionGanchosCorrecta || false}
              onValueChange={value =>
                updateField('colocacionGanchosCorrecta', value)
              }
              required
            />
          );
        case 'recorridoDropExteriorAdecuado':
          return (
            <ToggleField
              key={fieldName}
              label="¿El recorrido del drop exterior es el adecuado?"
              value={formData.recorridoDropExteriorAdecuado || false}
              onValueChange={value =>
                updateField('recorridoDropExteriorAdecuado', value)
              }
              required
            />
          );
        case 'colocacionTestTerminalCorrecta':
          return (
            <ToggleField
              key={fieldName}
              label="¿La colocación del test terminal es correcta?"
              value={formData.colocacionTestTerminalCorrecta || false}
              onValueChange={value =>
                updateField('colocacionTestTerminalCorrecta', value)
              }
              required
            />
          );
        case 'jackSuperficieCorrecto':
          return (
            <ToggleField
              key={fieldName}
              label="¿El jack de superficie está correctamente colocado?"
              value={formData.jackSuperficieCorrecto || false}
              onValueChange={value =>
                updateField('jackSuperficieCorrecto', value)
              }
              required
            />
          );
        case 'routerUbicadoCorrectamente':
          return (
            <ToggleField
              key={fieldName}
              label="¿El router está ubicado correctamente?"
              value={formData.routerUbicadoCorrectamente || false}
              onValueChange={value =>
                updateField('routerUbicadoCorrectamente', value)
              }
              required
            />
          );
        case 'potenciaCorrecta':
          return (
            <FormField
              key={fieldName}
              label="¿La potencia es la correcta?"
              value={formData.potenciaCorrecta || ''}
              onChangeText={text => updateField('potenciaCorrecta', text)}
              required
              placeholder="-20 dBm"
            />
          );
        case 'puntuacionCliente':
          return (
            <FormField
              key={fieldName}
              label="¿Cuál es la puntuación del cliente?"
              value={formData.puntuacionCliente || ''}
              onChangeText={text => updateField('puntuacionCliente', text)}
              required
              placeholder="10"
              keyboardType="numeric"
            />
          );
        case 'telefonoCliente':
          return (
            <FormField
              key={fieldName}
              label="¿Cuál es el teléfono del cliente?"
              value={
                formData.telefonoCliente !== undefined &&
                formData.telefonoCliente !== null
                  ? String(formData.telefonoCliente)
                  : ''
              }
              onChangeText={text => {
                const numeric = text.replace(/[^0-9]/g, '');
                updateField(
                  'telefonoCliente',
                  numeric === '' ? '' : Number(numeric),
                );
              }}
              required
              placeholder="5551234567"
              keyboardType="numeric"
            />
          );
        case 'nombreCliente':
          return (
            <FormField
              key={fieldName}
              label="¿Cuál es el nombre del cliente?"
              value={formData.nombreCliente || ''}
              onChangeText={text => updateField('nombreCliente', text)}
              required
              placeholder="Juan Cliente"
            />
          );
        case 'comentariosCaso':
          return (
            <FormField
              key={fieldName}
              label="¿Comentarios del caso?"
              value={formData.comentariosCaso || ''}
              onChangeText={text => updateField('comentariosCaso', text)}
              required
              placeholder="Agregue comentarios relevantes"
              multiline
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <LinearGradient
        colors={['#4A90E2', '#50A3E5', '#5CB3E8']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* Header moderno */}
            <View style={styles.modernHeader}>
              <View style={styles.headerContent}>
                <View style={styles.avatarSection}>
                  <View style={styles.avatar}>
                    <FaceSmileIcon size={36} color="#fff" />
                  </View>
                  <View style={styles.headerText}>
                    <Text style={styles.greeting}>
                      Hola, Inspector Pedro G.
                    </Text>
                    <Text style={styles.whereText}>Complete el formulario</Text>
                  </View>
                </View>
              </View>

              {/* Indicador de progreso */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(currentStep / FORM_GROUPS.length) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  Paso {currentStep} de {FORM_GROUPS.length}
                </Text>
              </View>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Success/Error Messages */}
              {submitResult && (
                <View style={styles.messageContainer}>
                  <MessageBanner
                    message={submitResult.message}
                    type={submitResult.success ? 'success' : 'error'}
                    onDismiss={clearSubmitResult}
                  />
                </View>
              )}

              {/* Tarjeta del paso actual */}
              <View style={styles.formCard}>
                <View style={styles.cardHeader}>
                  {/* Icono de grupo */}
                  {getCurrentGroup()?.icon === 'info' && (
                    <InformationCircleIcon size={24} color="#1976D2" />
                  )}
                  {getCurrentGroup()?.icon === 'build' && (
                    <WrenchScrewdriverIcon size={24} color="#1976D2" />
                  )}
                  {getCurrentGroup()?.icon === 'cable' && (
                    <CpuChipIcon size={24} color="#1976D2" />
                  )}
                  {getCurrentGroup()?.icon === 'router' && (
                    <CpuChipIcon size={24} color="#1976D2" />
                  )}
                  {getCurrentGroup()?.icon === 'assessment' && (
                    <ChartBarIcon size={24} color="#1976D2" />
                  )}
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>
                      {getCurrentGroup()?.title}
                    </Text>
                    <Text style={styles.cardDescription}>
                      {getCurrentGroup()?.description}
                    </Text>
                  </View>
                </View>

                {/* Campos del paso actual */}
                {renderFormFields()}
              </View>
            </ScrollView>

            {/* Navegación entre pasos - FIJA EN LA PARTE INFERIOR */}
            <View style={styles.fixedNavigationContainer}>
              <View style={styles.navigationContainer}>
                {currentStep > 1 && (
                  <TouchableOpacity
                    style={styles.prevButton}
                    onPress={handlePrevStep}
                  >
                    <ArrowLeftIcon size={20} color="#1976D2" />
                    <Text style={styles.prevButtonText}>Anterior</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.spacer} />

                {currentStep < FORM_GROUPS.length ? (
                  <TouchableOpacity
                    style={[
                      styles.nextButton,
                      isCurrentStepValid()
                        ? styles.nextButtonActive
                        : styles.nextButtonDisabled,
                    ]}
                    onPress={handleNextStep}
                    disabled={!isCurrentStepValid()}
                  >
                    <Text
                      style={[
                        styles.nextButtonText,
                        isCurrentStepValid()
                          ? styles.nextButtonTextActive
                          : styles.nextButtonTextDisabled,
                      ]}
                    >
                      Siguiente
                    </Text>
                    <ArrowRightIcon
                      size={20}
                      color={isCurrentStepValid() ? '#1976D2' : '#BDC3C7'}
                    />
                  </TouchableOpacity>
                ) : (
                  <LinearGradient
                    colors={['#4A90E2', '#50A3E5']}
                    style={[
                      styles.submitButtonGradient,
                      !canSubmitForm() && styles.submitButtonDisabled,
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.submitButtonTouch}
                      onPress={handleSubmit}
                      disabled={!canSubmitForm() || isSubmitting}
                    >
                      <Text style={styles.submitButtonText}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
                      </Text>
                      <PaperAirplaneIcon size={20} color="#fff" />
                    </TouchableOpacity>
                  </LinearGradient>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  modernHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  whereText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espacio para la navegación fija
  },
  fixedNavigationContainer: {
    position: 'absolute',
    bottom: -14,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageContainer: {
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A90E2',
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1976D2',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  prevButtonText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  spacer: {
    flex: 1,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1976D2',
    backgroundColor: '#fff',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  nextButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#1976D2',
  },
  nextButtonDisabled: {
    backgroundColor: '#F0F4F8',
    borderColor: '#BDC3C7',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
    color: '#1976D2',
    letterSpacing: 0.2,
  },
  nextButtonTextActive: {
    color: '#1976D2',
  },
  nextButtonTextDisabled: {
    color: '#BDC3C7',
  },
  submitButtonGradient: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginRight: 8,
  },
  submitContainer: {
    marginTop: 10,
  },
  submitButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
