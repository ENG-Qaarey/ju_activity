import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Terminal, Cpu, Database, Globe, Info, AlertTriangle, XCircle, RefreshCw } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function SystemLogs() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <View style={styles.titleRow}>
                    <Terminal size={22} color="#0EA5E9" />
                    <ThemedText style={styles.title}>System Logs</ThemedText>
                </View>
                <ThemedText style={styles.subtitle}>Raw environment and server output</ThemedText>
            </View>
            <TouchableOpacity style={styles.refreshBtn}>
                <RefreshCw size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Live Terminal Emulator */}
        <View style={styles.terminalContainer}>
            <View style={styles.terminalHeader}>
                <View style={styles.dots}>
                    <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
                    <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
                    <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
                </View>
                <Text style={styles.termTitle}>bash — 80x24</Text>
            </View>
            <ScrollView style={styles.terminalBody} contentContainerStyle={styles.termContent}>
                <Text style={styles.termText}><Text style={styles.termGreen}>[INFO]</Text> 19:04:02 - API Gateway listening on port 4000</Text>
                <Text style={styles.termText}><Text style={styles.termGreen}>[INFO]</Text> 19:04:05 - Connected to MongoDB Cloud (Primary)</Text>
                <Text style={styles.termText}><Text style={styles.termYellow}>[WARN]</Text> 19:04:12 - High latentcy detected in Auth service</Text>
                <Text style={styles.termText}><Text style={styles.termBlue}>[DBUG]</Text> 19:05:30 - Cache bucket invalidated: activity_meta</Text>
                <Text style={styles.termText}><Text style={styles.termGreen}>[INFO]</Text> 19:06:10 - Worker pool expanded to 4 instances</Text>
                <Text style={styles.termText}><Text style={styles.termRed}>[ERR!]</Text> 19:07:45 - Push Notification Service: Timeout Error</Text>
                <Text style={styles.termText}>_</Text>
            </ScrollView>
        </View>

        {/* Quick Diagnostics */}
        <ThemedText style={styles.sectionTitle}>Quick Pulse</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow}>
            <PulseCard icon={Cpu} label="CPU Load" value="24%" color="#0EA5E9" />
            <PulseCard icon={Database} label="DB Reads" value="1.2k/s" color="#8B5CF6" />
            <PulseCard icon={Globe} label="API Latency" value="142ms" color="#F59E0B" />
        </ScrollView>

        <View style={styles.events}>
            <ThemedText style={styles.sectionTitle}>Critical Events</ThemedText>
            <GlassCard style={styles.eventCard}>
                <View style={styles.eventLeft}>
                    <XCircle size={18} color="#EF4444" />
                    <Text style={styles.eventText}>Node_Worker_Process_Exit (Code 1)</Text>
                </View>
                <Text style={styles.eventTime}>12m ago</Text>
            </GlassCard>
        </View>
      </View>
    </GradientBackground>
  );
}

function PulseCard({ icon: Icon, label, value, color }: any) {
    return (
        <GlassCard style={styles.pulseCard}>
            <Icon size={20} color={color} />
            <Text style={styles.pulseVal}>{value}</Text>
            <Text style={styles.pulseLabel}>{label}</Text>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 24, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  refreshBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  terminalContainer: { height: 220, backgroundColor: '#0F172A', borderRadius: 16, overflow: 'hidden', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  terminalHeader: { height: 32, backgroundColor: '#1E293B', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  termTitle: { fontSize: 11, color: '#94A3B8', fontWeight: '600', flex: 1, textAlign: 'center' },
  terminalBody: { padding: 12 },
  termContent: { gap: 4 },
  termText: { fontFamily: 'monospace', fontSize: 12, color: '#CBD5E1' },
  termGreen: { color: '#22C55E', fontWeight: '700' },
  termYellow: { color: '#F59E0B', fontWeight: '700' },
  termRed: { color: '#EF4444', fontWeight: '700' },
  termBlue: { color: '#0EA5E9', fontWeight: '700' },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  statsRow: { flexGrow: 0, marginBottom: 24 },
  pulseCard: { width: 120, height: 100, padding: 12, marginRight: 12, justifyContent: 'center' },
  pulseVal: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginTop: 8 },
  pulseLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  events: { gap: 0 },
  eventCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  eventLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  eventText: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  eventTime: { fontSize: 11, color: '#94A3B8' },
});
