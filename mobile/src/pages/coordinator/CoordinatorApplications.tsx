import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Filter, User, FileText, Check, X, Clock, ChevronRight } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function CoordinatorApplications() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>All Applications</ThemedText>
                <ThemedText style={styles.subtitle}>28 pending requests for your events</ThemedText>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Global Activity Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
            <FilterPill label="All Activities" active />
            <FilterPill label="UI/UX Masterclass" />
            <FilterPill label="Planning 2026" />
        </ScrollView>

        {/* List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            <CApplicationItem 
                student="muscab axmed" 
                activity="UI/UX Design Masterclass" 
                time="5 mins ago" 
                status="Pending"
            />
            <CApplicationItem 
                student="fatuma farah" 
                activity="UI/UX Design Masterclass" 
                time="42 mins ago" 
                status="Pending"
            />
            <CApplicationItem 
                student="axmed qaarey" 
                activity="JU Open Day 2026" 
                time="2 hours ago" 
                status="Approved"
            />
            <CApplicationItem 
                student="deeqa warsame" 
                activity="Planning 2026" 
                time="Yesterday" 
                status="Rejected"
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function FilterPill({ label, active }: any) {
  return (
    <TouchableOpacity style={[styles.pill, active && styles.pillActive]}>
        <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </TouchableOpacity>
  )
}

function CApplicationItem({ student, activity, time, status }: any) {
    const statusColor = status === 'Approved' ? '#22C55E' : status === 'Rejected' ? '#EF4444' : '#F59E0B';
    
    return (
        <GlassCard style={styles.card}>
            <View style={styles.cardMain}>
                <View style={styles.leftCol}>
                    <View style={styles.avatar}>
                        <User size={20} color="#64748B" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ThemedText style={styles.sName}>{student}</ThemedText>
                        <Text style={styles.aName} numberOfLines={1}>{activity}</Text>
                    </View>
                </View>
                <View style={[styles.badge, { backgroundColor: statusColor + '10' }]}>
                    <Text style={[styles.badgeText, { color: statusColor }]}>{status}</Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.timeRow}>
                    <Clock size={12} color="#94A3B8" />
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <TouchableOpacity style={styles.reviewBtn}>
                    <Text style={styles.reviewText}>Review</Text>
                    <ChevronRight size={14} color="#0EA5E9" />
                </TouchableOpacity>
            </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  filterBar: { flexGrow: 0, marginBottom: 20 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginRight: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  pillActive: { backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' },
  pillText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  pillTextActive: { color: '#FFFFFF' },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 16, marginBottom: 14 },
  cardMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  leftCol: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  sName: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  aName: { fontSize: 12, color: '#64748B', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 11, color: '#94A3B8' },
  reviewBtn: { flexDirection: 'row', alignItems: 'center' },
  reviewText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9', marginRight: 2 },
});
