import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Mail, Lock, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react-native';
import { client } from '@/src/lib/api';

const { width, height } = Dimensions.get('window');

const FloatingOrb = ({ size, x, y, duration = 6000, delay = 0 }: any) => {
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translate, {
          toValue: -25,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(translate, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          top: y,
          left: x,
          transform: [{ translateY: translate }],
        },
      ]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'rgba(186,230,253,0.4)']}
        style={{ flex: 1, borderRadius: size / 2 }}
      />
    </Animated.View>
  );
};

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleReset = async () => {
    if (!email || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await client.post('/auth/reset-password', { email, newPassword }, true);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.container}>
          <BlurView intensity={90} tint="light" style={styles.glass}>
            <View style={styles.successIconBox}>
              <LinearGradient
                colors={['#22C55E', '#16A34A']}
                style={styles.successIconGrad}
              >
                <ShieldCheck size={40} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.successTitle}>Reset Successful</Text>
            <Text style={styles.successDescription}>
              Your password has been updated. You can now use your new password to sign in to your account.
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.replace('/login')}
            >
              <LinearGradient
                colors={['#0284C7', '#0EA5E9']}
                style={styles.buttonGrad}
              >
                <Text style={styles.buttonText}>Proceed to Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC']}
        style={StyleSheet.absoluteFill}
      />

      <View style={StyleSheet.absoluteFill}>
        <FloatingOrb size={300} x={-120} y={-120} duration={6000} delay={0} />
        <FloatingOrb size={260} x={width - 140} y={height / 3} duration={7000} delay={600} />
        <FloatingOrb size={360} x={-80} y={height - 260} duration={8000} delay={1200} />
      </View>

      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color="#0C4A6E" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.main, { opacity: fadeAnim }]}>
            <View style={styles.header}>
              <Text style={styles.title}>New Password</Text>
              <Text style={styles.subtitle}>Secure your account by choosing a fresh password below</Text>
            </View>

            <BlurView intensity={90} tint="light" style={styles.glass}>
              <View style={styles.inputStack}>
                <View style={styles.field}>
                  <Text style={styles.label}>Registered Email</Text>
                  <View style={styles.inputContainer}>
                    <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      placeholder="e.g. jazeera@example.com"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Create Password</Text>
                  <View style={styles.inputContainer}>
                    <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Minimum 6 characters"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      secureTextEntry={!showPasswords}
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputContainer}>
                    <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Repeat your password"
                      placeholderTextColor="#94A3B8"
                      style={styles.input}
                      secureTextEntry={!showPasswords}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPasswords(!showPasswords)} style={styles.eyeIcon}>
                      {showPasswords ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <TouchableOpacity 
                style={styles.button}
                onPress={handleReset}
                disabled={loading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#0284C7', '#0EA5E9']}
                  style={styles.buttonGrad}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Updating...' : 'Set New Password'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0C4A6E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#0369A1',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  glass: {
    borderRadius: 32,
    padding: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    overflow: 'hidden',
  },
  inputStack: { gap: 16 },
  field: { gap: 8 },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0369A1',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.8)',
    height: 56,
  },
  inputIcon: { marginLeft: 16 },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '700',
  },
  eyeIcon: { padding: 12 },
  button: {
    marginTop: 32,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonGrad: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  errorBox: {
    marginTop: 16,
    backgroundColor: 'rgba(254,226,226,0.8)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(220,38,38,0.2)',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  successIconBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconGrad: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0C4A6E',
    textAlign: 'center',
    marginBottom: 12,
  },
  successDescription: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});
