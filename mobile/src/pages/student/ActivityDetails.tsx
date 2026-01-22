import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Bookmark, CheckCircle2, Info } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuButton } from '@/src/components/JuButton';
import { ThemedText } from '@/src/components/themed-text';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function ActivityDetails() {
  const router = useRouter();

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this activity at Jazeera University: Annual Tech Symposium 2026!',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header Image & Actions */}
        <View style={styles.topActions}>
            <TouchableOpacity style={styles.actionCircle} onPress={() => router.back()}>
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
            <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>Technical</Text>
            </View>
            <ThemedText style={styles.title}>Annual Tech Symposium 2026</ThemedText>
            
            <View style={styles.metaGrid}>
                <MetaItem icon={Calendar} label="Date" value="Jan 25, 2026" />
                <MetaItem icon={Clock} label="Time" value="10:00 AM - 4:00 PM" />
                <MetaItem icon={MapPin} label="Location" value="Main Hall, Campus North" />
                <MetaItem icon={Users} label="Participants" value="240/300 Joined" />
            </View>

            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>About Activity</ThemedText>
                <Text style={styles.description}>
                    Join us for the biggest technical gathering of the year at Jazeera University! 
                    The Annual Tech Symposium is a day-long event featuring keynote speakers from 
                    top tech industries, student innovation showcases, and hands-on workshops 
                    on AI, Web3, and Mobile Development.
                    {"\n\n"}
                    Whether you're a developer, designer, or tech enthusiast, there's 
                    something here for everyone. Don't miss out on networking opportunities 
                    with industry experts and winning exciting prizes!
                </Text>
            </View>

            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Perks & Benefits</ThemedText>
                <BenefitItem text="Certificate of Participation" />
                <BenefitItem text="Professional Networking" />
                <BenefitItem text="Refreshments & Lunch Provided" />
                <BenefitItem text="Activity Hub Achievement Badge" />
            </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={styles.footer}>
          <View style={styles.footerInfo}>
              <Text style={styles.footerLabel}>Registration Status</Text>
              <View style={styles.statusRow}>
                  <CheckCircle2 size={16} color="#22C55E" />
                  <Text style={styles.statusVal}>Open until Jan 24</Text>
              </View>
          </View>
          <View style={{ flex: 1 }}>
              <JuButton title="Join Activity" onPress={() => {}} />
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
});
