import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { 
  Calendar, Users, Award, Sparkles, Bell, 
  Search, TrendingUp, MapPin, Clock, ChevronRight,
  Zap, Star, ShieldCheck, LayoutGrid, Rocket, Target,
  Flame, BookmarkCheck
} from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { ThemedText } from '@/src/components/themed-text';
import { GradientBackground } from '@/src/components/GradientBackground';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function StudentDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.welcomeText}>Morning,</ThemedText>
                <ThemedText style={styles.userName}>Muscab Axmed 👋</ThemedText>
            </View>
            <TouchableOpacity 
                style={[styles.notifBtn, { backgroundColor: '#FFFFFF' }]}
                onPress={() => router.push('/(student)/(tabs)/notifications')}
            >
                <View style={styles.notifDot} />
                <Bell size={22} color={theme.text} />
            </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: '#FFFFFF' }]}>
            <Search size={18} color="#94A3B8" />
            <TextInput 
                placeholder="Find workshops, seminars..." 
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
            />
        </View>

        {/* Performance Stats */}
        <View style={styles.statsSummaryRow}>
            <SummaryStat icon={Flame} label="Points" value="1,240" color="#F59E0B" />
            <View style={styles.statDivider} />
            <SummaryStat icon={Target} label="Events" value="12" color="#10B981" />
            <View style={styles.statDivider} />
            <SummaryStat icon={BookmarkCheck} label="Saved" value="4" color="#3B82F6" />
        </View>

        {/* Categories Grid */}
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Explore Categories</ThemedText>
                <TouchableOpacity onPress={() => router.navigate('/(student)/(tabs)/activities')}>
                    <ThemedText style={[styles.seeAll, { color: theme.primary }]}>View All</ThemedText>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryGrid}>
                <CategoryBox icon={Zap} label="Technical" color="#3B82F6" count="15" />
                <CategoryBox icon={Users} label="Social" color="#8B5CF6" count="24" />
                <CategoryBox icon={Star} label="Academic" color="#F59E0B" count="08" />
                <CategoryBox icon={ShieldCheck} label="Sports" color="#10B981" count="12" />
            </View>
        </View>

        {/* Quick Access Actions */}
        <View style={styles.quickAccessRow}>
            <QuickActionCard 
                icon={LayoutGrid} 
                label="My Applications" 
                desc="Track your status" 
                color="#6366F1"
                onPress={() => router.push('/(student)/(tabs)/applications')}
            />
            <QuickActionCard 
                icon={Rocket} 
                label="Available Now" 
                desc="Join new activities" 
                color="#EC4899"
                onPress={() => router.push('/(student)/(tabs)/activities')}
            />
        </View>

        {/* Recent Activities Section */}
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Recently Added Activities</ThemedText>
            </View>
            <View style={styles.activityList}>
                <ActivityCompactItem 
                    title="Intro to Graphic Design"
                    category="Workshop"
                    time="Added 2h ago"
                    location="Lab 4"
                    color="#0EA5E9"
                />
                <ActivityCompactItem 
                    title="Annual Chess Masters"
                    category="Tournament"
                    time="Added 5h ago"
                    location="Cafeteria"
                    color="#10B981"
                />
                <ActivityCompactItem 
                    title="Blockchain Fundamentals"
                    category="Seminar"
                    time="Added Yesterday"
                    location="Main Hall"
                    color="#8B5CF6"
                />
            </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function SummaryStat({ icon: Icon, label, value, color }: any) {
    return (
        <View style={styles.summaryStatItem}>
            <View style={[styles.summaryIcon, { backgroundColor: color + '10' }]}>
                <Icon size={16} color={color} />
            </View>
            <View>
                <ThemedText style={styles.summaryValue}>{value}</ThemedText>
                <ThemedText style={styles.summaryLabel}>{label}</ThemedText>
            </View>
        </View>
    );
}

function CategoryBox({ icon: Icon, label, color, count }: any) {
    return (
        <TouchableOpacity style={styles.categoryBox}>
            <View style={[styles.categoryIcon, { backgroundColor: color + '10' }]}>
                <Icon size={22} color={color} />
            </View>
            <ThemedText style={styles.categoryLabel}>{label}</ThemedText>
            <ThemedText style={styles.categoryCount}>{count}+ Labs</ThemedText>
        </TouchableOpacity>
    );
}

function QuickActionCard({ icon: Icon, label, desc, color, onPress }: any) {
    return (
        <TouchableOpacity 
            style={[styles.quickCard, { backgroundColor: '#FFFFFF' }]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[styles.quickIcon, { backgroundColor: color + '15' }]}>
                <Icon size={24} color={color} />
            </View>
            <ThemedText style={styles.quickLabel}>{label}</ThemedText>
            <ThemedText style={styles.quickDesc}>{desc}</ThemedText>
        </TouchableOpacity>
    );
}

function ActivityCompactItem({ title, category, time, location, color }: any) {
    return (
        <TouchableOpacity style={styles.activityCard} activeOpacity={0.7}>
            <View style={[styles.activitySideLine, { backgroundColor: color }]} />
            <View style={styles.activityInfo}>
                <View style={styles.activityTop}>
                    <ThemedText style={styles.activityTag}>{category}</ThemedText>
                    <ThemedText style={styles.activityTime}>{time}</ThemedText>
                </View>
                <ThemedText style={styles.activityTitle} numberOfLines={1}>{title}</ThemedText>
                <View style={styles.activityMeta}>
                    <MapPin size={12} color="#94A3B8" />
                    <ThemedText style={styles.activityLoc}>{location}</ThemedText>
                </View>
            </View>
            <ChevronRight size={18} color="#CBD5E1" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { paddingBottom: 140 },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 24 
  },
  welcomeText: { fontSize: 14, color: '#64748B', fontWeight: '600' },
  userName: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5, marginTop: 2 },
  notifBtn: { 
    width: 46, 
    height: 46, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', zIndex: 1, borderWidth: 2, borderColor: '#FFFFFF' },
  
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    paddingHorizontal: 16, 
    height: 52, 
    borderRadius: 16, 
    gap: 12,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1E293B', fontWeight: '500' },

  statsSummaryRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 3
  },
  summaryStatItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  summaryValue: { fontSize: 16, fontWeight: '900', color: '#1E293B' },
  summaryLabel: { fontSize: 10, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' },
  statDivider: { width: 1, height: 24, backgroundColor: '#F1F5F9', marginHorizontal: 8 },

  sectionContainer: { marginBottom: 32 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginBottom: 16 
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  seeAll: { fontSize: 12, fontWeight: '700' },

  categoryGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 20 
  },
  categoryBox: { 
    width: (width - 64) / 4,
    alignItems: 'center',
  },
  categoryIcon: { 
    width: 58, 
    height: 58, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8
  },
  categoryLabel: { fontSize: 12, fontWeight: '800', color: '#1E293B' },
  categoryCount: { fontSize: 10, color: '#94A3B8', fontWeight: '600', marginTop: 2 },

  quickAccessRow: { flexDirection: 'row', gap: 14, paddingHorizontal: 20, marginBottom: 36 },
  quickCard: { 
    flex: 1, 
    padding: 18, 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3
  },
  quickIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  quickLabel: { fontSize: 15, fontWeight: '900', color: '#1E293B', marginBottom: 4 },
  quickDesc: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },

  activityList: { paddingHorizontal: 20, gap: 12 },
  activityCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 14, 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden'
  },
  activitySideLine: { width: 4, height: '60%', borderRadius: 2, position: 'absolute', left: 0 },
  activityInfo: { flex: 1, marginLeft: 6 },
  activityTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  activityTag: { fontSize: 10, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' },
  activityTime: { fontSize: 10, color: '#CBD5E1', fontWeight: '600' },
  activityTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 6 },
  activityMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  activityLoc: { fontSize: 12, color: '#64748B', fontWeight: '600' },
});
