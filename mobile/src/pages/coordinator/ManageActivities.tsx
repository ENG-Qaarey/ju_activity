import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { ArrowLeft, Save, Trash2, Calendar, MapPin, Users, Info, Settings, Image as LucideImage } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuInput } from '@/src/components/JuInput';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';

export default function ManageActivities() {
  const [isLive, setIsLive] = React.useState(true);

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Edit Activity</ThemedText>
            <TouchableOpacity style={styles.deleteBtn}>
                <Trash2 size={22} color="#EF4444" />
            </TouchableOpacity>
        </View>

        {/* Media Preview */}
        <GlassCard style={styles.mediaCard}>
            <View style={styles.imagePlaceholder}>
                <LucideImage size={40} color="#94A3B8" />
            </View>
            <View style={styles.mediaInfo}>
                <Text style={styles.mediaLabel}>Current Cover Image</Text>
                <TouchableOpacity><Text style={styles.changeBtn}>Change Image</Text></TouchableOpacity>
            </View>
        </GlassCard>

        {/* Configuration */}
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Main Settings</ThemedText>
            <JuInput label="Activity Title" value="UI/UX Design Masterclass" />
            
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <JuInput label="Date" value="2026-01-22" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <JuInput label="Time" value="14:00" />
                </View>
            </View>

            <JuInput label="Location" value="Lab 04, IT Building" />
        </View>

        {/* Audience Control */}
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Audience & Status</ThemedText>
            <JuInput label="Max Participants" value="30" keyboardType="numeric" />
            
            <View style={styles.toggleRow}>
                <View>
                    <Text style={styles.toggleTitle}>Live Registration</Text>
                    <Text style={styles.toggleSub}>Currently accepting applications</Text>
                </View>
                <Switch 
                    value={isLive} 
                    onValueChange={setIsLive} 
                    trackColor={{ false: '#CBD5E1', true: '#0EA5E9' }}
                    thumbColor="#FFFFFF"
                />
            </View>
        </View>

        {/* Quick Insights */}
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Quick Insights</ThemedText>
            <View style={styles.insightsGrid}>
                <View style={styles.insightBox}>
                    <Text style={styles.iVal}>28</Text>
                    <Text style={styles.iLab}>Joined</Text>
                </View>
                <View style={styles.insightBox}>
                    <Text style={styles.iVal}>92%</Text>
                    <Text style={styles.iLab}>Capacity</Text>
                </View>
            </View>
        </View>

        <View style={styles.footer}>
            <JuButton title="Save Changes" onPress={() => {}} icon={Save} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  deleteBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  mediaCard: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 32 },
  imagePlaceholder: { width: 64, height: 64, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  mediaInfo: { marginLeft: 16 },
  mediaLabel: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  changeBtn: { fontSize: 14, color: '#0EA5E9', fontWeight: '700', marginTop: 4 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  row: { flexDirection: 'row' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginTop: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  toggleTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  toggleSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  insightsGrid: { flexDirection: 'row', gap: 12 },
  insightBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  iVal: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  iLab: { fontSize: 11, color: '#64748B', fontWeight: '700', marginTop: 2, textTransform: 'uppercase' },
  footer: { marginTop: 8 },
});
