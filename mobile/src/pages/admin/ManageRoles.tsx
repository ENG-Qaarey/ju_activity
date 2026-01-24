import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Shield, Lock, Eye, Edit3, Trash2, ArrowLeft, Plus } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function ManageRoles() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>User Roles</ThemedText>
            <TouchableOpacity style={styles.addBtn}>
                <Plus size={24} color="#0EA5E9" />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
           <RoleCard 
                role="Admin" 
                color="#EF4444" 
                permissions={["Full System Access", "Manage All Users", "Financial Reports", "Audit Logs"]} 
            />
           <RoleCard 
                role="Coordinator" 
                color="#8B5CF6" 
                permissions={["Manage Activities", "Review Applications", "View Analytics"]} 
            />
           <RoleCard 
                role="Student" 
                color="#0EA5E9" 
                permissions={["Join Activities", "View My Applications", "Profile Management"]} 
                isDefault
            />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

function RoleCard({ role, color, permissions, isDefault }: any) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.roleInfo}>
            <View style={[styles.iconBg, { backgroundColor: color + '10' }]}>
                <Shield size={20} color={color} />
            </View>
            <View>
                <ThemedText style={styles.roleName}>{role}</ThemedText>
                {isDefault && <Text style={styles.defaultLabel}>Default Role</Text>}
            </View>
        </View>
        <TouchableOpacity><Edit3 size={18} color="#94A3B8" /></TouchableOpacity>
      </View>

      <Text style={styles.label}>Permissions</Text>
      <View style={styles.permList}>
        {permissions.map((p: string, i: number) => (
            <View key={i} style={styles.permItem}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={styles.permText}>{p}</Text>
            </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
          <Text style={styles.lastEdit}>Last updated: 2 weeks ago</Text>
          <TouchableOpacity style={styles.manageBtn}>
              <Text style={[styles.manageText, { color }]}>Configure</Text>
          </TouchableOpacity>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '900', color: '#1E293B' },
  list: { flex: 1 },
  listContent: { paddingBottom: 20 },
  card: { padding: 18, marginBottom: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  roleInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBg: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  roleName: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  defaultLabel: { fontSize: 11, fontWeight: '700', color: '#22C55E', textTransform: 'uppercase', marginTop: 2 },
  label: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  permList: { gap: 8 },
  permItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  permText: { fontSize: 14, color: '#64748B' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  lastEdit: { fontSize: 11, color: '#94A3B8' },
  manageBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  manageText: { fontSize: 13, fontWeight: '700' },
});
