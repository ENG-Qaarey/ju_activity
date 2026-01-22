import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Shield, Clock, User, Filter, Search, ChevronRight, FileText } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function AdminLogs() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Audit Logs</ThemedText>
                <ThemedText style={styles.subtitle}>Administrative action history</ThemedText>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
            <Search size={18} color="#94A3B8" />
            <TextInput 
                placeholder="Search by admin or action..." 
                style={styles.searchInput}
                placeholderTextColor="#94A3B8"
            />
        </View>

        {/* Timeline */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
           <LogEntry 
                admin="Hassan (Super Admin)" 
                action="Changed User Role" 
                target="muscab axmed" 
                time="2 mins ago" 
                type="RoleChange"
            />
           <LogEntry 
                admin="Faduma (Coordinator)" 
                action="Created New Activity" 
                target="Python Workshop" 
                time="15 mins ago" 
                type="Create"
            />
           <LogEntry 
                admin="System Bot" 
                action="Auto-closed Applications" 
                target="Football Tourney" 
                time="1 hour ago" 
                type="System"
            />
           <LogEntry 
                admin="Hassan (Super Admin)" 
                action="Permanently Deleted User" 
                target="ID-4029" 
                time="3 hours ago" 
                type="Delete"
            />
           <LogEntry 
                admin="Deqa (Admin)" 
                action="Updated System Policy" 
                target="Mobile App v2" 
                time="Yesterday" 
                type="Update"
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function LogEntry({ admin, action, target, time, type }: any) {
  const getIcon = () => {
      switch(type) {
          case 'Delete': return { icon: Shield, color: '#EF4444' };
          case 'Create': return { icon: FileText, color: '#22C55E' };
          case 'RoleChange': return { icon: User, color: '#8B5CF6' };
          default: return { icon: Clock, color: '#0EA5E9' };
      }
  }
  const { icon: Icon, color } = getIcon();

  return (
    <View style={styles.logRow}>
        <View style={styles.timeline}>
            <View style={[styles.node, { borderColor: color }]}>
                <Icon size={14} color={color} />
            </View>
            <View style={styles.line} />
        </View>
        <GlassCard style={styles.logCard}>
            <View style={styles.logHead}>
                <Text style={styles.adminName}>{admin}</Text>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <Text style={styles.actionText}>{action}</Text>
            <View style={styles.targetBox}>
                <Text style={styles.targetLabel}>Target:</Text>
                <Text style={styles.targetVal}>{target}</Text>
            </View>
        </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, height: 48, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, color: '#1E293B', marginLeft: 8 },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  logRow: { flexDirection: 'row', gap: 12 },
  timeline: { alignItems: 'center', width: 24 },
  node: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 2, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  line: { flex: 1, width: 2, backgroundColor: '#E2E8F0', marginTop: -2 },
  logCard: { flex: 1, padding: 14, marginBottom: 20 },
  logHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  adminName: { fontSize: 13, fontWeight: '700', color: '#0EA5E9' },
  timeText: { fontSize: 11, color: '#94A3B8' },
  actionText: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  targetBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, backgroundColor: '#F8FAFC', padding: 6, borderRadius: 6 },
  targetLabel: { fontSize: 11, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' },
  targetVal: { fontSize: 12, fontWeight: '600', color: '#475569' },
});
