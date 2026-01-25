import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { Shield, Clock, User, Filter, Search, ChevronRight, FileText } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

import { client } from '@/src/lib/api';
import { ENDPOINTS } from '@/src/lib/config';

export default function AdminLogs() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [logs, setLogs] = React.useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchLogs = async () => {
    try {
      const data = await client.get('/audit-logs');
      if (Array.isArray(data)) {
        setLogs(data);
      }
    } catch (error) {
      console.log('Error fetching audit logs:', error);
    }
  };

  React.useEffect(() => {
    fetchLogs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLogs();
    setRefreshing(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

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
        <ScrollView 
          style={styles.list} 
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={theme.text}
              colors={[theme.text]}
            />
          }
        >
           {logs.length > 0 ? logs.map((log) => (
             <LogEntry 
               key={log.id}
               admin={log.actorName || 'System'} 
               action={log.action} 
               target={log.targetName || log.targetId || 'N/A'} 
               time={formatTime(log.timestamp)} 
               type={log.action.includes('Delete') ? 'Delete' : log.action.includes('Create') ? 'Create' : log.action.includes('Role') ? 'RoleChange' : 'Update'}
               theme={theme}
             />
           )) : (
             <Text style={{ textAlign: 'center', color: theme.textSecondary, marginTop: 20 }}>No audit logs found.</Text>
           )}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -52 },
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
