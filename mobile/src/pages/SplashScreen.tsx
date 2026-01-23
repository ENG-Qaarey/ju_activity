// Fixed Metro module error - Restart Server if persisted
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Users, Award, Sparkles, ArrowRight } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  withSpring, 
  withRepeat, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

// Floating Orb Component for background animation
function FloatingOrb({ size, initialX, initialY, color, duration, delay }: any) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-30, { duration: duration, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: duration, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    ));
    
    translateX.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(20, { duration: duration * 1.5, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: duration * 1.5, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value }
    ]
  }));

  return (
    <Animated.View style={[
      {
        position: 'absolute',
        top: initialY,
        left: initialX,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: 0.8, 
      },
      animatedStyle
    ]} />
  );
}

export default function SplashScreen() {
  const router = useRouter();

  // Animation Values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const titleOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);
  const btnScale = useSharedValue(1);

  useEffect(() => {
    const easing = Easing.bezier(0.25, 0.1, 0.25, 1);

    // 1. Logo Pop-in (Smoother)
    logoOpacity.value = withTiming(1, { duration: 1200, easing });
    logoScale.value = withTiming(1, { duration: 1200, easing });

    // 2. Content Slide-up
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 1000, easing }));
    contentTranslateY.value = withDelay(400, withTiming(0, { duration: 1000, easing }));

    // 3. Button Pulse (Gentler)
    btnScale.value = withDelay(2000, withRepeat(
      withSequence(
        withTiming(1.03, { duration: 2000, easing: Easing.inOut(Easing.sin) }), 
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ), 
      -1, 
      true
    ));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Sky Blue & White Gradient Background */}
      <LinearGradient
        colors={['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC']} // White -> Sky Blues
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Floating Elements for Atmosphere */}
      <View style={styles.orbContainer}>
        <FloatingOrb size={300} initialX={-100} initialY={-100} color="#FFFFFF" duration={6000} delay={0} />
        <FloatingOrb size={250} initialX={width - 100} initialY={height / 3} color="#FFFFFF" duration={7000} delay={1000} />
        <FloatingOrb size={350} initialX={-50} initialY={height - 200} color="#FFFFFF" duration={8000} delay={500} />
      </View>

      <View style={styles.contentContainer}>
        {/* Logo Section */}
        {/* <Animated.View style={[styles.heroSection, logoStyle]}>
          <View style={styles.logoShadow}>
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
        </Animated.View> */}

        {/* Text Section */}
        <Animated.View style={[styles.textSection, contentStyle]}>
          <Text style={styles.title}>JU-AMS</Text>
          <Text style={styles.subtitle}>Jazeera University Activity Hub</Text>
          <View style={styles.pillBadge}>
            <Sparkles size={14} color="#0284C7" />
            <Text style={styles.badgeText}>Official Platform</Text>
          </View>
        </Animated.View>

        {/* Feature Grid */}
        <Animated.View style={[styles.gridContainer, contentStyle]}>
           <View style={styles.gridRow}>
              <FeaturePill icon={Calendar} label="Events" delay={700} />
              <FeaturePill icon={Users} label="Community" delay={800} />
              <FeaturePill icon={Award} label="Certificates" delay={900} />
           </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[styles.footer, contentStyle]}>
          <Animated.View style={btnAnimatedStyle}>
            <TouchableOpacity 
              style={styles.ctaBtn} 
              onPress={() => router.push('/login')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#0284C7', '#0EA5E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                 <Text style={styles.btnText}>Get Started</Text>
                 <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.footerText}>© 2026 Jazeera University</Text>
        </Animated.View>
      </View>
    </View>
  );
}

function FeaturePill({ icon: Icon, label, delay }: any) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
        translateY.value = withDelay(delay, withSpring(0));
    }, []);

    const style = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }]
    }));

    return (
        <Animated.View style={[styles.pillContainer, style]}>
            <BlurView intensity={40} tint="light" style={styles.pillBlur}>
                <Icon size={16} color="#0369A1" />
                <Text style={styles.pillText}>{label}</Text>
            </BlurView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  orbContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', zIndex: 0 },
  contentContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, zIndex: 1 },
  
  heroSection: { marginBottom: 40 },
  logoShadow: { 
    width: 150, 
    height: 150, 
    borderRadius: 45, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20
  },
  logo: { width: 100, height: 100 },

  textSection: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 56, fontWeight: '900', color: '#0C4A6E', letterSpacing: -2, marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#0369A1', fontWeight: '600', letterSpacing: 0.5, textAlign: 'center', marginBottom: 24 },
  
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0F2FE'
  },
  badgeText: { fontSize: 13, fontWeight: '700', color: '#0284C7', textTransform: 'uppercase', letterSpacing: 0.5 },

  gridContainer: { width: '100%', marginBottom: 60 },
  gridRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, flexWrap: 'wrap' },
  
  pillContainer: { borderRadius: 24, overflow: 'hidden', shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  pillBlur: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.7)' },
  pillText: { fontSize: 14, fontWeight: '700', color: '#0C4A6E' },

  footer: { position: 'absolute', bottom: 50, width: '100%', alignItems: 'center' },
  ctaBtn: { width: width - 64, height: 64, borderRadius: 32, overflow: 'hidden', shadowColor: '#0284C7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 12 },
  btnGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  btnText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  
  footerText: { marginTop: 24, fontSize: 12, color: '#64748B', fontWeight: '600' },
});
