import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  return (
    <View style={[styles.baseBackground, { backgroundColor: theme.background }]}>
      {colorScheme === 'light' ? (
        <>
          <View style={styles.blob1} />
          <View style={styles.blob2} />
        </>
      ) : (
        <>
          <View style={[styles.blob1, styles.darkBlob1]} />
          <View style={[styles.blob2, styles.darkBlob2]} />
        </>
      )}
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseBackground: {
    flex: 1,
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
  darkBlob1: {
    backgroundColor: '#0EA5E9',
    opacity: 0.15,
  },
  darkBlob2: {
    backgroundColor: '#1E40AF',
    opacity: 0.1,
  },
});
