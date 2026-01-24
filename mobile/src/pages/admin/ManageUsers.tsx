import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { 
  UserPlus, Shield, UserCheck, Trash2, CheckCircle2, 
  ChevronRight, Mail, MapPin, Calendar, Users, Search, Filter,
  MoreVertical, Clock
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function ManageUsers() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('All');
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const users = [
    { 
        name: 'Amiin Daahir', 
        role: 'COORDINATOR', 
        email: 'amin@gmail.com', 
        dept: 'Computer Science', 
        joined: '2026-01-19', 
        status: 'active',
        lastActive: '2m ago',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
        isMe: false
    },
    { 
        name: 'ENG-jamiila', 
        role: 'ADMIN', 
        email: 'jamiila@gmail.com', 
        dept: 'CS & IT', 
        joined: '2025-11-09', 
        status: 'active',
        lastActive: 'Now',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        isMe: true
    },
    { 
        name: 'muscab axmed', 
        role: 'STUDENT', 
        email: 'muscabqaarey@gmail.com', 
        dept: 'N/A', 
        joined: '2026-01-19', 
        status: 'active',
        lastActive: '5h ago',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
        isMe: false
    },
  ];

  const filters = ['All', 'Admin', 'Coordinator', 'Student'];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Skyblue Header Banner */}
        <View style={styles.headerBanner}>
            <View style={styles.bannerInfo}>
                <Text style={styles.bannerTitle}>Manage Users</Text>
                <Text style={styles.bannerSubtitle}>
                    Oversight and directory synchronization with JU policies.
                </Text>
            </View>
            <TouchableOpacity style={styles.createBtn}>
                <UserPlus size={18} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
        </View>

        {/* Search & Filter Layer */}
        <View style={styles.searchSection}>
            <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Search size={18} color={theme.textSecondary} />
                <TextInput 
                    placeholder="Search users by name or email..." 
                    style={[styles.searchInput, { color: theme.text }]}
                    placeholderTextColor={theme.textSecondary}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
                {filters.map((filter) => (
                    <TouchableOpacity 
                        key={filter} 
                        style={[
                          styles.filterChip, 
                          { backgroundColor: activeFilter === filter ? theme.text : theme.card, borderColor: activeFilter === filter ? theme.text : theme.border }
                        ]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[styles.filterChipText, { color: activeFilter === filter ? theme.background : theme.textSecondary }]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* User Management List */}
        <View style={styles.userList}>
            {users.map((user, idx) => (
                <UserManagementCard key={idx} user={user} theme={theme} />
            ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function UserManagementCard({ user, theme }: any) {
    const isMe = user.isMe;
    const roleColor = user.role === 'ADMIN' ? '#3B82F6' : user.role === 'COORDINATOR' ? '#8B5CF6' : '#0EA5E9';
    
    return (
        <GlassCard style={[styles.userCard, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
                <View style={styles.userInfoRow}>
                    <Image source={{ uri: user.avatar }} style={[styles.avatar, { backgroundColor: theme.border }]} />
                    <View style={styles.userMainInfo}>
                        <View style={styles.nameActionRow}>
                            <Text style={[styles.userName, { color: theme.text }]} numberOfLines={1}>{user.name}</Text>
                            {isMe && (
                                <View style={[styles.meBadge, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
                                    <Text style={[styles.meText, { color: '#0EA5E9' }]}>YOU</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.roleRow}>
                            <View style={[styles.roleBadge, { backgroundColor: roleColor + '15' }]}>
                                <Text style={[styles.roleText, { color: roleColor }]}>{user.role}</Text>
                            </View>
                            <View style={[styles.dotSeparator, { backgroundColor: theme.border }]} />
                            <Text style={[styles.lastActiveText, { color: theme.textSecondary }]}>{user.lastActive}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.moreBtn}>
                    <MoreVertical size={20} color={theme.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={[styles.cardDetails, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <View style={styles.detailItem}>
                    <Mail size={12} color={theme.textSecondary} />
                    <Text style={[styles.detailText, { color: theme.textSecondary }]} numberOfLines={1}>{user.email}</Text>
                </View>
                <View style={styles.detailItem}>
                    <MapPin size={12} color={theme.textSecondary} />
                    <Text style={[styles.detailText, { color: theme.textSecondary }]} numberOfLines={1}>{user.dept}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Calendar size={12} color={theme.textSecondary} />
                    <Text style={[styles.detailText, { color: theme.textSecondary }]}>Joined {user.joined}</Text>
                </View>
            </View>

            <View style={styles.cardActions}>
                <View style={styles.statusGroup}>
                    <View style={styles.statusDot} />
                    <Text style={[styles.statusLabel, { color: theme.text }]}>Active</Text>
                </View>
                <View style={styles.actionGroup}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <CheckCircle2 size={16} color={theme.primary} />
                        <Text style={[styles.actionBtnText, { color: theme.primary }]}>Restrict</Text>
                    </TouchableOpacity>
                    {!isMe && (
                        <TouchableOpacity style={[styles.actionBtn, styles.deleteAction, { backgroundColor: theme.card }]}>
                            <Trash2 size={16} color="#EF4444" />
                            <Text style={[styles.actionBtnText, styles.deleteText]}>Remove</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingTop: 14, paddingBottom: 60 },
  headerBanner: { 
    backgroundColor: '#0EA5E9', 
    padding: 24, 
    borderRadius: 30, 
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8
  },
  bannerInfo: { flex: 1, marginRight: 16 },
  bannerTitle: { fontSize: 26, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: 13, color: 'rgba(255, 255, 255, 0.9)', marginTop: 4, lineHeight: 18 },
  createBtn: { 
    width: 48, 
    height: 48, 
    borderRadius: 16, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  searchSection: { marginBottom: 24 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 18, 
    paddingHorizontal: 16, 
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '500' },
  filterScroll: { marginHorizontal: -16 },
  filterContent: { paddingHorizontal: 16, gap: 10 },
  filterChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14, borderWidth: 1 },
  filterChipText: { fontSize: 13, fontWeight: '700' },
  userList: { gap: 16 },
  userCard: { padding: 16, borderRadius: 28 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatar: { width: 48, height: 48, borderRadius: 16 },
  userMainInfo: { flex: 1 },
  nameActionRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userName: { fontSize: 17, fontWeight: '800' },
  meBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1 },
  meText: { fontSize: 9, fontWeight: '900' },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  roleText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  dotSeparator: { width: 3, height: 3, borderRadius: 1.5 },
  lastActiveText: { fontSize: 11, fontWeight: '600' },
  moreBtn: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardDetails: { 
    padding: 12, 
    borderRadius: 18, 
    gap: 8,
    borderWidth: 1,
    marginBottom: 16
  },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 12, fontWeight: '500', flex: 1 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  statusLabel: { fontSize: 12, fontWeight: '700' },
  actionGroup: { flexDirection: 'row', gap: 8 },
  actionBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 12,
    borderWidth: 1,
  },
  actionBtnText: { fontSize: 12, fontWeight: '800' },
  deleteAction: { borderColor: '#FEE2E2' },
  deleteText: { color: '#EF4444' },
});
