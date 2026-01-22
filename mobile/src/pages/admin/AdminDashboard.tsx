import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { 
  Users, Activity, FileText, Bell, TrendingUp, AlertTriangle, 
  ShieldCheck, ChevronRight, UserPlus, Monitor, FileSearch, 
  Folders, Settings, ListChecks, Clock 
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Premium Header Banner */}
        <View style={styles.headerBanner}>
            <View style={{ flex: 1 }}>
                <View style={styles.bannerTopRow}>
                    <View style={styles.shieldIconBox}>
                        <ShieldCheck size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.statusPill}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>System Online</Text>
                    </View>
                </View>
                <Text style={styles.bannerTitle}>Admin Center</Text>
                <Text style={styles.bannerSubtitle}>Monitor metrics and orchestrate campus activities.</Text>
            </View>
        </View>

        {/* Dynamic Stats Scroll */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Performance Overview</Text>
            <TrendingUp size={16} color="#22C55E" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll} contentContainerStyle={styles.statsScrollContent}>
            <StatCard label="Total Users" value="1,240" icon={Users} color="#0EA5E9" trend="+12%" theme={theme} />
            <StatCard label="Activities" value="48" icon={Activity} color="#8B5CF6" trend="+5%" theme={theme} />
            <StatCard label="Pending Apps" value="32" icon={FileSearch} color="#F59E0B" trend="-2%" theme={theme} />
            <StatCard label="System Load" value="14%" icon={Monitor} color="#22C55E" trend="Stable" theme={theme} />
        </ScrollView>

        {/* Quick Actions Grid */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Terminal Hub</Text>
        </View>
        <View style={styles.actionGrid}>
            <ActionTile icon={Folders} label="Create" subLabel="New Activity" color="#0EA5E9" theme={theme} />
            <ActionTile icon={Monitor} label="Monitor" subLabel="All Events" color="#8B5CF6" theme={theme} />
            <ActionTile icon={FileSearch} label="Review" subLabel="Student Apps" color="#F59E0B" theme={theme} />
            <ActionTile icon={Users} label="Directory" subLabel="JU Database" color="#22C55E" theme={theme} />
            <ActionTile icon={Settings} label="Staff" subLabel="Manage Team" color={theme.textSecondary} theme={theme} />
            <ActionTile icon={ListChecks} label="Audit" subLabel="System Logs" color="#EC4899" theme={theme} />
        </View>

        {/* System Intelligence / Alerts */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>System Intelligence</Text>
        </View>
        <View style={styles.alertsList}>
            <AlertItem 
                type="warning" 
                msg="High registration traffic detected" 
                time="2 min ago" 
                theme={theme}
            />
            <AlertItem 
                type="info" 
                msg="New coordinator account approved" 
                time="16 min ago" 
                theme={theme}
            />
            <AlertItem 
                type="success" 
                msg="Weekly database backup verified" 
                time="1 hour ago" 
                theme={theme}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatCard({ label, value, icon: Icon, color, trend, theme }: any) {
  return (
    <GlassCard style={[styles.statCard, { backgroundColor: theme.card }]}>
        <View style={styles.statCardHeader}>
            <View style={[styles.statIconBox, { backgroundColor: color + '15' }]}>
                <Icon size={18} color={color} />
            </View>
            <Text style={[styles.trendText, { color: trend.startsWith('+') ? '#22C55E' : trend.startsWith('-') ? '#EF4444' : theme.textSecondary }]}>
                {trend}
            </Text>
        </View>
        <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
    </GlassCard>
  )
}

function ActionTile({ icon: Icon, label, subLabel, color, theme }: any) {
    return (
        <TouchableOpacity style={styles.actionTileWrapper}>
            <GlassCard style={[styles.actionTile, { backgroundColor: theme.card }]}>
                <View style={[styles.actionIconBox, { backgroundColor: color + '10' }]}>
                    <Icon size={24} color={color} />
                </View>
                <Text style={[styles.actionTileLabel, { color: theme.text }]}>{label}</Text>
                <Text style={[styles.actionTileSub, { color: theme.textSecondary }]}>{subLabel}</Text>
            </GlassCard>
        </TouchableOpacity>
    )
}

function AlertItem({ type, msg, time, theme }: any) {
    const isWarning = type === 'warning';
    const isSuccess = type === 'success';
    const color = isWarning ? '#F59E0B' : isSuccess ? '#22C55E' : '#3B82F6';
    
    return (
        <GlassCard style={[styles.alertCard, { backgroundColor: theme.card }]}>
            <View style={[styles.alertIndicator, { backgroundColor: color }]} />
            <View style={{ flex: 1, paddingLeft: 12 }}>
                <Text style={[styles.alertMsg, { color: theme.text }]}>{msg}</Text>
                <View style={styles.alertFooter}>
                    <Clock size={10} color={theme.textSecondary} />
                    <Text style={[styles.alertTime, { color: theme.textSecondary }]}>{time}</Text>
                </View>
            </View>
            <ChevronRight size={14} color={theme.icon} />
        </GlassCard>
    )
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
  bannerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  shieldIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF', marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF', textTransform: 'uppercase' },
  bannerTitle: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: 13, color: '#FFFFFF', opacity: 0.8, marginTop: 6, lineHeight: 18, maxWidth: '85%' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  statsScroll: { flexGrow: 0, marginBottom: 24 },
  statsScrollContent: { paddingRight: 16 },
  statCard: { width: 140, padding: 16, marginRight: 12, borderRadius: 20 },
  statCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statIconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  trendText: { fontSize: 11, fontWeight: '700' },
  statValue: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  actionTileWrapper: { width: '48%' },
  actionTile: { padding: 16, borderRadius: 20, alignItems: 'center' },
  actionIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionTileLabel: { fontSize: 14, fontWeight: '800' },
  actionTileSub: { fontSize: 10, marginTop: 2, fontWeight: '600' },
  alertsList: { gap: 10 },
  alertCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 18 },
  alertIndicator: { width: 4, height: 28, borderRadius: 2 },
  alertMsg: { fontSize: 13, fontWeight: '700' },
  alertFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  alertTime: { fontSize: 11, fontWeight: '500' },
});
