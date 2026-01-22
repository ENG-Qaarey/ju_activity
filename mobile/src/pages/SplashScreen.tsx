import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Users, Award, Sparkles, ArrowRight, ChevronDown } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { JuButton } from '@/src/components/JuButton';
import { GlassCard } from '@/src/components/GlassCard';

export default function LandingScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Title Section */}
          <Text style={styles.title}>JU-AMS</Text>
          <Text style={styles.subtitle}>Jazeera University Activity Management System</Text>
          <Text style={styles.tagline}>Smart • Fast • Reliable</Text>

          {/* Features Grid */}
          <View style={styles.featuresRow}>
            <FeatureCard icon={Calendar} label="Events" />
            <FeatureCard icon={Users} label="Students" />
          </View>
          <View style={styles.featuresRow}>
            <FeatureCard icon={Award} label="Achievements" />
            <FeatureCard icon={Sparkles} label="Modern UI" />
          </View>

          {/* CTA Button */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity 
              style={styles.getStartedBtn}
              onPress={() => router.push('/login')}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Get Started</Text>
              <ArrowRight size={20} color="#FFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

          {/* Scroll Hint */}
          <View style={styles.scrollHint}>
            <Text style={styles.scrollText}>Scroll</Text>
            <ChevronDown size={20} color="#94A3B8" />
          </View>
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  );
}

function FeatureCard({ icon: Icon, label }: any) {
  return (
    <GlassCard style={styles.featureCard}>
      <Icon size={28} color="#0369A1" />
      <Text style={styles.featureLabel}>{label}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: '#0369A1',
    marginBottom: 12,
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 24,
  },
  tagline: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 48,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  featureCard: {
    width: '46%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  featureLabel: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  ctaContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0369A1',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 35,
    shadowColor: '#0369A1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  btnText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '700',
  },
  scrollHint: {
    marginTop: 60,
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
});