import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  User, Mail, Shield, Bell, CircleHelp, LogOut, 
  ChevronRight, Settings, Calendar, Award, Star
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useTheme } from '@/src/context/ThemeContext';

export default function StudentProfile() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { refreshTheme } = useTheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('current-user');
    await refreshTheme();
    router.replace('/login');
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://github.com/shadcn.png' }} 
              style={[styles.avatar, { borderColor: theme.card }]} 
            />
            <View style={[styles.studentBadge, { borderColor: theme.card }]}>
                <Award size={12} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
          <ThemedText style={[styles.userName, { color: theme.text }]}>muscab axmed</ThemedText>
          <View style={[styles.roleLabel, { backgroundColor: theme.primary + '20' }]}>
              <Text style={[styles.roleText, { color: theme.primary }]}>STUDENT PROFILE</Text>
          </View>
        </View>

        {/* My Activity */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>My Engagement</ThemedText>
          <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
            <ProfileItem icon={Calendar} label="Activity History" color="#0EA5E9" theme={theme} />
            <ProfileItem icon={Star} label="Points & Certificates" color="#F59E0B" theme={theme} />
          </GlassCard>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account Settings</ThemedText>
          <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
            <ProfileItem icon={User} label="Personal Information" theme={theme} />
            <ProfileItem icon={Shield} label="Security & Password" theme={theme} />
            <ProfileItem icon={Bell} label="Notification Settings" theme={theme} />
          </GlassCard>
        </View>

        {/* Support & More */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>Support & More</ThemedText>
          <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
            <ProfileItem icon={CircleHelp} label="Help Center" theme={theme} />
            <ProfileItem icon={Settings} label="App Settings" theme={theme} />
            <ProfileItem icon={LogOut} label="Log Out" color="#EF4444" onPress={handleLogout} theme={theme} />
          </GlassCard>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>Student Hub v2.0 • JU-AMS</Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function ProfileItem({ icon: Icon, label, color, onPress, theme }: any) {
  const itemColor = color || theme.text;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBg, { backgroundColor: itemColor + '15' }]}>
          <Icon size={20} color={itemColor} />
        </View>
        <Text style={[styles.itemLabel, { color: itemColor }]}>{label}</Text>
      </View>
      <ChevronRight size={18} color={theme.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40 },
  header: { alignItems: 'center', marginBottom: 32 },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4 },
  studentBadge: { position: 'absolute', right: 4, bottom: 4, backgroundColor: '#0EA5E9', padding: 6, borderRadius: 12, borderWidth: 2 },
  userName: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  roleLabel: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  roleText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '800', marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 1 },
  card: { padding: 8, borderRadius: 24, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBg: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  itemLabel: { fontSize: 16, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  versionText: { fontSize: 11, fontWeight: '600' },
});
