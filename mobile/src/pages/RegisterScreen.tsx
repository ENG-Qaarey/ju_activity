import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { JuInput } from '@/src/components/JuInput';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#334155" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <GlassCard style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Register as a new student</Text>

            <JuInput 
              label="Full Name" 
              placeholder="Enter your full name" 
            />

            <JuInput 
              label="Student ID" 
              placeholder="Enter your student ID" 
            />

            <JuInput 
              label="Email Address" 
              placeholder="student@jazeerauniversity.edu.so" 
              keyboardType="email-address"
              autoCapitalize="none"
              helperText="Use your university email address"
            />

            <JuInput 
              label="Password" 
              placeholder="Create a strong password" 
              isPassword
            />

            <JuInput 
              label="Confirm Password" 
              placeholder="Re-enter your password" 
              isPassword
            />

            <Text style={styles.hintText}>
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </Text>

            <JuButton 
              title="Register" 
              onPress={() => router.push('/login')} 
              style={styles.btn}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.linkText}>Sign in here</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 8,
  },
  backText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    padding: 20,
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 32,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 11,
    color: '#64748B',
    alignSelf: 'flex-start',
    marginBottom: 20,
    lineHeight: 16,
  },
  btn: {
    width: '100%',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  linkText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
});
