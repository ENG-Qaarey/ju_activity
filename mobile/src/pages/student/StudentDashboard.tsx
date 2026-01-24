import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { 
  Calendar, Users, Award, Sparkles, Bell, 
  Search, TrendingUp, MapPin, Clock, ChevronRight,
  Zap, Star, ShieldCheck
} from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { GradientBackground } from '@/src/components/GradientBackground';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Annual Tech Symposium 2026',
    date: 'Jan 25',
    location: 'Main Hall',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    tag: 'Big Event'
  },
  {
    id: '2',
    title: 'AI Startup Pitch Night',
    date: 'Feb 12',
    location: 'Innovation Hub',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    tag: 'Workshop'
  }
];

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
                <ThemedText style={styles.welcomeText}>Welcome back,</ThemedText>
                <ThemedText style={styles.userName}>Muscab Axmed 👋</ThemedText>
            </View>
            <TouchableOpacity style={[styles.notifBtn, { backgroundColor: theme.card }]}>
                <View style={styles.notifDot} />
                <Bell size={22} color={theme.text} />
            </TouchableOpacity>
        </View>

        {/* Search Bar - Aesthetic Only */}
        <TouchableOpacity 
            style={[styles.searchBar, { backgroundColor: theme.card }]}
            onPress={() => router.navigate('/(student)/(tabs)/activities')}
        >
            <Search size={20} color={theme.icon} />
            <ThemedText style={styles.searchText}>Find activities...</ThemedText>
        </TouchableOpacity>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Featured Events</ThemedText>
            <TouchableOpacity onPress={() => router.navigate('/(student)/(tabs)/activities')}>
                <ThemedText style={[styles.seeAll, { color: theme.primary }]}>See All</ThemedText>
            </TouchableOpacity>
        </View>

        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            snapToInterval={width * 0.85 + 16}
            decelerationRate="fast"
            contentContainerStyle={styles.featuredCarousel}
        >
            {FEATURED_EVENTS.map(event => (
                <TouchableOpacity 
                    key={event.id}
                    activeOpacity={0.9}
                    onPress={() => router.navigate('/(student)/details')}
                >
                    <GlassCard style={styles.featuredCard}>
                        <Image source={{ uri: event.image }} style={styles.featuredImage} />
                        <View style={styles.featuredOverlay}>
                            <View style={styles.featuredTag}>
                                <ThemedText style={styles.tagText}>{event.tag}</ThemedText>
                            </View>
                            <ThemedText style={styles.featuredTitle}>{event.title}</ThemedText>
                            <View style={styles.featuredMeta}>
                                <View style={styles.metaIconRow}>
                                    <Calendar size={12} color="#FFFFFF" />
                                    <ThemedText style={styles.metaValue}>{event.date}</ThemedText>
                                </View>
                                <View style={styles.metaIconRow}>
                                    <MapPin size={12} color="#FFFFFF" />
                                    <ThemedText style={styles.metaValue}>{event.location}</ThemedText>
                                </View>
                            </View>
                        </View>
                    </GlassCard>
                </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Categories / Quick Access */}
        <ThemedText style={styles.categoryTitle}>Categories</ThemedText>
        <View style={styles.categoryGrid}>
            <CategoryItem icon={Zap} label="Technical" color="#0EA5E9" theme={theme} />
            <CategoryItem icon={Users} label="Social" color="#8B5CF6" theme={theme} />
            <CategoryItem icon={Star} label="Academic" color="#F59E0B" theme={theme} />
            <CategoryItem icon={ShieldCheck} label="Sports" color="#10B981" theme={theme} />
        </View>

        {/* Recent Activities */}
        <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recently Added</ThemedText>
        </View>

        <View style={styles.recentList}>
            <ActivityListItem 
                title="Graphic Design Intro"
                meta="2h ago • Lab 4"
                tag="Workshop"
                theme={theme}
                onPress={() => router.navigate('/(student)/details')}
            />
            <ActivityListItem 
                title="Chess Tournament"
                meta="5h ago • Cafeteria"
                tag="Games"
                theme={theme}
                onPress={() => router.navigate('/(student)/details')}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function CategoryItem({ icon: Icon, label, color, theme }: any) {
    return (
        <TouchableOpacity style={styles.categoryBox}>
            <View style={[styles.iconBg, { backgroundColor: color + '15' }]}>
                <Icon size={24} color={color} />
            </View>
            <ThemedText style={styles.categoryLabel}>{label}</ThemedText>
        </TouchableOpacity>
    );
}

function ActivityListItem({ title, meta, tag, theme, onPress }: any) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <GlassCard style={styles.recentCard}>
                <View style={styles.recentContent}>
                    <View style={styles.recentText}>
                        <ThemedText style={styles.recentTitle}>{title}</ThemedText>
                        <ThemedText style={[styles.recentMeta, { color: theme.textSecondary }]}>{meta}</ThemedText>
                    </View>
                    <View style={[styles.recentTag, { backgroundColor: theme.primary + '10' }]}>
                        <ThemedText style={[styles.recentTagText, { color: theme.primary }]}>{tag}</ThemedText>
                    </View>
                </View>
            </GlassCard>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { paddingVertical: 20, paddingBottom: 100 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 24 
  },
  welcomeText: { fontSize: 14, opacity: 0.6, fontWeight: '600' },
  userName: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
  notifBtn: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', zIndex: 1, borderWidth: 2, borderColor: '#FFFFFF' },
  
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    paddingHorizontal: 16, 
    height: 52, 
    borderRadius: 16, 
    gap: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  searchText: { fontSize: 15, opacity: 0.5, fontWeight: '500' },

  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginBottom: 16 
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', paddingHorizontal: 20, marginBottom: 16 },
  seeAll: { fontSize: 13, fontWeight: '700' },

  featuredCarousel: { paddingLeft: 20, paddingRight: 4, marginBottom: 32 },
  featuredCard: { 
    width: width * 0.85, 
    height: 200, 
    padding: 0, 
    marginRight: 16, 
    borderRadius: 24, 
    overflow: 'hidden' 
  },
  featuredImage: { width: '100%', height: '100%' },
  featuredOverlay: { 
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'flex-end'
  },
  featuredTag: { 
    position: 'absolute', 
    top: 20, left: 20, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  tagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  featuredTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', marginBottom: 12 },
  featuredMeta: { flexDirection: 'row', gap: 16 },
  metaIconRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaValue: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },

  categoryTitle: { fontSize: 18, fontWeight: '800', paddingHorizontal: 20, marginBottom: 16 },
  categoryGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 20, 
    justifyContent: 'space-between', 
    marginBottom: 32 
  },
  categoryBox: { 
    width: '23%', 
    alignItems: 'center', 
    gap: 8 
  },
  iconBg: { 
    width: 60, 
    height: 60, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  categoryLabel: { fontSize: 12, fontWeight: '700', textAlign: 'center' },

  recentList: { paddingHorizontal: 20, gap: 12 },
  recentCard: { padding: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  recentContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recentText: { gap: 4, flex: 1 },
  recentTitle: { fontSize: 16, fontWeight: '800' },
  recentMeta: { fontSize: 13, fontWeight: '500' },
  recentTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  recentTagText: { fontSize: 11, fontWeight: '800' },
});
