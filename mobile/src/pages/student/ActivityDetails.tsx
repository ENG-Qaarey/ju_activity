import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Bookmark, CheckCircle2, Info } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ActivityDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [applied, setApplied] = React.useState(false);
  const [isApplying, setIsApplying] = React.useState(false);

  const { 
    title = 'Activity Details', 
    category = 'General', 
    description = 'No description available for this activity.',
    date = 'TBD',
    time = 'TBD',
    location = 'To Be Announced',
    enrolled = '0',
    capacity = '0',
    from 
  } = params;

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this activity at Jazeera University: ${title}!`,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
        setIsApplying(false);
        setApplied(true);
    }, 1500);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(student)/(tabs)/activities');
    }
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Image & Actions */}
        <View style={styles.topActions}>
            <TouchableOpacity 
              style={styles.actionCircle} 
              onPress={handleBack}
            >
                <ArrowLeft size={22} color="#1E293B" />
            </TouchableOpacity>
            <View style={styles.rightActions}>
                <TouchableOpacity style={styles.actionCircle} onPress={onShare}>
                    <Share2 size={22} color="#1E293B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCircle}>
                    <Bookmark size={22} color="#1E293B" />
                </TouchableOpacity>
            </View>
        </View>

        <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' }} 
            style={styles.headerImage}
        />

        {/* Content */}
        <View style={styles.content}>
            {applied && (
                <View style={styles.successPanel}>
                    <CheckCircle2 size={20} color="#22C55E" />
                    <ThemedText style={styles.successText}>Application Submitted Successfully!</ThemedText>
                </View>
            )}

            <View style={styles.categoryBadge}>
                <ThemedText style={styles.categoryText}>{category}</ThemedText>
            </View>
            <ThemedText style={styles.title}>{title}</ThemedText>
            
            <View style={styles.metaGrid}>
                <MetaItem icon={Calendar} label="Date" value={date as string} />
                <MetaItem icon={Clock} label="Time" value={time as string} />
                <MetaItem icon={MapPin} label="Location" value={location as string} />
                <MetaItem icon={Users} label="Participants" value={`${enrolled}/${capacity} Joined`} />
            </View>

            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>About Activity</ThemedText>
                <ThemedText style={styles.description}>
                    {description as string}
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Perks & Benefits</ThemedText>
                <BenefitItem text="Certificate of Participation" />
                <BenefitItem text="Professional Networking" />
                <BenefitItem text="Refreshments Provided" />
            </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={styles.footer}>
          <View style={styles.footerInfo}>
              <ThemedText style={styles.footerLabel}>Registration Status</ThemedText>
              <View style={styles.statusRow}>
                  {applied ? (
                      <>
                        <CheckCircle2 size={16} color="#22C55E" />
                        <ThemedText style={[styles.statusVal, { color: '#22C55E' }]}>Applied</ThemedText>
                      </>
                  ) : (
                      <>
                        <Clock size={16} color="#0EA5E9" />
                        <ThemedText style={styles.statusVal}>Open</ThemedText>
                      </>
                  )}
              </View>
          </View>
          <View style={{ flex: 1 }}>
              <JuButton 
                title={applied ? "Already Applied" : (isApplying ? "Applying..." : "Apply Activity")} 
                onPress={handleApply}
                variant={applied ? "outline" : "primary"}
                disabled={applied || isApplying}
              />
          </View>
      </View>
    </GradientBackground>
  );
}

function MetaItem({ icon: Icon, label, value }: any) {
    return (
        <View style={styles.metaItem}>
            <View style={styles.metaIconBg}>
                <Icon size={18} color="#0EA5E9" />
            </View>
            <View>
                <Text style={styles.metaLabel}>{label}</Text>
                <Text style={styles.metaValue}>{value}</Text>
            </View>
        </View>
    )
}

function BenefitItem({ text }: { text: string }) {
    return (
        <View style={styles.benefitItem}>
            <CheckCircle2 size={18} color="#0EA5E9" />
            <Text style={styles.benefitText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { paddingBottom: 120 },
  topActions: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between' },
  rightActions: { flexDirection: 'row', gap: 12 },
  actionCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255, 255, 255, 0.9)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 },
  headerImage: { width: '100%', height: 300 },
  content: { padding: 24, marginTop: -24, backgroundColor: '#F4F9FF', borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: '#0EA5E915', marginBottom: 16 },
  categoryText: { fontSize: 12, fontWeight: '800', color: '#0EA5E9', textTransform: 'uppercase' },
  title: { fontSize: 26, fontWeight: '900', color: '#1E293B', marginBottom: 24 },
  metaGrid: { gap: 16, marginBottom: 32 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  metaIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
  metaLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  metaValue: { fontSize: 15, color: '#1E293B', fontWeight: '700', marginTop: 2 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  description: { fontSize: 15, color: '#64748B', lineHeight: 24 },
  benefitItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  benefitText: { fontSize: 15, color: '#475569', fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, paddingTop: 16, paddingBottom: 32, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F1F5F9', flexDirection: 'row', alignItems: 'center', gap: 20 },
  footerInfo: { flex: 0.8 },
  footerLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '600', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusVal: { fontSize: 13, fontWeight: '800', color: '#1E293B' },
  successPanel: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#DCFCE7', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 24, 
    gap: 12,
    borderWidth: 1,
    borderColor: '#86EFAC'
  },
  successText: { color: '#166534', fontSize: 14, fontWeight: '700' },
});
