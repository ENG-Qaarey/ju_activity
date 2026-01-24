import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Shield, Clock, User, Filter, Search, ChevronRight, FileText } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminLogs() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Audit Logs</ThemedText>
                <ThemedText style={styles.subtitle}>Administrative action history</ThemedText>
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card }]}>
                <Filter size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.card }]}>
            <Search size={18} color={theme.textSecondary} />
            <TextInput 
                placeholder="Search by admin or action..." 
                style={[styles.searchInput, { color: theme.text }]}
                placeholderTextColor={theme.textSecondary}
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
                theme={theme}
            />
           <LogEntry 
                admin="Faduma (Coordinator)" 
                action="Created New Activity" 
                target="Python Workshop" 
                time="15 mins ago" 
                type="Create"
                theme={theme}
            />
           <LogEntry 
                admin="System Bot" 
                action="Auto-closed Applications" 
                target="Football Tourney" 
                time="1 hour ago" 
                type="System"
                theme={theme}
            />
           <LogEntry 
                admin="Hassan (Super Admin)" 
                action="Permanently Deleted User" 
                target="ID-4029" 
                time="3 hours ago" 
                type="Delete"
                theme={theme}
            />
           <LogEntry 
                admin="Deqa (Admin)" 
                action="Updated System Policy" 
                target="Mobile App v2" 
                time="Yesterday" 
                type="Update"
                theme={theme}
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function LogEntry({ admin, action, target, time, type, theme }: any) {
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
            <View style={[styles.node, { borderColor: color, backgroundColor: theme.card }]}>
                <Icon size={14} color={color} />
            </View>
            <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>
        <GlassCard style={[styles.logCard, { backgroundColor: theme.card }]}>
            <View style={styles.logHead}>
                <Text style={styles.adminName}>{admin}</Text>
                <Text style={[styles.timeText, { color: theme.textSecondary }]}>{time}</Text>
            </View>
            <Text style={[styles.actionText, { color: theme.text }]}>{action}</Text>
            <View style={[styles.targetBox, { backgroundColor: theme.background }]}>
                <Text style={[styles.targetLabel, { color: theme.textSecondary }]}>Target:</Text>
                <Text style={[styles.targetVal, { color: theme.text }]}>{target}</Text>
            </View>
        </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '900' },
  subtitle: { fontSize: 13, marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, height: 48, marginBottom: 24, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, marginLeft: 8 },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  logRow: { flexDirection: 'row', gap: 12 },
  timeline: { alignItems: 'center', width: 24 },
  node: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  line: { flex: 1, width: 2, marginTop: -2 },
  logCard: { flex: 1, padding: 14, marginBottom: 20 },
  logHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  adminName: { fontSize: 13, fontWeight: '700', color: '#0EA5E9' },
  timeText: { fontSize: 11 },
  actionText: { fontSize: 15, fontWeight: '600' },
  targetBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, padding: 6, borderRadius: 6 },
  targetLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  targetVal: { fontSize: 12, fontWeight: '600' },
});
