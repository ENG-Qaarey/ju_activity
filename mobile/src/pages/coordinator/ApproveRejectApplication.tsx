import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, User, Mail, GraduationCap, FileText, Check, X, MessageSquare, Shield } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';

export default function ApproveRejectApplication() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Decision</ThemedText>
            <View style={{ width: 44 }} />
        </View>

        {/* Profiles */}
        <GlassCard style={styles.profileCard}>
            <View style={styles.avatarLarge}>
                <User size={40} color="#0EA5E9" />
            </View>
            <ThemedText style={styles.sName}>muscab axmed</ThemedText>
            <Text style={styles.sId}>ST-2024-001 • Year 3</Text>
            <View style={styles.statusPill}>
                 <Text style={styles.statusText}>PENDING REVIEW</Text>
            </View>
        </GlassCard>

        {/* Details Section */}
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Student Info</ThemedText>
            <InfoRow icon={Mail} label="Email" value="muscabqaarey@gmail.com" />
            <InfoRow icon={GraduationCap} label="Program" value="Computer Science" />
            <InfoRow icon={Shield} label="Credits" value="112 Earned" />
        </View>

        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Application Note</ThemedText>
            <GlassCard style={styles.noteCard}>
                <Text style={styles.noteText}>
                    "I am very interested in improving my design skills. I've been working on a small project 
                    and believe this masterclass will help me finalize the UI correctly."
                </Text>
            </GlassCard>
        </View>

        {/* Internal Notes */}
        <View style={styles.section}>
             <ThemedText style={styles.sectionTitle}>Add Coordinator Feedback</ThemedText>
             <View style={styles.inputBox}>
                 <MessageSquare size={18} color="#94A3B8" />
                 <TextInput 
                    placeholder="Optional feedback to student..." 
                    style={styles.input}
                    placeholderTextColor="#94A3B8"
                    multiline
                 />
             </View>
        </View>

        {/* Final Actions */}
        <View style={styles.actions}>
            <View style={{ flex: 1 }}>
                 <JuButton 
                    title="Reject Application" 
                    onPress={() => {}} 
                    variant="outline" 
                    textStyle={{ color: '#EF4444' }}
                    style={{ borderColor: '#EF4444' }}
                />
            </View>
            <View style={{ flex: 1 }}>
                 <JuButton title="Confirm Approval" onPress={() => {}} icon={Check} />
            </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
    return (
        <View style={styles.infoRow}>
            <Icon size={18} color="#64748B" />
            <View>
                <Text style={styles.infoLab}>{label}</Text>
                <Text style={styles.infoVal}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  profileCard: { alignItems: 'center', padding: 24, marginBottom: 32 },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0EA5E910', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  sName: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  sId: { fontSize: 13, color: '#94A3B8', marginTop: 4 },
  statusPill: { marginTop: 16, backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '800', color: '#D97706' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  infoLab: { fontSize: 11, color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' },
  infoVal: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginTop: 2 },
  noteCard: { padding: 16 },
  noteText: { fontSize: 14, color: '#475569', lineHeight: 22, fontStyle: 'italic' },
  inputBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16, minHeight: 80, borderWidth: 1, borderColor: '#E2E8F0' },
  input: { flex: 1, marginLeft: 10, fontSize: 14, color: '#1E293B', paddingTop: 0 },
  actions: { flexDirection: 'row', gap: 16, marginTop: 12 },
});
