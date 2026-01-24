import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { FileText, Clock, CheckCircle2, XCircle, ChevronRight, MapPin, Calendar } from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

const MOCK_APPLICATIONS = [
  {
    id: '1',
    activityTitle: 'Quantum Computing Workshop',
    status: 'Approved',
    appliedDate: 'Jan 20, 2026',
    location: 'Lab 12, Science Wing',
    schedule: 'Feb 05, 10:00 AM'
  },
  {
    id: '2',
    activityTitle: 'AI Startup Pitch Night',
    status: 'Pending',
    appliedDate: 'Jan 22, 2026',
    location: 'Innovation Hub',
    schedule: 'Feb 15, 06:00 PM'
  },
  {
    id: '3',
    activityTitle: 'Leadership Seminar Series',
    status: 'Completed',
    appliedDate: 'Jan 05, 2026',
    location: 'Online / Zoom',
    schedule: 'Jan 15, 02:00 PM'
  }
];

export default function StudentApplications() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <View style={styles.iconCircle}>
                <FileText size={24} color="#FFFFFF" />
            </View>
            <View>
                <ThemedText style={styles.title}>My Applications</ThemedText>
                <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Track the status of your joined activities.
                </ThemedText>
            </View>
        </View>

        <View style={styles.list}>
            {MOCK_APPLICATIONS.map(app => (
                <ApplicationItem key={app.id} application={app} theme={theme} />
            ))}
        </View>

        <View style={styles.statsRow}>
            <StatCard label="Total Apps" value="3" theme={theme} />
            <StatCard label="Approved" value="1" theme={theme} color="#22C55E" />
            <StatCard label="Pending" value="1" theme={theme} color="#F59E0B" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function ApplicationItem({ application, theme }: any) {
    const getStatusStyle = () => {
        switch (application.status) {
            case 'Approved': return { bg: '#DCFCE7', text: '#15803D', icon: CheckCircle2 };
            case 'Pending': return { bg: '#FEF3C7', text: '#B45309', icon: Clock };
            case 'Completed': return { bg: '#E0F2FE', text: '#0369A1', icon: CheckCircle2 };
            default: return { bg: '#F1F5F9', text: '#475569', icon: Clock };
        }
    };
    
    const statusStyle = getStatusStyle();
    const StatusIcon = statusStyle.icon;

    return (
        <GlassCard style={styles.appCard}>
            <View style={styles.appHeader}>
                <View>
                    <ThemedText style={styles.appTitle}>{application.activityTitle}</ThemedText>
                    <ThemedText style={[styles.appliedOn, { color: theme.textSecondary }]}>Applied on {application.appliedDate}</ThemedText>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <StatusIcon size={12} color={statusStyle.text} />
                    <ThemedText style={[styles.statusText, { color: statusStyle.text }]}>{application.status}</ThemedText>
                </View>
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <MapPin size={14} color={theme.textSecondary} />
                    <ThemedText style={styles.detailText}>{application.location}</ThemedText>
                </View>
                <View style={styles.detailItem}>
                    <Calendar size={14} color={theme.textSecondary} />
                    <ThemedText style={styles.detailText}>{application.schedule}</ThemedText>
                </View>
            </View>

            <TouchableOpacity style={styles.viewBtn}>
                <ThemedText style={[styles.viewBtnText, { color: theme.primary }]}>View Details</ThemedText>
                <ChevronRight size={16} color={theme.primary} />
            </TouchableOpacity>
        </GlassCard>
    )
}

function StatCard({ label, value, theme, color }: any) {
    return (
        <GlassCard style={styles.statCard}>
            <ThemedText style={[styles.statValue, color && { color }]}>{value}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</ThemedText>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 60, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
  iconCircle: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 2 },
  
  list: { gap: 16, marginBottom: 32 },
  appCard: { padding: 16, borderRadius: 24 },
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  appTitle: { fontSize: 17, fontWeight: '800', maxWidth: '70%'},
  appliedOn: { fontSize: 12, marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  
  detailsRow: { gap: 10, marginBottom: 16, borderLeftWidth: 2, borderLeftColor: 'rgba(0,0,0,0.05)', paddingLeft: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 13, fontWeight: '600' },
  
  viewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  viewBtnText: { fontSize: 13, fontWeight: '700' },
  
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 20 },
  statValue: { fontSize: 20, fontWeight: '900' },
  statLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 },
});
