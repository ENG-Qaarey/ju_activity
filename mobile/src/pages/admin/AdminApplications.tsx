import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Check, X, Clock, User, FileText, ChevronRight, Filter } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminApplications() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
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
            <StatCard icon={Clock} label="Pending" value="32" color="#F59E0B" theme={theme} />
            <StatCard icon={Check} label="Approved" value="128" color="#22C55E" theme={theme} />
            <StatCard icon={X} label="Rejected" value="5" color="#EF4444" theme={theme} />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Applications</Text>
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
                theme={theme}
            />
           <ApplicationItem 
                student="fatuma ali" 
                id="ST-2024-042" 
                activity="Beach Cleanup Campaign" 
                time="2 hours ago" 
                status="Pending" 
                avatar="https://ui-avatars.com/api/?name=Fatuma+Ali&background=random"
                theme={theme}
            />
           <ApplicationItem 
                student="hassan farah" 
                id="ST-2024-115" 
                activity="React Native Workshop" 
                time="Yesterday" 
                status="Approved" 
                avatar="https://ui-avatars.com/api/?name=Hassan+Farah&background=random"
                theme={theme}
            />
           <ApplicationItem 
                student="deeqa warsame" 
                id="ST-2024-098" 
                activity="Football Inter-Dept" 
                time="2 days ago" 
                status="Rejected" 
                avatar="https://ui-avatars.com/api/?name=Deeqa+Warsame&background=random"
                theme={theme}
            />
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

function ApplicationItem({ student, id, activity, time, status, avatar, theme }: any) {
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
                <Text style={[styles.studentId, { color: theme.textSecondary }]}>{id}</Text>
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
                  <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn, { backgroundColor: '#EF444415', borderColor: '#EF444430' }]}>
                    <X size={16} color="#EF4444" />
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
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
