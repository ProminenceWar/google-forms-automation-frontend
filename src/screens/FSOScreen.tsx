import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  DocumentArrowUpIcon,
  TrashIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  CalendarDaysIcon,
  UserIcon,
  MapPinIcon,
} from 'react-native-heroicons/solid';

import { useFileUpload, FSOData } from '../hooks/useFileUpload';
import { useFSOData } from '../hooks/useFSOData';
import { Button } from '../components/Button';
import { MessageBanner } from '../components/MessageBanner';

const { width: screenWidth } = Dimensions.get('window');

export const FSOScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    selectedFile,
    isUploading,
    uploadProgress,
    pickDocument,
    pickPDFDocument,
    removeFile,
    uploadFile,
  } = useFileUpload();
  const { fsoList, isLoading, saveFSO, formatFileSize, formatDate } =
    useFSOData();

  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [processedData, setProcessedData] = useState<FSOData | null>(null);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Por favor selecciona un archivo PDF primero');
      return;
    }

    try {
      const result = await uploadFile(selectedFile);
      setUploadResult({ success: result.success, message: result.message });

      if (result.success && result.data) {
        setProcessedData(result.data);
        await saveFSO(result.data);
        // Limpiar archivo después de procesado exitoso
        removeFile();
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: 'Error inesperado al procesar el archivo',
      });
    }
  };

  // Función de debug para el botón
  const handlePickPDFDebug = async () => {
    console.log('=== DEBUG: Botón presionado ===');
    try {
      console.log('=== DEBUG: Llamando a pickPDFDocument ===');
      const result = await pickPDFDocument();
      console.log('=== DEBUG: Resultado recibido ===', result);

      if (result.success) {
        Alert.alert(
          'Debug - Éxito',
          `Archivo seleccionado: ${result.fileName}`,
        );
      } else {
        Alert.alert('Debug - Error', result.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('=== DEBUG: Error en catch ===', error);
      Alert.alert('Debug - Error', 'Error inesperado al seleccionar archivo');
    }
  };

  const getStatusIcon = (status: FSOData['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={20} color="#4CAF50" />;
      case 'processing':
        return <ActivityIndicator size={20} color="#FF9800" />;
      case 'pending':
        return <ClockIcon size={20} color="#FFC107" />;
      case 'failed':
        return <ExclamationTriangleIcon size={20} color="#F44336" />;
      default:
        return <ClockIcon size={20} color="#95A5A6" />;
    }
  };

  const getStatusColor = (status: FSOData['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'processing':
        return '#FF9800';
      case 'pending':
        return '#FFC107';
      case 'failed':
        return '#F44336';
      default:
        return '#95A5A6';
    }
  };

  const getStatusText = (status: FSOData['status']) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'processing':
        return 'Procesando';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      default:
        return 'Desconocido';
    }
  };

  const handleViewFSO = (fso: FSOData) => {
    (navigation as any).navigate('FSODetail', {
      fsoId: fso.id,
      fsoData: fso,
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.headerTitle}>FSO Manager</Text>
                <Text style={styles.headerSubtitle}>
                  Procesa documentos y gestiona FSOs
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Upload Section */}
            <View style={styles.uploadSection}>
              <Text style={styles.sectionTitle}>Subir Documento FSO</Text>

              {/* File Upload Area */}
              <View style={styles.uploadCard}>
                {!selectedFile ? (
                  <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={handlePickPDFDebug}
                  >
                    <DocumentArrowUpIcon size={48} color="#4A90E2" />
                    <Text style={styles.uploadText}>
                      Seleccionar archivo PDF
                    </Text>
                    <Text style={styles.uploadSubtext}>
                      Toca para buscar en tus archivos
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.filePreview}>
                    <View style={styles.fileInfo}>
                      <DocumentTextIcon size={32} color="#4A90E2" />
                      <View style={styles.fileDetails}>
                        <Text style={styles.fileName}>{selectedFile.name}</Text>
                        <Text style={styles.fileSize}>
                          {formatFileSize(selectedFile.size)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={removeFile}
                    >
                      <TrashIcon size={20} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                )}

                {/* Upload Progress */}
                {isUploading && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${uploadProgress}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{uploadProgress}%</Text>
                  </View>
                )}
              </View>

              {/* Upload Result */}
              {uploadResult && (
                <View style={styles.messageContainer}>
                  <MessageBanner
                    message={uploadResult.message}
                    type={uploadResult.success ? 'success' : 'error'}
                    onDismiss={() => setUploadResult(null)}
                  />
                </View>
              )}

              {/* Processed Data Preview */}
              {processedData && (
                <TouchableOpacity
                  style={styles.processedDataCard}
                  onPress={() => handleViewFSO(processedData)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.processedTitle}>Datos Procesados</Text>
                  <View style={styles.dataRow}>
                    <UserIcon size={16} color="#4A90E2" />
                    <Text style={styles.dataLabel}>Cliente:</Text>
                    <Text style={styles.dataValue}>
                      {processedData.clientName}
                    </Text>
                  </View>
                  <View style={styles.dataRow}>
                    <DocumentTextIcon size={16} color="#4A90E2" />
                    <Text style={styles.dataLabel}>Orden:</Text>
                    <Text style={styles.dataValue}>
                      {processedData.orderNumber}
                    </Text>
                  </View>
                  <View style={styles.dataRow}>
                    <MapPinIcon size={16} color="#4A90E2" />
                    <Text style={styles.dataLabel}>Dirección:</Text>
                    <Text style={styles.dataValue}>
                      {processedData.address}
                    </Text>
                  </View>
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Servicio:</Text>
                    <Text style={styles.dataValue}>
                      {processedData.serviceType}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <View style={styles.submitContainer}>
                <Button
                  title={isUploading ? 'Procesando...' : 'Procesar Documento'}
                  onPress={handleFileUpload}
                  disabled={!selectedFile || isUploading}
                  loading={isUploading}
                />
              </View>
            </View>

            {/* FSO List Section */}
            <View style={styles.listSection}>
              <Text style={styles.sectionTitle}>FSOs Recientes</Text>

              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#4A90E2" />
                  <Text style={styles.loadingText}>Cargando FSOs...</Text>
                </View>
              ) : fsoList.length === 0 ? (
                <View style={styles.emptyState}>
                  <DocumentTextIcon size={48} color="#BDC3C7" />
                  <Text style={styles.emptyText}>No hay FSOs</Text>
                  <Text style={styles.emptySubtext}>
                    Sube tu primer documento para comenzar
                  </Text>
                </View>
              ) : (
                fsoList.map(fso => (
                  <TouchableOpacity
                    key={fso.id}
                    style={styles.fsoCard}
                    onPress={() => handleViewFSO(fso)}
                  >
                    <View style={styles.fsoHeader}>
                      <View style={styles.fsoInfo}>
                        <Text style={styles.fsoOrderNumber}>
                          #{fso.orderNumber}
                        </Text>
                        <Text style={styles.fsoClient}>{fso.clientName}</Text>
                      </View>
                      <View style={styles.fsoStatus}>
                        {getStatusIcon(fso.status)}
                      </View>
                    </View>

                    <View style={styles.fsoDetails}>
                      <View style={styles.fsoDetailItem}>
                        <MapPinIcon size={14} color="#95A5A6" />
                        <Text style={styles.fsoDetailText} numberOfLines={1}>
                          {fso.address}
                        </Text>
                      </View>
                      <View style={styles.fsoDetailItem}>
                        <CalendarDaysIcon size={14} color="#95A5A6" />
                        <Text style={styles.fsoDetailText}>
                          {formatDate(fso.uploadedAt)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.fsoFooter}>
                      <View style={styles.fsoService}>
                        <Text style={styles.fsoServiceText}>
                          {fso.serviceType}
                        </Text>
                      </View>
                      <View style={styles.fsoActions}>
                        <View
                          style={[
                            styles.statusBadge,
                            {
                              backgroundColor: `${getStatusColor(
                                fso.status,
                              )}20`,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              { color: getStatusColor(fso.status) },
                            ]}
                          >
                            {getStatusText(fso.status)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.viewButton}
                          onPress={() => handleViewFSO(fso)}
                        >
                          <EyeIcon size={16} color="#4A90E2" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  uploadSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  uploadCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadArea: {
    alignItems: 'center',
    paddingVertical: 40,
    borderWidth: 2,
    borderColor: '#E3F2FD',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#F8FCFF',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FCFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  fileSize: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  messageContainer: {
    marginTop: 16,
  },
  processedDataCard: {
    backgroundColor: '#F8FCFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  processedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 12,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
    minWidth: 80,
  },
  dataValue: {
    fontSize: 14,
    color: '#7F8C8D',
    flex: 1,
    marginLeft: 8,
  },
  submitContainer: {
    marginTop: 20,
  },
  listSection: {
    marginBottom: 32,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7F8C8D',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    marginTop: 4,
  },
  fsoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fsoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  fsoInfo: {
    flex: 1,
  },
  fsoOrderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  fsoClient: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  fsoStatus: {
    padding: 4,
  },
  fsoDetails: {
    marginBottom: 12,
  },
  fsoDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fsoDetailText: {
    fontSize: 12,
    color: '#95A5A6',
    fontWeight: '500',
    marginLeft: 6,
    flex: 1,
  },
  fsoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fsoService: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flex: 1,
    marginRight: 12,
  },
  fsoServiceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
  },
  fsoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  viewButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
  },
});

export default FSOScreen;
