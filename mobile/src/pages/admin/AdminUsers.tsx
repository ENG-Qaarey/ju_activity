import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, UserPlus, Filter, User, Shield, MoreVertical, ChevronRight } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function AdminUsers() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Search Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search users by name or ID..." 
              style={styles.searchInput}
              placeholderTextColor="#94A3B8"
            />
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <UserPlus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* User Stats Summary */}
        <View style={styles.statsRow}>
            <UserStat label="Students" count="1,120" color="#0EA5E9" />
            <UserStat label="Coordinators" count="18" color="#8B5CF6" />
            <UserStat label="Admins" count="5" color="#EF4444" />
        </View>

        {/* User List */}
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
           <UserListItem name="muscab axmed" id="ST-2024-001" role="Student" status="Active" />
           <UserListItem name="axmed qaarey" id="CO-2024-005" role="Coordinator" status="Active" />
           <UserListItem name="fatuma farah" id="ST-2024-042" role="Student" status="Inactive" />
           <UserListItem name="hassan ali" id="AD-2024-001" role="Admin" status="Active" />
           <UserListItem name="deeqa warsame" id="ST-2024-098" role="Student" status="Active" />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function UserStat({ label, count, color }: any) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statVal, { color }]}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function UserListItem({ name, id, role, status }: any) {
  const roleColor = role === 'Admin' ? '#EF4444' : role === 'Coordinator' ? '#8B5CF6' : '#0EA5E9';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardInner}>
        <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: roleColor + '10' }]}>
                <User size={20} color={roleColor} />
            </View>
            <View>
                <ThemedText style={styles.userName}>{name}</ThemedText>
                <View style={styles.roleRow}>
                    <Shield size={10} color={roleColor} />
                    <Text style={[styles.roleText, { color: roleColor }]}>{role}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.userId}>{id}</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity style={styles.actionBtn}>
            <ChevronRight size={20} color="#CBD5E1" />
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 15, color: '#1E293B' },
  addBtn: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#0EA5E9', justifyContent: 'center', alignItems: 'center', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: 12, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  statVal: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 11, color: '#64748B', fontWeight: '700', marginTop: 2 },
  list: { flex: 1 },
  listContent: { paddingBottom: 40 },
  card: { padding: 12, marginBottom: 12 },
  cardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  roleText: { fontSize: 12, fontWeight: '700' },
  dot: { color: '#CBD5E1', fontSize: 12 },
  userId: { fontSize: 12, color: '#94A3B8' },
  actionBtn: { padding: 4 },
});
