import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { Search, MapPin, Calendar, Clock, Users } from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width > 600 ? (width - 60) / 2 : width - 40;

const CATEGORIES = ['All', 'Workshop', 'Seminar', 'Training', 'Extracurricular'];

const MOCK_ACTIVITIES = [
  {
    id: '1',
    title: 'Leadership Mastery',
    category: 'Seminar',
    description: 'Leadership is the ability to guide, inspire, and influence people to work together toward achieving a common goal. A good leader sets a clear...',
    date: '2026-01-20',
    time: '20:30',
    location: 'Main Hall',
    enrolled: 0,
    capacity: 20
  },
  {
    id: '2',
    title: 'Full-Stuck Development',
    category: 'Workshop',
    description: 'A Full-Stack Developer is a software developer who can build both the front-end and the back-end of an application. This means they handle...',
    date: '2026-01-20',
    time: '15:29',
    location: 'Lab 1',
    enrolled: 1,
    capacity: 12
  },
  {
    id: '3',
    title: 'Graphic Design Basics',
    category: 'Training',
    description: 'Learn the fundamentals of visual communication, color theory, and typography using modern design tools like Figma and Adobe Creative Suite...',
    date: '2026-01-22',
    time: '10:00',
    location: 'Media Lab',
    enrolled: 8,
    capacity: 15
  },
  {
    id: '4',
    title: 'Public Speaking BootCamp',
    category: 'Training',
    description: 'Master the art of communication and learn how to deliver impactful presentations that capture and hold your audience’s attention...',
    date: '2026-01-24',
    time: '14:00',
    location: 'Auditorium',
    enrolled: 30,
    capacity: 50
  },
  {
    id: '5',
    title: 'AI Ethics & Society',
    category: 'Seminar',
    description: 'Discuss the moral implications, societal impacts, and future directions of artificial intelligence in our modern interconnected world...',
    date: '2026-01-26',
    time: '11:30',
    location: 'Conference Room',
    enrolled: 12,
    capacity: 40
  },
  {
    id: '6',
    title: 'Cybersecurity Guard',
    category: 'Workshop',
    description: 'Explore the essentials of network security, ethical hacking basics, and best practices for protecting digital assets in an increasingly connected world...',
    date: '2026-01-28',
    time: '09:00',
    location: 'IT Wing',
    enrolled: 25,
    capacity: 30
  },
  {
    id: '7',
    title: 'Digital Marketing Hub',
    category: 'Workshop',
    description: 'Understand the power of SEO, content strategy, and social media advertising to build a strong brand presence and reach a global audience...',
    date: '2026-01-30',
    time: '13:00',
    location: 'Business Hub',
    enrolled: 15,
    capacity: 25
  },
  {
    id: '8',
    title: 'Finance & Investment',
    category: 'Extracurricular',
    description: 'Learn the principles of budgeting, saving, and investing to secure your financial future and make informed money management decisions...',
    date: '2026-02-02',
    time: '16:00',
    location: 'Room 204',
    enrolled: 40,
    capacity: 100
  },
  {
    id: '9',
    title: 'Health & Wellness Club',
    category: 'Extracurricular',
    description: 'A dedicated session on mental health awareness, stress management techniques, and building healthy daily habits for university success...',
    date: '2026-02-05',
    time: '10:30',
    location: 'Sports Center',
    enrolled: 20,
    capacity: 60
  }
];

export default function StudentActivities() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredActivities = MOCK_ACTIVITIES.filter(act => 
    (activeCategory === 'All' || act.category === activeCategory) &&
    act.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
            <ThemedText style={styles.title}>Available Activities</ThemedText>
            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                Browse and apply for activities that interest you
            </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: '#FFFFFF' }]}>
            <Search size={18} color="#94A3B8" />
            <TextInput 
                placeholder="Search activities.." 
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>

        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipContainer}>
            {CATEGORIES.map(cat => (
                <TouchableOpacity 
                    key={cat} 
                    onPress={() => setActiveCategory(cat)}
                    style={[
                        styles.chip, 
                        { backgroundColor: '#FFFFFF' },
                        activeCategory === cat && { backgroundColor: theme.primary }
                    ]}
                >
                    <ThemedText style={[
                        styles.chipText, 
                        { color: '#475569' },
                        activeCategory === cat && { color: '#FFFFFF', fontWeight: '800' }
                    ]}>{cat}</ThemedText>
                </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Activities Grid */}
        <View style={styles.listContainer}>
            {filteredActivities.length > 0 ? (
                filteredActivities.map(activity => (
                    <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        theme={theme} 
                        onPress={() => router.push({ 
                            pathname: '/(student)/details' as any, 
                            params: { ...activity } 
                        })} 
                    />
                ))
            ) : (
                <View style={styles.emptyState}>
                    <ThemedText style={styles.emptyText}>No activities found matching your criteria.</ThemedText>
                </View>
            )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function ActivityCard({ activity, theme, onPress }: any) {
    const progress = (activity.enrolled / activity.capacity) * 100;

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>{activity.category}</ThemedText>
                </View>
                <ThemedText style={styles.cardMainTitle}>{activity.title}</ThemedText>
            </View>
            
            <ThemedText style={[styles.cardDesc, { color: theme.textSecondary }]} numberOfLines={2}>
                {activity.description}
            </ThemedText>

            <View style={styles.metaList}>
                <View style={styles.metaItem}>
                    <Calendar size={14} color={theme.primary} />
                    <ThemedText style={styles.metaText}>{activity.date}</ThemedText>
                </View>
                <View style={styles.metaItem}>
                    <Clock size={14} color={theme.primary} />
                    <ThemedText style={styles.metaText}>{activity.time}</ThemedText>
                </View>
                <View style={styles.metaItem}>
                    <MapPin size={14} color={theme.primary} />
                    <ThemedText style={styles.metaText}>{activity.location}</ThemedText>
                </View>
            </View>

            <View style={styles.enrollSection}>
                <View style={styles.enrollInfo}>
                    <Users size={14} color="#94A3B8" />
                    <ThemedText style={styles.enrollText}>
                        {activity.enrolled}/{activity.capacity} enrolled
                    </ThemedText>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: theme.primary }]} />
                </View>
            </View>

            <TouchableOpacity style={[styles.viewBtn, { backgroundColor: theme.primary }]} onPress={onPress}>
                <ThemedText style={styles.viewBtnText}>View Details</ThemedText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 120 },
  header: { marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 14, marginTop: 4 },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  searchInput: { flex: 1, fontSize: 15, marginLeft: 12, color: '#1E293B', fontWeight: '500' },

  chipScroll: { marginBottom: 24, marginHorizontal: -20 },
  chipContainer: { paddingHorizontal: 20, gap: 10 },
  chip: { 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: { fontSize: 13, fontWeight: '700' },

  listContainer: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: { 
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 20,
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  cardHeader: { marginBottom: 14 },
  badge: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#F0F9FF', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#0EA5E9', textTransform: 'uppercase' },
  cardMainTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  cardDesc: { fontSize: 13, lineHeight: 18, marginBottom: 16, fontWeight: '500' },

  metaList: { gap: 10, marginBottom: 18 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  metaText: { fontSize: 13, fontWeight: '700', color: '#64748B' },

  enrollSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  enrollInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  enrollText: { fontSize: 12, fontWeight: '700', color: '#94A3B8' },
  progressBarBg: { width: 70, height: 5, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },

  viewBtn: { 
    height: 48, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  viewBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },

  emptyState: { flex: 1, padding: 40, alignItems: 'center' },
  emptyText: { textAlign: 'center', opacity: 0.6, fontSize: 15, fontWeight: '600' },
});
