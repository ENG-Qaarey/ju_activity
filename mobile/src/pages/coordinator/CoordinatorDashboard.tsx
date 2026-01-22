import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Activity, Users, FileText, Bell, BarChart3, Clock, CheckCircle, ChevronRight, Plus } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function CoordinatorDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Coordinator Hub</ThemedText>
          <ThemedText style={styles.subtitle}>Manage your activities and track participants</ThemedText>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <StatBox label="Managed" value="12" icon={Activity} color="#0EA5E9" />
          <StatBox label="Active" value="4" icon={CheckCircle} color="#22C55E" />
          <StatBox label="Reviews" value="28" icon={FileText} color="#F59E0B" />
        </View>

        {/* Action Center */}
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.actionGrid}>
          <ActionButton icon={Plus} label="Create Activity" color="#8B5CF6" />
          <ActionButton icon={Users} label="Check Attendance" color="#EC4899" />
          <ActionButton icon={FileText} label="Review Apps" color="#F97316" />
          <ActionButton icon={Bell} label="Notify Students" color="#06B6D4" />
        </View>

        {/* Engagement Chart Summary */}
        <GlassCard style={styles.chartCard}>
           <View style={styles.chartHeader}>
               <BarChart3 size={20} color="#0EA5E9" />
               <Text style={styles.chartTitle}>Recent Engagement</Text>
           </View>
           <View style={styles.vizPlaceholder}>
               <View style={[styles.bar, { height: '30%' }]} />
               <View style={[styles.bar, { height: '50%' }]} />
               <View style={[styles.bar, { height: '80%', backgroundColor: '#0EA5E9' }]} />
               <View style={[styles.bar, { height: '60%' }]} />
               <View style={[styles.bar, { height: '40%' }]} />
           </View>
        </GlassCard>

        {/* Active Activities Queue */}
        <View style={styles.queueHeader}>
            <ThemedText style={styles.sectionTitle}>Upcoming Sessions</ThemedText>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>
        
        <GlassCard style={styles.activityItem}>
            <View style={styles.aLeft}>
                <View style={styles.aIconBg}>
                    <Clock size={20} color="#64748B" />
                </View>
                <View>
                    <ThemedText style={styles.aTitle}>UI/UX Workshop</ThemedText>
                    <Text style={styles.aMeta}>Today • 02:00 PM • Lab 04</Text>
                </View>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
        </GlassCard>

        <GlassCard style={styles.activityItem}>
            <View style={styles.aLeft}>
                <View style={[styles.aIconBg, { backgroundColor: '#DEF7EC' }]}>
                    <Activity size={20} color="#059669" />
                </View>
                <View>
                    <ThemedText style={styles.aTitle}>Open Day Planning</ThemedText>
                    <Text style={styles.aMeta}>Tomorrow • 10:00 AM • Hall B</Text>
                </View>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

function StatBox({ label, value, icon: Icon, color }: any) {
  return (
    <GlassCard style={styles.statBox}>
      <Icon size={20} color={color} />
      <Text style={styles.statVal}>{value}</Text>
      <Text style={styles.statLab}>{label}</Text>
    </GlassCard>
  );
}

function ActionButton({ icon: Icon, label, color }: any) {
  return (
    <TouchableOpacity style={styles.actionBtn}>
      <View style={[styles.actionIconBg, { backgroundColor: color + '15' }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  statBox: { flex: 1, padding: 16, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginTop: 8 },
  statLab: { fontSize: 11, color: '#94A3B8', fontWeight: '700', marginTop: 2, textTransform: 'uppercase' },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  actionBtn: { alignItems: 'center', gap: 8, width: '22%' },
  actionIconBg: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 10, fontWeight: '700', color: '#475569', textAlign: 'center' },
  chartCard: { padding: 16, marginBottom: 32 },
  chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  chartTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  vizPlaceholder: { height: 60, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingHorizontal: 20 },
  bar: { width: 12, backgroundColor: '#E2E8F0', borderRadius: 6 },
  queueHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAll: { fontSize: 13, color: '#0EA5E9', fontWeight: '600' },
  activityItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginTop: 12 },
  aLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  aIconBg: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  aTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  aMeta: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
});
