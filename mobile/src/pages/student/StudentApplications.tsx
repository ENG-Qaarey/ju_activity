import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';

export default function StudentApplications() {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.title}>My Applications</ThemedText>
        <ThemedText style={styles.subtitle}>Track the status of your activity applications.</ThemedText>
        
        <GlassCard style={styles.emptyCard}>
          <ThemedText>You haven't applied to any activities yet.</ThemedText>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
});
