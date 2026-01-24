import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Scan, Users, Check, X, Search, MoreVertical, Smartphone, UserCheck, ArrowLeft } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';

export default function AttendanceManagement() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header with Live Status */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>SESSION LIVE</Text>
            </View>
            <TouchableOpacity style={styles.moreBtn}>
                <MoreVertical size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        <ThemedText style={styles.sessionTitle}>UI/UX Design Masterclass</ThemedText>
        <Text style={styles.sessionSub}>Attendance Tracking (QR Scan Ready)</Text>

        {/* Action Bar */}
        <View style={styles.actionBar}>
             <TouchableOpacity style={styles.scanBtn}>
                <Scan size={32} color="#FFFFFF" />
                <Text style={styles.scanLabel}>Start QR Scanner</Text>
             </TouchableOpacity>
             <View style={styles.scanStats}>
                 <Text style={styles.scanVal}>26 / 30</Text>
                 <Text style={styles.scanLab}>Attendees</Text>
             </View>
        </View>

        {/* Participant List */}
        <View style={styles.listHeader}>
             <ThemedText style={styles.sectionTitle}>Check-in List</ThemedText>
             <TouchableOpacity><Text style={styles.manualEntry}>Manual Entry</Text></TouchableOpacity>
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            <AttendeeRow name="muscab axmed" id="ST-201" time="14:02" method="QR Scan" />
            <AttendeeRow name="fatuma farah" id="ST-042" time="14:05" method="QR Scan" />
            <AttendeeRow name="axmed qaarey" id="ST-005" time="14:12" method="Manual" />
            <PendingRow name="deeqa warsame" id="ST-098" />
            <PendingRow name="hassan ali" id="ST-115" />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function AttendeeRow({ name, id, time, method }: any) {
    return (
        <View style={styles.aRow}>
            <View style={styles.aLeft}>
                <View style={styles.aCheck}>
                    <Check size={14} color="#22C55E" />
                </View>
                <View>
                    <ThemedText style={styles.aName}>{name}</ThemedText>
                    <Text style={styles.aId}>{id} • {method}</Text>
                </View>
            </View>
            <Text style={styles.aTime}>{time}</Text>
        </View>
    )
}

function PendingRow({ name, id }: any) {
    return (
        <View style={[styles.aRow, styles.pendingRow]}>
            <View style={styles.aLeft}>
                <View style={[styles.aCheck, styles.pendingCheck]}>
                    <UserCheck size={14} color="#94A3B8" />
                </View>
                <View>
                    <ThemedText style={styles.aName}>{name}</ThemedText>
                    <Text style={styles.aId}>{id} • Not present yet</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.checkBtn}>
                <Text style={styles.checkTxt}>Check In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#DEF7EC', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#059669' },
  liveText: { fontSize: 11, fontWeight: '800', color: '#059669' },
  moreBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  sessionTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B' },
  sessionSub: { fontSize: 13, color: '#64748B', marginTop: 4, marginBottom: 32 },
  actionBar: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  scanBtn: { flex: 1, height: 100, backgroundColor: '#0EA5E9', borderRadius: 24, justifyContent: 'center', alignItems: 'center', gap: 10, shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  scanLabel: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  scanStats: { width: 100, height: 100, backgroundColor: '#FFFFFF', borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  scanVal: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  scanLab: { fontSize: 11, color: '#94A3B8', fontWeight: '700', marginTop: 2 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 },
  manualEntry: { fontSize: 13, color: '#0EA5E9', fontWeight: '700' },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  aRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  aLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  aCheck: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#DEF7EC', justifyContent: 'center', alignItems: 'center' },
  aName: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  aId: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  aTime: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  pendingRow: { opacity: 0.7 },
  pendingCheck: { backgroundColor: '#F1F5F9' },
  checkBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#0EA5E910' },
  checkTxt: { fontSize: 12, fontWeight: '800', color: '#0EA5E9' },
});
