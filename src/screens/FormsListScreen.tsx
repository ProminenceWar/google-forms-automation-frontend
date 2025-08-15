import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  CalendarDaysIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
} from 'react-native-heroicons/solid';

const { width: screenWidth } = Dimensions.get('window');

interface FormEntry {
  id: number;
  orderNumber: string;
  client: string;
  technician: string;
  status: 'completed' | 'pending' | 'in-progress' | 'cancelled';
  date: string;
  time: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
}

export const FormsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for forms
  const formsData: FormEntry[] = [
    {
      id: 1,
      orderNumber: '12345',
      client: 'Juan Pérez',
      technician: 'Pedro G.',
      status: 'completed',
      date: '2025-08-15',
      time: '09:30',
      type: 'Installation',
      priority: 'high',
    },
    {
      id: 2,
      orderNumber: '12346',
      client: 'María García',
      technician: 'Pedro G.',
      status: 'pending',
      date: '2025-08-15',
      time: '10:15',
      type: 'Maintenance',
      priority: 'medium',
    },
    {
      id: 3,
      orderNumber: '12347',
      client: 'Carlos López',
      technician: 'Pedro G.',
      status: 'in-progress',
      date: '2025-08-15',
      time: '11:45',
      type: 'Inspection',
      priority: 'low',
    },
    {
      id: 4,
      orderNumber: '12348',
      client: 'Ana Rodríguez',
      technician: 'Pedro G.',
      status: 'cancelled',
      date: '2025-08-14',
      time: '14:20',
      type: 'Installation',
      priority: 'high',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={20} color="#4CAF50" />;
      case 'pending':
        return <ClockIcon size={20} color="#FF9800" />;
      case 'in-progress':
        return <ArrowRightIcon size={20} color="#2196F3" />;
      case 'cancelled':
        return <ExclamationTriangleIcon size={20} color="#F44336" />;
      default:
        return <ClockIcon size={20} color="#95A5A6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'in-progress':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#95A5A6';
    }
  };

  const filteredForms = formsData.filter(form => {
    const matchesSearch =
      form.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.orderNumber.includes(searchQuery);
    const matchesFilter =
      selectedFilter === 'all' || form.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { id: 'all', label: 'All', count: formsData.length },
    {
      id: 'completed',
      label: 'Completed',
      count: formsData.filter(f => f.status === 'completed').length,
    },
    {
      id: 'pending',
      label: 'Pending',
      count: formsData.filter(f => f.status === 'pending').length,
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      count: formsData.filter(f => f.status === 'in-progress').length,
    },
  ];

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
                <Text style={styles.headerTitle}>Forms</Text>
                <Text style={styles.headerSubtitle}>
                  Manage your daily inspections
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => (navigation as any).navigate('NewForm')}
              >
                <PlusIcon size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <MagnifyingGlassIcon size={20} color="#95A5A6" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search forms..."
                placeholderTextColor="#95A5A6"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.filterButton}>
                <FunnelIcon size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersContainer}
            >
              {filterOptions.map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterTab,
                    selectedFilter === filter.id && styles.filterTabActive,
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      selectedFilter === filter.id &&
                        styles.filterTabTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                  <View
                    style={[
                      styles.filterBadge,
                      selectedFilter === filter.id && styles.filterBadgeActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterBadgeText,
                        selectedFilter === filter.id &&
                          styles.filterBadgeTextActive,
                      ]}
                    >
                      {filter.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Forms List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {filteredForms.map(form => (
              <TouchableOpacity key={form.id} style={styles.formCard}>
                <View style={styles.formHeader}>
                  <View style={styles.formInfo}>
                    <Text style={styles.formOrderNumber}>
                      #{form.orderNumber}
                    </Text>
                    <Text style={styles.formClient}>{form.client}</Text>
                  </View>
                  <View style={styles.formStatus}>
                    {getStatusIcon(form.status)}
                  </View>
                </View>

                <View style={styles.formDetails}>
                  <View style={styles.formDetailItem}>
                    <CalendarDaysIcon size={16} color="#95A5A6" />
                    <Text style={styles.formDetailText}>{form.date}</Text>
                  </View>
                  <View style={styles.formDetailItem}>
                    <ClockIcon size={16} color="#95A5A6" />
                    <Text style={styles.formDetailText}>{form.time}</Text>
                  </View>
                </View>

                <View style={styles.formFooter}>
                  <View style={styles.formType}>
                    <Text style={styles.formTypeText}>{form.type}</Text>
                  </View>
                  <View
                    style={[
                      styles.formStatusBadge,
                      { backgroundColor: `${getStatusColor(form.status)}20` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.formStatusText,
                        { color: getStatusColor(form.status) },
                      ]}
                    >
                      {form.status.charAt(0).toUpperCase() +
                        form.status.slice(1).replace('-', ' ')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {filteredForms.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No forms found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try adjusting your search or filters
                </Text>
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 12,
  },
  filterButton: {
    padding: 4,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    gap: 8,
  },
  filterTabActive: {
    backgroundColor: '#fff',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  filterTabTextActive: {
    color: '#4A90E2',
  },
  filterBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: '#4A90E2',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  filterBadgeTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for bottom tab bar
  },
  formCard: {
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
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  formInfo: {
    flex: 1,
  },
  formOrderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  formClient: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  formStatus: {
    padding: 4,
  },
  formDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  formDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  formDetailText: {
    fontSize: 12,
    color: '#95A5A6',
    fontWeight: '500',
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formType: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  formTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
  },
  formStatusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  formStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
});
