import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Eye, Calendar, Clock, MapPin, Users, User, Search, Filter, Edit3, Trash2 } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

export default function AdminActivities() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Blue Header Banner - Matching Monitor Style */}
        <View style={styles.headerBanner}>
            <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>Admin Activities</Text>
                <Text style={styles.bannerSubtitle}>
                    Manage and oversee every event across the university campus.
                </Text>
            </View>
            <TouchableOpacity style={styles.calendarBtn}>
                <Calendar size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.calendarBtnText}>Manage</Text>
            </TouchableOpacity>
        </View>

        {/* Search and Filters - Matching Monitor Style */}
        <View style={styles.searchRow}>
            <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Search size={18} color={theme.textSecondary} style={styles.searchIcon} />
                <TextInput 
                    placeholder="Quick search activities..." 
                    style={[styles.searchInput, { color: theme.text }]}
                    placeholderTextColor={theme.textSecondary}
                />
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Filter size={16} color={theme.primary} />
            </TouchableOpacity>
        </View>

        {/* Section Header - Matching Monitor Style */}
        <View style={styles.sectionHeader}>
            <View>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Activities Feed</Text>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>System-wide event management</Text>
            </View>
        </View>

        <View style={styles.list}>
            <AdminActivityCard 
                month="JAN" 
                day="20" 
                category="Workshop" 
                creator="Amiin Daahir" 
                title="Full-Stuck Development" 
                time="15:29" 
                location="Main Hall" 
                attendees="1/12"
                status="Upcoming" 
                theme={theme}
            />
            <AdminActivityCard 
                month="JAN" 
                day="22" 
                category="Seminar" 
                creator="Sarah Mohamed" 
                title="Leadership in Tech" 
                time="10:00" 
                location="Auditorium" 
                attendees="45/50"
                status="Ongoing" 
                theme={theme}
            />
             <AdminActivityCard 
                month="JAN" 
                day="25" 
                category="Workshop" 
                creator="Dr. Ibrahim" 
                title="Mobile UI Design" 
                time="14:00" 
                location="IT Lab 03" 
                attendees="12/20"
                status="Completed" 
                theme={theme}
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function AdminActivityCard({ month, day, category, creator, title, time, location, attendees, status, theme }: any) {
    const isOngoing = status === 'Ongoing';
    const isCompleted = status === 'Completed';
    const isUpcoming = status === 'Upcoming';
    
    // Status style mapping
    let statusColor = '#0EA5E9';
    let statusBg = theme.background; // Default fallback
    if (isOngoing) { statusColor = '#22C55E'; statusBg = '#22C55E15'; }
    else if (isCompleted) { statusColor = theme.textSecondary; statusBg = theme.textSecondary + '15'; }
    else { statusBg = '#0EA5E915'; } // Upcoming

    return (
        <GlassCard style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {/* Left: Enhanced Date Block */}
            <View style={[styles.dateBlock, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.dateMonth, { color: theme.textSecondary }]}>{month}</Text>
                <Text style={[styles.dateDay, { color: theme.text }]}>{day}</Text>
                <View style={styles.dateLine} />
            </View>

            {/* Middle: Content & Metadata */}
            <View style={styles.cardMain}>
                <View style={styles.tagRow}>
                    <View style={[styles.categoryBadge, { backgroundColor: theme.border }]}>
                        <Text style={[styles.categoryText, { color: theme.textSecondary }]}>{category}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                        <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
                    </View>
                </View>

                <Text style={[styles.activityTitle, { color: theme.text }]} numberOfLines={1}>{title}</Text>
                
                <View style={styles.metaGrid}>
                    <View style={styles.metaItem}>
                        <Clock size={12} color={theme.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.textSecondary }]}>{time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <MapPin size={12} color={theme.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.textSecondary }]} numberOfLines={1}>{location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Users size={12} color={theme.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.textSecondary }]}>{attendees}</Text>
                    </View>
                </View>

                <View style={styles.creatorRow}>
                    <View style={[styles.creatorAvatar, { backgroundColor: theme.border }]}>
                        <User size={10} color={theme.textSecondary} />
                    </View>
                    <Text style={[styles.creatorName, { color: theme.textSecondary }]}>{creator}</Text>
                </View>
            </View>

            {/* Right: Actions Column - Stacked Vertically */}
            <View style={[styles.actionsColumn, { borderLeftColor: theme.border }]}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '30' }]}>
                    <Eye size={12} color={theme.primary} />
                    <Text style={[styles.actionBtnText, { color: theme.primary }]}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF630' }]}>
                    <Edit3 size={12} color="#8B5CF6" />
                    <Text style={[styles.actionBtnText, { color: '#8B5CF6' }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF444415', borderColor: '#EF444430' }]}>
                    <Trash2 size={12} color="#EF4444" />
                    <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Del</Text>
                </TouchableOpacity>
            </View>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 12, paddingTop: 14, paddingBottom: 60 },
  headerBanner: { 
    backgroundColor: '#0EA5E9', 
    padding: 20, 
    borderRadius: 24, 
    marginBottom: 16, 
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8
  },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: 11, color: '#FFFFFF', opacity: 0.8, marginTop: 4, lineHeight: 16, maxWidth: '80%' },
  calendarBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)'
  },
  calendarBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 20, alignItems: 'center' },
  searchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 14, 
    paddingHorizontal: 12, 
    height: 44, 
    borderWidth: 1,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 13, fontWeight: '500' },
  filterBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
  },
  sectionHeader: { marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  sectionSubtitle: { fontSize: 12, marginTop: 2 },
  list: { gap: 12 },
  card: { 
    flexDirection: 'row', 
    padding: 12, 
    borderRadius: 24, 
    borderWidth: 1,
  },
  dateBlock: { 
    width: 58, 
    height: 65, 
    borderRadius: 16, 
    justifyContent: 'center', 
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  dateMonth: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  dateDay: { fontSize: 20, fontWeight: '900', marginTop: -2 },
  dateLine: { width: 12, height: 2, backgroundColor: '#0EA5E9', marginTop: 2, borderRadius: 1 },
  cardMain: { flex: 1, paddingLeft: 14, paddingRight: 10 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  categoryText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  statusDot: { width: 4, height: 4, borderRadius: 2 },
  statusText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  activityTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, fontWeight: '600' },
  creatorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  creatorAvatar: { width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  creatorName: { fontSize: 10, fontWeight: '700' },
  actionsColumn: { paddingLeft: 12, borderLeftWidth: 1, gap: 6, justifyContent: 'center' },
  actionBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5, 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 58,
  },
  actionBtnText: { fontSize: 10, fontWeight: '800' },
});
 