import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Info, CheckCircle2, XCircle } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function StudentNotifications() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View>
            <ThemedText type="title" style={styles.title}>Notifications</ThemedText>
            <ThemedText style={styles.subtitle}>Stay updated with your activity applications</ThemedText>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.unreadBadge}>
            <ThemedText style={styles.unreadText}>0 unread</ThemedText>
          </View>
          <TouchableOpacity style={styles.markReadBtn}>
            <ThemedText style={styles.markReadText}>Mark all read</ThemedText>
          </TouchableOpacity>
        </View>

        <NotificationItem 
          type="info"
          title="New Activity Available"
          description="A new activity 'Full-Stack' has been created by Amiin Daahir. Check it out and apply if interested!"
          time="19 Jan 2026, 3:00"
        />

        <NotificationItem 
          type="info"
          title="New Activity Available"
          description="A new activity 'Leadership' has been created by Amiin Daahir. Check it out and apply if interested!"
          time="19 Jan 2026, 3:00"
        />

        <NotificationItem 
          type="info"
          title="Application Submitted"
          description="Your application for 'Leadership' has been submitted and is pending review."
          time="19 Jan 2026, 3:00"
        />

        <NotificationItem 
          type="error"
          title="Application Rejected"
          description="Your application for 'Leadership' has been rejected."
          time="19 Jan 2026, 3:00"
        />

        <NotificationItem 
          type="success"
          title="Application Approved"
          description="Your application for 'Full-Stack' has been approved!"
          time="19 Jan 2026, 3:00"
        />
      </ScrollView>
    </GradientBackground>
  );
}

function NotificationItem({ type, title, description, time }: any) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={24} color="#22C55E" />;
      case 'error': return <XCircle size={24} color="#EF4444" />;
      default: return <Info size={24} color="#3B82F6" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'success': return '#DCFCE7';
      case 'error': return '#FEE2E2';
      default: return '#DBEAFE';
    }
  };

  return (
    <GlassCard style={styles.notificationCard}>
      <View style={styles.notifContent}>
        <View style={[styles.iconContainer, { backgroundColor: getIconBg() }]}>
          {getIcon()}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.notifHeader}>
            <ThemedText style={styles.notifTitle}>{title}</ThemedText>
            <ThemedText style={styles.notifTime}>{time}</ThemedText>
          </View>
          <ThemedText style={styles.notifDesc}>{description}</ThemedText>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  unreadBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  unreadText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '600',
  },
  markReadBtn: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  markReadText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  notificationCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  notifContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  notifTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  notifDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
});
