import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { 
  User, Mail, Shield, Bell, CircleHelp, LogOut, 
  ChevronRight, Settings, LayoutDashboard, Database, Lock
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function AdminProfile() {
  const router = useRouter();

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://github.com/shadcn.png' }} 
              style={styles.avatar} 
            />
            <View style={styles.adminBadge}>
                <Shield size={12} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
          <ThemedText style={styles.userName}>jamiila</ThemedText>
          <View style={styles.roleLabel}>
              <Text style={styles.roleText}>SYSTEM ADMINISTRATOR</Text>
          </View>
        </View>

        {/* Console Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Console Management</ThemedText>
          <GlassCard style={styles.card}>
            <ProfileItem icon={LayoutDashboard} label="Console Customization" color="#0EA5E9" />
            <ProfileItem icon={Database} label="System Data Backup" color="#8B5CF6" />
            <ProfileItem icon={Lock} label="Security Protocols" color="#F59E0B" />
          </GlassCard>
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account Details</ThemedText>
          <GlassCard style={styles.card}>
            <ProfileItem icon={User} label="Personal Information" />
            <ProfileItem icon={Bell} label="Global Notifications" />
            <ProfileItem icon={Settings} label="App Preferences" />
          </GlassCard>
        </View>

        {/* Support & Power */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>System Support</ThemedText>
          <GlassCard style={styles.card}>
            <ProfileItem icon={CircleHelp} label="Admin Hub Documentation" />
            <ProfileItem icon={LogOut} label="Emergency Logout" color="#EF4444" onPress={() => router.push('/login')} />
          </GlassCard>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Admin Console v2.0.4 • Stable</Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function ProfileItem({ icon: Icon, label, color = '#1E293B', onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBg, { backgroundColor: color + '10' }]}>
          <Icon size={20} color={color} />
        </View>
        <Text style={[styles.itemLabel, { color }]}>{label}</Text>
      </View>
      <ChevronRight size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40 },
  header: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#FFFFFF' },
  adminBadge: { position: 'absolute', right: 4, bottom: 4, backgroundColor: '#EF4444', padding: 6, borderRadius: 12, borderWidth: 2, borderColor: '#FFFFFF' },
  userName: { fontSize: 26, fontWeight: '900', color: '#1E293B', letterSpacing: -0.5 },
  roleLabel: { backgroundColor: '#3B82F615', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  roleText: { fontSize: 10, fontWeight: '800', color: '#3B82F6', letterSpacing: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 1 },
  card: { padding: 8, borderRadius: 24, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBg: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  itemLabel: { fontSize: 16, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  versionText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
});
