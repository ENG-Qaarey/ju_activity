import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl, Alert } from 'react-native';
import { 
  Bell, Clock, Info, CheckCircle2, AlertCircle, 
  Search, Filter, Trash2, MailOpen, Mail 
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useRouter } from 'expo-router';
import { client } from '@/src/lib/api';

const safeDate = (dateVal: any) => {
  if (!dateVal) return new Date();
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? new Date() : d;
};

const timeAgo = (dateVal: any) => {
  const date = safeDate(dateVal);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 30) return "just now";
  if (seconds < 60) return seconds + "s ago";
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "just now";
};

export default function CoordinatorNotifications() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchNotifs = async () => {
    try {
      const data = await client.get('/notifications');
      setNotifications(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchNotifs();
  }, []);

  const markAllRead = async () => {
    try {
      await client.put('/notifications/read/all', {});
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      Alert.alert('Error', 'Failed to mark all as read');
    }
  };

  const deleteNotif = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await client.delete(`/notifications/${id}`);
              setNotifications(prev => prev.filter(n => n.id !== id));
            } catch (error: any) {
              if (error.message === 'Notification not found') {
                setNotifications(prev => prev.filter(n => n.id !== id));
              } else {
                Alert.alert('Error', 'Failed to delete notification');
              }
            }
          }
        }
      ]
    );
  };

  const markRead = async (id: string, currentRead: boolean) => {
    if (currentRead) return;
    try {
        await client.put(`/notifications/${id}/read`, {});
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {}
  };

  const filtered = notifications.filter(n => 
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => {setRefreshing(true); fetchNotifs();}} 
            tintColor={theme.primary} 
          />
        }
      >
        <View style={styles.headerBanner}>
            <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>Coordinator Alerts</Text>
                <Text style={styles.bannerSubtitle}>
                    Stay synchronized with your student applications and activity approvals.
                </Text>
            </View>
            <View style={styles.bellBadge}>
                <Bell size={24} color="#FFFFFF" strokeWidth={2.5} />
                {unreadCount > 0 && <View style={styles.notifDot} />}
            </View>
        </View>

        <View style={styles.metricsRow}>
            <MetricItem label="Unread" value={unreadCount.toString().padStart(2, '0')} color={theme.primary} theme={theme} />
            <MetricItem label="Total" value={notifications.length.toString().padStart(2, '0')} color="#F59E0B" theme={theme} />
            <MetricItem label="Active" value="01" color={theme.textSecondary} theme={theme} />
        </View>

        <View style={styles.searchRow}>
            <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Search size={18} color={theme.textSecondary} style={styles.searchIcon} />
                <TextInput 
                    placeholder="Search your alerts..." 
                    style={[styles.searchInput, { color: theme.text }]}
                    placeholderTextColor={theme.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Filter size={18} color={theme.primary} />
            </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Notifications</Text>
            <TouchableOpacity onPress={markAllRead}>
                <Text style={{ color: theme.primary, fontSize: 12, fontWeight: '800' }}>Mark all read</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.list}>
            {filtered.map(item => (
                <CNotificationItem 
                    key={item.id}
                    item={item}
                    theme={theme}
                    onDelete={() => deleteNotif(item.id)}
                    onPress={() => markRead(item.id, item.read)}
                />
            ))}
            {filtered.length === 0 && !loading && (
                <Text style={{ textAlign: 'center', color: theme.textSecondary, marginTop: 40 }}>No notifications found.</Text>
            )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function MetricItem({ label, value, color, theme }: any) {
    return (
        <View style={[styles.metricItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.metricValue, { color }]}>{value}</Text>
            <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>{label}</Text>
        </View>
    );
}

function CNotificationItem({ item, theme, onDelete, onPress }: any) {
    const getIconInfo = () => {
        switch(item.type) {
            case 'success': return { icon: CheckCircle2, color: '#22C55E' };
            case 'error': return { icon: AlertCircle, color: '#EF4444' };
            case 'warning': return { icon: AlertCircle, color: '#F59E0B' };
            default: return { icon: Info, color: '#0EA5E9' };
        }
    }
    const { icon: Icon, color } = getIconInfo();

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <GlassCard style={[styles.card, { borderColor: theme.border, backgroundColor: !item.read ? theme.primary + '03' : theme.card }]}>
                <View style={styles.cardMainRow}>
                    <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                        <Icon size={20} color={color} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.cHead}>
                            <Text style={[styles.cTitle, { color: theme.text }, !item.read && { fontWeight: '900' }]} numberOfLines={1}>{item.title}</Text>
                            <Text style={[styles.cTime, { color: theme.textSecondary }]}>{timeAgo(new Date(item.createdAt))}</Text>
                        </View>
                        <Text style={[styles.cMsg, { color: theme.textSecondary }]} numberOfLines={2}>{item.message}</Text>
                    </View>
                </View>
                
                <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
                    <View style={styles.statusRow}>
                        <View style={[styles.statusDot, { backgroundColor: !item.read ? theme.primary : theme.textSecondary }]} />
                        <Text style={[styles.statusLabel, { color: !item.read ? theme.primary : theme.textSecondary }]}>
                            {!item.read ? 'New Alert' : 'Archived'}
                        </Text>
                        <Text style={{ fontSize: 10, color: theme.textSecondary, marginLeft: 4 }}>
                            • {safeDate(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </Text>
                    </View>
                    <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.actionIcon} onPress={onPress}>
                            {!item.read ? <MailOpen size={14} color={theme.primary} /> : <Mail size={14} color={theme.textSecondary} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionIcon} onPress={onDelete}>
                            <Trash2 size={14} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </GlassCard>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { paddingHorizontal: 16, paddingBottom: 60, paddingTop: 60 },
  headerBanner: { 
    backgroundColor: '#3B82F6', 
    padding: 24, 
    borderRadius: 28, 
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8
  },
  bannerTitle: { fontSize: 26, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: 13, color: '#E0F2FE', marginTop: 8, lineHeight: 18, fontWeight: '500', maxWidth: '85%' },
  bellBadge: { width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#3B82F6' },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  metricItem: { flex: 1, padding: 15, borderRadius: 20, borderWidth: 1, alignItems: 'center', elevation: 2 },
  metricValue: { fontSize: 20, fontWeight: '900' },
  metricLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginTop: 4, letterSpacing: 0.5 },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 25, alignItems: 'center' },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 16, paddingHorizontal: 12, height: 48, borderWidth: 1.5 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, fontWeight: '600' },
  filterBtn: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '900' },
  list: { gap: 15 },
  card: { padding: 16, borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  cardMainRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  iconBox: { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  cTitle: { fontSize: 15, fontWeight: '900', flex: 1, marginRight: 10 },
  cTime: { fontSize: 11, fontWeight: '700' },
  cMsg: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusLabel: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  cardActions: { flexDirection: 'row', gap: 12 },
  actionIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.03)', justifyContent: 'center', alignItems: 'center' },
});
