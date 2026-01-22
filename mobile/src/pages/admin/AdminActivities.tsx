import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Eye, Calendar, Clock, MapPin, Users, User, Search, Filter, Edit3, Trash2 } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';

export default function AdminActivities() {
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
            <View style={styles.searchContainer}>
                <Search size={18} color="#94A3B8" style={styles.searchIcon} />
                <TextInput 
                    placeholder="Quick search activities..." 
                    style={styles.searchInput}
                    placeholderTextColor="#94A3B8"
                />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
                <Filter size={16} color="#0EA5E9" />
            </TouchableOpacity>
        </View>

        {/* Section Header - Matching Monitor Style */}
        <View style={styles.sectionHeader}>
            <View>
                <Text style={styles.sectionTitle}>Activities Feed</Text>
                <Text style={styles.sectionSubtitle}>System-wide event management</Text>
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
            />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

function AdminActivityCard({ month, day, category, creator, title, time, location, attendees, status }: any) {
    const isOngoing = status === 'Ongoing';
    const isCompleted = status === 'Completed';
    const isUpcoming = status === 'Upcoming';
    
    // Status style mapping
    let statusColor = '#0EA5E9';
    let statusBg = '#F0F9FF';
    if (isOngoing) { statusColor = '#22C55E'; statusBg = '#F0FDF4'; }
    if (isCompleted) { statusColor = '#64748B'; statusBg = '#F8FAFC'; }

    return (
        <GlassCard style={styles.card}>
            {/* Left: Enhanced Date Block */}
            <View style={styles.dateBlock}>
                <Text style={styles.dateMonth}>{month}</Text>
                <Text style={styles.dateDay}>{day}</Text>
                <View style={styles.dateLine} />
            </View>

            {/* Middle: Content & Metadata */}
            <View style={styles.cardMain}>
                <View style={styles.tagRow}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                        <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
                    </View>
                </View>

                <Text style={styles.activityTitle} numberOfLines={1}>{title}</Text>
                
                <View style={styles.metaGrid}>
                    <View style={styles.metaItem}>
                        <Clock size={12} color="#94A3B8" />
                        <Text style={styles.metaText}>{time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <MapPin size={12} color="#94A3B8" />
                        <Text style={styles.metaText} numberOfLines={1}>{location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Users size={12} color="#94A3B8" />
                        <Text style={styles.metaText}>{attendees}</Text>
                    </View>
                </View>

                <View style={styles.creatorRow}>
                    <View style={styles.creatorAvatar}>
                        <User size={10} color="#64748B" />
                    </View>
                    <Text style={styles.creatorName}>{creator}</Text>
                </View>
            </View>

            {/* Right: Actions Column - Stacked Vertically */}
            <View style={styles.actionsColumn}>
                <TouchableOpacity style={[styles.actionBtn, styles.viewBtn]}>
                    <Eye size={12} color="#0EA5E9" />
                    <Text style={[styles.actionBtnText, { color: '#0EA5E9' }]}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.editBtn]}>
                    <Edit3 size={12} color="#8B5CF6" />
                    <Text style={[styles.actionBtnText, { color: '#8B5CF6' }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]}>
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
    backgroundColor: '#FFFFFF', 
    borderRadius: 14, 
    paddingHorizontal: 12, 
    height: 44, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5, 
    elevation: 2 
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 13, color: '#1E293B', fontWeight: '500' },
  filterBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 14, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5, 
    elevation: 2 
  },
  sectionHeader: { marginBottom: 16, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  sectionSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  list: { gap: 12 },
  card: { 
    flexDirection: 'row', 
    padding: 12, 
    borderRadius: 24, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  dateBlock: { 
    width: 58, 
    height: 65, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    justifyContent: 'center', 
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  dateMonth: { fontSize: 10, fontWeight: '800', color: '#64748B', textTransform: 'uppercase' },
  dateDay: { fontSize: 20, fontWeight: '900', color: '#1E293B', marginTop: -2 },
  dateLine: { width: 12, height: 2, backgroundColor: '#0EA5E9', marginTop: 2, borderRadius: 1 },
  cardMain: { flex: 1, paddingLeft: 14, paddingRight: 10 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: '#F1F5F9' },
  categoryText: { fontSize: 9, fontWeight: '800', color: '#64748B', textTransform: 'uppercase' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  statusDot: { width: 4, height: 4, borderRadius: 2 },
  statusText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },
  activityTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  creatorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  creatorAvatar: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  creatorName: { fontSize: 10, color: '#94A3B8', fontWeight: '700' },
  actionsColumn: { paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: '#F1F5F9', gap: 6, justifyContent: 'center' },
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
  viewBtn: { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' },
  editBtn: { backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' },
  deleteBtn: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
});
 