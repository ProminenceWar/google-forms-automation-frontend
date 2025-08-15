import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
} from 'react-native-heroicons/solid';

const { width: screenWidth } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  // Mock data for daily forms
  const todayForms = [
    {
      id: 1,
      orderNumber: '12345',
      client: 'Juan Pérez',
      status: 'completed',
      time: '09:30',
    },
    {
      id: 2,
      orderNumber: '12346',
      client: 'María García',
      status: 'pending',
      time: '10:15',
    },
    {
      id: 3,
      orderNumber: '12347',
      client: 'Carlos López',
      status: 'completed',
      time: '11:45',
    },
  ];

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
    formsToday: 5,
    formsCompleted: 3,
    pendingTasks: 2,
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
                <Text style={styles.nameText}>Anna Marchel</Text>
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
                <TouchableOpacity key={form.id} style={styles.formItem}>
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
                    <Text style={styles.formClient}>{form.client}</Text>
                  </View>
                  <Text style={styles.formTime}>{form.time}</Text>
                </TouchableOpacity>
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
    fontSize: 12,
    color: '#95A5A6',
    fontWeight: '500',
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
