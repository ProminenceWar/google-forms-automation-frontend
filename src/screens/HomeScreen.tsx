import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from 'react-native-heroicons/solid';
import { useLocalStorage, StoredForm } from '../hooks/useLocalStorage';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

const { width: screenWidth } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { loadForms, deleteForm } = useLocalStorage();

  const [forms, setForms] = useState<StoredForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formToDelete, setFormToDelete] = useState<StoredForm | null>(null);

  // Cargar formularios al montar el componente y cada vez que se enfoque la pantalla
  useFocusEffect(
    useCallback(() => {
      loadFormsData();
    }, []),
  );

  const loadFormsData = async () => {
    try {
      setIsLoading(true);
      const loadedForms = await loadForms();
      setForms(loadedForms);
    } catch (error) {
      console.error('Error loading forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteForm = (form: StoredForm) => {
    setFormToDelete(form);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (formToDelete) {
      try {
        await deleteForm(formToDelete.id);
        await loadFormsData(); // Recargar la lista
        setDeleteModalVisible(false);
        setFormToDelete(null);
      } catch (error) {
        console.error('Error deleting form:', error);
        Alert.alert('Error', 'No se pudo eliminar el formulario');
      }
    }
  };

  const handleEditForm = (form: StoredForm) => {
    (navigation as any).navigate('Forms', {
      screen: 'NewForm',
      params: { editFormId: form.id },
    });
  };

  const getTodayForms = () => {
    const today = new Date().toDateString();
    return forms.filter(
      form => new Date(form.createdAt).toDateString() === today,
    );
  };

  const getCompletedFormsCount = () => {
    return forms.filter(form => form.status === 'completed').length;
  };

  const getPendingFormsCount = () => {
    return forms.filter(form => form.status === 'pending').length;
  };

  const getAverageRating = () => {
    const ratedForms = forms.filter(
      form => form.clientRating && form.clientRating > 0,
    );
    if (ratedForms.length === 0) return 0;

    const total = ratedForms.reduce(
      (sum, form) => sum + (form.clientRating || 0),
      0,
    );
    return (total / ratedForms.length).toFixed(1);
  };

  const todayForms = getTodayForms();

  // Mock data for todo list
  const todoItems = [
    { id: 1, task: 'Revisar orden #12348', completed: false, priority: 'high' },
    {
      id: 2,
      task: 'Contactar cliente María G.',
      completed: true,
      priority: 'medium',
    },
    {
      id: 3,
      task: 'Verificar instalación Drop',
      completed: false,
      priority: 'low',
    },
  ];

  const stats = {
    formsToday: todayForms.length,
    formsCompleted: getCompletedFormsCount(),
    pendingTasks: getPendingFormsCount(),
    averageRating: getAverageRating(),
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
              <View style={styles.greeting}>
                <Text style={styles.greetingText}>HELLO!</Text>
                <Text style={styles.nameText}>Pedro García</Text>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <UserCircleIcon size={40} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.formsToday}</Text>
                <Text style={styles.statLabel}>Forms</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.formsCompleted}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.pendingTasks}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Quick Actions */}
            <View style={styles.quickActionsContainer}>
              <TouchableOpacity
                style={styles.primaryAction}
                onPress={() =>
                  (navigation as any).navigate('Forms', { screen: 'NewForm' })
                }
              >
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E8E']}
                  style={styles.actionGradient}
                >
                  <PlusIcon size={24} color="#fff" />
                  <Text style={styles.actionText}>New Form</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryAction}>
                <ClipboardDocumentListIcon size={20} color="#4A90E2" />
                <Text style={styles.secondaryActionText}>View All</Text>
              </TouchableOpacity>
            </View>

            {/* My Lessons / Forms Today */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>My Lessons</Text>
                <Text style={styles.sectionSubtitle}>
                  Today's forms and inspections
                </Text>
              </View>

              {todayForms.map(form => (
                <View key={form.id} style={styles.formItem}>
                  <View style={styles.formIcon}>
                    {form.status === 'completed' ? (
                      <CheckCircleIcon size={20} color="#4CAF50" />
                    ) : (
                      <ClockIcon size={20} color="#FF9800" />
                    )}
                  </View>
                  <View style={styles.formContent}>
                    <Text style={styles.formTitle}>
                      Order #{form.orderNumber}
                    </Text>
                    <Text style={styles.formClient}>{form.clientName}</Text>
                    <Text style={styles.formCompany}>
                      {form.companyInspection}
                    </Text>
                  </View>
                  <View style={styles.formTime}>
                    <Text style={styles.formTimeText}>
                      {new Date(form.createdAt).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  <View style={styles.formActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditForm(form)}
                    >
                      <PencilIcon size={16} color="#1976D2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteForm(form)}
                    >
                      <TrashIcon size={16} color="#E74C3C" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Todo List */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quote of the day</Text>
                <Text style={styles.sectionSubtitle}>Tasks and reminders</Text>
              </View>

              {todoItems.map(item => (
                <TouchableOpacity key={item.id} style={styles.todoItem}>
                  <View
                    style={[
                      styles.todoCheckbox,
                      item.completed && styles.todoCompleted,
                    ]}
                  >
                    {item.completed && (
                      <CheckCircleIcon size={16} color="#4CAF50" />
                    )}
                  </View>
                  <View style={styles.todoContent}>
                    <Text
                      style={[
                        styles.todoText,
                        item.completed && styles.todoTextCompleted,
                      ]}
                    >
                      {item.task}
                    </Text>
                    <View
                      style={[
                        styles.priorityBadge,
                        item.priority === 'high'
                          ? styles.priorityHigh
                          : item.priority === 'medium'
                          ? styles.priorityMedium
                          : styles.priorityLow,
                      ]}
                    >
                      <Text style={styles.priorityText}>{item.priority}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        form={formToDelete}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setFormToDelete(null);
        }}
      />
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryAction: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  formIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  formContent: {
    flex: 1,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  formClient: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  formTime: {
    alignItems: 'center',
    marginRight: 8,
  },
  formTimeText: {
    fontSize: 12,
    color: '#95A5A6',
    fontWeight: '500',
  },
  formCompany: {
    fontSize: 12,
    color: '#BDC3C7',
    marginTop: 1,
  },
  formActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  todoCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  todoCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityHigh: {
    backgroundColor: '#FFEBEE',
  },
  priorityMedium: {
    backgroundColor: '#FFF3E0',
  },
  priorityLow: {
    backgroundColor: '#E8F5E8',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
});
