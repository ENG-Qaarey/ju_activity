import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { ThemedText } from '@/src/components/themed-text';
import { 
  Clock, CheckCircle2, XCircle, 
  ChevronRight, MapPin, Calendar, LayoutGrid,
  Filter, Trash2, ArrowRight, Search, 
  History, BookmarkCheck
} from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const MOCK_APPLICATIONS = [
  {
    id: '1',
    activityTitle: 'Leadership Mastery',
    category: 'Seminar',
    status: 'Approved',
    appliedDate: 'Jan 20',
    location: 'Main Hall',
    schedule: 'Feb 05, 10:00 AM',
    isHistorical: false
  },
  {
    id: '2',
    activityTitle: 'Full-Stuck Development',
    category: 'Workshop',
    status: 'Pending',
    appliedDate: 'Jan 22',
    location: 'Lab 1',
    schedule: 'Feb 15, 06:00 PM',
    isHistorical: false
  },
  {
    id: '3',
    activityTitle: 'Cybersecurity Guard',
    category: 'Workshop',
    status: 'Pending',
    appliedDate: 'Jan 24',
    location: 'IT Wing',
    schedule: 'Feb 20, 09:00 AM',
    isHistorical: false
  },
  {
    id: '4',
    activityTitle: 'Graphic Design Basics',
    category: 'Training',
    status: 'Rejected',
    appliedDate: 'Jan 05',
    location: 'Media Lab',
    schedule: 'Jan 15, 02:00 PM',
    isHistorical: true
  },
  {
    id: '5',
    activityTitle: 'Public Speaking BootCamp',
    category: 'Training',
    status: 'Approved',
    appliedDate: 'Dec 15',
    location: 'Auditorium',
    schedule: 'Jan 02, 02:00 PM',
    isHistorical: true
  }
];

export default function StudentApplications() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);

  const filteredApps = applications.filter(app => 
    app.activityTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentApps = filteredApps.filter(app => !app.isHistorical);
  const pastApps = filteredApps.filter(app => app.isHistorical);

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      "Delete Application",
      `Are you sure you want to delete your application for "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setApplications(prev => prev.filter(app => app.id !== id));
          } 
        }
      ]
    );
  };

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
            <ThemedText style={[styles.title, { color: theme.text }]}>My Applications</ThemedText>
            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                Track and manage your activity participation requests.
            </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Search size={20} color={theme.textSecondary} />
            <TextInput 
                placeholder="Search your applications.." 
                placeholderTextColor={theme.textSecondary}
                style={[styles.searchInput, { color: theme.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>

        {/* Stats Summary - More Premium Grid */}
        <View style={styles.statsGrid}>
            <StatCard label="Active" value={currentApps.length} theme={theme} icon={BookmarkCheck} color={theme.primary} />
            <StatCard label="Pending" value={currentApps.filter(a => a.status === 'Pending').length} theme={theme} icon={Clock} color={theme.warning} />
            <StatCard label="Passed" value={pastApps.length} theme={theme} icon={History} color={theme.success} />
        </View>

        {/* Section: Current Applications */}
        {currentApps.length > 0 && (
            <>
                <View style={styles.listHeader}>
                    <ThemedText style={[styles.listTitle, { color: theme.text }]}>Current Applications</ThemedText>
                </View>
                <View style={styles.list}>
                    {currentApps.map(app => (
                        <ApplicationCard 
                            key={app.id} 
                            application={app} 
                            theme={theme} 
                            onDelete={() => handleDelete(app.id, app.activityTitle)}
                            onPress={() => router.push({
                                pathname: '/(student)/details' as any,
                                params: { ...app, isHistorical: String(app.isHistorical) }
                            })}
                        />
                    ))}
                </View>
            </>
        )}

        {/* Section: Past Activities */}
        {pastApps.length > 0 && (
            <>
                <View style={[styles.listHeader, { marginTop: 32 }]}>
                    <ThemedText style={[styles.listTitle, { color: theme.text }]}>Activity History</ThemedText>
                </View>
                <View style={styles.list}>
                    {pastApps.map(app => (
                        <ApplicationCard 
                            key={app.id} 
                            application={app} 
                            theme={theme} 
                            isPast
                        />
                    ))}
                </View>
            </>
        )}

        {filteredApps.length === 0 && (
            <View style={styles.emptyState}>
                <LayoutGrid size={48} color={theme.textSecondary} strokeWidth={1} />
                <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>No applications found.</ThemedText>
            </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}

function ApplicationCard({ application, theme, onDelete, onPress, isPast }: any) {
    const getStatusColor = () => {
        switch (application.status) {
            case 'Approved': return theme.success;
            case 'Pending': return theme.warning;
            case 'Rejected': return theme.error;
            default: return theme.textSecondary;
        }
    };

    const color = getStatusColor();

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, isPast && { opacity: 0.8 }]}>
                <View style={styles.cardContent}>
                    <View style={styles.cardMainRow}>
                        <View style={styles.titleArea}>
                            <View style={[styles.typeBadge, { backgroundColor: isPast ? theme.border : theme.primary + '15' }]}>
                                <ThemedText style={[styles.typeText, { color: isPast ? theme.textSecondary : theme.primary }]}>{application.category}</ThemedText>
                            </View>
                            <ThemedText style={[styles.appTitle, { color: theme.text }]} numberOfLines={1}>{application.activityTitle}</ThemedText>
                        </View>
                        <View style={[styles.statusTag, { backgroundColor: color + '10' }]}>
                            <View style={[styles.statusDot, { backgroundColor: color }]} />
                        </View>
                    </View>

                    <View style={styles.cardMetaRow}>
                        <View style={styles.metaItem}>
                            <Calendar size={12} color={theme.primary} />
                            <ThemedText style={[styles.metaText, { color: theme.textSecondary }]}>{application.schedule}</ThemedText>
                        </View>
                        <View style={styles.metaItem}>
                            <MapPin size={12} color={theme.primary} />
                            <ThemedText style={[styles.metaText, { color: theme.textSecondary }]}>{application.location}</ThemedText>
                        </View>
                    </View>
                    
                    <View style={[styles.cardFooterCompact, { borderTopColor: theme.border }]}>
                        <ThemedText style={[styles.footerDate, { color: theme.textSecondary }]}>
                            Applied: <ThemedText style={{ fontWeight: '800' }}>{application.appliedDate}</ThemedText>
                        </ThemedText>
                        <ThemedText style={[styles.statusLabelSmall, { color }]}>{application.status}</ThemedText>
                    </View>
                </View>

                {application.status === 'Pending' && !isPast && (
                    <TouchableOpacity style={[styles.miniDeleteBtn, { backgroundColor: theme.error + '15' }]} onPress={(e) => { e.stopPropagation(); onDelete(); }}>
                        <Trash2 size={15} color={theme.error} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    )
}

function StatCard({ label, value, theme, icon: Icon, color }: any) {
    return (
        <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.statIcon, { backgroundColor: color + '10' }]}>
                <Icon size={18} color={color} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <ThemedText style={[styles.statValue, { color: theme.text }]}>{value}</ThemedText>
                <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</ThemedText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 140 },
  header: { marginBottom: 28 },
  title: { fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 4, lineHeight: 20, fontWeight: '600' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  searchInput: { flex: 1, fontSize: 14, marginLeft: 12, fontWeight: '500' },
  
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 36 },
  statBox: { 
    flex: 1,
    padding: 16, 
    borderRadius: 24, 
    borderWidth: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
    gap: 8
  },
  statIcon: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900' },
  statLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },

  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  listTitle: { fontSize: 18, fontWeight: '900' },

  list: { gap: 12 },
  card: { 
    borderRadius: 18, 
    padding: 12, 
    borderWidth: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: { flex: 1 },
  cardMainRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  titleArea: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeText: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  appTitle: { fontSize: 14.5, fontWeight: '800', flex: 1 },
  
  statusTag: { width: 10, height: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3 },

  cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 11.5, fontWeight: '700' },

  cardFooterCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, paddingTop: 8 },
  footerDate: { fontSize: 11, fontWeight: '600' },
  statusLabelSmall: { fontSize: 10.5, fontWeight: '900', textTransform: 'uppercase' },

  miniDeleteBtn: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 15, fontWeight: '600' },
});
