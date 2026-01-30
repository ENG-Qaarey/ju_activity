import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Calendar, FileText, Bell, User, MessageCircle } from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { Image } from 'expo-image';
import { useAuth } from '@/src/context/AuthContext';
import { IMAGE_BASE } from '@/src/lib/config';

export default function StudentTabsLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <View style={styles.headerLeftSpacer} />
        ),
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <View>
              <Text style={[styles.headerHub, { color: theme.textSecondary }]}>JU ACTIVITY HUB</Text>
              <View style={styles.onlineStatus}>
                <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Student'}</Text>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerIcons}>
            <TouchableOpacity style={[styles.headerIconBtn, { backgroundColor: theme.background }]}>
              <MessageCircle size={20} color={theme.icon} />
            </TouchableOpacity>
            <Image 
              source={{ uri: user?.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${IMAGE_BASE}${user.avatar}`) : 'https://github.com/shadcn.png' }} 
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
          title: 'profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeftSpacer: {
    marginLeft: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHub: { 
    fontSize: 10, 
    fontWeight: '800', 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
  onlineStatus: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 2 
  },
  userName: { 
    fontSize: 14, 
    fontWeight: '700', 
    marginRight: 6 
  },
  statusDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#22C55E', 
    marginRight: 4 
  },
  statusText: { 
    fontSize: 12, 
    color: '#22C55E', 
    fontWeight: '600' 
  },
  headerIcons: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 16, 
    gap: 12 
  },
  headerIconBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerAvatar: { 
    width: 34, 
    height: 34, 
    borderRadius: 17, 
    borderWidth: 2 
  },
});
