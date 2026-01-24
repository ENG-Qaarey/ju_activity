import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Animated } from 'react-native';
import { Info, CheckCircle2, XCircle, Bell, Filter, MoreHorizontal, ArrowLeft } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useRouter } from 'expo-router';

const CATEGORIES = ['All', 'Unread', 'Applications', 'System'];

export default function StudentNotifications() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <GradientBackground>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: theme.card }]} onPress={() => router.back()}>
          <ArrowLeft size={20} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Inbox</ThemedText>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: theme.card }]}>
          <MoreHorizontal size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.bellBadge}>
            <Bell size={24} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <View>
            <ThemedText style={styles.pageTitle}>Notifications</ThemedText>
            <ThemedText style={[styles.pageSubtitle, { color: theme.textSecondary }]}>
              Stay synchronized with your academic activities.
            </ThemedText>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                {CATEGORIES.map(cat => (
                    <TouchableOpacity 
                        key={cat} 
                        onPress={() => setActiveCategory(cat)}
                        style={[
                            styles.tab, 
                            { backgroundColor: theme.card },
                            activeCategory === cat && { backgroundColor: theme.primary }
                        ]}
                    >
                        <ThemedText style={[
                            styles.tabText, 
                            { color: theme.textSecondary },
                            activeCategory === cat && { color: '#FFFFFF', fontWeight: '800' }
                        ]}>{cat}</ThemedText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* Notification List */}
        <View style={styles.listContainer}>
            <NotificationItem 
                type="success"
                title="Application Approved"
                description="Your registration for the 'Quantum Computing Workshop' has been approved. See you there!"
                time="2m ago"
                unread={true}
                theme={theme}
                colorScheme={colorScheme}
            />
            <NotificationItem 
                type="info"
                title="New Event: AI Startup Pitch"
                description="A new innovation forum just opened for registrations. Don't miss out on securing your spot."
                time="45m ago"
                unread={true}
                theme={theme}
                colorScheme={colorScheme}
            />
            <NotificationItem 
                type="warning"
                title="Attendance Pending"
                description="Please confirm your attendance for yesterday's 'Leadership Seminar' to receive your certificate."
                time="3h ago"
                unread={false}
                theme={theme}
                colorScheme={colorScheme}
            />
            <NotificationItem 
                type="error"
                title="Activity Postponed"
                description="Due to technical issues, the 'Database Management' session has been moved to Friday at 2:00 PM."
                time="Yesterday"
                unread={false}
                theme={theme}
                colorScheme={colorScheme}
            />
            <NotificationItem 
                type="info"
                title="Welcome to JU Hub"
                description="Explore campus activities, track your progress, and connect with faculty coordinators seamlessly."
                time="2 days ago"
                unread={false}
                theme={theme}
                colorScheme={colorScheme}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function NotificationItem({ type, title, description, time, unread, theme, colorScheme }: any) {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={20} color="#22C55E" />;
      case 'error': return <XCircle size={20} color="#EF4444" />;
      case 'warning': return <Bell size={20} color="#F59E0B" />;
      default: return <Info size={20} color="#3B82F6" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'success': return '#DCFCE7';
      case 'error': return '#FEE2E2';
      case 'warning': return '#FEF3C7';
      default: return '#DBEAFE';
    }
  };

  return (
    <GlassCard style={[
        styles.notificationCard, 
        { borderColor: theme.border },
        unread && { backgroundColor: colorScheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 0.95)', borderLeftWidth: 4, borderLeftColor: theme.primary }
    ]}>
      <View style={styles.notifContent}>
        <View style={[styles.iconContainer, { backgroundColor: getIconBg() }]}>
          {getIcon()}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.notifHeader}>
            <ThemedText style={[styles.notifTitle, unread && { fontWeight: '800' }]}>{title}</ThemedText>
            {unread && <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />}
          </View>
          <ThemedText style={[styles.notifDesc, { color: theme.textSecondary }]} numberOfLines={2}>{description}</ThemedText>
          <ThemedText style={[styles.notifTime, { color: theme.tabIconDefault }]}>{time}</ThemedText>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 10, paddingBottom: 40 },
  titleSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16, 
    marginBottom: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    padding: 20,
    borderRadius: 24,
  },
  bellBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  pageTitle: { fontSize: 24, fontWeight: '900' },
  pageSubtitle: { fontSize: 13, marginTop: 4, lineHeight: 18 },
  tabsWrapper: { marginBottom: 24, marginHorizontal: -20 },
  tabsContainer: { paddingHorizontal: 20, gap: 10 },
  tab: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  tabText: { fontSize: 13, fontWeight: '600' },
  listContainer: { gap: 12 },
  notificationCard: {
    padding: 16,
    borderRadius: 20,
  },
  notifContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notifTitle: { fontSize: 15, fontWeight: '700' },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  notifTime: { fontSize: 11, marginTop: 8, fontWeight: '600' },
  notifDesc: { fontSize: 13, lineHeight: 18 },
});

