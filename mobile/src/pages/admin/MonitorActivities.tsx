import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Activity, Clock, MapPin, Users, Zap, TrendingUp, 
  AlertCircle, ChevronRight, Calendar, LayoutGrid, Search, Filter 
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

export default function MonitorActivities() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Premium Skyblue Banner */}
        <View style={styles.headerBanner}>
            <View style={styles.bannerContent}>
                <View style={styles.bannerPlaceholder}>
                    <Activity size={24} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <View style={styles.bannerTextContent}>
                    <Text style={styles.bannerTitle}>Monitor Activities</Text>
                    <Text style={styles.bannerSubtitle}>
                        Keep oversight on every event across JU, track coordinators, and see activity statuses instantly.
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.calendarActionBtn}>
                <Calendar size={16} color="#0EA5E9" />
                <Text style={styles.calendarActionText}>View calendar</Text>
            </TouchableOpacity>
        </View>

        {/* Dynamic Pulse Metrics */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Global Pulse</Text>
            <View style={styles.liveIndicatorPill}>
                <View style={styles.pulseDot} />
                <Text style={styles.liveIndicatorText}>Live Feed</Text>
            </View>
        </View>
        <GlassCard style={styles.pulseCard}>
            <View style={styles.pulseRow}>
                 <MonitorStat icon={Users} label="Active Users" value="842" color="#0EA5E9" />
                 <View style={styles.vDivider} />
                 <MonitorStat icon={Zap} label="Peak Time" value="12:45" color="#8B5CF6" />
                 <View style={styles.vDivider} />
                 <MonitorStat icon={Activity} label="Status" value="Optimal" color="#22C55E" />
            </View>
        </GlassCard>

        {/* Directory Header */}
        <View style={styles.directoryHeader}>
            <View>
                <Text style={styles.mainSectionTitle}>All Activities</Text>
                <Text style={styles.mainSectionSubtitle}>Upcoming and ongoing sessions across faculties</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={18} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Activity Feed */}
        <View style={styles.list}>
           <LiveItem 
                title="Annual Tech Symposium" 
                location="Main Hall, Engineering Block" 
                progress={65} 
                attendees="240/300"
                status="Active"
                time="Ends in 45m"
            />
           <LiveItem 
                title="Football Inter-Dept" 
                location="University Stadium" 
                progress={88} 
                attendees="480/500"
                status="Active"
                time="Ends in 20m"
            />
           <LiveItem 
                title="Web Design Workshop" 
                location="IT Lab 02" 
                progress={20} 
                attendees="25/30"
                status="Starting"
                time="Starts now"
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function MonitorStat({ icon: Icon, label, value, color }: any) {
    return (
        <View style={styles.mStat}>
            <View style={[styles.mStatIconBox, { backgroundColor: color + '10' }]}>
                <Icon size={16} color={color} />
            </View>
            <Text style={styles.mStatVal}>{value}</Text>
            <Text style={styles.mStatLabel}>{label}</Text>
        </View>
    )
}

function LiveItem({ title, location, progress, attendees, status, time }: any) {
  const isStarting = status === 'Starting';
  const statusColor = isStarting ? '#0EA5E9' : '#22C55E';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.locRow}>
                <MapPin size={12} color="#94A3B8" />
                <Text style={styles.locText}>{location}</Text>
            </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
          <View style={styles.labels}>
              <View style={styles.progLabelGroup}>
                <Users size={12} color="#64748B" />
                <Text style={styles.progLabel}>Attendance</Text>
              </View>
              <Text style={styles.progVal}>{attendees}</Text>
          </View>
          <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${progress}%`, backgroundColor: statusColor }]} />
          </View>
      </View>

      <View style={styles.cardFooter}>
          <View style={styles.timeTag}>
              <Clock size={12} color="#94A3B8" />
              <Text style={styles.timeText}>{time}</Text>
          </View>
          <TouchableOpacity style={styles.manageBtn}>
              <Text style={styles.manageText}>View Feed</Text>
              <ChevronRight size={14} color="#0EA5E9" />
          </TouchableOpacity>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingTop: 14, paddingBottom: 60 },
  headerBanner: { 
    backgroundColor: '#0EA5E9', 
    padding: 24, 
    borderRadius: 28, 
    marginBottom: 24,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8
  },
  bannerContent: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  bannerPlaceholder: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  bannerTextContent: { flex: 1 },
  bannerTitle: { fontSize: 24, fontWeight: '900', color: '#FFFFFF' },
  bannerSubtitle: { fontSize: 13, color: 'rgba(255, 255, 255, 0.9)', marginTop: 4, lineHeight: 18 },
  calendarActionBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    backgroundColor: '#FFFFFF', 
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  calendarActionText: { fontSize: 13, fontWeight: '800', color: '#0EA5E9' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  liveIndicatorPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E' },
  liveIndicatorText: { fontSize: 10, fontWeight: '800', color: '#059669', textTransform: 'uppercase' },
  pulseCard: { padding: 16, marginBottom: 32, borderRadius: 24 },
  pulseRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  vDivider: { width: 1, height: 30, backgroundColor: '#F1F5F9' },
  mStat: { alignItems: 'center' },
  mStatIconBox: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  mStatVal: { fontSize: 16, fontWeight: '900', color: '#1E293B' },
  mStatLabel: { fontSize: 9, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' },
  directoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, paddingHorizontal: 4 },
  mainSectionTitle: { fontSize: 20, fontWeight: '900', color: '#1E293B' },
  mainSectionSubtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  list: { gap: 16 },
  card: { padding: 16, borderRadius: 24 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locText: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start' },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  progressContainer: { marginBottom: 16 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progLabelGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  progLabel: { fontSize: 12, color: '#64748B', fontWeight: '700' },
  progVal: { fontSize: 12, color: '#1E293B', fontWeight: '800' },
  barBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F8FAFC', paddingTop: 16 },
  timeTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timeText: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  manageBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  manageText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9' },
});
