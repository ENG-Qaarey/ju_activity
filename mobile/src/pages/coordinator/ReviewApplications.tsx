import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, User, Check, X, Info, ChevronRight, LayoutGrid, List } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function ReviewApplications() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <ThemedText style={styles.title}>Review Pool</ThemedText>
                <Text style={styles.subTitle}>UI/UX Masterclass • 12 Pending</Text>
            </View>
            <TouchableOpacity style={styles.viewToggle}>
                <LayoutGrid size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Batch Actions */}
        <View style={styles.batchRow}>
             <TouchableOpacity style={[styles.batchBtn, styles.approveAll]}>
                <Check size={16} color="#FFFFFF" />
                <Text style={styles.batchText}>Approve All</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.batchBtn, styles.rejectAll]}>
                <X size={16} color="#EF4444" />
                <Text style={[styles.batchText, { color: '#EF4444' }]}>Clear Pool</Text>
             </TouchableOpacity>
        </View>

        {/* Swipe-able Review Cards */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            <ReviewCard name="axmed muscab" id="ST-2024-001" gpa="3.8" major="CS" />
            <ReviewCard name="fatuma farah" id="ST-2024-042" gpa="3.6" major="CS" />
            <ReviewCard name="hassan ali" id="ST-2024-115" gpa="3.9" major="IT" />
            <ReviewCard name="deeqa warsame" id="ST-2024-098" gpa="3.7" major="SE" />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function ReviewCard({ name, id, gpa, major }: any) {
  return (
    <GlassCard style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.avatar}>
                <User size={24} color="#64748B" />
            </View>
            <View style={{ flex: 1 }}>
                <ThemedText style={styles.pName}>{name}</ThemedText>
                <Text style={styles.pId}>{id}</Text>
            </View>
            <TouchableOpacity style={styles.viewFull}>
                <Info size={18} color="#0EA5E9" />
            </TouchableOpacity>
        </View>

        <View style={styles.pStats}>
            <View style={styles.pStatItem}>
                <Text style={styles.psLabel}>GPA</Text>
                <Text style={styles.psVal}>{gpa}</Text>
            </View>
            <View style={styles.vLine} />
            <View style={styles.pStatItem}>
                <Text style={styles.psLabel}>Program</Text>
                <Text style={styles.psVal}>{major}</Text>
            </View>
        </View>

        <View style={styles.cardActions}>
            <TouchableOpacity style={[styles.actBtn, styles.reject]}>
                <X size={20} color="#EF4444" />
                <Text style={styles.rejText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actBtn, styles.approve]}>
                <Check size={20} color="#FFFFFF" />
                <Text style={styles.appText}>Approve</Text>
            </TouchableOpacity>
        </View>
    </GlassCard>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  viewToggle: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  subTitle: { fontSize: 12, color: '#64748B', fontWeight: '600', marginTop: 2 },
  batchRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  batchBtn: { flex: 1, height: 44, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  approveAll: { backgroundColor: '#0EA5E9', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  rejectAll: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FEE2E2' },
  batchText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 18, marginBottom: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  pName: { fontSize: 17, fontWeight: '800', color: '#1E293B' },
  pId: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  viewFull: { padding: 4 },
  pStats: { flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 12, padding: 12, marginBottom: 20 },
  pStatItem: { flex: 1, alignItems: 'center' },
  psLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' },
  psVal: { fontSize: 14, fontWeight: '800', color: '#475569', marginTop: 2 },
  vLine: { width: 1, height: '100%', backgroundColor: '#E2E8F0' },
  cardActions: { flexDirection: 'row', gap: 12 },
  actBtn: { flex: 1, height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  reject: { backgroundColor: '#FEF2F2' },
  approve: { backgroundColor: '#0EA5E9', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  rejText: { fontSize: 14, fontWeight: '800', color: '#EF4444' },
  appText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
});
