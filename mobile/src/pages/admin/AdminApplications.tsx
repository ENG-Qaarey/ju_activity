import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Check, X, Clock, User, FileText, ChevronRight, Filter } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

import { client } from '@/src/lib/api';
import { ENDPOINTS } from '@/src/lib/config';

export default function AdminApplications() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [applications, setApplications] = React.useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [stats, setStats] = React.useState({ pending: 0, approved: 0, rejected: 0 });

  const fetchApplications = async () => {
    try {
      const data = await client.get('/applications');
      if (Array.isArray(data)) {
        setApplications(data);
        
        // Calculate stats
        const pending = data.filter(app => app.status === 'pending').length;
        const approved = data.filter(app => app.status === 'approved').length;
        const rejected = data.filter(app => app.status === 'rejected').length;
        
        setStats({ pending, approved, rejected });
      }
    } catch (error) {
      console.log('Error fetching applications:', error);
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  const handleApprove = async (id: string) => {
    try {
      await client.put(`/applications/${id}/status`, { status: 'approved' });
      Alert.alert('Success', 'Application approved successfully');
      await fetchApplications();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to approve application');
    }
  };

  const handleReject = async (id: string) => {
    Alert.alert(
      'Reject Application',
      'Are you sure you want to reject this application?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              await client.put(`/applications/${id}/status`, { status: 'rejected' });
              Alert.alert('Success', 'Application rejected');
              await fetchApplications();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to reject application');
            }
          }
        }
      ]
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={theme.text}
            colors={[theme.text]}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
            <View>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Applications</Text>
                <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Manage and review student requests</Text>
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Filter size={18} color={theme.primary} />
            </TouchableOpacity>
        </View>

        {/* Premium Stats Grid */}
        <View style={styles.statsGrid}>
            <StatCard icon={Clock} label="Pending" value={stats.pending.toString()} color="#F59E0B" theme={theme} />
            <StatCard icon={Check} label="Approved" value={stats.approved.toString()} color="#22C55E" theme={theme} />
            <StatCard icon={X} label="Rejected" value={stats.rejected.toString()} color="#EF4444" theme={theme} />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Applications</Text>
            <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.list}>
           {applications.length > 0 ? applications.map((app) => (
             <ApplicationItem 
               key={app.id}
               id={app.id}
               student={app.studentName || 'Unknown'} 
               studentId={app.studentId?.slice(0, 12) || 'N/A'} 
               activity={app.activityTitle || 'Unknown Activity'} 
               time={formatTime(app.createdAt)} 
               status={app.status.charAt(0).toUpperCase() + app.status.slice(1)} 
               avatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.studentName || 'User')}&background=random`}
               theme={theme}
               onApprove={handleApprove}
               onReject={handleReject}
             />
           )) : (
             <Text style={{ textAlign: 'center', color: theme.textSecondary, marginTop: 20 }}>No applications found.</Text>
           )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatCard({ icon: Icon, label, value, color, theme }: any) {
    return (
        <GlassCard style={[styles.statCard, { backgroundColor: theme.card }]}>
            <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
                <Icon size={18} color={color} />
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
        </GlassCard>
    );
}

function ApplicationItem({ id, student, studentId, activity, time, status, avatar, theme, onApprove, onReject }: any) {
  const isPending = status === 'Pending';
  const isApproved = status === 'Approved';
  const isRejected = status === 'Rejected';
  
  const statusColor = isApproved ? '#22C55E' : isRejected ? '#EF4444' : '#F59E0B';
  const statusBg = isApproved ? '#22C55E15' : isRejected ? '#EF444415' : '#F59E0B15';
  
  return (
    <GlassCard style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.cardHeader}>
        <View style={styles.studentInfo}>
            <Image source={{ uri: avatar }} style={[styles.avatar, { backgroundColor: theme.border }]} />
            <View>
                <Text style={[styles.studentName, { color: theme.text }]}>{student}</Text>
                <Text style={[styles.studentId, { color: theme.textSecondary }]}>{studentId}</Text>
            </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>

      <View style={[styles.activityDetails, { backgroundColor: theme.background }]}>
          <View style={[styles.activityIconBox, { backgroundColor: theme.primary + '15' }]}>
                <FileText size={16} color={theme.primary} />
          </View>
          <View style={{ flex: 1 }}>
              <Text style={[styles.activityLabel, { color: theme.textSecondary }]}>Activity Requested</Text>
              <Text style={[styles.activityTitle, { color: theme.text }]}>{activity}</Text>
          </View>
      </View>

      <View style={styles.cardFooter}>
          <View style={styles.timeBox}>
            <Clock size={12} color={theme.textSecondary} />
            <Text style={[styles.timeValue, { color: theme.textSecondary }]}>{time}</Text>
          </View>
          
          {isPending ? (
              <View style={styles.actionGrid}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.rejectBtn, { backgroundColor: '#EF444415', borderColor: '#EF444430' }]}
                    onPress={() => onReject?.(id)}
                  >
                    <X size={16} color="#EF4444" />
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.approveBtn]}
                    onPress={() => onApprove?.(id)}
                  >
                    <Check size={16} color="#FFFFFF" />
                    <Text style={styles.approveText}>Approve</Text>
                  </TouchableOpacity>
              </View>
          ) : (
                <TouchableOpacity style={[styles.detailsBtn, { backgroundColor: theme.background }]}>
                    <Text style={[styles.detailsBtnText, { color: theme.textSecondary }]}>View Full Profile</Text>
                    <ChevronRight size={14} color={theme.icon} />
                </TouchableOpacity>
          )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingTop: 14, paddingBottom: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: { flex: 1, padding: 9, alignItems: 'center', borderRadius: 20 },
  statIconContainer: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  viewAllText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9' },
  list: { gap: 10 },
  card: { padding: 12, borderRadius: 16, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 10 },
  studentName: { fontSize: 14, fontWeight: '800' },
  studentId: { fontSize: 10, marginTop: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  statusDot: { width: 4, height: 4, borderRadius: 2 },
  statusText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  activityDetails: { flexDirection: 'row', gap: 10, padding: 8, borderRadius: 12, marginBottom: 12 },
  activityIconBox: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  activityLabel: { fontSize: 8, fontWeight: '700', textTransform: 'uppercase' },
  activityTitle: { fontSize: 12, fontWeight: '700', marginTop: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeBox: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timeValue: { fontSize: 10, fontWeight: '600' },
  actionGrid: { flexDirection: 'row', gap: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1 },
  rejectBtn: { },
  rejectText: { color: '#EF4444', fontSize: 11, fontWeight: '800' },
  approveBtn: { backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' },
  approveText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  detailsBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, gap: 4 },
  detailsBtnText: { fontSize: 10, fontWeight: '700' },
});
