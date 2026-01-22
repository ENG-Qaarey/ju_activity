import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Bell, Send, Users, User, Clock, Megaphone, Trash2, ArrowLeft, Mail } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuInput } from '@/src/components/JuInput';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminNotifications() {
  const [targetAll, setTargetAll] = React.useState(true);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Broadcast</ThemedText>
                <ThemedText style={styles.subtitle}>Send system-wide notifications</ThemedText>
            </View>
            <TouchableOpacity style={[styles.historyBtn, { backgroundColor: theme.card }]}>
                <Clock size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </View>

        {/* Compose Notification */}
        <GlassCard style={[styles.composeCard, { backgroundColor: theme.card }]}>
            <View style={styles.composeHeader}>
                <Megaphone size={20} color="#0EA5E9" />
                <Text style={[styles.composeTitle, { color: theme.text }]}>New Broadcast</Text>
            </View>
            
            <JuInput label="Subject" placeholder="e.g. Holiday Announcement" />
            
            <View style={styles.textAreaContainer}>
                <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Message Content</Text>
                <TextInput 
                    multiline 
                    numberOfLines={4} 
                    placeholder="Type your message here..." 
                    style={[styles.textArea, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                    placeholderTextColor={theme.textSecondary}
                />
            </View>

            <View style={[styles.toggleRow, { backgroundColor: theme.background }]}>
                <View style={styles.toggleLeft}>
                    <Users size={18} color={theme.textSecondary} />
                    <View>
                        <Text style={[styles.toggleText, { color: theme.text }]}>Target All Users</Text>
                        <Text style={[styles.toggleSub, { color: theme.textSecondary }]}>Send to every registered account</Text>
                    </View>
                </View>
                <Switch 
                    value={targetAll} 
                    onValueChange={setTargetAll} 
                    trackColor={{ false: theme.border, true: '#0EA5E9' }}
                    thumbColor="#FFFFFF"
                />
            </View>

            <JuButton title="Send Notification" onPress={() => {}} icon={Send} />
        </GlassCard>

        {/* Recent Broadcasts */}
        <ThemedText style={styles.sectionTitle}>Recent Broadcasts</ThemedText>
        <NotificationCard 
            title="System Maintenance" 
            msg="The activity hub will be offline for 2 hours tonight..." 
            time="2 days ago" 
            recipients="1,248" 
            theme={theme}
        />
        <NotificationCard 
            title="Ramadan Schedule" 
            msg="University hours have been updated for the holy month..." 
            time="1 week ago" 
            recipients="1,210" 
            theme={theme}
        />
      </ScrollView>
    </GradientBackground>
  );
}

function NotificationCard({ title, msg, time, recipients, theme }: any) {
    return (
        <GlassCard style={[styles.recentCard, { backgroundColor: theme.card }]}>
            <View style={styles.nHead}>
                <Text style={[styles.nTitle, { color: theme.text }]}>{title}</Text>
                <TouchableOpacity><Trash2 size={16} color={theme.textSecondary} /></TouchableOpacity>
            </View>
            <Text style={[styles.nMsg, { color: theme.textSecondary }]} numberOfLines={2}>{msg}</Text>
            <View style={styles.nFooter}>
                <View style={styles.nMeta}>
                    <Users size={12} color={theme.textSecondary} />
                    <Text style={[styles.nMetaText, { color: theme.textSecondary }]}>{recipients} recipients</Text>
                </View>
                <Text style={[styles.nTime, { color: theme.textSecondary }]}>{time}</Text>
            </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '900' },
  subtitle: { fontSize: 13, marginTop: 2 },
  historyBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  composeCard: { padding: 16, marginBottom: 32 },
  composeHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  composeTitle: { fontSize: 16, fontWeight: '800' },
  textAreaContainer: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginLeft: 4 },
  textArea: { borderRadius: 16, padding: 16, height: 100, textAlignVertical: 'top', fontSize: 15, borderWidth: 1 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 24 },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleText: { fontSize: 14, fontWeight: '700' },
  toggleSub: { fontSize: 11, marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '800', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  recentCard: { padding: 16, marginBottom: 12 },
  nHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  nTitle: { fontSize: 15, fontWeight: '700' },
  nMsg: { fontSize: 13, lineHeight: 18 },
  nFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  nMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nMetaText: { fontSize: 11, fontWeight: '600' },
  nTime: { fontSize: 11 },
});
