import { StyleSheet, ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Users, Award, Sparkles, Bell } from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { GradientBackground } from '@/src/components/GradientBackground';

export default function StudentDashboard() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Hero Card */}
        <GlassCard style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.heroTitle}>Discover university activities</ThemedText>
              <ThemedText style={styles.heroSub}>Stay connected and achieve more with your community.</ThemedText>
              <JuButton 
                title="Explore Events" 
                onPress={() => {}} 
                variant="primary"
                style={styles.heroBtn}
              />
            </View>
            <View style={styles.sparkleIcon}>
              <Sparkles size={48} color="#FFFFFF" opacity={0.6} />
            </View>
          </View>
        </GlassCard>

        {/* Quick Stats/Features */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Access</ThemedText>
        <View style={styles.featuresGrid}>
          <QuickAction icon={Calendar} title="Events" color="#4FA3F7" />
          <QuickAction icon={Users} title="Students" color="#8B5CF6" />
          <QuickAction icon={Award} title="Achievements" color="#F59E0B" />
          <QuickAction icon={Sparkles} title="Clubs" color="#EC4899" />
        </View>

        {/* Recent Updates */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activities</ThemedText>
        <GlassCard style={styles.activityCard}>
          <ThemedText style={styles.activityTitle}>Annual Tech Symposium</ThemedText>
          <ThemedText style={styles.activityTime}>Tomorrow, 10:00 AM • Main Hall</ThemedText>
          <ThemedView style={styles.tag}>
            <ThemedText style={styles.tagText}>Upcoming</ThemedText>
          </ThemedView>
        </GlassCard>

        <GlassCard style={styles.activityCard}>
          <ThemedText style={styles.activityTitle}>Community Garden Project</ThemedText>
          <ThemedText style={styles.activityTime}>Friday, 2:00 PM • Campus South</ThemedText>
          <ThemedView style={[styles.tag, { backgroundColor: '#E0F2FE' }]}>
            <ThemedText style={[styles.tagText, { color: '#0369A1' }]}>Social</ThemedText>
          </ThemedView>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

function QuickAction({ icon: Icon, title, color }: any) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View style={styles.featureBox}>
      <View style={[styles.iconBg, { backgroundColor: color + '20' }]}>
        <Icon size={24} color={color} />
      </View>
      <ThemedText style={styles.featureLabel}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    opacity: 0.7,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  heroCard: {
    backgroundColor: '#4FA3F7',
    marginBottom: 32,
    overflow: 'hidden',
  },
  heroContent: {
    flexDirection: 'row',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSub: {
    color: '#E0F2FE',
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },
  heroBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    width: 140,
  },
  sparkleIcon: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  featureBox: {
    alignItems: 'center',
    gap: 8,
  },
  iconBg: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  activityCard: {
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 10,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#DEF7EC',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#03543F',
  },
});
