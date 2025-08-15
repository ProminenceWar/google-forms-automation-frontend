import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useForm } from '../hooks/useForm';
import { FormField } from '../components/FormField';
import { ToggleField } from '../components/ToggleField';
import { Button } from '../components/Button';
import { MessageBanner } from '../components/MessageBanner';
import { Colors, Spacing, Typography } from '../utils/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const FormScreen: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitResult,
    updateField,
    isFormValidToSubmit,
    submitForm,
    clearSubmitResult,
  } = useForm();

  const handleSubmit = async () => {
    await submitForm();
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
                    <Icon name="face" size={36} color="#fff" />
                  </View>
                  <View style={styles.headerText}>
                    <Text style={styles.greeting}>
                      Hola, Inspector Pedro G.
                    </Text>
                    <Text style={styles.whereText}>Complete el formulario</Text>
                  </View>
                </View>
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

              {/* Tarjeta principal del formulario */}
              <View style={styles.formCard}>
                {/* Campos del formulario */}
                <FormField
                  label="¿Cuál es el correo electrónico?"
                  value={formData.email}
                  onChangeText={text => updateField('email', text)}
                  error={errors.email}
                  required
                  placeholder="correo@ejemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <FormField
                  label="¿Cuál es el número de orden?"
                  value={formData.numeroOrden || ''}
                  onChangeText={text => updateField('numeroOrden', text)}
                  required
                  placeholder="123456"
                />

                <FormField
                  label="¿Cuál es el tipo de FSO?"
                  value={formData.tipoFSO || ''}
                  onChangeText={text => updateField('tipoFSO', text)}
                  required
                  placeholder="FSO1"
                />

                <FormField
                  label="¿Qué compañía realizó la inspección?"
                  value={formData.companiaInspeccion || ''}
                  onChangeText={text => updateField('companiaInspeccion', text)}
                  required
                  placeholder="Compañía XYZ"
                />

                <FormField
                  label="¿Cuál es el nombre del técnico?"
                  value={formData.nombreTecnico || ''}
                  onChangeText={text => updateField('nombreTecnico', text)}
                  required
                  placeholder="Juan Pérez"
                />

                <ToggleField
                  label="¿La instalación se realizó en la dirección correcta?"
                  value={formData.instalacionDireccionCorrecta || false}
                  onValueChange={value =>
                    updateField('instalacionDireccionCorrecta', value)
                  }
                  required
                />

                <ToggleField
                  label="¿Se hizo comba en FTB?"
                  value={formData.combaFTB || false}
                  onValueChange={value => updateField('combaFTB', value)}
                  required
                />

                <ToggleField
                  label="¿La colocación del grip es correcta?"
                  value={formData.colocacionGripCorrecta || false}
                  onValueChange={value =>
                    updateField('colocacionGripCorrecta', value)
                  }
                  required
                />

                <ToggleField
                  label="¿La altura del drop es la correcta?"
                  value={formData.alturaDropCorrecta || false}
                  onValueChange={value =>
                    updateField('alturaDropCorrecta', value)
                  }
                  required
                />

                <ToggleField
                  label="¿El punto de apoyo está adecuadamente colocado?"
                  value={formData.puntoApoyoAdecuado || false}
                  onValueChange={value =>
                    updateField('puntoApoyoAdecuado', value)
                  }
                  required
                />

                <ToggleField
                  label="¿El drop está libre de empalme?"
                  value={formData.dropLibreEmpalme || false}
                  onValueChange={value =>
                    updateField('dropLibreEmpalme', value)
                  }
                  required
                />

                <FormField
                  label="¿Cuántos metros de drop se utilizaron?"
                  value={formData.metrosDrop || ''}
                  onChangeText={text => updateField('metrosDrop', text)}
                  required
                  placeholder="20"
                  keyboardType="numeric"
                />

                <ToggleField
                  label="¿La colocación de los ganchos es correcta?"
                  value={formData.colocacionGanchosCorrecta || false}
                  onValueChange={value =>
                    updateField('colocacionGanchosCorrecta', value)
                  }
                  required
                />

                <ToggleField
                  label="¿El recorrido del drop exterior es el adecuado?"
                  value={formData.recorridoDropExteriorAdecuado || false}
                  onValueChange={value =>
                    updateField('recorridoDropExteriorAdecuado', value)
                  }
                  required
                />

                <ToggleField
                  label="¿La colocación del test terminal es correcta?"
                  value={formData.colocacionTestTerminalCorrecta || false}
                  onValueChange={value =>
                    updateField('colocacionTestTerminalCorrecta', value)
                  }
                  required
                />

                <ToggleField
                  label="¿El jack de superficie está correctamente colocado?"
                  value={formData.jackSuperficieCorrecto || false}
                  onValueChange={value =>
                    updateField('jackSuperficieCorrecto', value)
                  }
                  required
                />

                <ToggleField
                  label="¿El router está ubicado correctamente?"
                  value={formData.routerUbicadoCorrectamente || false}
                  onValueChange={value =>
                    updateField('routerUbicadoCorrectamente', value)
                  }
                  required
                />

                <FormField
                  label="¿La potencia es la correcta?"
                  value={formData.potenciaCorrecta || ''}
                  onChangeText={text => updateField('potenciaCorrecta', text)}
                  required
                  placeholder="-20 dBm"
                />

                <FormField
                  label="¿Cuál es la puntuación del cliente?"
                  value={formData.puntuacionCliente || ''}
                  onChangeText={text => updateField('puntuacionCliente', text)}
                  required
                  placeholder="10"
                  keyboardType="numeric"
                />

                <FormField
                  label="¿Cuál es el teléfono?"
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
                <FormField
                  label="¿Cuál es el nombre del cliente?"
                  value={formData.nombreCliente || ''}
                  onChangeText={text => updateField('nombreCliente', text)}
                  required
                  placeholder="5551234567 - Juan Cliente"
                />

                <FormField
                  label="¿Comentarios del caso?"
                  value={formData.comentariosCaso || ''}
                  onChangeText={text => updateField('comentariosCaso', text)}
                  required
                  placeholder="Agregue comentarios relevantes"
                  multiline
                />
              </View>

              {/* Botón de envío moderno */}
              <View style={styles.submitContainer}>
                <LinearGradient
                  colors={['#4A90E2', '#50A3E5']}
                  style={styles.submitButton}
                >
                  <Button
                    title="Enviar Formulario"
                    onPress={handleSubmit}
                    disabled={!isFormValidToSubmit()}
                    loading={isSubmitting}
                  />
                </LinearGradient>
              </View>
            </ScrollView>
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
    paddingBottom: 30,
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A90E2',
    marginLeft: 12,
    letterSpacing: 0.5,
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
