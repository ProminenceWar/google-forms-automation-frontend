import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../utils/constants';

interface ToggleFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  error?: string;
  required?: boolean;
  description?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  label,
  value,
  onValueChange,
  error,
  required = false,
  description,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.7}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
        
        <View style={[
          styles.switch,
          value ? styles.switchActive : styles.switchInactive,
        ]}>
          <View style={[
            styles.switchThumb,
            value ? styles.switchThumbActive : styles.switchThumbInactive,
          ]} />
        </View>
      </TouchableOpacity>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    minHeight: 60,
  },
  labelContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  label: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  required: {
    color: Colors.error,
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs / 2,
  },
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  switchActive: {
    backgroundColor: Colors.primary,
  },
  switchInactive: {
    backgroundColor: Colors.border,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.background,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.md,
  },
});