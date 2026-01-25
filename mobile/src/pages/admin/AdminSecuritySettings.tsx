import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, Text, Switch } from 'react-native';
import { 
  ArrowLeft, Lock, KeyRound, ShieldCheck, Smartphone, CheckCircle2
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { client } from '@/src/lib/api';
import { ActivityIndicator } from 'react-native';

export default function AdminSecuritySettings() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [twoFactor, setTwoFactor] = React.useState(false);
  const [passwords, setPasswords] = React.useState({
    old: '',
    new: '',
    confirm: ''
  });
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const handleSave = async () => {
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      Alert.alert('Required Fields', 'Please fill in all password fields.');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      Alert.alert('Validation Error', 'New passwords do not match.');
      return;
    }

    if (passwords.new.length < 8) {
      Alert.alert('Security Policy', 'New password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      await client.patch('/users/me/password', {
        oldPassword: passwords.old,
        newPassword: passwords.new
      });
      Alert.alert('Security Updated', 'Your password has been successfully changed.');
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (e: any) {
      Alert.alert('Update Failed', e.message || 'Error updating security settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
       <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/(admin)/profile')}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20', borderColor: theme.card }]}>
                <ShieldCheck size={32} color={theme.primary} />
            </View>
            <ThemedText style={[styles.pageTitle, { color: theme.text }]}>Security & Password</ThemedText>
            <Text style={[styles.pageSubtitle, { color: theme.textSecondary }]}>Manage your password and security preferences.</Text>
        </View>

        {/* Change Password Section */}
        <GlassCard style={[styles.formCard, { backgroundColor: theme.card }]}>
            <View style={styles.sectionHeader}>
                <KeyRound size={16} color={theme.textSecondary} />
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Change Password</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Current Password</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                secureTextEntry
                value={passwords.old}
                onChangeText={(val) => setPasswords(prev => ({ ...prev, old: val }))}
                placeholder="Enter current password"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

             <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>New Password</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                secureTextEntry
                value={passwords.new}
                onChangeText={(val) => setPasswords(prev => ({ ...prev, new: val }))}
                placeholder="Enter new password"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

             <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Confirm New Password</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                secureTextEntry
                value={passwords.confirm}
                onChangeText={(val) => setPasswords(prev => ({ ...prev, confirm: val }))}
                placeholder="Confirm new password"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
        </GlassCard>

        {/* Two-Factor Auth */}
        <GlassCard style={[styles.formCard, { backgroundColor: theme.card }]}>
            <View style={styles.sectionHeader}>
                <Smartphone size={16} color={theme.textSecondary} />
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Two-Factor Authentication</Text>
            </View>
            
            <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                    <Text style={[styles.toggleLabel, { color: theme.text }]}>Enable 2FA</Text>
                    <Text style={[styles.toggleDesc, { color: theme.textSecondary }]}>Secure your account with 2FA via authenticator app.</Text>
                </View>
                <Switch 
                    value={twoFactor} 
                    onValueChange={setTwoFactor}
                    trackColor={{ false: theme.border, true: theme.primary }}
                    thumbColor={'#FFFFFF'}
                />
            </View>
        </GlassCard>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary, shadowColor: theme.primary }]} onPress={handleSave} disabled={loading}>
            {loading ? (
               <Text style={styles.saveBtnText}>Updating...</Text>
            ) : (
              <>
                <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={3} />
                <Text style={styles.saveBtnText}>Update Security Settings</Text>
              </>
            )}
        </TouchableOpacity>

      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop: -20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 10, paddingBottom: 40 },
  pageHeader: { alignItems: 'center', marginBottom: 30 },
  iconContainer: {
      width: 64, height: 64, borderRadius: 32,
      justifyContent: 'center', alignItems: 'center', marginBottom: 16,
      borderWidth: 4,
  },
  pageTitle: { fontSize: 24, fontWeight: '900', marginBottom: 8 },
  pageSubtitle: { fontSize: 13, textAlign: 'center', maxWidth: '70%' },
  formCard: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginLeft: 4 },
  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    borderWidth: 1,
  },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  toggleInfo: { flex: 1, marginRight: 16 },
  toggleLabel: { fontSize: 15, fontWeight: '700' },
  toggleDesc: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
