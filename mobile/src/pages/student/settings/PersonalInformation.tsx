import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, User, Mail, Phone, MapPin, Save } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { JuButton } from '@/src/components/JuButton';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function PersonalInformation() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const handleBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Personal Information</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <User size={18} color={theme.primary} />
              <Text style={[styles.label, { color: theme.textSecondary }]}>Full Name</Text>
            </View>
            <TextInput 
              style={[styles.input, { color: theme.text, borderColor: theme.border }]} 
              defaultValue="Muscab Ahmed" 
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Mail size={18} color={theme.primary} />
              <Text style={[styles.label, { color: theme.textSecondary }]}>Email Address</Text>
            </View>
            <TextInput 
              style={[styles.input, { color: theme.text, borderColor: theme.border }]} 
              defaultValue="muscab.ahmed@jazeera.edu.so" 
              keyboardType="email-address"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Phone size={18} color={theme.primary} />
              <Text style={[styles.label, { color: theme.textSecondary }]}>Phone Number</Text>
            </View>
            <TextInput 
              style={[styles.input, { color: theme.text, borderColor: theme.border }]} 
              defaultValue="+252 61 XXX XXXX" 
              keyboardType="phone-pad"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <MapPin size={18} color={theme.primary} />
              <Text style={[styles.label, { color: theme.textSecondary }]}>Campus Location</Text>
            </View>
            <TextInput 
              style={[styles.input, { color: theme.text, borderColor: theme.border }]} 
              defaultValue="Main Campus, Mogadishu" 
              placeholderTextColor={theme.textSecondary}
            />
          </View>
        </GlassCard>

        <View style={styles.infoBox}>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Changes to your primary identification may require administration approval.
            </Text>
        </View>

        <JuButton 
            title="Save Changes" 
            onPress={() => {}} 
            icon={Save}
            style={styles.saveButton}
        />
      </ScrollView>
    </GradientBackground>
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
    paddingBottom: 100,
  },
  card: {
    padding: 24,
    borderRadius: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 54,
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 32,
  },
});
