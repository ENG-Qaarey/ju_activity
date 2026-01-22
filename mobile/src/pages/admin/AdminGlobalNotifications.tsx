import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Switch, Alert } from 'react-native';
import { 
  ArrowLeft, Bell, BellRing, BellOff, Volume2, Globe, Mail, MessageSquare
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { useRouter } from 'expo-router';

export default function AdminGlobalNotifications() {
  const router = useRouter();
  
  // State for toggles
  const [allPush, setAllPush] = React.useState(true);
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [systemAnnouncements, setSystemAnnouncements] = React.useState(true);
  const [newRegistrations, setNewRegistrations] = React.useState(false);
  const [activityProposals, setActivityProposals] = React.useState(true);
  const [attendanceReports, setAttendanceReports] = React.useState(false);

  return (
    <GradientBackground>
       <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/(admin)/profile')}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
            <View style={styles.iconContainer}>
                <BellRing size={28} color="#0EA5E9" />
            </View>
            <ThemedText style={styles.pageTitle}>Global Notifications</ThemedText>
            <Text style={styles.pageSubtitle}>Manage how you receive alerts and system updates.</Text>
        </View>

        {/* General Settings */}
        <GlassCard style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Globe size={16} color="#64748B" />
                <Text style={styles.sectionTitle}>General Channels</Text>
            </View>
            
            <ToggleItem 
                icon={Bell} 
                label="Push Notifications" 
                desc="Receive alerts on your mobile device"
                value={allPush}
                onValueChange={setAllPush}
            />
            <View style={styles.divider} />
            <ToggleItem 
                icon={Mail} 
                label="Email Digests" 
                desc="Daily summary of system activities"
                value={emailAlerts}
                onValueChange={setEmailAlerts}
            />
        </GlassCard>

        {/* Administrative Alerts */}
        <GlassCard style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <MessageSquare size={16} color="#64748B" />
                <Text style={styles.sectionTitle}>Administrative Alerts</Text>
            </View>
            
            <ToggleItem 
                label="System Announcements" 
                value={systemAnnouncements}
                onValueChange={setSystemAnnouncements}
            />
            <View style={styles.divider} />
            <ToggleItem 
                label="New User Registrations" 
                value={newRegistrations}
                onValueChange={setNewRegistrations}
            />
             <View style={styles.divider} />
            <ToggleItem 
                label="Activity Proposals" 
                value={activityProposals}
                onValueChange={setActivityProposals}
            />
             <View style={styles.divider} />
            <ToggleItem 
                label="Attendance Reports" 
                value={attendanceReports}
                onValueChange={setAttendanceReports}
            />
        </GlassCard>

      </ScrollView>
    </GradientBackground>
  );
}

function ToggleItem({ icon: Icon, label, desc, value, onValueChange }: any) {
    return (
        <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>{label}</Text>
                {desc && <Text style={styles.toggleDesc}>{desc}</Text>}
            </View>
            <Switch 
                value={value} 
                onValueChange={onValueChange}
                trackColor={{ false: '#E2E8F0', true: '#0EA5E9' }}
                thumbColor={'#FFFFFF'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa04',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop: -20,
  },
  backBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#ffffff00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 10 },
  pageHeader: { alignItems: 'center', marginBottom: 30 },
  iconContainer: {
      width: 64, height: 64, borderRadius: 32, backgroundColor: '#E0F2FE',
      justifyContent: 'center', alignItems: 'center', marginBottom: 16,
      borderWidth: 4, borderColor: '#FFFFFF'
  },
  pageTitle: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  pageSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', maxWidth: '70%' },
  sectionCard: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  toggleInfo: { flex: 1, marginRight: 16 },
  toggleLabel: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  toggleDesc: { fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
});
