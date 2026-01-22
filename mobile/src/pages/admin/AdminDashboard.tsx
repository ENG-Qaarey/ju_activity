import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Users, Activity, FileText, Bell, TrendingUp, AlertTriangle, ShieldCheck, ChevronRight, UserPlus, Monitor, FileSearch, Folders, Settings, ListChecks } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Blue Header Banner */}
        <View style={styles.headerBanner}>
            <View style={{ flex: 1 }}>
                <View style={styles.bannerTitleRow}>
                    <Text style={styles.bannerTitle}>Admin Dashboard</Text>
                    <ShieldCheck size={24} color="#FFFFFF" style={{ marginLeft: 8 }} />
                </View>
                <Text style={styles.bannerSubtitle}>Monitor system performance and manage users</Text>
            </View>
            <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>System Status: Healthy</Text>
            </View>
        </View>

        {/* Stats Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
            <ImageStatCard label="Total Users" value="4" icon={Users} color="#0EA5E9" />
            <ImageStatCard label="Active Users" value="4" icon={UserPlus} color="#22C55E" />
            <ImageStatCard label="Inactive Users" value="0" icon={Users} color="#F59E0B" />
            <ImageStatCard label="Active Rate" value="100%" icon={Activity} color="#8B5CF6" />
        </ScrollView>

        <View style={styles.flexGrid}>
            {/* Quick Actions */}
            <View style={styles.column}>
                <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
                <View style={styles.quickActionsList}>
                    <QuickActionLink icon={Folders} label="Create Activity" />
                    <QuickActionLink icon={Monitor} label="Monitor Activities" />
                    <QuickActionLink icon={FileSearch} label="Review Applications" />
                    <QuickActionLink icon={Users} label="Directory" />
                    <QuickActionLink icon={Settings} label="Manage Users" />
                    <QuickActionLink icon={FileText} label="Reports" />
                    <QuickActionLink icon={TrendingUp} label="Advanced Reports" />
                    <QuickActionLink icon={ListChecks} label="Audit Logs" />
                </View>
            </View>

            {/* System Alerts */}
            <View style={styles.column}>
                <View style={styles.alertsHeader}>
                    <AlertTriangle size={18} color="#F59E0B" />
                    <ThemedText style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>System Alerts</ThemedText>
                </View>
                <View style={styles.alertsList}>
                    <SystemAlert 
                        color="#F59E0B" 
                        msg="High traffic detected on activity registrations" 
                        time="2 min ago" 
                    />
                    <SystemAlert 
                        color="#3B82F6" 
                        msg="New coordinator account created" 
                        time="16 min ago" 
                    />
                    <SystemAlert 
                        color="#22C55E" 
                        msg="System backup completed successfully" 
                        time="1 hour ago" 
                    />
                </View>
            </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function ImageStatCard({ label, value, icon: Icon, color }: any) {
  return (
    <GlassCard style={styles.statsCard}>
        <View style={styles.cardTop}>
            <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                <Icon size={18} color={color} />
            </View>
            <TrendingUp size={14} color="#22C55E" />
        </View>
        <Text style={styles.cardVal}>{value}</Text>
        <Text style={styles.cardLab}>{label}</Text>
    </GlassCard>
  )
}

function QuickActionLink({ icon: Icon, label }: any) {
    return (
        <TouchableOpacity style={styles.actionLink}>
            <Icon size={18} color="#0EA5E9" style={{ marginRight: 12 }} />
            <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

function SystemAlert({ color, msg, time }: any) {
    return (
        <View style={[styles.alertBox, { backgroundColor: color + '08', borderLeftColor: color }]}>
            <View style={[styles.alertDot, { backgroundColor: color }]} />
            <View style={{ flex: 1 }}>
                <Text style={styles.alertMsg}>{msg}</Text>
                <Text style={styles.alertTime}>{time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingTop: 20, paddingBottom: 40 },
  headerBanner: { backgroundColor: '#4FA3F7', padding: 24, borderRadius: 24, marginBottom: 10, shadowColor: '#4FA3F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  bannerTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bannerTitle: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  bannerSubtitle: { fontSize: 14, color: '#E0F2FE', fontWeight: '500' },
  statusBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 24, marginTop: 16 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF', marginRight: 8 },
  statusText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  statsScroll: { flexGrow: 0, marginBottom: 24 },
  statsCard: { width: 150, padding: 16, marginRight: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardVal: { fontSize: 24, fontWeight: '800', color: '#1E293B' },
  cardLab: { fontSize: 12, color: '#64748B', fontWeight: '600', marginTop: 4 },
  flexGrid: { gap: 24 },
  column: { },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B', marginBottom: 16 },
  quickActionsList: { gap: 10 },
  actionLink: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#0EA5E9', borderWidth: 1, padding: 14, borderRadius: 12 },
  actionLabel: { fontSize: 14, color: '#0EA5E9', fontWeight: '700' },
  alertsList: { gap: 12 },
  alertsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  alertBox: { flexDirection: 'row', alignItems: 'flex-start', padding: 16, borderRadius: 12, borderLeftWidth: 4, backgroundColor: '#FFFFFF' },
  alertDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, marginRight: 12 },
  alertMsg: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  alertTime: { fontSize: 11, color: '#94A3B8', marginTop: 4 },
});
