import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  TrashIcon,
} from 'react-native-heroicons/solid';
import { StoredForm } from '../hooks/useLocalStorage';

const { width: screenWidth } = Dimensions.get('window');

interface DeleteConfirmationModalProps {
  visible: boolean;
  form: StoredForm | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ visible, form, onConfirm, onCancel }) => {
  if (!form) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <ExclamationTriangleIcon size={32} color="#E74C3C" />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
              <XMarkIcon size={24} color="#7F8C8D" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Confirmar Eliminación</Text>
            <Text style={styles.subtitle}>
              ¿Estás seguro de que deseas eliminar este formulario?
            </Text>

            {/* Form details */}
            <View style={styles.formDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Orden:</Text>
                <Text style={styles.detailValue}>{form.orderNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cliente:</Text>
                <Text style={styles.detailValue}>{form.clientName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Técnico:</Text>
                <Text style={styles.detailValue}>{form.technicianName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tipo:</Text>
                <Text style={styles.detailValue}>{form.formType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fecha:</Text>
                <Text style={styles.detailValue}>
                  {new Date(form.createdAt).toLocaleDateString('es-ES')}
                </Text>
              </View>
            </View>

            <Text style={styles.warning}>
              Esta acción no se puede deshacer.
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <LinearGradient
              colors={['#E74C3C', '#C0392B']}
              style={styles.confirmButtonGradient}
            >
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
              >
                <TrashIcon size={20} color="#fff" />
                <Text style={styles.confirmButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: screenWidth - 40,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#FADBD8',
    padding: 12,
    borderRadius: 50,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  formDetails: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D6D7E',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#2C3E50',
    flex: 2,
    textAlign: 'right',
    fontWeight: '500',
  },
  warning: {
    fontSize: 14,
    color: '#E74C3C',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
    textAlign: 'center',
  },
  confirmButtonGradient: {
    flex: 1,
    borderRadius: 12,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
