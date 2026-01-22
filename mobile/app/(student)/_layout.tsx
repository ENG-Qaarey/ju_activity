import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { usePathname, Tabs, useRouter } from 'expo-router';
import { Drawer } from 'react-native-drawer-layout';
import { LayoutDashboard, Calendar, FileText, Bell, User, Search, Menu } from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { Image } from 'expo-image';

export default function StudentLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const isActive = (path: string) => pathname === path;
  
  const renderDrawerContent = () => (
    <View style={[styles.drawerContainer, { backgroundColor: theme.card }]}>
      <View style={styles.drawerHeader}>
        <Text style={styles.brandTitle}>JU-AMS</Text>
        <Text style={[styles.roleLabel, { color: theme.textSecondary }]}>STUDENT HUB</Text>
      </View>
      
      <View style={styles.drawerLinks}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DrawerLink 
            icon={LayoutDashboard} 
            label="Dashboard" 
            onPress={() => { router.push('/(student)/home'); setOpen(false); }}
            active={pathname === '/home'} 
            theme={theme}
          />
          <DrawerLink 
            icon={Calendar} 
            label="All Activities" 
            onPress={() => { router.push('/(student)/activities'); setOpen(false); }}
            active={pathname === '/activities'}
            theme={theme}
          />
          <DrawerLink 
            icon={FileText} 
            label="My Applications" 
            onPress={() => { router.push('/(student)/applications'); setOpen(false); }}
            active={pathname === '/applications'}
            theme={theme}
          />
          <DrawerLink 
            icon={Bell} 
            label="Notifications" 
            onPress={() => { router.push('/(student)/notifications'); setOpen(false); }}
            active={pathname === '/notifications'}
            theme={theme}
          />
          <DrawerLink 
            icon={User} 
            label="My Profile" 
            onPress={() => { router.push('/(student)/profile'); setOpen(false); }}
            active={pathname === '/profile'}
            theme={theme}
          />
        </ScrollView>
      </View>

      <View style={[styles.drawerFooter, { borderTopColor: theme.border }]}>
        <View style={[styles.profileBox, { backgroundColor: theme.background }]}>
          <Image 
            source={{ uri: 'https://github.com/shadcn.png' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>Student User</Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>student@gmail.com</Text>
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
      drawerStyle={{ width: 280, backgroundColor: theme.card }}
    >
      <Tabs
        screenOptions={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={[styles.menuBtn, { backgroundColor: theme.background }]}
              onPress={() => setOpen(true)}
            >
              <Menu size={24} color={theme.text} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <View>
                <Text style={[styles.headerHub, { color: theme.textSecondary }]}>JU ACTIVITY HUB</Text>
                <View style={styles.onlineStatus}>
                  <Text style={[styles.userName, { color: theme.text }]}>Student Name</Text>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <TouchableOpacity style={[styles.headerIconBtn, { backgroundColor: theme.background }]}>
                <Search size={20} color={theme.icon} />
              </TouchableOpacity>
              <Image 
                source={{ uri: 'https://github.com/shadcn.png' }} 
                style={[styles.headerAvatar, { borderColor: theme.border }]} 
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.card,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
            height: 90,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.tabIconDefault,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopWidth: 1,
            borderTopColor: theme.border,
            height: 65,
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
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="activities"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="applications"
          options={{
            title: 'Apps',
            tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Alerts',
            tabBarIcon: ({ color }) => <Bell size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Me',
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
    </Drawer>
  );
}

function DrawerLink({ icon: Icon, label, active, onPress, theme }: any) {
  return (
    <TouchableOpacity 
      style={[styles.drawerLink, active && { backgroundColor: theme.primary }]}
      onPress={onPress}
    >
      <Icon size={22} color={active ? '#FFFFFF' : theme.icon} />
      <Text style={[styles.drawerLinkLabel, { color: active ? '#FFFFFF' : theme.textSecondary }, active && styles.drawerLinkLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { flex: 1 },
  drawerHeader: { padding: 24, paddingTop: 60, marginBottom: 20 },
  brandTitle: { fontSize: 28, fontWeight: '900', color: '#4FA3F7', letterSpacing: -1 },
  roleLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 },
  drawerLinks: { flex: 1, paddingHorizontal: 16 },
  drawerLink: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 4 },
  drawerLinkLabel: { fontSize: 15, fontWeight: '600', marginLeft: 12 },
  drawerLinkLabelActive: { fontWeight: '700' },
  drawerFooter: { padding: 16, borderTopWidth: 1, marginBottom: 20 },
  profileBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 13, fontWeight: '700' },
  profileEmail: { fontSize: 11 },
  menuBtn: { marginLeft: 16, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  headerHub: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  onlineStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  userName: { fontSize: 14, fontWeight: '700', marginRight: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E', marginRight: 4 },
  statusText: { fontSize: 12, color: '#22C55E', fontWeight: '600' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', marginRight: 16, gap: 12 },
  headerIconBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  headerAvatar: { width: 34, height: 34, borderRadius: 17, borderWidth: 2 },
});
