import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Check, X, Clock, User, FileText, ChevronRight, Filter } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';

export default function AdminApplications() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>Applications</Text>
                <Text style={styles.headerSubtitle}>Manage and review student requests</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={18} color="#0EA5E9" />
            </TouchableOpacity>
        </View>

        {/* Premium Stats Grid */}
        <View style={styles.statsGrid}>
            <StatCard icon={Clock} label="Pending" value="32" color="#F59E0B" />
            <StatCard icon={Check} label="Approved" value="128" color="#22C55E" />
            <StatCard icon={X} label="Rejected" value="5" color="#EF4444" />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Applications</Text>
            <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.list}>
           <ApplicationItem 
                student="axmed muscab" 
                id="ST-2024-001" 
                activity="Annual Tech Symposium" 
                time="10 mins ago" 
                status="Pending" 
                avatar="https://github.com/shadcn.png"
            />
           <ApplicationItem 
                student="fatuma ali" 
                id="ST-2024-042" 
                activity="Beach Cleanup Campaign" 
                time="2 hours ago" 
                status="Pending" 
                avatar="https://ui-avatars.com/api/?name=Fatuma+Ali&background=random"
            />
           <ApplicationItem 
                student="hassan farah" 
                id="ST-2024-115" 
                activity="React Native Workshop" 
                time="Yesterday" 
                status="Approved" 
                avatar="https://ui-avatars.com/api/?name=Hassan+Farah&background=random"
            />
           <ApplicationItem 
                student="deeqa warsame" 
                id="ST-2024-098" 
                activity="Football Inter-Dept" 
                time="2 days ago" 
                status="Rejected" 
                avatar="https://ui-avatars.com/api/?name=Deeqa+Warsame&background=random"
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
    return (
        <GlassCard style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
                <Icon size={18} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </GlassCard>
    );
}

function ApplicationItem({ student, id, activity, time, status, avatar }: any) {
  const isPending = status === 'Pending';
  const isApproved = status === 'Approved';
  const isRejected = status === 'Rejected';
  
  const statusColor = isApproved ? '#22C55E' : isRejected ? '#EF4444' : '#F59E0B';
  const statusBg = isApproved ? '#F0FDF4' : isRejected ? '#FEF2F2' : '#FFFBEB';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.studentInfo}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View>
                <Text style={styles.studentName}>{student}</Text>
                <Text style={styles.studentId}>{id}</Text>
            </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>

      <View style={styles.activityDetails}>
          <View style={styles.activityIconBox}>
                <FileText size={16} color="#0EA5E9" />
          </View>
          <View style={{ flex: 1 }}>
              <Text style={styles.activityLabel}>Activity Requested</Text>
              <Text style={styles.activityTitle}>{activity}</Text>
          </View>
      </View>

      <View style={styles.cardFooter}>
          <View style={styles.timeBox}>
            <Clock size={12} color="#94A3B8" />
            <Text style={styles.timeValue}>{time}</Text>
          </View>
          
          {isPending ? (
              <View style={styles.actionGrid}>
                  <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
                    <X size={16} color="#EF4444" />
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
                    <Check size={16} color="#FFFFFF" />
                    <Text style={styles.approveText}>Approve</Text>
                  </TouchableOpacity>
              </View>
          ) : (
                <TouchableOpacity style={styles.detailsBtn}>
                    <Text style={styles.detailsBtnText}>View Full Profile</Text>
                    <ChevronRight size={14} color="#64748B" />
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
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: { flex: 1, padding: 9, alignItems: 'center', borderRadius: 20 },
  statIconContainer: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 10, color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  viewAllText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9' },
  list: { gap: 10 },
  card: { padding: 12, borderRadius: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F1F5F9' },
  studentName: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  studentId: { fontSize: 10, color: '#94A3B8', marginTop: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  statusDot: { width: 4, height: 4, borderRadius: 2 },
  statusText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  activityDetails: { flexDirection: 'row', gap: 10, backgroundColor: '#F8FAFC', padding: 8, borderRadius: 12, marginBottom: 12 },
  activityIconBox: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#F0F9FF', justifyContent: 'center', alignItems: 'center' },
  activityLabel: { fontSize: 8, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' },
  activityTitle: { fontSize: 12, fontWeight: '700', color: '#1E293B', marginTop: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeBox: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timeValue: { fontSize: 10, color: '#94A3B8', fontWeight: '600' },
  actionGrid: { flexDirection: 'row', gap: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  rejectBtn: { backgroundColor: '#FEF2F2' },
  rejectText: { color: '#EF4444', fontSize: 11, fontWeight: '800' },
  approveBtn: { backgroundColor: '#0EA5E9' },
  approveText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  detailsBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#F8FAFC', borderRadius: 8, gap: 4 },
  detailsBtnText: { fontSize: 10, fontWeight: '700', color: '#64748B' },
});
