import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../utils/constants';

interface MessageBannerProps {
  message: string;
  type: 'success' | 'error';
  onDismiss?: () => void;
}

export const MessageBanner: React.FC<MessageBannerProps> = ({
  message,
  type,
  onDismiss,
}) => {
  const isSuccess = type === 'success';
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSuccess ? styles.successContainer : styles.errorContainer,
      ]}
      onPress={onDismiss}
      activeOpacity={onDismiss ? 0.8 : 1}
    >
      <Text style={[
        styles.message,
        isSuccess ? styles.successMessage : styles.errorMessage,
      ]}>
        {message}
      </Text>
      {onDismiss && (
        <Text style={[
          styles.dismissText,
          isSuccess ? styles.successMessage : styles.errorMessage,
        ]}>
          ✕
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  successContainer: {
    backgroundColor: Colors.success + '20', // 20% opacity
    borderColor: Colors.success,
    borderWidth: 1,
  },
  errorContainer: {
    backgroundColor: Colors.error + '20', // 20% opacity
    borderColor: Colors.error,
    borderWidth: 1,
  },
  message: {
    ...Typography.body,
    flex: 1,
  },
  successMessage: {
    color: Colors.success,
  },
  errorMessage: {
    color: Colors.error,
  },
  dismissText: {
    ...Typography.body,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
});