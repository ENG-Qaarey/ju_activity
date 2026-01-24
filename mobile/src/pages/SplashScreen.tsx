import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList, Animated as RNAnimated } from 'react-native';
import { useRouter } from 'expo-router';
import { Rocket, Target, Award, Sparkles, ArrowRight, ShieldCheck, Zap, Globe, ChevronRight } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Unified Campus Life',
    subtitle: 'Everything in One Place',
    description:
      'Effortlessly manage events, workshops, and activities. Enjoy a seamless experience connecting all aspects of campus life at Jazeera University.',
    icon: Rocket,
    color: '#0EA5E9',
  },
  {
    id: '2',
    title: 'Actionable Insights',
    subtitle: 'Track & Grow',
    description:
      'Monitor your participation and progress with real-time analytics. Visualize your academic journey and make informed decisions.',
    icon: Target,
    color: '#3B82F6',
  },
  {
    id: '3',
    title: 'Instant Recognition',
    subtitle: 'Verified Achievements',
    description:
      'Access and share your digital certificates securely. Celebrate your accomplishments with confidence, anytime and anywhere.',
    icon: Award,
    color: '#2563EB',
  },
  {
    id: '4',
    title: 'Personalized Updates',
    subtitle: 'Smart Notifications',
    description:
      'Stay informed with timely, relevant notifications. Never miss important announcements or events tailored to your interests.',
    icon: Zap,
    color: '#0284C7',
  },
  {
    id: '5',
    title: 'Enterprise Security',
    subtitle: 'Your Data Protected',
    description:
      'Benefit from advanced encryption and robust security. Your personal information and academic records are always safe.',
    icon: ShieldCheck,
    color: '#1E40AF',
  },
];

export default function SplashScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      {/* Dynamic Modern Background */}
      <LinearGradient
        colors={['#FFFFFF', '#F0F9FF', '#E0F2FE', '#BAE6FD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative Floating Blobs (React to scroll) */}
      <AnimatedBlob scrollX={scrollX} index={0} initialX={-100} initialY={100} size={300} />
      <AnimatedBlob scrollX={scrollX} index={1} initialX={width - 200} initialY={height / 2.5} size={250} />

      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.branding}>
            <View style={styles.logoTiny}>
                <ShieldCheck size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.brandingTitle}>JU-AMS</Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OnboardingPage item={item} index={index} scrollX={scrollX} />
        )}
      />

      {/* Footer Controls */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {ONBOARDING_DATA.map((_, index) => (
            <PaginationDot key={index} index={index} scrollX={scrollX} />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleNext} style={styles.nextBtnContainer}>
            <LinearGradient
                colors={['#0EA5E9', '#2563EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextBtn}
            >
                <Text style={styles.nextBtnText}>
                    {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Continue'}
                </Text>
                <View style={styles.arrowIconBox}>
                    <ArrowRight size={18} color="#0EA5E9" />
                </View>
            </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>v1.0.0 • POWERED BY JAZEERA UNIVERSITY</Text>
      </View>
    </View>
  );
}

function OnboardingPage({ item, index, scrollX }: any) {
  const Icon = item.icon;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.pageContainer}>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <View style={styles.iconCircle}>
            <LinearGradient
                colors={['#FFFFFF', '#F0F9FF']}
                style={styles.iconBg}
            >
                 <Icon size={64} color={item.color} strokeWidth={1.5} />
            </LinearGradient>
            <View style={[styles.iconGlow, { backgroundColor: item.color }]} />
        </View>

        <View style={styles.textStack}>
            <View style={styles.badgeRow}>
                <Sparkles size={14} color="#0284C7" />
                <Text style={styles.badgeText}>{item.title}</Text>
            </View>
            <Text style={styles.heading}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

function PaginationDot({ index, scrollX }: any) {
  const animatedStyle = useAnimatedStyle(() => {
    const widthDot = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [8, 24, 8],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP
    );

    return {
      width: widthDot,
      opacity,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

function AnimatedBlob({ scrollX, index, initialX, initialY, size }: any) {
    const style = useAnimatedStyle(() => {
        const translateX = interpolate(
            scrollX.value,
            [0, width * 2],
            [0, index % 2 === 0 ? 100 : -100],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ translateX }]
        }
    });

    return (
        <Animated.View style={[
            styles.blob,
            { top: initialY, left: initialX, width: size, height: size, borderRadius: size / 2.5 },
            style
        ]}>
            <LinearGradient
                colors={['#7DD3FC30', '#BAE6FD10']}
                style={{ flex: 1, borderRadius: size / 2.5 }}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  branding: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoTiny: { width: 24, height: 24, borderRadius: 6, backgroundColor: '#0EA5E9', justifyContent: 'center', alignItems: 'center' },
  brandingTitle: { fontSize: 16, fontWeight: '900', color: '#0C4A6E', letterSpacing: -0.5 },
  skipText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  
  pageContainer: { width, alignItems: 'center', justifyContent: 'center' },
  cardContainer: { width: width * 0.85, alignItems: 'center' },
  iconCircle: { width: 160, height: 160, marginBottom: 40, alignItems: 'center', justifyContent: 'center' },
  iconBg: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, zIndex: 2 },
  iconGlow: { position: 'absolute', width: 120, height: 120, borderRadius: 60, opacity: 0.15, zIndex: 1 },
  
  textStack: { alignItems: 'center' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16, borderWidth: 1, borderColor: '#F0F9FF' },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#0284C7', textTransform: 'uppercase', letterSpacing: 1 },
  heading: { fontSize: 32, fontWeight: '900', color: '#0C4A6E', textAlign: 'center', marginBottom: 16, letterSpacing: -1 },
  description: { fontSize: 15, color: '#64748B', textAlign: 'center', lineHeight: 24, paddingHorizontal: 10, fontWeight: '500' },
  
  footer: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 32 },
  paginationContainer: { flexDirection: 'row', gap: 6, marginBottom: 30 },
  dot: { height: 8, borderRadius: 4, backgroundColor: '#0EA5E9' },
  
  nextBtnContainer: { width: '100%', height: 68, borderRadius: 24, overflow: 'hidden', elevation: 15, shadowColor: '#0369A1', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 20 },
  nextBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 32, paddingRight: 10 },
  nextBtnText: { color: '#FFFFFF', fontSize: 19, fontWeight: '900', letterSpacing: 0.5 },
  arrowIconBox: { width: 48, height: 48, backgroundColor: '#FFFFFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  
  versionText: { marginTop: 24, fontSize: 9, color: '#94A3B8', fontWeight: '800', letterSpacing: 1.5 },
  blob: { position: 'absolute', zIndex: 0 },
});
