import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { 
  ArrowLeft, Save, User, Mail, Shield, Phone, MapPin, 
  Camera, CheckCircle2 
} from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { GlassCard } from '@/src/components/GlassCard';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminPersonalSettings() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Profile updated successfully');
    }, 1000);
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/(admin)/profile')}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://github.com/shadcn.png' }} 
                style={[styles.avatar, { borderColor: theme.card }]} 
              />
              <TouchableOpacity style={[styles.cameraBtn, { borderColor: theme.card }]}>
                <Camera size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.changePhotoText, { color: theme.primary }]}>Change Profile Photo</Text>
          </View>

          {/* Form Section */}
          <GlassCard style={[styles.formCard, { backgroundColor: theme.card }]}>
            <View style={styles.inputGroup}>
              <Label icon={User} label="Full Name" theme={theme} />
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                defaultValue="Jamiila Xassan" 
                placeholder="Enter full name"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Label icon={Shield} label="Admin Role" theme={theme} />
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background + '80', color: theme.textSecondary, borderColor: theme.border }]} 
                defaultValue="System Administrator" 
                editable={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Label icon={Mail} label="Email Address" theme={theme} />
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                defaultValue="jamiila@ju.edu.so" 
                keyboardType="email-address"
                placeholder="Enter email"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Label icon={Phone} label="Phone Number" theme={theme} />
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                defaultValue="+252 61 5000000" 
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

             <View style={styles.inputGroup}>
              <Label icon={MapPin} label="Office Location" theme={theme} />
              <TextInput 
                style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]} 
                defaultValue="Main Campus, Admin Block A" 
                placeholder="Enter office location"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          </GlassCard>

          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary, shadowColor: theme.primary }]} onPress={handleSave} disabled={loading}>
            {loading ? (
               <Text style={styles.saveBtnText}>Saving...</Text>
            ) : (
              <>
                <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={3} />
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

function Label({ icon: Icon, label, theme }: any) {
  return (
    <View style={styles.labelContainer}>
      <Icon size={14} color={theme.textSecondary} />
      <Text style={[styles.labelText, { color: theme.textSecondary }]}>{label}</Text>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
  },
  cameraBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0EA5E9',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  formCard: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    marginLeft: 4,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    borderWidth: 1,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    marginBottom: 30,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
