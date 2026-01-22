import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Plus, Filter, Calendar, MapPin, Users, ChevronRight, MoreVertical } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminActivities() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Search & Actions */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search activities..." 
              style={styles.searchInput}
              placeholderTextColor="#94A3B8"
            />
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          <FilterChip label="All" active />
          <FilterChip label="Upcoming" />
          <FilterChip label="Ongoing" />
          <FilterChip label="Completed" />
          <FilterChip label="Drafts" />
        </ScrollView>

        {/* Activities List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          <ActivityCard 
            title="Annual Tech Symposium 2026" 
            date="Jan 25, 2026 • 10:00 AM" 
            location="Main Hall, Campus North" 
            category="Academic"
            status="Active"
            count="125 Registered"
          />
          <ActivityCard 
            title="Beach Cleanup Campaign" 
            date="Feb 02, 2026 • 08:30 AM" 
            location="Lido Beach Area" 
            category="Social"
            status="Upcoming"
            count="42 Registered"
          />
          <ActivityCard 
            title="Workshop: React Native Basics" 
            date="Feb 12, 2026 • 02:00 PM" 
            location="IT Lab 04" 
            category="Technical"
            status="Draft"
            count="0 Registered"
          />
          <ActivityCard 
            title="Football Inter-Departmental" 
            date="Jan 20, 2026 • 04:00 PM" 
            location="University Stadium" 
            category="Sports"
            status="Completed"
            count="250 Participated"
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function FilterChip({ label, active }: any) {
  return (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function ActivityCard({ title, date, location, category, status, count }: any) {
  const statusColor = status === 'Active' ? '#22C55E' : status === 'Upcoming' ? '#0EA5E9' : status === 'Draft' ? '#F59E0B' : '#64748B';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: statusColor + '15' }]}>
            <Text style={[styles.categoryText, { color: statusColor }]}>{category}</Text>
        </View>
        <TouchableOpacity><MoreVertical size={20} color="#94A3B8" /></TouchableOpacity>
      </View>
      
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      
      <View style={styles.infoRow}>
        <Calendar size={14} color="#64748B" />
        <Text style={styles.infoText}>{date}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <MapPin size={14} color="#64748B" />
        <Text style={styles.infoText}>{location}</Text>
      </View>

      <View style={styles.cardFooter}>
         <View style={styles.countRow}>
            <Users size={16} color="#64748B" />
            <Text style={styles.countText}>{count}</Text>
         </View>
         <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Manage</Text>
            <ChevronRight size={16} color="#0EA5E9" />
         </TouchableOpacity>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 15, color: '#1E293B' },
  addBtn: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#0EA5E9', justifyContent: 'center', alignItems: 'center', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  filterBar: { flexGrow: 0, marginBottom: 16 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F1F5F9', marginRight: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  chipActive: { backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  chipTextActive: { color: '#FFFFFF' },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  infoText: { fontSize: 13, color: '#64748B' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  countRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  countText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  editBtn: { flexDirection: 'row', alignItems: 'center' },
  editText: { fontSize: 14, fontWeight: '700', color: '#0EA5E9', marginRight: 2 },
});
