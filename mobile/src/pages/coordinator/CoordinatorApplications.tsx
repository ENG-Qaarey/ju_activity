import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Check, X, Clock, User, FileText, ChevronRight, Filter, ArrowLeft, Search, Zap } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function CoordinatorApplications() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
       {/* Premium Navigation */}
       {/* <View style={styles.navBar}>
        <TouchableOpacity style={[styles.navIconBtn, { backgroundColor: theme.card , marginTop: -25, marginLeft: 300 }]} onPress={() => router.back()}>
          <Search size={20} color={theme.text} />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
            <View>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Review Applications</Text>
                <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Filter and process student participation</Text>
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Filter size={18} color={theme.primary} />
            </TouchableOpacity>
        </View>

        {/* Analytic Stats Grid */}
        <View style={styles.statsGrid}>
            <StatCard icon={Clock} label="Pending" value="28" color="#F59E0B" theme={theme} />
            <StatCard icon={Check} label="Approved" value="142" color="#22C55E" theme={theme} />
            <StatCard icon={Zap} label="Growth" value="+12%" color="#0EA5E9" theme={theme} />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Awaiting Action</Text>
            <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: theme.primary }]}>View All</Text>
            </TouchableOpacity>
        </View>

        {/* Application Feed */}
        <View style={styles.list}>
           <ApplicationItem 
                student="Muscab Axmed" 
                id="ID-2024-001" 
                activity="UI/UX Masterclass" 
                time="5 mins ago" 
                status="Pending" 
                avatar="https://i.pravatar.cc/150?u=muscab"
                theme={theme}
            />
           <ApplicationItem 
                student="Fatuma Farah" 
                id="ID-2024-042" 
                activity="UI/UX Masterclass" 
                time="42 mins ago" 
                status="Pending" 
                avatar="https://i.pravatar.cc/150?u=fatuma"
                theme={theme}
            />
           <ApplicationItem 
                student="Axmed Qaarey" 
                id="ID-2024-115" 
                activity="JU Open Day 2026" 
                time="2 hours ago" 
                status="Approved" 
                avatar="https://i.pravatar.cc/150?u=axmed"
                theme={theme}
            />
           <ApplicationItem 
                student="Deeqa Warsame" 
                id="ID-2024-098" 
                activity="Leadership Seminar" 
                time="Yesterday" 
                status="Rejected" 
                avatar="https://i.pravatar.cc/150?u=deeqa"
                theme={theme}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatCard({ icon: Icon, label, value, color, theme }: any) {
    return (
        <GlassCard style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
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
            <View style={[styles.avatarBox, { borderColor: theme.border }]}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
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

      <View style={[styles.activityDetails, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <View style={[styles.activityIconBox, { backgroundColor: theme.primary + '15' }]}>
                <FileText size={16} color={theme.primary} />
          </View>
          <View style={{ flex: 1 }}>
              <Text style={[styles.activityLabel, { color: theme.textSecondary }]}>Requesting Access to</Text>
              <Text style={[styles.activityTitle, { color: theme.text }]} numberOfLines={1}>{activity}</Text>
          </View>
      </View>

      <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
          <View style={styles.timeBox}>
            <Clock size={12} color={theme.textSecondary} />
            <Text style={[styles.timeValue, { color: theme.textSecondary }]}>{time}</Text>
          </View>
          
          {isPending ? (
              <View style={styles.actionGrid}>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF444415', borderColor: '#EF444430' }]}>
                    <X size={16} color="#EF4444" />
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary, borderColor: theme.primary }]}>
                    <Check size={16} color="#FFFFFF" />
                    <Text style={styles.approveText}>Approve</Text>
                  </TouchableOpacity>
              </View>
          ) : (
                <TouchableOpacity style={[styles.detailsBtn, { backgroundColor: theme.background, borderColor: theme.border }]}>
                    <Text style={[styles.detailsBtnText, { color: theme.textSecondary }]}>Full Entry</Text>
                    <ChevronRight size={14} color={theme.icon} />
                </TouchableOpacity>
          )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 60 },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  navIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '800',
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  statCard: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 24, borderWidth: 1 },
  statIconContainer: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statValue: { fontSize: 20, fontWeight: '900' },
  statLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  viewAllText: { fontSize: 13, fontWeight: '700' },
  list: { gap: 14 },
  card: { padding: 16, borderRadius: 24, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarBox: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  studentName: { fontSize: 15, fontWeight: '800' },
  studentId: { fontSize: 11, marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 5 },
  statusDot: { width: 4, height: 4, borderRadius: 2 },
  statusText: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  activityDetails: { flexDirection: 'row', gap: 12, padding: 12, borderRadius: 16, marginBottom: 16, borderWidth: 1 },
  activityIconBox: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  activityLabel: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  activityTitle: { fontSize: 13, fontWeight: '800', marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTopWidth: 1 },
  timeBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeValue: { fontSize: 11, fontWeight: '700' },
  actionGrid: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1 },
  rejectText: { color: '#EF4444', fontSize: 12, fontWeight: '800' },
  approveText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  detailsBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, gap: 6, borderWidth: 1 },
  detailsBtnText: { fontSize: 11, fontWeight: '800' },
});
