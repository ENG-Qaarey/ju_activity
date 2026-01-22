import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, UserPlus, Filter, User, Users, Shield, MoreVertical, ChevronRight } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

export default function AdminUsers() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Modern Search & Add Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search size={18} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search by name, ID or role..." 
              style={styles.searchInput}
              placeholderTextColor="#94A3B8"
            />
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <UserPlus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Premium User Stats Summary */}
        <View style={styles.statsRow}>
            <StatCard label="Students" count="1,120" color="#0EA5E9" icon={Users} />
            <StatCard label="Staff" count="18" color="#8B5CF6" icon={Shield} />
            <StatCard label="Admins" count="5" color="#EF4444" icon={User} />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>User Directory</Text>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={14} color="#64748B" />
                <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
        </View>

        {/* User List */}
        <View style={styles.list}>
           <UserListItem name="muscab axmed" id="ST-2024-001" role="Student" status="Active" isOnline={true}/>
           <UserListItem name="axmed qaarey" id="CO-2024-005" role="Coordinator" status="Active" isOnline={false}/>
           <UserListItem name="fatuma farah" id="ST-2024-042" role="Student" status="Inactive" isOnline={false}/>
           <UserListItem name="hassan ali" id="AD-2024-001" role="Admin" status="Active" isOnline={true}/>
           <UserListItem name="deeqa warsame" id="ST-2024-098" role="Student" status="Active" isOnline={false}/>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatCard({ label, count, color, icon: Icon }: any) {
    return (
        <GlassCard style={styles.statBox}>
            <View style={[styles.statIconBox, { backgroundColor: color + '15' }]}>
                <Icon size={16} color={color} />
            </View>
            <Text style={[styles.statVal, { color: '#1E293B' }]}>{count}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </GlassCard>
    );
}

function UserListItem({ name, id, role, status, isOnline }: any) {
  const isStudent = role === 'Student';
  const isCoordinator = role === 'Coordinator';
  const roleColor = role === 'Admin' ? '#EF4444' : isCoordinator ? '#8B5CF6' : '#0EA5E9';
  const roleBg = role === 'Admin' ? '#FEF2F2' : isCoordinator ? '#F5F3FF' : '#F0F9FF';
  
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardInner}>
        <View style={styles.userInfo}>
            <View style={styles.avatarWrapper}>
                <View style={[styles.avatar, { backgroundColor: roleColor + '10' }]}>
                    <User size={20} color={roleColor} />
                </View>
                {isOnline && <View style={styles.onlineStatus} />}
            </View>
            <View>
                <Text style={styles.userName}>{name}</Text>
                <View style={styles.roleRow}>
                    <View style={[styles.roleBadge, { backgroundColor: roleBg }]}>
                        <Shield size={10} color={roleColor} />
                        <Text style={[styles.roleText, { color: roleColor }]}>{role}</Text>
                    </View>
                    <Text style={styles.userId}>ID: {id}</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.rightActions}>
            <View style={[styles.statusIndicator, { backgroundColor: status === 'Active' ? '#22C55E' : '#94A3B8' }]} />
            <TouchableOpacity style={styles.actionBtn}>
                <ChevronRight size={18} color="#CBD5E1" />
            </TouchableOpacity>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingTop: 14, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  searchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 14, 
    paddingHorizontal: 12, 
    height: 48, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5, 
    elevation: 2 
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, color: '#1E293B', fontWeight: '500' },
  addBtn: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    backgroundColor: '#0EA5E9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#0EA5E9', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    elevation: 4 
  },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, padding: 12, borderRadius: 20, alignItems: 'center' },
  statIconBox: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statVal: { fontSize: 18, fontWeight: '900' },
  statLabel: { fontSize: 10, color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  filterText: { fontSize: 12, color: '#64748B', fontWeight: '700' },
  list: { gap: 10 },
  card: { padding: 12, borderRadius: 18 },
  cardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  onlineStatus: { position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E', borderWidth: 2, borderColor: '#FFFFFF' },
  userName: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  roleText: { fontSize: 10, fontWeight: '800' },
  userId: { fontSize: 10, color: '#94A3B8', fontWeight: '600' },
  rightActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusIndicator: { width: 6, height: 6, borderRadius: 3 },
  actionBtn: { padding: 4 },
});
