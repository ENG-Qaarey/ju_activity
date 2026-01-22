import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart3, Users, Calendar, MapPin, CheckCircle2, AlertCircle, ChevronRight, Activity } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function CoordinatorAttendance() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Attendance</ThemedText>
                <ThemedText style={styles.subtitle}>Track participation metrics</ThemedText>
            </View>
            <View style={styles.globalRate}>
                <Text style={styles.rateVal}>94%</Text>
                <Text style={styles.rateLab}>Avg Rate</Text>
            </View>
        </View>

        {/* Summary */}
        <GlassCard style={styles.summaryCard}>
            <View style={styles.sRow}>
                <View style={styles.sItem}>
                    <Text style={styles.sVal}>1.2k</Text>
                    <Text style={styles.sLab}>Checked In</Text>
                </View>
                <View style={styles.vLine} />
                <View style={styles.sItem}>
                    <Text style={styles.sVal}>42</Text>
                    <Text style={styles.sLab}>Absent</Text>
                </View>
                <View style={styles.vLine} />
                <View style={styles.sItem}>
                    <Text style={[styles.sVal, { color: '#F59E0B' }]}>8</Text>
                    <Text style={styles.sLab}>Excused</Text>
                </View>
            </View>
        </GlassCard>

        {/* Active Activities Attendance */}
        <ThemedText style={styles.sectionTitle}>Active Tracking</ThemedText>
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            <AttendanceActivityItem 
                title="UI/UX Masterclass" 
                stats="26/30 Present" 
                percent={86} 
                status="Live"
            />
            <AttendanceActivityItem 
                title="JU Open Day 2026" 
                stats="138/142 Present" 
                percent={97} 
                status="Active"
            />
            <AttendanceActivityItem 
                title="Leadership Seminar" 
                stats="120/120 Present" 
                percent={100} 
                status="Finished"
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function AttendanceActivityItem({ title, stats, percent, status }: any) {
    const isLive = status === 'Live';
    return (
        <GlassCard style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cLeft}>
                    <View style={[styles.aIcon, { backgroundColor: isLive ? '#22C55E20' : '#F1F5F9' }]}>
                        <Activity size={18} color={isLive ? '#22C55E' : '#64748B'} />
                    </View>
                    <ThemedText style={styles.cTitle}>{title}</ThemedText>
                </View>
                <TouchableOpacity style={styles.trackBtn}>
                    <Text style={styles.trackText}>{isLive ? 'Manage' : 'Report'}</Text>
                    <ChevronRight size={14} color="#0EA5E9" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.progArea}>
                <View style={styles.progLabels}>
                    <Text style={styles.pStat}>{stats}</Text>
                    <Text style={styles.pPerc}>{percent}%</Text>
                </View>
                <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: percent > 90 ? '#22C55E' : '#0EA5E9' }]} />
                </View>
            </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  globalRate: { alignItems: 'center', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 12 },
  rateVal: { fontSize: 18, fontWeight: '800', color: '#22C55E' },
  rateLab: { fontSize: 10, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' },
  summaryCard: { padding: 16, marginBottom: 32 },
  sRow: { flexDirection: 'row', justifyContent: 'space-between' },
  sItem: { flex: 1, alignItems: 'center' },
  sVal: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  sLab: { fontSize: 11, color: '#94A3B8', fontWeight: '700', marginTop: 2 },
  vLine: { width: 1, height: '100%', backgroundColor: '#F1F5F9' },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  aIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  trackBtn: { flexDirection: 'row', alignItems: 'center' },
  trackText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9', marginRight: 2 },
  progArea: { marginTop: 4 },
  progLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  pStat: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  pPerc: { fontSize: 12, color: '#1E293B', fontWeight: '800' },
  barBg: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
});
