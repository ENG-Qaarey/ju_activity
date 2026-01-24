import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';

export default function StudentActivities() {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.title}>Activities</ThemedText>
        <ThemedText style={styles.subtitle}>Explore and join upcoming university events.</ThemedText>
        
        <GlassCard style={styles.emptyCard}>
          <ThemedText>No activities available at the moment.</ThemedText>
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
