import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { 
  Activity, Users, FileText, Bell, BarChart3, Clock, 
  CheckCircle, ChevronRight, Plus, Rocket, Target, Zap 
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function CoordinatorDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Premium Coordinator Banner */}
        <View style={[styles.headerBanner, { backgroundColor: theme.primary }]}>
            <View style={{ flex: 1 }}>
                <View style={styles.bannerTopRow}>
                    <View style={styles.rocketIconBox}>
                        <Rocket size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.statusPill}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Active Portal</Text>
                    </View>
                </View>
                <Text style={styles.bannerTitle}>Coordinator Command</Text>
                <Text style={styles.bannerSubtitle}>Orchestrate excellence and track student engagement live.</Text>
            </View>
        </View>

        {/* Dynamic Stats Row */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Real-time Metrics</Text>
            <Zap size={14} color={theme.primary} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll} contentContainerStyle={styles.statsScrollContent}>
          <StatBox label="Activities" value="12" icon={Activity} color="#0EA5E9" theme={theme} />
          <StatBox label="Active Now" value="4" icon={CheckCircle} color="#22C55E" theme={theme} />
          <StatBox label="Reviews" value="28" icon={FileText} color="#F59E0B" theme={theme} />
          <StatBox label="Students" value="1.2K" icon={Users} color="#8B5CF6" theme={theme} />
        </ScrollView>

        {/* Action Center Grid */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Terminal Actions</Text>
        </View>
        <View style={styles.actionGrid}>
          <ActionButton icon={Plus} label="New Activity" color="#0EA5E9" theme={theme} />
          <ActionButton icon={Users} label="Attendance" color="#8B5CF6" theme={theme} />
          <ActionButton icon={FileText} label="Review Apps" color="#F59E0B" theme={theme} />
          <ActionButton icon={Bell} label="Broadcast" color="#22C55E" theme={theme} />
        </View>

        {/* Upcoming Sessions Section */}
        <View style={styles.queueHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Sessions</Text>
            <TouchableOpacity><Text style={[styles.viewAll, { color: theme.primary }]}>View All</Text></TouchableOpacity>
        </View>
        
        <View style={styles.sessionList}>
            <SessionItem 
                title="UI/UX Workshop" 
                meta="Today • 02:00 PM • Lab 04" 
                icon={Target}
                color="#0EA5E9"
                theme={theme}
            />
            <SessionItem 
                title="Open Day Planning" 
                meta="Tomorrow • 10:00 AM • Hall B" 
                icon={Activity}
                color="#8B5CF6"
                theme={theme}
            />
            <SessionItem 
                title="Tech Talk" 
                meta="Jan 25 • 11:30 AM • Remote" 
                icon={Zap}
                color="#22C55E"
                theme={theme}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatBox({ label, value, icon: Icon, color, theme }: any) {
  return (
    <GlassCard style={[styles.statBox, { backgroundColor: theme.card }]}>
      <View style={[styles.statIconBox, { backgroundColor: color + '15' }]}>
        <Icon size={18} color={color} />
      </View>
      <Text style={[styles.statVal, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLab, { color: theme.textSecondary }]}>{label}</Text>
    </GlassCard>
  );
}

function ActionButton({ icon: Icon, label, color, theme }: any) {
  return (
    <TouchableOpacity style={styles.actionBtn}>
      <GlassCard style={[styles.actionCard, { backgroundColor: theme.card }]}>
        <View style={[styles.actionIconBg, { backgroundColor: color + '10' }]}>
            <Icon size={24} color={color} />
        </View>
        <Text style={[styles.actionLabel, { color: theme.text }]}>{label}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
}

function SessionItem({ title, meta, icon: Icon, color, theme }: any) {
    return (
        <GlassCard style={[styles.sessionItem, { backgroundColor: theme.card }]}>
            <View style={styles.sLeft}>
                <View style={[styles.sIconBg, { backgroundColor: color + '10' }]}>
                    <Icon size={20} color={color} />
                </View>
                <View>
                    <Text style={[styles.sTitle, { color: theme.text }]}>{title}</Text>
                    <Text style={[styles.sMeta, { color: theme.textSecondary }]}>{meta}</Text>
                </View>
            </View>
            <ChevronRight size={18} color={theme.icon} />
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingTop: 14, paddingBottom: 60 },
  headerBanner: { 
    padding: 24, 
    borderRadius: 28, 
    marginBottom: 24, 
    shadowColor: '#0EA5E9', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 15, 
    elevation: 8 
  },
  bannerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  rocketIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF', marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF', textTransform: 'uppercase' },
  bannerTitle: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: 13, color: '#FFFFFF', opacity: 0.8, marginTop: 6, lineHeight: 18, maxWidth: '85%' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  statsScroll: { flexGrow: 0, marginBottom: 24 },
  statsScrollContent: { paddingRight: 16 },
  statBox: { width: 120, padding: 16, marginRight: 12, borderRadius: 20, alignItems: 'center' },
  statIconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statVal: { fontSize: 20, fontWeight: '900' },
  statLab: { fontSize: 10, fontWeight: '700', marginTop: 4, textAlign: 'center' },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  actionBtn: { width: '48%' },
  actionCard: { padding: 16, borderRadius: 20, alignItems: 'center' },
  actionIconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionLabel: { fontSize: 13, fontWeight: '800' },
  queueHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  viewAll: { fontSize: 13, fontWeight: '700' },
  sessionList: { gap: 10 },
  sessionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 20 },
  sLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sIconBg: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  sTitle: { fontSize: 15, fontWeight: '700' },
  sMeta: { fontSize: 12, marginTop: 2 },
});
