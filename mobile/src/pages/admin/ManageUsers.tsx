import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ArrowLeft, Save, Trash2, Shield, Mail, CreditCard, Calendar, UserCheck } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuInput } from '@/src/components/JuInput';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';

export default function ManageUsers() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Manage User</ThemedText>
            <TouchableOpacity style={styles.deleteBtn}>
                <Trash2 size={22} color="#EF4444" />
            </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <GlassCard style={styles.profileCard}>
            <View style={styles.avatarLarge}>
                <ThemedText style={styles.avatarInitial}>MA</ThemedText>
            </View>
            <ThemedText style={styles.userName}>muscab axmed</ThemedText>
            <ThemedText style={styles.userRole}>Student Account</ThemedText>
            
            <View style={styles.badgeRow}>
                <View style={[styles.badge, styles.activeBadge]}>
                    <View style={styles.dot} />
                    <Text style={styles.activeText}>Active</Text>
                </View>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Verified</Text>
                </View>
            </View>
        </GlassCard>

        {/* Edit Form */}
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Account Details</ThemedText>
            <JuInput label="Full Name" value="muscab axmed" />
            <JuInput label="Email Address" value="muscabqaarey@gmail.com" keyboardType="email-address" />
            <JuInput label="Student ID" value="ST-2024-001" />
            
            <View style={{ marginTop: 20 }}>
                <Text style={styles.fieldLabel}>Role & Permissions</Text>
                <TouchableOpacity style={styles.rolePicker}>
                    <View style={styles.rolePickerLeft}>
                        <Shield size={20} color="#0EA5E9" />
                        <Text style={styles.rolePickerText}>Student</Text>
                    </View>
                    <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Danger Zone</ThemedText>
            <TouchableOpacity style={styles.dangerAction}>
                <Text style={styles.dangerActionText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerAction}>
                <Text style={styles.dangerActionText}>Deactivate Account</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.footer}>
            <JuButton title="Save Changes" onPress={() => Alert.alert("Success", "User updated successfully")} icon={Save} />
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
  profileCard: { alignItems: 'center', padding: 24, marginBottom: 32 },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0EA5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
  avatarInitial: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  userName: { fontSize: 22, fontWeight: '800', color: '#1E293B' },
  userRole: { fontSize: 14, color: '#64748B', marginTop: 4 },
  badgeRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F1F5F9', flexDirection: 'row', alignItems: 'center' },
  activeBadge: { backgroundColor: '#DEF7EC' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#059669', marginRight: 6 },
  activeText: { fontSize: 12, fontWeight: '700', color: '#059669' },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  fieldLabel: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 8, marginLeft: 4 },
  rolePicker: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  rolePickerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rolePickerText: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  changeText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9' },
  dangerAction: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dangerActionText: { fontSize: 15, fontWeight: '600', color: '#EF4444' },
  footer: { marginTop: 8 },
});
