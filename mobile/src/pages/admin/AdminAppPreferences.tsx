import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Switch } from 'react-native';
import { 
  ArrowLeft, Palette, Globe, Smartphone, Moon, Languages, Wifi, CheckCircle2
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useTheme } from '@/src/context/ThemeContext';

export default function AdminAppPreferences() {
  const router = useRouter();
  const { theme: currentTheme, toggleTheme } = useTheme();
  const [dataSaver, setDataSaver] = React.useState(false);
  const [autoUpdate, setAutoUpdate] = React.useState(true);
  
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
       <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/(admin)/profile')}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20', borderColor: theme.card }]}>
                <Palette size={32} color={theme.primary} />
            </View>
            <ThemedText style={[styles.pageTitle, { color: theme.text }]}>App Preferences</ThemedText>
            <Text style={[styles.pageSubtitle, { color: theme.textSecondary }]}>Customize look, feel, and system behaviors.</Text>
        </View>

        {/* Display & Language */}
        <GlassCard style={[styles.formCard, { backgroundColor: theme.card }]}>
            <View style={styles.sectionHeader}>
                <Moon size={16} color={theme.textSecondary} />
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Display & Language</Text>
            </View>

            <ToggleItem 
                label="Dark Mode" 
                desc="Use dark theme for low-light environments"
                value={currentTheme === 'dark'}
                onValueChange={toggleTheme}
                theme={theme}
            />
             <View style={[styles.divider, { backgroundColor: theme.border }]} />
             
            <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
                <View style={styles.rowInfo}>
                    <Text style={[styles.rowLabel, { color: theme.text }]}>App Language</Text>
                    <Text style={[styles.rowValue, { color: theme.primary }]}>English (US)</Text>
                </View>
                <Languages size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </GlassCard>

        {/* Data & Performance */}
        <GlassCard style={[styles.formCard, { backgroundColor: theme.card }]}>
            <View style={styles.sectionHeader}>
                <Wifi size={16} color={theme.textSecondary} />
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Data & Performance</Text>
            </View>
            
            <ToggleItem 
                label="Data Saver Mode" 
                desc="Reduce image quality to save bandwidth"
                value={dataSaver}
                onValueChange={setDataSaver}
                theme={theme}
            />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <ToggleItem 
                label="Auto-Update Resources" 
                desc="Download new content automatically"
                value={autoUpdate}
                onValueChange={setAutoUpdate}
                theme={theme}
            />
        </GlassCard>

      </ScrollView>
    </GradientBackground>
  );
}

function ToggleItem({ label, desc, value, onValueChange, theme }: any) {
    return (
        <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
                <Text style={[styles.toggleLabel, { color: theme.text }]}>{label}</Text>
                {desc && <Text style={[styles.toggleDesc, { color: theme.textSecondary }]}>{desc}</Text>}
            </View>
            <Switch 
                value={value} 
                onValueChange={onValueChange}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={'#FFFFFF'}
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
    paddingTop: 50,
    marginTop: -20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 10, paddingBottom: 40 },
  pageHeader: { alignItems: 'center', marginBottom: 30 },
  iconContainer: {
      width: 64, height: 64, borderRadius: 32, 
      justifyContent: 'center', alignItems: 'center', marginBottom: 16,
      borderWidth: 4, 
  },
  pageTitle: { fontSize: 24, fontWeight: '900', marginBottom: 8 },
  pageSubtitle: { fontSize: 13, textAlign: 'center', maxWidth: '70%' },
  formCard: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  toggleInfo: { flex: 1, marginRight: 16 },
  toggleLabel: { fontSize: 15, fontWeight: '700' },
  toggleDesc: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  divider: { height: 1, marginVertical: 12 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '700' },
  rowValue: { fontSize: 13, marginTop: 2, fontWeight: '600' },
});
