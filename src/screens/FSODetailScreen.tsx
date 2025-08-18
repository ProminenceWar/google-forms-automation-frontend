import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  ArrowLeftIcon,
  UserIcon,
  DocumentTextIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  MapIcon,
} from 'react-native-heroicons/solid';

import { useFSOData, FSODetailData } from '../hooks/useFSOData';

interface RouteParams {
  fsoId: string;
}

export const FSODetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { fsoId } = route.params as RouteParams;
  const { getFSOById, formatFileSize, formatDate } = useFSOData();

  const [fsoDetail, setFsoDetail] = useState<FSODetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFSODetail();
  }, [fsoId]);

  const loadFSODetail = async () => {
    try {
      setIsLoading(true);
      const detail = await getFSOById(fsoId);
      setFsoDetail(detail);
    } catch (error) {
      console.error('Error loading FSO detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={24} color="#4CAF50" />;
      case 'processing':
        return <ActivityIndicator size={24} color="#FF9800" />;
      case 'pending':
        return <ClockIcon size={24} color="#FFC107" />;
      case 'failed':
        return <ExclamationTriangleIcon size={24} color="#F44336" />;
      default:
        return <ClockIcon size={24} color="#95A5A6" />;
    }
  };

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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

  const handleCallClient = () => {
    if (fsoDetail?.clientPhone) {
      Linking.openURL(`tel:${fsoDetail.clientPhone}`);
    }
  };

  const handleEmailClient = () => {
    if (fsoDetail?.clientEmail) {
      Linking.openURL(`mailto:${fsoDetail.clientEmail}`);
    }
  };

  const handleOpenMap = () => {
    if (fsoDetail?.coordinates) {
      const { latitude, longitude } = fsoDetail.coordinates;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#4A90E2', '#50A3E5', '#5CB3E8']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Cargando detalles...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!fsoDetail) {
    return (
      <LinearGradient
        colors={['#4A90E2', '#50A3E5', '#5CB3E8']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <ExclamationTriangleIcon size={48} color="#fff" />
            <Text style={styles.errorText}>FSO no encontrado</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
            <TouchableOpacity
              style={styles.backIconButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftIcon size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Detalle FSO</Text>
              <Text style={styles.headerSubtitle}>
                #{fsoDetail.orderNumber}
              </Text>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                {getStatusIcon(fsoDetail.status)}
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>Estado del FSO</Text>
                  <Text
                    style={[
                      styles.statusValue,
                      { color: getStatusColor(fsoDetail.status) },
                    ]}
                  >
                    {getStatusText(fsoDetail.status)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Client Information */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Información del Cliente</Text>

              <View style={styles.infoRow}>
                <UserIcon size={20} color="#4A90E2" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Nombre</Text>
                  <Text style={styles.infoValue}>{fsoDetail.clientName}</Text>
                </View>
              </View>

              {fsoDetail.clientPhone && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={handleCallClient}
                >
                  <PhoneIcon size={20} color="#4A90E2" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Teléfono</Text>
                    <Text style={[styles.infoValue, styles.linkText]}>
                      {fsoDetail.clientPhone}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {fsoDetail.clientEmail && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={handleEmailClient}
                >
                  <EnvelopeIcon size={20} color="#4A90E2" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={[styles.infoValue, styles.linkText]}>
                      {fsoDetail.clientEmail}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.infoRow} onPress={handleOpenMap}>
                <MapPinIcon size={20} color="#4A90E2" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Dirección</Text>
                  <Text style={[styles.infoValue, styles.linkText]}>
                    {fsoDetail.address}
                  </Text>
                </View>
                <MapIcon size={16} color="#4A90E2" />
              </TouchableOpacity>
            </View>

            {/* Service Information */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Información del Servicio</Text>

              <View style={styles.infoRow}>
                <DocumentTextIcon size={20} color="#4A90E2" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Número de Orden</Text>
                  <Text style={styles.infoValue}>{fsoDetail.orderNumber}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <WrenchScrewdriverIcon size={20} color="#4A90E2" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Tipo de Servicio</Text>
                  <Text style={styles.infoValue}>{fsoDetail.serviceType}</Text>
                </View>
              </View>

              {fsoDetail.technician && (
                <View style={styles.infoRow}>
                  <UserIcon size={20} color="#4A90E2" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Técnico Asignado</Text>
                    <Text style={styles.infoValue}>{fsoDetail.technician}</Text>
                  </View>
                </View>
              )}

              {fsoDetail.scheduleDate && (
                <View style={styles.infoRow}>
                  <CalendarDaysIcon size={20} color="#4A90E2" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Fecha Programada</Text>
                    <Text style={styles.infoValue}>
                      {formatDate(fsoDetail.scheduleDate)}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Timeline */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Historial</Text>

              <View style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Documento Subido</Text>
                  <Text style={styles.timelineDate}>
                    {formatDate(fsoDetail.uploadedAt)}
                  </Text>
                  <Text style={styles.timelineDescription}>
                    Archivo: {fsoDetail.fileName} (
                    {formatFileSize(fsoDetail.fileSize)})
                  </Text>
                </View>
              </View>

              {fsoDetail.processedAt && (
                <View style={styles.timelineItem}>
                  <View
                    style={[styles.timelineDot, styles.timelineDotCompleted]}
                  />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>
                      Procesamiento Completado
                    </Text>
                    <Text style={styles.timelineDate}>
                      {formatDate(fsoDetail.processedAt)}
                    </Text>
                    <Text style={styles.timelineDescription}>
                      Datos extraídos y validados exitosamente
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Notes */}
            {fsoDetail.notes && (
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Notas</Text>
                <View style={styles.notesContainer}>
                  <ChatBubbleLeftRightIcon size={20} color="#4A90E2" />
                  <Text style={styles.notesText}>{fsoDetail.notes}</Text>
                </View>
              </View>
            )}

            {/* Attachments */}
            {fsoDetail.attachments && fsoDetail.attachments.length > 0 && (
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Archivos Adjuntos</Text>
                {fsoDetail.attachments.map((attachment, index) => (
                  <View key={index} style={styles.attachmentItem}>
                    <PaperClipIcon size={16} color="#4A90E2" />
                    <Text style={styles.attachmentText}>{attachment}</Text>
                  </View>
                ))}
              </View>
            )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 24,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginTop: 2,
  },
  linkText: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  timelineItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#BDC3C7',
    marginTop: 4,
    marginRight: 16,
  },
  timelineDotCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  timelineDate: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 4,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  attachmentText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});

export default FSODetailScreen;
