import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Bell, Clock, Info, CheckCircle2, AlertCircle, Bookmark, ArrowLeft, Search, Filter, Trash2, MailOpen, Mail } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useRouter } from 'expo-router';

export default function CoordinatorNotifications() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Elite Blue Header Banner */}
        <View style={styles.headerBanner}>
            <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>Coordinator Alerts</Text>
                <Text style={styles.bannerSubtitle}>
                    Stay synchronized with your student applications and activity approvals.
                </Text>
            </View>
            <View style={styles.bellBadge}>
                <Bell size={24} color="#FFFFFF" strokeWidth={2.5} />
                <View style={styles.notifDot} />
            </View>
        </View>

        {/* Quick Metrics Summary */}
        <View style={styles.metricsRow}>
            <MetricItem label="Unread" value="03" color={theme.primary} theme={theme} />
            <MetricItem label="Actions" value="12" color="#F59E0B" theme={theme} />
            <MetricItem label="Archive" value="45" color={theme.textSecondary} theme={theme} />
        </View>

        {/* Search & Filter Hub */}
        <View style={styles.searchRow}>
            <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Search size={18} color={theme.textSecondary} style={styles.searchIcon} />
                <TextInput 
                    placeholder="Search your alerts..." 
                    style={[styles.searchInput, { color: theme.text }]}
                    placeholderTextColor={theme.textSecondary}
                />
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Filter size={18} color={theme.primary} />
            </TouchableOpacity>
        </View>

        {/* Intelligence Feed Header */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Notifications</Text>
            <TouchableOpacity><Text style={{ color: theme.primary, fontSize: 12, fontWeight: '800' }}>Mark all read</Text></TouchableOpacity>
        </View>

        <View style={styles.list}>
            <CNotificationItem 
                title="New Student Application" 
                msg="12 new students applied for 'UI/UX Masterclass' in the last hour." 
                time="10m ago" 
                type="action" 
                isUnread={true}
                theme={theme}
            />
            <CNotificationItem 
                title="Activity Proposal Approved" 
                msg="Your 'Python for Data' proposal has been approved by Admin Hassan. It is now live for students." 
                time="2h ago" 
                type="success" 
                isUnread={false}
                theme={theme}
            />
            <CNotificationItem 
                title="Platform System Update" 
                msg="Coordinators now have access to real-time attendance export features. Check the Help Center for more info." 
                time="Yesterday" 
                type="info" 
                isUnread={false}
                theme={theme}
            />
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

function CNotificationItem({ title, msg, time, type, isUnread, theme }: any) {
    const getIcon = () => {
        switch(type) {
            case 'success': return { icon: CheckCircle2, color: '#22C55E' };
            case 'action': return { icon: AlertCircle, color: '#F59E0B' };
            default: return { icon: Info, color: '#0EA5E9' };
        }
    }
    const { icon: Icon, color } = getIcon();

    return (
        <GlassCard style={[styles.card, { borderColor: theme.border, backgroundColor: isUnread ? theme.primary + '03' : theme.card }]}>
             <View style={styles.cardMainRow}>
                <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                    <Icon size={20} color={color} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.cHead}>
                        <Text style={[styles.cTitle, { color: theme.text }]} numberOfLines={1}>{title}</Text>
                        <Text style={[styles.cTime, { color: theme.textSecondary }]}>{time}</Text>
                    </View>
                    <Text style={[styles.cMsg, { color: theme.textSecondary }]} numberOfLines={2}>{msg}</Text>
                </View>
             </View>
             
             <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
                <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: isUnread ? theme.primary : theme.textSecondary }]} />
                    <Text style={[styles.statusLabel, { color: isUnread ? theme.primary : theme.textSecondary }]}>
                        {isUnread ? 'Unread' : 'Archived'}
                    </Text>
                </View>
                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.actionIcon}>
                        {isUnread ? <MailOpen size={14} color={theme.primary} /> : <Mail size={14} color={theme.textSecondary} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                        <Trash2 size={14} color="#EF4444" />
                    </TouchableOpacity>
                </View>
             </View>
        </GlassCard>
    )
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
