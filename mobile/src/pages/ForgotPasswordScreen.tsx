import React, { useState } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Mail, Lock, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react-native';
import { client } from '@/src/lib/api';

const { width, height } = Dimensions.get('window');

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      <View style={styles.container}>
        <LinearGradient
          colors={['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>
          <BlurView intensity={80} tint="light" style={styles.glass}>
            <View style={styles.successIconBox}>
                <ShieldCheck size={48} color="#0284C7" />
            </View>
            <Text style={styles.successTitle}>Reset Complete</Text>
            <Text style={styles.successText}>
                Your password has been successfully updated.
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.replace('/login')}
            >
              <LinearGradient
                colors={['#0284C7', '#0EA5E9']}
                style={styles.buttonGrad}
              >
                <Text style={styles.buttonText}>Back to Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC']}
        style={StyleSheet.absoluteFill}
      />
      
      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#0C4A6E" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your details to reset your password</Text>
          </View>

          <BlurView intensity={80} tint="light" style={styles.glass}>
            <View style={styles.inputStack}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Mail size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                  <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter new password"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                    secureTextEntry={!showPasswords}
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                </View>

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Lock size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Confirm new password"
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

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity 
              style={styles.button}
              onPress={handleReset}
              disabled={loading}
            >
              <LinearGradient
                colors={['#0284C7', '#0EA5E9']}
                style={styles.buttonGrad}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Processing...' : 'Update Password'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
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
    paddingHorizontal: 20,
  },
  glass: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  inputStack: { gap: 12 },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0C4A6E',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
  },
  inputIcon: { marginLeft: 14 },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },
  eyeIcon: { padding: 10 },
  button: {
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGrad: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  errorBox: {
    marginTop: 12,
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  successIconBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0C4A6E',
    textAlign: 'center',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
});
