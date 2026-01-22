import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Plus, Filter, Calendar, MapPin, Users, ChevronRight, Edit3 } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function CoordinatorActivities() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header Actions */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>My Activities</ThemedText>
                <ThemedText style={styles.subtitle}>12 activities currently managed</ThemedText>
            </View>
            <TouchableOpacity style={styles.addBtn}>
                 <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>

        {/* Search & Filter */}
        <View style={styles.searchRow}>
            <View style={styles.searchBox}>
                <Search size={18} color="#94A3B8" />
                <TextInput 
                    placeholder="Filter your activities..." 
                    style={styles.input}
                    placeholderTextColor="#94A3B8"
                />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            <CActivityCard 
                title="UI/UX Design Masterclass" 
                date="Today, 02:00 PM" 
                loc="Lab 04, IT Building" 
                registrations="28/30"
                status="Ongoing"
            />
            <CActivityCard 
                title="JU Open Day 2026" 
                date="Tomorrow, 10:00 AM" 
                loc="Main Plaza" 
                registrations="142/200"
                status="Upcoming"
            />
            <CActivityCard 
                title="React Native Deep Dive" 
                date="Jan 30, 09:00 AM" 
                loc="Remote / Zoom" 
                registrations="45/50"
                status="Draft"
            />
            <CActivityCard 
                title="Leadership Seminar" 
                date="Jan 15, 04:00 PM" 
                loc="Auditorium" 
                registrations="120/120"
                status="Completed"
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function CActivityCard({ title, date, loc, registrations, status }: any) {
  const statusColor = status === 'Ongoing' ? '#22C55E' : status === 'Upcoming' ? '#0EA5E9' : status === 'Draft' ? '#F59E0B' : '#64748B';
  
  return (
    <GlassCard style={styles.card}>
        <View style={styles.cardTop}>
            <View style={[styles.badge, { backgroundColor: statusColor + '15' }]}>
                <Text style={[styles.badgeText, { color: statusColor }]}>{status}</Text>
            </View>
            <TouchableOpacity><Edit3 size={18} color="#94A3B8" /></TouchableOpacity>
        </View>

        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        
        <View style={styles.metaRow}>
            <Calendar size={14} color="#64748B" />
            <Text style={styles.metaText}>{date}</Text>
        </View>
        <View style={styles.metaRow}>
            <MapPin size={14} color="#64748B" />
            <Text style={styles.metaText}>{loc}</Text>
        </View>

        <View style={styles.cardFooter}>
            <View style={styles.countRow}>
                <Users size={16} color="#64748B" />
                <Text style={styles.countText}>{registrations} Joined</Text>
            </View>
            <TouchableOpacity style={styles.manageBtn}>
                <Text style={styles.manageLink}>Manage</Text>
                <ChevronRight size={16} color="#0EA5E9" />
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
  addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0EA5E9', justifyContent: 'center', alignItems: 'center', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  searchRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  input: { flex: 1, height: '100%', fontSize: 14, color: '#1E293B', marginLeft: 8 },
  filterBtn: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 18, marginBottom: 16 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  metaText: { fontSize: 13, color: '#64748B' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  countRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  countText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  manageBtn: { flexDirection: 'row', alignItems: 'center' },
  manageLink: { fontSize: 14, fontWeight: '700', color: '#0EA5E9', marginRight: 2 },
});
