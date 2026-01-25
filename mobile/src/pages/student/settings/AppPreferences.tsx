import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { ArrowLeft, Moon, Languages, Eye, Zap, Database } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useTheme } from '@/src/context/ThemeContext';

export default function AppPreferences() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { toggleTheme } = useTheme();

  const [prefs, setPrefs] = React.useState({
    darkMode: colorScheme === 'dark',
    highContrast: false,
    reducedMotion: false,
    dataSaver: false,
    language: 'English',
  });

  const handleToggleTheme = () => {
    toggleTheme();
    setPrefs(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>App Preferences</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Appearance</Text>
            <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
                <PreferenceToggle 
                    icon={Moon}
                    label="Dark Mode"
                    description="Switch between light and dark themes"
                    value={prefs.darkMode}
                    onValueChange={handleToggleTheme}
                    theme={theme}
                />
                 <View style={[styles.divider, { backgroundColor: theme.border }]} />
                <PreferenceToggle 
                    icon={Eye}
                    label="High Contrast"
                    description="Increase visibility of text and icons"
                    value={prefs.highContrast}
                    onValueChange={() => setPrefs(p => ({ ...p, highContrast: !p.highContrast }))}
                    theme={theme}
                />
            </GlassCard>
        </View>

        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Localization</Text>
            <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
                <TouchableOpacity style={styles.optionRow}>
                    <View style={styles.optionLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: theme.primary + '10' }]}>
                            <Languages size={20} color={theme.primary} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.optionLabel, { color: theme.text }]}>App Language</Text>
                            <Text style={[styles.optionDescription, { color: theme.textSecondary }]}>System Default (English)</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </GlassCard>
        </View>

        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Performance</Text>
            <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
                <PreferenceToggle 
                    icon={Zap}
                    label="Reduced Motion"
                    description="Minimize animations for better speed"
                    value={prefs.reducedMotion}
                    onValueChange={() => setPrefs(p => ({ ...p, reducedMotion: !p.reducedMotion }))}
                    theme={theme}
                />
                 <View style={[styles.divider, { backgroundColor: theme.border }]} />
                <PreferenceToggle 
                    icon={Database}
                    label="Data Saver"
                    description="Lower image quality on cellular data"
                    value={prefs.dataSaver}
                    onValueChange={() => setPrefs(p => ({ ...p, dataSaver: !p.dataSaver }))}
                    theme={theme}
                />
            </GlassCard>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function PreferenceToggle({ icon: Icon, label, description, value, onValueChange, theme }: any) {
    return (
        <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.primary + '10' }]}>
                    <Icon size={20} color={theme.primary} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.toggleLabel, { color: theme.text }]}>{label}</Text>
                    <Text style={[styles.toggleDescription, { color: theme.textSecondary }]}>{description}</Text>
                </View>
            </View>
            <Switch 
                value={value} 
                onValueChange={onValueChange}
                trackColor={{ false: theme.border, true: theme.primary + '80' }}
                thumbColor={value ? theme.primary : '#f4f3f4'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    borderRadius: 24,
    paddingVertical: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: '500',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    opacity: 0.5,
  },
});
