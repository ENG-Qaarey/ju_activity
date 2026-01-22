import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Drawer } from 'react-native-drawer-layout';
import { 
  LayoutGrid, FilePlus, Calendar, Activity, Bell, 
  Inbox, Users, UserCog, BarChart3, Terminal,
  Menu, Search, User
} from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { Image } from 'expo-image';
import { usePathname } from 'expo-router';

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  
  const isActive = (path: string) => pathname === path;

  const renderDrawerContent = () => (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.brandTitle}>JU-AMS</Text>
        <Text style={styles.roleLabel}>ADMIN CONSOLE</Text>
      </View>
      
      <View style={styles.drawerLinks}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DrawerLink 
            icon={LayoutGrid} 
            label="Dashboard" 
            onPress={() => { router.push('/(admin)/dashboard'); setOpen(false); }}
            active={isActive('/dashboard')} 
          />
          <DrawerLink 
            icon={FilePlus} 
            label="Create Activity" 
            onPress={() => { router.push('/(admin)/create'); setOpen(false); }} 
            active={isActive('/create')}
          />
          <DrawerLink 
            icon={Calendar} 
            label="Admin Activities" 
            onPress={() => { router.push('/(admin)/activities'); setOpen(false); }}
            active={isActive('/activities') || pathname.includes('/activities')}
          />
          <DrawerLink 
            icon={Activity} 
            label="Monitor Activities" 
            onPress={() => { router.push('/(admin)/monitor'); setOpen(false); }}
            active={isActive('/monitor')}
          />
          <DrawerLink 
            icon={Bell} 
            label="Notifications" 
            onPress={() => { router.push('/(admin)/notifications'); setOpen(false); }}
            active={isActive('/notifications')}
          />
          <DrawerLink 
            icon={Inbox} 
            label="Applications" 
            onPress={() => { router.push('/(admin)/applications'); setOpen(false); }}
            active={isActive('/applications') || pathname.includes('/applications')}
          />
          <DrawerLink 
            icon={Users} 
            label="Directory" 
            onPress={() => { router.push('/(admin)/users'); setOpen(false); }}
            active={isActive('/users') || pathname.includes('/users')}
          />
          <DrawerLink 
            icon={UserCog} 
            label="Manage Users" 
            onPress={() => { router.push('/(admin)/manage-users'); setOpen(false); }}
            active={isActive('/manage-users')}
          />
          <DrawerLink 
            icon={BarChart3} 
            label="Advanced Reports" 
            onPress={() => { router.push('/(admin)/reports'); setOpen(false); }}
            active={isActive('/reports')}
          />
          <DrawerLink 
            icon={Terminal} 
            label="Audit Logs" 
            onPress={() => { router.push('/(admin)/audit-logs'); setOpen(false); }}
            active={isActive('/audit-logs')}
          />
        </ScrollView>
      </View>

      <View style={styles.drawerFooter}>
        <View style={styles.profileBox}>
          <Image 
            source={{ uri: 'https://github.com/shadcn.png' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Admin User</Text>
            <Text style={styles.profileEmail}>admin@gmail.com</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={renderDrawerContent}
      drawerType="front"
      drawerStyle={{ width: 280 }}
    >
      <Tabs
        screenOptions={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.menuBtn}
              onPress={() => setOpen(true)}
            >
              <Menu size={24} color="#4FA3F7" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <View>
                <Text style={styles.headerHub}>JU ACTIVITY HUB</Text>
                <View style={styles.onlineStatus}>
                  <Text style={styles.userName}>Admin User</Text>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Admin</Text>
                </View>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Search size={20} color="#64748B" />
              </TouchableOpacity>
              <Image 
                source={{ uri: 'https://github.com/shadcn.png' }} 
                style={styles.headerAvatar} 
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#F1F5F9',
            height: 90,
          },
          tabBarActiveTintColor: '#0369A1',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
            height: 85,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
          }
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dash',
            tabBarIcon: ({ color }) => <LayoutGrid size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="activities"
          options={{
            title: 'Activities',
            tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="applications"
          options={{
            title: 'Apps',
            tabBarIcon: ({ color }) => <Inbox size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: 'Users',
            tabBarIcon: ({ color }) => <Users size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
        <Tabs.Screen 
          name="create" 
          options={{ href: null, headerTitle: "Create Activity" }} 
        />
        <Tabs.Screen 
          name="monitor" 
          options={{ href: null, headerTitle: "Monitor Activities" }} 
        />
        <Tabs.Screen 
          name="notifications" 
          options={{ href: null, headerTitle: "Notifications" }} 
        />
        <Tabs.Screen 
          name="manage-users" 
          options={{ href: null, headerTitle: "Manage Users" }} 
        />
        <Tabs.Screen 
          name="reports" 
          options={{ href: null, headerTitle: "Advanced Reports" }} 
        />
        <Tabs.Screen 
          name="audit-logs" 
          options={{ href: null, headerTitle: "Audit Logs" }} 
        />
      </Tabs>
    </Drawer>
  );
}

function DrawerLink({ icon: Icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity 
      style={[styles.drawerLink, active && styles.drawerLinkActive]}
      onPress={onPress}
    >
      <Icon size={20} color={active ? '#FFFFFF' : '#64748B'} strokeWidth={active ? 2.5 : 2} />
      <Text style={[styles.drawerLinkLabel, active && styles.drawerLinkLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  drawerHeader: { padding: 24, paddingTop: 60, marginBottom: 10 },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#0EA5E9', letterSpacing: -1 },
  roleLabel: { fontSize: 10, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 },
  drawerLinks: { flex: 1, paddingHorizontal: 16 },
  drawerLink: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, marginBottom: 4 },
  drawerLinkActive: { backgroundColor: '#3B82F6' },
  drawerLinkLabel: { fontSize: 16, fontWeight: '500', color: '#64748B', marginLeft: 16 },
  drawerLinkLabelActive: { color: '#FFFFFF', fontWeight: '700' },
  drawerFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9', marginBottom: 20 },
  profileBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  profileEmail: { fontSize: 11, color: '#64748B' },
  menuBtn: { marginLeft: 16, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 10 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  headerHub: { fontSize: 10, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  onlineStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  userName: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginRight: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E', marginRight: 4 },
  statusText: { fontSize: 12, color: '#22C55E', fontWeight: '600' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', marginRight: 16, gap: 12 },
  headerIconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' },
  headerAvatar: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: '#E2E8F0' },
});
