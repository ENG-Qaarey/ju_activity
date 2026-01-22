import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { ArrowLeft, Save, Image as LucideImage, Calendar, MapPin, AlignLeft, Info, Send } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuInput } from '@/src/components/JuInput';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';

export default function CreateActivity() {
  const [isPublic, setIsPublic] = React.useState(true);

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
                <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Propose Activity</ThemedText>
            <View style={{ width: 44 }} />
        </View>

        {/* Info Alert */}
        <GlassCard style={styles.infoAlert}>
             <Info size={20} color="#0EA5E9" />
             <Text style={styles.infoText}>New activities require approval from the Admin before becoming live.</Text>
        </GlassCard>

        {/* Media Upload Placeholder */}
        <TouchableOpacity style={styles.uploadArea}>
             <LucideImage size={40} color="#94A3B8" />
             <Text style={styles.uploadText}>Tap to upload banner</Text>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
            <JuInput label="Activity Name" placeholder="e.g. Advanced Coding Workshop" />
            
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <JuInput label="Date" placeholder="Pick Date" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <JuInput label="Time" placeholder="Pick Time" />
                </View>
            </View>

            <JuInput label="Location" placeholder="e.g. IT Block - Room 3" />

            <View style={styles.textAreaContainer}>
                <Text style={styles.fieldLabel}>Detailed Description</Text>
                <TextInput 
                    multiline 
                    placeholder="Provide details about the activity..." 
                    style={styles.textArea}
                    placeholderTextColor="#94A3B8"
                />
            </View>

            <View style={styles.toggleRow}>
                <View>
                    <Text style={styles.toggleTitle}>Allow Public Registration</Text>
                    <Text style={styles.toggleSub}>Students can join without invitation</Text>
                </View>
                <Switch 
                    value={isPublic} 
                    onValueChange={setIsPublic} 
                    trackColor={{ false: '#CBD5E1', true: '#0EA5E9' }}
                    thumbColor="#FFFFFF"
                />
            </View>
        </View>

        <View style={styles.footer}>
             <JuButton title="Submit Proposal" onPress={() => {}} icon={Send} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  infoAlert: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, marginBottom: 24, backgroundColor: '#E0F2FE80' },
  infoText: { flex: 1, fontSize: 12, color: '#0369A1', fontWeight: '600', lineHeight: 18 },
  uploadArea: { height: 160, backgroundColor: '#F1F5F9', borderRadius: 24, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  uploadText: { fontSize: 14, fontWeight: '700', color: '#94A3B8', marginTop: 12 },
  form: { gap: 4 },
  row: { flexDirection: 'row' },
  textAreaContainer: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8, marginLeft: 4 },
  textArea: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, height: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: '#E2E8F0', fontSize: 15, color: '#1E293B' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginTop: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  toggleTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  toggleSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  footer: { marginTop: 32 },
});
