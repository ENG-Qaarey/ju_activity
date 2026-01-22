import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Activity, Clock, MapPin, Users, Zap, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function MonitorActivities() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Real-time Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Live Monitor</ThemedText>
                <View style={styles.liveIndicator}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.liveText}>Real-time updates active</Text>
                </View>
            </View>
            <View style={styles.activeCount}>
                <Text style={styles.activeNum}>4</Text>
                <Text style={styles.activeLabel}>Active Now</Text>
            </View>
        </View>

        {/* Global Pulse Card */}
        <GlassCard style={styles.pulseCard}>
            <View style={styles.pulseRow}>
                 <MonitorStat icon={TrendingUp} label="Total Engaged" value="842" color="#0EA5E9" />
                 <View style={styles.vDivider} />
                 <MonitorStat icon={Zap} label="Peak Traffic" value="12:45" color="#F59E0B" />
                 <View style={styles.vDivider} />
                 <MonitorStat icon={AlertCircle} label="Error Rate" value="0.02%" color="#22C55E" />
            </View>
        </GlassCard>

        {/* Ongoing List */}
        <ThemedText style={styles.sectionTitle}>Ongoing Activities</ThemedText>
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
           <LiveItem 
                title="Annual Tech Symposium" 
                location="Main Hall" 
                progress={65} 
                attendees="240/300"
                status="Active"
            />
           <LiveItem 
                title="Football Inter-Dept" 
                location="Stadium" 
                progress={88} 
                attendees="480/500"
                status="Active"
            />
           <LiveItem 
                title="Web Design Workshop" 
                location="IT Lab 02" 
                progress={20} 
                attendees="25/30"
                status="Starting"
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function MonitorStat({ icon: Icon, label, value, color }: any) {
    return (
        <View style={styles.mStat}>
            <Icon size={18} color={color} />
            <Text style={styles.mStatVal}>{value}</Text>
            <Text style={styles.mStatLabel}>{label}</Text>
        </View>
    )
}

function LiveItem({ title, location, progress, attendees, status }: any) {
  const statusColor = status === 'Active' ? '#22C55E' : '#0EA5E9';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
            <ThemedText style={styles.cardTitle}>{title}</ThemedText>
            <View style={styles.locRow}>
                <MapPin size={12} color="#94A3B8" />
                <Text style={styles.locText}>{location}</Text>
            </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
          <View style={styles.labels}>
              <Text style={styles.progLabel}>Attendance Progress</Text>
              <Text style={styles.progVal}>{attendees}</Text>
          </View>
          <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${progress}%`, backgroundColor: statusColor }]} />
          </View>
      </View>

      <TouchableOpacity style={styles.manageBtn}>
          <Text style={styles.manageText}>View Details</Text>
          <ChevronRight size={16} color="#0EA5E9" />
      </TouchableOpacity>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  liveText: { fontSize: 12, color: '#22C55E', fontWeight: '600' },
  activeCount: { alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  activeNum: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  activeLabel: { fontSize: 10, fontWeight: '700', color: '#4FA3F7', textTransform: 'uppercase', marginTop: 2 },
  pulseCard: { padding: 16, marginBottom: 32 },
  pulseRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  mStat: { alignItems: 'center' },
  mStatVal: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginTop: 4 },
  mStatLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 2, textTransform: 'uppercase' },
  vDivider: { width: 1, height: 40, backgroundColor: '#F1F5F9' },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 18, marginBottom: 16 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locText: { fontSize: 12, color: '#94A3B8' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700' },
  progressContainer: { marginBottom: 16 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progLabel: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  progVal: { fontSize: 12, color: '#1E293B', fontWeight: '700' },
  barBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  manageBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  manageText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9', marginRight: 2 },
});
