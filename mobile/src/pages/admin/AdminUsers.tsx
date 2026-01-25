import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { Search, UserPlus, Filter, User, Users, Shield, MoreVertical, ChevronRight } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

import { client } from '@/src/lib/api';
import { ENDPOINTS } from '@/src/lib/config';

export default function AdminUsers() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [users, setUsers] = React.useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [stats, setStats] = React.useState({ students: 0, staff: 0, admins: 0 });

  const fetchUsers = async () => {
    try {
      const data = await client.get('/users');
      if (Array.isArray(data)) {
        setUsers(data);
        
        // Calculate stats
        const students = data.filter(u => u.role === 'student').length;
        const coordinators = data.filter(u => u.role === 'coordinator').length;
        const admins = data.filter(u => u.role === 'admin').length;
        
        setStats({ students, staff: coordinators, admins });
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={theme.text}
            colors={[theme.text]}
          />
        }
      >
        {/* Modern Search & Add Header */}
        <View style={styles.header}>
          <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Search size={18} color={theme.textSecondary} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search by name, ID or role..." 
              style={[styles.searchInput, { color: theme.text }]}
              placeholderTextColor={theme.textSecondary}
            />
          </View>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
            <UserPlus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Premium User Stats Summary */}
        <View style={styles.statsRow}>
            <StatCard label="Students" count={stats.students.toString()} color="#0EA5E9" icon={Users} theme={theme} />
            <StatCard label="Staff" count={stats.staff.toString()} color="#8B5CF6" icon={Shield} theme={theme} />
            <StatCard label="Admins" count={stats.admins.toString()} color="#EF4444" icon={User} theme={theme} />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>User Directory</Text>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card }]}>
                <Filter size={14} color={theme.textSecondary} />
                <Text style={[styles.filterText, { color: theme.textSecondary }]}>Filter</Text>
            </TouchableOpacity>
        </View>

        {/* User List */}
        <View style={styles.list}>
           {users.length > 0 ? users.map((user) => (
             <UserListItem 
               key={user.id}
               name={user.name || 'Unknown'} 
               id={user.studentId || user.id.slice(0, 8)} 
               role={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
               status={user.isActive ? 'Active' : 'Inactive'} 
               isOnline={user.isActive} 
               theme={theme} 
             />
           )) : (
             <Text style={{ textAlign: 'center', color: theme.textSecondary, marginTop: 20 }}>No users found.</Text>
           )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function StatCard({ label, count, color, icon: Icon, theme }: any) {
    return (
        <GlassCard style={[styles.statBox, { backgroundColor: theme.card }]}>
            <View style={[styles.statIconBox, { backgroundColor: color + '15' }]}>
                <Icon size={16} color={color} />
            </View>
            <Text style={[styles.statVal, { color: theme.text }]}>{count}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
        </GlassCard>
    );
}

function UserListItem({ name, id, role, status, isOnline, theme }: any) {
  const isStudent = role === 'Student';
  const isCoordinator = role === 'Coordinator';
  const roleColor = role === 'Admin' ? '#EF4444' : isCoordinator ? '#8B5CF6' : '#0EA5E9';
  const roleBg = role === 'Admin' ? '#FEF2F2' : isCoordinator ? '#F5F3FF' : '#F0F9FF';
  
  // Dynamic role badge background for dark mode
  const badgeBg = theme.background === '#0F172A' 
    ? roleColor + '15' 
    : roleBg;

  const onlineColor = status === 'Active' ? '#22C55E' : theme.textSecondary;

  return (
    <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.cardInner}>
        <View style={styles.userInfo}>
            <View style={styles.avatarWrapper}>
                <View style={[styles.avatar, { backgroundColor: roleColor + '10' }]}>
                    <User size={20} color={roleColor} />
                </View>
                {isOnline && <View style={[styles.onlineStatus, { borderColor: theme.card }]} />}
            </View>
            <View>
                <Text style={[styles.userName, { color: theme.text }]}>{name}</Text>
                <View style={styles.roleRow}>
                    <View style={[styles.roleBadge, { backgroundColor: badgeBg }]}>
                        <Shield size={10} color={roleColor} />
                        <Text style={[styles.roleText, { color: roleColor }]}>{role}</Text>
                    </View>
                    <Text style={[styles.userId, { color: theme.textSecondary }]}>ID: {id}</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.rightActions}>
            <View style={[styles.statusIndicator, { backgroundColor: onlineColor }]} />
            <TouchableOpacity style={styles.actionBtn}>
                <ChevronRight size={18} color={theme.textSecondary} />
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
    borderRadius: 14, 
    paddingHorizontal: 12, 
    height: 48, 
    borderWidth: 1,
    borderColor: 'transparent'
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, fontWeight: '500' },
  addBtn: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    elevation: 4 
  },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, padding: 12, borderRadius: 20, alignItems: 'center' },
  statIconBox: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statVal: { fontSize: 18, fontWeight: '900' },
  statLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  filterText: { fontSize: 12, fontWeight: '700' },
  list: { gap: 10 },
  card: { padding: 12, borderRadius: 18 },
  cardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  onlineStatus: { position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E', borderWidth: 2 },
  userName: { fontSize: 15, fontWeight: '800' },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  roleText: { fontSize: 10, fontWeight: '800' },
  userId: { fontSize: 10, fontWeight: '600' },
  rightActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusIndicator: { width: 6, height: 6, borderRadius: 3 },
  actionBtn: { padding: 4 },
});
