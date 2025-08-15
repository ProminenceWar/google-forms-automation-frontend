import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
          {description && <Text style={styles.description}>{description}</Text>}
        </View>

        <View
          style={[
            styles.switch,
            value ? styles.switchActive : styles.switchInactive,
          ]}
        >
          <View
            style={[
              styles.switchThumb,
              value ? styles.switchThumbActive : styles.switchThumbInactive,
            ]}
          />
        </View>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    minHeight: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  labelContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    lineHeight: 22,
  },
  required: {
    color: '#E74C3C',
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
    lineHeight: 18,
  },
  switch: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 2,
  },
  switchActive: {
    backgroundColor: '#4A90E2',
  },
  switchInactive: {
    backgroundColor: '#BDC3C7',
  },
  switchThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  errorText: {
    fontSize: 14,
    color: '#E74C3C',
    marginTop: 6,
    marginLeft: 20,
  },
});
