import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { User, Mail, Shield, Bell, CircleHelp, LogOut, ChevronRight, Settings } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function StudentProfile() {
  const router = useRouter();

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://github.com/shadcn.png' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.userName}>muscab axmed</ThemedText>
          <ThemedText style={styles.userEmail}>muscabqaarey@gmail.com</ThemedText>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
          <GlassCard style={styles.card}>
            <ProfileItem icon={User} label="Personal Information" />
            <ProfileItem icon={Shield} label="Security & Password" />
            <ProfileItem icon={Bell} label="Notification Settings" />
          </GlassCard>
        </View>

        {/* Support & More */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Support & More</ThemedText>
          <GlassCard style={styles.card}>
            <ProfileItem icon={CircleHelp} label="Help Center" />
            <ProfileItem icon={Settings} label="App Settings" />
            <ProfileItem icon={LogOut} label="Logout" color="#EF4444" onPress={() => router.push('/login')} />
          </GlassCard>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0 (JU-AMS Mobile)</Text>
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
      <ChevronRight size={20} color="#94A3B8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0369A1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
