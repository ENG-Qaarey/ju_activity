import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Clock, Info, CheckCircle2, AlertCircle, Bookmark, ArrowLeft } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function CoordinatorNotifications() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Coordinator Alerts</ThemedText>
                <ThemedText style={styles.subtitle}>Stay updated with your activities</ThemedText>
            </View>
            <TouchableOpacity style={styles.configBtn}>
                <Bookmark size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            <CNotificationItem 
                title="Application Alert" 
                msg="12 new students applied for 'UI/UX Masterclass' in the last hour." 
                time="10m ago" 
                type="action" 
            />
            <CNotificationItem 
                title="Activity Proposal Approved" 
                msg="Your 'Python for Data' proposal has been approved by Admin Hassan." 
                time="2h ago" 
                type="success" 
            />
            <CNotificationItem 
                title="System Update" 
                msg="Coordinators now have access to real-time attendance export features." 
                time="Yesterday" 
                type="info" 
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function CNotificationItem({ title, msg, time, type }: any) {
    const getIcon = () => {
        switch(type) {
            case 'success': return { icon: CheckCircle2, color: '#22C55E' };
            case 'action': return { icon: AlertCircle, color: '#F59E0B' };
            default: return { icon: Info, color: '#0EA5E9' };
        }
    }
    const { icon: Icon, color } = getIcon();

    return (
        <GlassCard style={styles.card}>
             <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                 <Icon size={22} color={color} />
             </View>
             <View style={{ flex: 1 }}>
                <View style={styles.cHead}>
                    <Text style={[styles.cTitle, { color }]}>{title}</Text>
                    <Text style={styles.cTime}>{time}</Text>
                </View>
                <Text style={styles.cMsg}>{msg}</Text>
             </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  configBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { flexDirection: 'row', padding: 16, marginBottom: 16, gap: 16, alignItems: 'center' },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cTitle: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  cTime: { fontSize: 11, color: '#94A3B8' },
  cMsg: { fontSize: 14, color: '#475569', lineHeight: 20 },
});
