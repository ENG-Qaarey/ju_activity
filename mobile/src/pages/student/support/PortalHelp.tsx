import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, Search, CircleHelp, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

const FAQS = [
  {
    question: "How do I apply for an activity?",
    answer: "Browse the activities in the 'Activities' tab, select one you're interested in, and click the 'Apply Activity' button at the bottom of the page."
  },
  {
    question: "Where can I see my duty assignments?",
    answer: "All your assigned duties and their schedules can be found in the 'My Engagement' section or directly on your dashboard."
  },
  {
    question: "Can I cancel an application?",
    answer: "Yes, you can cancel an application from the 'My Applications' page before it is approved by the coordinator."
  },
  {
    question: "How do I update my profile photo?",
    answer: "Profile photo updates currently require system administrator approval to ensure campus security standards."
  },
  {
    question: "What happens if I miss a duty?",
    answer: "Missing a duty without prior notice may impact your activity score. Please contact your coordinator if you have an emergency."
  }
];

export default function PortalHelp() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>FAQ & Help</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Search size={20} color={theme.textSecondary} />
          <TextInput 
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search help topics..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Frequently Asked Questions</Text>
          {filteredFaqs.map((faq, index) => (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.7}
              onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <GlassCard style={[styles.faqCard, { backgroundColor: theme.card, marginBottom: 12 }]}>
                <View style={styles.questionRow}>
                  <Text style={[styles.questionText, { color: theme.text }]}>{faq.question}</Text>
                  {expandedIndex === index ? (
                    <ChevronUp size={20} color={theme.primary} />
                  ) : (
                    <ChevronDown size={20} color={theme.textSecondary} />
                  )}
                </View>
                {expandedIndex === index && (
                  <View style={styles.answerContainer}>
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    <Text style={[styles.answerText, { color: theme.textSecondary }]}>{faq.answer}</Text>
                  </View>
                )}
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Still need help?</Text>
          <GlassCard style={[styles.card, { backgroundColor: theme.card }]}>
            <SupportItem 
                icon={MessageCircle} 
                label="Live Chat Support" 
                value="Available 8:00 AM - 4:00 PM"
                theme={theme}
            />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <SupportItem 
                icon={Mail} 
                label="Email Support" 
                value="support@jazeera.edu.so"
                theme={theme}
            />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <SupportItem 
                icon={Phone} 
                label="Help Desk" 
                value="+252 61 XXX XXXX"
                theme={theme}
            />
          </GlassCard>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function SupportItem({ icon: Icon, label, value, theme }: any) {
  return (
    <TouchableOpacity style={styles.supportRow}>
      <View style={[styles.iconBg, { backgroundColor: theme.primary + '10' }]}>
        <Icon size={20} color={theme.primary} />
      </View>
      <View>
        <Text style={[styles.supportLabel, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.supportValue, { color: theme.textSecondary }]}>{value}</Text>
      </View>
    </TouchableOpacity>
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
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
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
  faqCard: {
    padding: 16,
    borderRadius: 20,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  answerContainer: {
    marginTop: 12,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    marginTop: 12,
  },
  divider: {
    height: 1,
    opacity: 0.5,
  },
  card: {
    padding: 8,
    borderRadius: 24,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 16,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  supportValue: {
    fontSize: 13,
    fontWeight: '500',
  },
});
