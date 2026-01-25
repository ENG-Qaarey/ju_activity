import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { 
  Info, CheckCircle2, XCircle, Bell, 
  Trash2, MailOpen, Calendar, Clock,
  LayoutGrid, BookmarkCheck, ChevronRight,
  Search, SlidersHorizontal
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

const { width } = Dimensions.get('window');

const NOTIF_CATEGORIES = ['All', 'Alerts', 'Activities', 'News'];

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'success',
    category: 'Activities',
    title: 'Application Approved',
    description: "Your registration for the 'Leadership Mastery' seminar has been approved by the coordinator.",
    time: '2m ago',
    date: 'Today',
    unread: true,
  },
  {
    id: '2',
    type: 'info',
    category: 'News',
    title: 'New Activity Posted',
    description: 'A new cybersecurity workshop just opened for registrations. Secure your spot now!',
    time: '45m ago',
    date: 'Today',
    unread: true,
  },
  {
    id: '3',
    type: 'warning',
    category: 'Alerts',
    title: 'Attendance Pending',
    description: "Don't forget to confirm your attendance for yesterday's session to claim your certificate.",
    time: '3h ago',
    date: 'Today',
    unread: false,
  },
  {
    id: '4',
    type: 'error',
    category: 'Activities',
    title: 'Session Postponed',
    description: 'The Full-Stack workshop has been moved to next Friday due to scheduled maintenance.',
    time: 'Yesterday',
    date: 'Earlier',
    unread: false,
  },
  {
    id: '5',
    type: 'info',
    category: 'News',
    title: 'Welcome to JU Hub',
    description: 'Explore campus activities, track your progress, and connect with faculty coordinators seamlessly.',
    time: '2 days ago',
    date: 'Earlier',
    unread: false,
  }
];

export default function StudentNotifications() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const filteredNotifs = notifications.filter(n => 
    (activeCategory === 'All' || n.category === activeCategory) &&
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayNotifs = filteredNotifs.filter(n => n.date === 'Today');
  const earlierNotifs = filteredNotifs.filter(n => n.date === 'Earlier');

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
            <View>
                <ThemedText style={[styles.title, { color: theme.text }]}>All Alerts</ThemedText>
                <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                    System updates & activity alerts
                </ThemedText>
            </View>
            <TouchableOpacity style={[styles.markReadBtn, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={markAllRead}>
                <MailOpen size={16} color={theme.primary} />
                <ThemedText style={[styles.markReadText, { color: theme.primary }]}>Read All</ThemedText>
            </TouchableOpacity>
        </View>

        {/* Stats & Search Area */}
        <View style={styles.summaryArea}>
            <View style={styles.statsSummary}>
                <ThemedText style={[styles.totalBadge, { color: theme.textSecondary }]}>
                    <ThemedText style={{fontWeight: '900'}}>{notifications.length}</ThemedText> Total
                </ThemedText>
                <View style={[styles.dotSeparator, { backgroundColor: theme.border }]} />
                <ThemedText style={[styles.unreadBadge, { color: theme.primary }]}>
                    <ThemedText style={{fontWeight: '900'}}>{unreadCount}</ThemedText> New Notifications
                </ThemedText>
            </View>
            
            <View style={styles.interactionRow}>
                <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Search size={18} color={theme.textSecondary} />
                    <TextInput 
                        placeholder="Search alerts.." 
                        placeholderTextColor={theme.textSecondary}
                        style={[styles.searchInput, { color: theme.text }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={[styles.filterCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <SlidersHorizontal size={18} color={theme.textSecondary} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Category Chips */}
        <View style={styles.chipRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
                {NOTIF_CATEGORIES.map(cat => (
                    <TouchableOpacity 
                        key={cat} 
                        onPress={() => setActiveCategory(cat)}
                        style={[
                            styles.chip,
                            { backgroundColor: theme.card, borderColor: theme.border },
                            activeCategory === cat && { backgroundColor: theme.primary, borderColor: theme.primary }
                        ]}
                    >
                        <ThemedText style={[
                            styles.chipText, 
                            { color: theme.textSecondary },
                            activeCategory === cat && { color: '#FFFFFF' }
                        ]}>{cat}</ThemedText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* Today Section */}
        {todayNotifs.length > 0 && (
            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Today</ThemedText>
                <View style={styles.list}>
                    {todayNotifs.map(item => (
                        <NotificationCard 
                            key={item.id} 
                            item={item} 
                            theme={theme} 
                            colorScheme={colorScheme}
                            onDelete={() => deleteNotif(item.id)}
                            onPress={() => markRead(item.id)}
                        />
                    ))}
                </View>
            </View>
        )}

        {/* Earlier Section */}
        {earlierNotifs.length > 0 && (
            <View style={[styles.section, { marginTop: 24 }]}>
                <ThemedText style={styles.sectionTitle}>Earlier</ThemedText>
                <View style={styles.list}>
                    {earlierNotifs.map(item => (
                        <NotificationCard 
                            key={item.id} 
                            item={item} 
                            theme={theme} 
                            colorScheme={colorScheme}
                            onDelete={() => deleteNotif(item.id)}
                            onPress={() => markRead(item.id)}
                        />
                    ))}
                </View>
            </View>
        )}

        {filteredNotifs.length === 0 && (
            <View style={styles.emptyState}>
                <View style={[styles.emptyIconCircle, { backgroundColor: theme.card }]}>
                    <Bell size={40} color={theme.textSecondary} />
                </View>
                <ThemedText style={[styles.emptyTitle, { color: theme.text }]}>All caught up!</ThemedText>
                <ThemedText style={[styles.emptySubtitle, { color: theme.textSecondary }]}>No alerts found matching your filters.</ThemedText>
            </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}

function NotificationCard({ item, theme, colorScheme, onDelete, onPress }: any) {
    const getIconInfo = () => {
        switch (item.type) {
            case 'success': return { icon: CheckCircle2, color: theme.success, bg: theme.success + '15' };
            case 'error': return { icon: XCircle, color: theme.error, bg: theme.error + '15' };
            case 'warning': return { icon: Bell, color: theme.warning, bg: theme.warning + '15' };
            default: return { icon: Info, color: theme.primary, bg: theme.primary + '15' };
        }
    };

    const info = getIconInfo();
    const Icon = info.icon;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={[
                styles.card, 
                { backgroundColor: theme.card, borderColor: theme.border },
                item.unread && [styles.unreadCard, { borderLeftColor: theme.primary, borderColor: theme.primary + '30' }]
            ]}>
                <View style={[styles.iconBox, { backgroundColor: info.bg }]}>
                    <Icon size={18} color={info.color} />
                </View>
                
                <View style={styles.cardContent}>
                    <View style={styles.cardMainRow}>
                        <ThemedText style={[styles.notifTitle, { color: theme.text }, item.unread && { fontWeight: '800' }]} numberOfLines={1}>
                            {item.title}
                        </ThemedText>
                        <ThemedText style={[styles.timeText, { color: theme.textSecondary }]}>{item.time}</ThemedText>
                    </View>
                    
                    <ThemedText style={[styles.notifDesc, { color: theme.textSecondary }]} numberOfLines={1}>
                        {item.description}
                    </ThemedText>
                    
                    <View style={styles.cardMetaRow}>
                        <View style={styles.statusTagRow}>
                            {item.unread && <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />}
                            <ThemedText style={[styles.categoryLabel, { color: theme.textSecondary }, item.unread && { color: theme.primary }]}>
                                {item.unread ? 'NEW' : item.category}
                            </ThemedText>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={[styles.miniDeleteBtn, { backgroundColor: theme.error + '15' }]} onPress={(e) => { e.stopPropagation(); onDelete(); }}>
                    <Trash2 size={14} color={theme.error} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 140 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, marginTop: 2, fontWeight: '600' },
  
  markReadBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
  markReadText: { fontSize: 12, fontWeight: '800' },

  summaryArea: { marginBottom: 24 },
  statsSummary: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  totalBadge: { fontSize: 13, fontWeight: '600' },
  dotSeparator: { width: 4, height: 4, borderRadius: 2, marginHorizontal: 12 },
  unreadBadge: { fontSize: 13, fontWeight: '700' },

  interactionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 13, marginLeft: 8, fontWeight: '500' },
  filterCircle: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },

  chipRow: { marginBottom: 20, marginHorizontal: -20 },
  chipScroll: { paddingHorizontal: 20, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  chipText: { fontSize: 11, fontWeight: '700' },

  section: { },
  sectionTitle: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },

  list: { gap: 10 },
  card: { 
    borderRadius: 16, 
    padding: 12, 
    borderWidth: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadCard: {
    borderLeftWidth: 3,
  },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 12 },
  cardMainRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  notifTitle: { fontSize: 13.5, flex: 1, marginRight: 8 },
  timeText: { fontSize: 10, fontWeight: '600' },
  notifDesc: { fontSize: 12, lineHeight: 16, fontWeight: '500' },

  cardMetaRow: { marginTop: 4 },
  statusTagRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  unreadDot: { width: 5, height: 5, borderRadius: 2.5 },
  categoryLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },

  miniDeleteBtn: { width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },

  emptyState: { alignItems: 'center', paddingVertical: 80, gap: 16 },
  emptyIconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  emptyTitle: { fontSize: 20, fontWeight: '900' },
  emptySubtitle: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
});

