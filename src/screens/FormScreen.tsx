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
            <Text style={styles.title}>Formulario de Registro</Text>
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

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            <FormField
              label="Nombre completo"
              value={formData.nombre}
              onChangeText={(text) => updateField('nombre', text)}
              error={errors.nombre}
              required
              placeholder="Ej: Juan Pérez"
              autoCapitalize="words"
            />

            <FormField
              label="Correo electrónico"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              error={errors.email}
              required
              placeholder="Ej: juan@empresa.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormField
              label="Teléfono"
              value={formData.telefono}
              onChangeText={(text) => updateField('telefono', text)}
              error={errors.telefono}
              required
              placeholder="Ej: +1234567890"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Información Profesional</Text>
            
            <FormField
              label="Empresa"
              value={formData.empresa}
              onChangeText={(text) => updateField('empresa', text)}
              error={errors.empresa}
              required
              placeholder="Ej: TechCorp"
              autoCapitalize="words"
            />

            <FormField
              label="Cargo"
              value={formData.cargo}
              onChangeText={(text) => updateField('cargo', text)}
              error={errors.cargo}
              required
              placeholder="Ej: Desarrollador Frontend"
              autoCapitalize="words"
            />

            <FormField
              label="Años de experiencia"
              value={formData.experiencia.toString()}
              onChangeText={(text) => {
                const num = parseInt(text, 10) || 0;
                updateField('experiencia', num);
              }}
              error={errors.experiencia}
              required
              placeholder="Ej: 3"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Preferencias</Text>
            
            <ToggleField
              label="¿Tiene experiencia previa en el área?"
              value={formData.tieneExperienciaPrevia}
              onValueChange={(value) => updateField('tieneExperienciaPrevia', value)}
              description="Indique si ha trabajado anteriormente en un rol similar"
            />

            <ToggleField
              label="¿Disponible para comenzar inmediatamente?"
              value={formData.disponibleInmediato}
              onValueChange={(value) => updateField('disponibleInmediato', value)}
              description="Puede iniciar funciones sin período de preaviso"
            />

            <ToggleField
              label="¿Acepta trabajo remoto?"
              value={formData.trabajoRemoto}
              onValueChange={(value) => updateField('trabajoRemoto', value)}
              description="Está dispuesto a trabajar desde casa"
            />

            <ToggleField
              label="¿Desea recibir notificaciones?"
              value={formData.recibirNotificaciones}
              onValueChange={(value) => updateField('recibirNotificaciones', value)}
              description="Recibir actualizaciones por correo electrónico"
            />

            <ToggleField
              label="Acepto términos y condiciones"
              value={formData.aceptaTerminos}
              onValueChange={(value) => updateField('aceptaTerminos', value)}
              error={errors.aceptaTerminos}
              required
              description="Debe aceptar para continuar"
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