import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  if (colorScheme === 'dark') {
    return <View style={styles.darkBackground}>{children}</View>;
  }

  return (
    <View style={styles.lightBackground}>
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={[styles.container, { backgroundColor: 'rgba(244, 249, 255, 0.6)' }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lightBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkBackground: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
  },
  blob1: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#E0F2FE',
    opacity: 0.6,
  },
  blob2: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#A9D6FF',
    opacity: 0.4,
  },
});
