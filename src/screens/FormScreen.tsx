import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useForm } from '../hooks/useForm';
import { FormField } from '../components/FormField';
import { ToggleField } from '../components/ToggleField';
import { Button } from '../components/Button';
import { MessageBanner } from '../components/MessageBanner';
import { Colors, Spacing, Typography } from '../utils/constants';

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Formulario DGF</Text>
            <Text style={styles.subtitle}>
              Complete todos los campos obligatorios para continuar
            </Text>
          </View>

          {/* Success/Error Messages */}
          {submitResult && (
            <MessageBanner
              message={submitResult.message}
              type={submitResult.success ? 'success' : 'error'}
              onDismiss={clearSubmitResult}
            />
          )}

          {/* Formulario DGF */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>
              Preguntas del Formulario DGF
            </Text>

            <FormField
              label="¿Cuál es el correo electrónico?"
              value={formData.email}
              onChangeText={text => updateField('email', text)}
              error={errors.email}
              required
              placeholder="Pedro@gmail.com"
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
              onValueChange={value => updateField('alturaDropCorrecta', value)}
              required
            />

            <ToggleField
              label="¿El punto de apoyo está adecuadamente colocado?"
              value={formData.puntoApoyoAdecuado || false}
              onValueChange={value => updateField('puntoApoyoAdecuado', value)}
              required
            />

            <ToggleField
              label="¿El drop está libre de empalme?"
              value={formData.dropLibreEmpalme || false}
              onValueChange={value => updateField('dropLibreEmpalme', value)}
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
              label="¿Cuál es el teléfono y nombre del cliente?"
              value={formData.telefonoNombreCliente || ''}
              onChangeText={text => updateField('telefonoNombreCliente', text)}
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

          {/* Submit Button */}
          <View style={styles.submitSection}>
            <Button
              title="Enviar Formulario"
              onPress={handleSubmit}
              disabled={!isFormValidToSubmit()}
              loading={isSubmitting}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...Typography.heading,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  submitSection: {
    marginTop: Spacing.lg,
  },
});
