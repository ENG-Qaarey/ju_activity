import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Switch, Platform } from 'react-native';
import { Bell, Send, Users, User, Clock, Megaphone, Trash2, ArrowLeft, Mail, ChevronRight, Hash, ShieldAlert, Sparkles, Zap, MessageSquareQuote } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuInput } from '@/src/components/JuInput';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdminNotifications() {
  const router = useRouter();
  const [targetAll, setTargetAll] = React.useState(true);
  const [formData, setFormData] = React.useState({
    subject: '',
    message: ''
  });
  
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <GradientBackground>
      {/* Sleek Navigation Bar */}
      {/* <View style={styles.navBar}>
        <TouchableOpacity style={[styles.navIconBtn, { backgroundColor: theme.card }]} onPress={() => router.back()}>
          <ArrowLeft size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: theme.text }]}>Communication Hub</Text>
        <TouchableOpacity style={[styles.navIconBtn, { backgroundColor: theme.card }]}>
          <Clock size={20} color={theme.text} />
        </TouchableOpacity>
      </View> */}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Refined Title Section */}
        <View style={styles.headlineBox}>
            <View style={[styles.iconBox, { backgroundColor: theme.primary }]}>
                <Megaphone size={24} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <View style={styles.headlineText}>
                <Text style={[styles.mainTitle, { color: theme.text }]}>Official Broadcast</Text>
                <Text style={[styles.mainSubtitle, { color: theme.textSecondary }]}>
                    Reach every student and faculty member instantly.
                </Text>
            </View>
        </View>

        {/* Actionable Stats Row */}
        <View style={styles.statsRow}>
            <View style={[styles.statItem, { backgroundColor: theme.card }]}>
                <Users size={16} color={theme.primary} />
                <Text style={[styles.statValue, { color: theme.text }]}>1.2K</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Active Recipients</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: theme.card }]}>
                <Mail size={16} color={theme.success} />
                <Text style={[styles.statValue, { color: theme.text }]}>98%</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Avg. Open Rate</Text>
            </View>
        </View>

        {/* Compose Card */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Draft Notification</Text>
            <MessageSquareQuote size={16} color={theme.primary} />
        </View>

        <GlassCard style={[styles.composeCard, { backgroundColor: colorScheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 0.95)' }]}>
            <View style={styles.inputGap}>
                <View style={styles.textAreaContainer}>
                    <View style={styles.labelRow}>
                        <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Subject Line</Text>
                        <View style={[styles.liveBadge, { backgroundColor: theme.primary + '15' }]}>
                            <Text style={[styles.liveText, { color: theme.primary }]}>REQUIRED</Text>
                        </View>
                    </View>
                    <TextInput 
                        multiline 
                        numberOfLines={1} 
                        placeholder="e.g. Campus Holiday Schedule" 
                        style={[
                            styles.textArea, 
                            { 
                                height: 48, 
                                borderColor: theme.primary, 
                                backgroundColor: theme.background,
                                color: theme.text,
                                borderLeftWidth: 4,
                                paddingVertical: 12
                            }
                        ]}
                        placeholderTextColor={theme.tabIconDefault}
                        value={formData.subject}
                        onChangeText={(text) => updateField('subject', text)}
                    />
                </View>
                
                <View style={styles.textAreaContainer}>
                    <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Broadcast Content</Text>
                    <TextInput 
                        multiline 
                        numberOfLines={5} 
                        placeholder="Write your official announcement here..." 
                        style={[
                            styles.textArea, 
                            { 
                                backgroundColor: theme.background, 
                                color: theme.text, 
                                borderColor: theme.border,
                                height: 130
                            }
                        ]}
                        placeholderTextColor={theme.tabIconDefault}
                        value={formData.message}
                        onChangeText={(text) => updateField('message', text)}
                    />
                </View>

                {/* Audience Selection */}
                <View style={[styles.audienceTile, { backgroundColor: theme.background, borderColor: theme.border }]}>
                    <View style={styles.audienceInfo}>
                        <View style={[styles.audienceCircle, { backgroundColor: theme.primary }]}>
                            <Users size={16} color="#FFFFFF" />
                        </View>
                        <View>
                            <Text style={[styles.audienceLabel, { color: theme.text }]}>Broadcasting to all Users</Text>
                            <Text style={[styles.audienceSub, { color: theme.textSecondary }]}>This message will bypass silent modes</Text>
                        </View>
                    </View>
                    <Switch 
                        value={targetAll} 
                        onValueChange={setTargetAll} 
                        trackColor={{ false: theme.border, true: theme.primary }}
                        thumbColor="#FFFFFF"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.btnShadow}>
                <LinearGradient
                    colors={['#0EA5E9', '#2563EB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.actionBtn}
                >
                    <Send size={18} color="#FFFFFF" />
                    <Text style={styles.actionBtnText}>Send to 1,240 Users</Text>
                </LinearGradient>
            </TouchableOpacity>
        </GlassCard>

        {/* Intelligence Feed */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Communication History</Text>
            <TouchableOpacity><Text style={{ color: theme.primary, fontSize: 13, fontWeight: '800' }}>See All</Text></TouchableOpacity>
        </View>

        <View style={styles.historyGrid}>
            <HistoryCard 
                title="Exam Schedule Release" 
                msg="Spring 2026 exam modules have been finalized. Please check individual portals for timings." 
                time="21h ago" 
                audience="All Students"
                theme={theme}
            />
            <HistoryCard 
                title="Innovation Hub Closure" 
                msg="The main hub will be closed for maintenance tomorrow between 8 AM and 12 PM." 
                time="3 days ago" 
                audience="Engineering Dept"
                theme={theme}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function HistoryCard({ title, msg, time, audience, theme }: any) {
    return (
        <GlassCard style={[styles.hCard, { borderColor: theme.border }]}>
            <View style={styles.hHead}>
                <View style={[styles.audienceTag, { backgroundColor: theme.primary + '10' }]}>
                    <Text style={[styles.audienceTagText, { color: theme.primary }]}>{audience}</Text>
                </View>
                <Text style={[styles.hTime, { color: theme.tabIconDefault }]}>{time}</Text>
            </View>
            <Text style={[styles.hTitle, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.hMsg, { color: theme.textSecondary }]} numberOfLines={2}>{msg}</Text>
            <View style={styles.hFooter}>
                <View style={styles.hStats}>
                    <Zap size={12} color={theme.success} />
                    <Text style={[styles.hStatsText, { color: theme.success }]}>Delivered</Text>
                </View>
                <TouchableOpacity style={styles.hDeleteBtn}>
                    <Trash2 size={14} color={theme.error} />
                </TouchableOpacity>
            </View>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  navIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '800',
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  scrollView: { flex: 1 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 60 },
  headlineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  headlineText: { flex: 1 },
  mainTitle: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  mainSubtitle: { fontSize: 13, marginTop: 4, lineHeight: 18, opacity: 0.8 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statItem: {
    flex: 1,
    padding: 16,
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  statValue: { fontSize: 18, fontWeight: '900', marginTop: 8 },
  statLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 13, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  composeCard: { padding: 20, borderRadius: 32 },
  inputGap: { gap: 20, marginBottom: 24 },
  textAreaContainer: {},
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  fieldLabel: { fontSize: 12, fontWeight: '800' },
  liveBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  liveText: { fontSize: 9, fontWeight: '900' },
  textArea: { borderRadius: 16, padding: 16, textAlignVertical: 'top', fontSize: 15, borderWidth: 1.5 },
  audienceTile: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 20, borderWidth: 1.5 },
  audienceInfo: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  audienceCircle: { width: 34, height: 34, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  audienceLabel: { fontSize: 14, fontWeight: '800' },
  audienceSub: { fontSize: 11, marginTop: 2, fontWeight: '500' },
  btnShadow: { width: '100%', height: 56, borderRadius: 18, overflow: 'hidden' },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  actionBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  historyGrid: { gap: 14 },
  hCard: { padding: 18, borderRadius: 24, borderWidth: 1 },
  hHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  audienceTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  audienceTagText: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  hTime: { fontSize: 11, fontWeight: '700' },
  hTitle: { fontSize: 17, fontWeight: '900', marginBottom: 8 },
  hMsg: { fontSize: 13, lineHeight: 20, marginBottom: 16 },
  hFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.03)' },
  hStats: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hStatsText: { fontSize: 11, fontWeight: '800' },
  hDeleteBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(239, 68, 68, 0.05)', justifyContent: 'center', alignItems: 'center' },
});
