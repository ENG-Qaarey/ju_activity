import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Check, X, Clock, User, FileText, ChevronRight, Filter } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminApplications() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header Stats */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Applications</ThemedText>
                <ThemedText style={styles.subtitle}>Review and process requests</ThemedText>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statVal}>32</Text>
                <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statVal}>128</Text>
                <Text style={styles.statLabel}>Approved</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={[styles.statVal, { color: '#EF4444' }]}>5</Text>
                <Text style={styles.statLabel}>Rejected</Text>
            </View>
        </View>

        {/* Applications List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
           <ApplicationItem 
                student="axmed muscab" 
                id="ST-2024-001" 
                activity="Annual Tech Symposium" 
                time="10 mins ago" 
                status="Pending" 
            />
           <ApplicationItem 
                student="fatuma ali" 
                id="ST-2024-042" 
                activity="Beach Cleanup Campaign" 
                time="2 hours ago" 
                status="Pending" 
            />
           <ApplicationItem 
                student="hassan farah" 
                id="ST-2024-115" 
                activity="React Native Workshop" 
                time="Yesterday" 
                status="Approved" 
            />
           <ApplicationItem 
                student="deeqa warsame" 
                id="ST-2024-098" 
                activity="Football Inter-Dept" 
                time="2 days ago" 
                status="Rejected" 
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function ApplicationItem({ student, id, activity, time, status }: any) {
  const statusColor = status === 'Approved' ? '#22C55E' : status === 'Rejected' ? '#EF4444' : '#F59E0B';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.studentInfo}>
            <View style={styles.avatarPlaceholder}>
                <User size={20} color="#64748B" />
            </View>
            <View>
                <ThemedText style={styles.studentName}>{student}</ThemedText>
                <Text style={styles.studentId}>{id}</Text>
            </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>

      <View style={styles.activityBox}>
          <FileText size={16} color="#64748B" />
          <Text style={styles.activityName}>{activity}</Text>
      </View>

      <View style={styles.cardFooter}>
          <View style={styles.timeRow}>
            <Clock size={14} color="#94A3B8" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
          
          {status === 'Pending' ? (
              <View style={styles.actions}>
                  <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
                    <X size={18} color="#EF4444" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
                    <Check size={18} color="#FFFFFF" />
                  </TouchableOpacity>
              </View>
          ) : (
                <TouchableOpacity style={styles.viewDetails}>
                    <Text style={styles.viewText}>Details</Text>
                    <ChevronRight size={16} color="#0EA5E9" />
                </TouchableOpacity>
          )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: '#F1F5F9' },
  statVal: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 11, color: '#64748B', fontWeight: '700', marginTop: 4, textTransform: 'uppercase' },
  list: { flex: 1 },
  listContent: { paddingBottom: 40 },
  card: { padding: 16, marginBottom: 16 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  studentName: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  studentId: { fontSize: 12, color: '#94A3B8' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '700' },
  activityBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 12, marginBottom: 16 },
  activityName: { fontSize: 13, fontWeight: '600', color: '#475569' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 12, color: '#94A3B8' },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  rejectBtn: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FEE2E2' },
  approveBtn: { backgroundColor: '#0EA5E9', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  viewDetails: { flexDirection: 'row', alignItems: 'center' },
  viewText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9', marginRight: 2 },
});
