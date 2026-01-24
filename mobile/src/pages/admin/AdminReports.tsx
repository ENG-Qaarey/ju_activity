import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FileText, Download, BarChart3, PieChart, Users, Activity, ChevronRight, Calendar, Share2, TrendingUp, ArrowUpRight, Clock, FileCheck } from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

const screenWidth = Dimensions.get('window').width;

export default function AdminReports() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [activeFilter, setActiveFilter] = useState('30 Days');

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Reports</ThemedText>
                <ThemedText style={styles.subtitle}>Analytics & System Insights</ThemedText>
            </View>
            <TouchableOpacity style={[styles.configBtn, { backgroundColor: theme.card }]}>
                <Share2 size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </View>

        {/* Date Filters */}
        <View style={styles.filterRow}>
            {['7 Days', '30 Days', '3 Months', 'YTD'].map((filter) => (
                <TouchableOpacity 
                    key={filter} 
                    style={[
                        styles.filterPill, 
                        activeFilter === filter ? { backgroundColor: theme.primary } : { backgroundColor: theme.card }
                    ]}
                    onPress={() => setActiveFilter(filter)}
                >
                    <Text style={[
                        styles.filterText, 
                        activeFilter === filter ? { color: '#FFFFFF' } : { color: theme.textSecondary }
                    ]}>{filter}</Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* KPI Grid */}
        <View style={styles.kpiGrid}>
            <KPICard 
                label="Total Users" 
                value="2,405" 
                trend="+12%" 
                icon={Users} 
                color="#0EA5E9" 
                theme={theme} 
            />
            <KPICard 
                label="New Events" 
                value="48" 
                trend="+5%" 
                icon={Calendar} 
                color="#8B5CF6" 
                theme={theme} 
            />
            <KPICard 
                label="Engagement" 
                value="88%" 
                trend="+2%" 
                icon={Activity} 
                color="#22C55E" 
                theme={theme} 
            />
        </View>

        {/* Premium Chart Area */}
        <View style={styles.chartArea}>
            <GlassCard style={[styles.mainChart, { backgroundColor: theme.card }]}>
                <View style={styles.chartHeader}>
                    <View style={styles.chartTitleBox}>
                        <TrendingUp size={20} color={theme.primary} />
                        <Text style={[styles.chartTitle, { color: theme.text }]}>User Engagement</Text>
                    </View>
                    <View style={[styles.trendBadge, { backgroundColor: '#ECFDF5' }]}>
                        <ArrowUpRight size={14} color="#059669" />
                        <Text style={styles.trendText}>+24.5%</Text>
                    </View>
                </View>
                
                <View style={styles.chartContainer}>
                    <PremiumLineChart theme={theme} />
                </View>

                <View style={styles.chartLabels}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <Text key={i} style={[styles.cl, { color: i === 4 ? theme.text : theme.textSecondary, fontWeight: i === 4 ? '800' : '600' }]}>{day}</Text>
                    ))}
                </View>
            </GlassCard>
        </View>

        {/* Available Reports */}
        <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Generated Reports</ThemedText>
            <TouchableOpacity>
                <Text style={[styles.seeAll, { color: theme.primary }]}>See All</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.reportsList}>
            <ReportItem 
                title="Monthly User Activity" 
                desc="Comprehensive log of all user sessions" 
                date="Today, 10:00 AM"
                size="2.4 MB" 
                format="PDF"
                icon={FileText}
                color="#0EA5E9"
                theme={theme}
            />
            <ReportItem 
                title="Event Attendance Audit" 
                desc="Verified check-ins for all departments" 
                date="Yesterday, 4:30 PM"
                size="1.1 MB" 
                format="XLSX"
                icon={FileCheck}
                color="#8B5CF6"
                theme={theme}
            />
            <ReportItem 
                title="System Performance Log" 
                desc="Server latency and error tracking" 
                date="Jan 20, 2026"
                size="540 KB" 
                format="CSV"
                icon={Activity}
                color="#F59E0B"
                theme={theme}
            />
        </View>

        {/* Schedule Export */}
        <GlassCard style={[styles.scheduleCard, { backgroundColor: theme.card }]}>
            <View style={styles.scheduleLeft}>
                <View style={[styles.schedIcon, { backgroundColor: theme.primary + '15' }]}>
                    <Clock size={20} color={theme.primary} />
                </View>
                <View>
                    <Text style={[styles.schedTitle, { color: theme.text }]}>Auto-Export Schedule</Text>
                    <Text style={[styles.schedSub, { color: theme.textSecondary }]}>Weekly summary sent to admin@ju.edu</Text>
                </View>
            </View>
            <TouchableOpacity>
                <ChevronRight size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

function PremiumLineChart({ theme }: any) {
    const chartColor = '#0EA5E9';
    // Simplified SVG Path for a smooth curve
    // In a real app, this would be dynamic based on data
    const d = "M0,80 C30,75 40,60 70,50 S110,70 140,40 S190,10 240,30 S290,60 340,40 V150 H0 Z";
    const line = "M0,80 C30,75 40,60 70,50 S110,70 140,40 S190,10 240,30 S290,60 340,40";

    return (
        <Svg height="100%" width="100%" viewBox="0 0 340 120" style={{ overflow: 'visible' }}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={chartColor} stopOpacity="0.4" />
                    <Stop offset="1" stopColor={chartColor} stopOpacity="0" />
                </LinearGradient>
            </Defs>
            <Path d={d} fill="url(#grad)" />
            <Path d={line} fill="none" stroke={chartColor} strokeWidth="3" strokeLinecap="round" />
            {/* Data Points */}
            <Path d="M140,40" stroke="#FFFFFF" strokeWidth="2" fill={chartColor} transform="scale(1)" /> 
            {/* We can simulate a dot with a circle logic if needed, but keeping it simple for now */}
        </Svg>
    );
}

function KPICard({ label, value, trend, icon: Icon, color, theme }: any) {
    return (
        <GlassCard style={[styles.kpiCard, { backgroundColor: theme.card }]}>
            <View style={styles.kpiTop}>
                <View style={[styles.kpiIcon, { backgroundColor: color + '15' }]}>
                    <Icon size={16} color={color} />
                </View>
                <Text style={[styles.kpiTrend, { color: '#22C55E' }]}>{trend}</Text>
            </View>
            <Text style={[styles.kpiVal, { color: theme.text }]}>{value}</Text>
            <Text style={[styles.kpiLabel, { color: theme.textSecondary }]}>{label}</Text>
        </GlassCard>
    );
}

function ReportItem({ title, desc, date, size, format, icon: Icon, color, theme }: any) {
    return (
        <GlassCard style={[styles.reportCard, { backgroundColor: theme.card }]}>
            <View style={styles.reportContent}>
                <View style={[styles.rIconBg, { backgroundColor: color + '10' }]}>
                    <Icon size={22} color={color} />
                    <View style={[styles.formatBadge, { backgroundColor: color }]}>
                        <Text style={styles.formatText}>{format}</Text>
                    </View>
                </View>
                <View style={styles.rInfo}>
                    <Text style={[styles.rTitle, { color: theme.text }]} numberOfLines={1}>{title}</Text>
                    <Text style={[styles.rDesc, { color: theme.textSecondary }]} numberOfLines={1}>{desc}</Text>
                    <View style={styles.rMeta}>
                        <Text style={[styles.rDate, { color: theme.textSecondary }]}>{date}</Text>
                        <View style={[styles.dot, { backgroundColor: theme.border }]} />
                        <Text style={[styles.rSize, { color: theme.textSecondary }]}>{size}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: theme.background }]}>
                <Download size={18} color={theme.textSecondary} />
            </TouchableOpacity>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900' },
  subtitle: { fontSize: 13, marginTop: 2 },
  configBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 24, flexWrap: 'wrap' },
  filterPill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  filterText: { fontSize: 12, fontWeight: '700' },

  kpiGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  kpiCard: { flex: 1, padding: 12, borderRadius: 16 },
  kpiTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  kpiTrend: { fontSize: 11, fontWeight: '800' },
  kpiVal: { fontSize: 20, fontWeight: '900', marginBottom: 2 },
  kpiLabel: { fontSize: 11, fontWeight: '600' },

  chartArea: { marginBottom: 32 },
  mainChart: { padding: 0, overflow: 'hidden', paddingBottom: 16 },
  chartHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingBottom: 0 },
  chartTitleBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chartTitle: { fontSize: 16, fontWeight: '800' },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  trendText: { fontSize: 11, fontWeight: '800', color: '#059669' },
  chartContainer: { height: 140, marginTop: 10 },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, paddingHorizontal: 16 },
  cl: { fontSize: 11, fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  seeAll: { fontSize: 12, fontWeight: '700' },
  
  reportsList: { gap: 12 },
  reportCard: { padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reportContent: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 14 },
  rIconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  formatBadge: { position: 'absolute', bottom: -4, paddingHorizontal: 4, borderRadius: 4, borderWidth: 2, borderColor: '#FFFFFF' },
  formatText: { fontSize: 8, fontWeight: '900', color: '#FFFFFF' },
  rInfo: { flex: 1 },
  rTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  rDesc: { fontSize: 11, marginBottom: 6 },
  rMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rDate: { fontSize: 10, fontWeight: '600' },
  dot: { width: 3, height: 3, borderRadius: 1.5 },
  rSize: { fontSize: 10, fontWeight: '600' },
  downloadBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  scheduleCard: { padding: 16, marginTop: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scheduleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  schedIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  schedTitle: { fontSize: 14, fontWeight: '700' },
  schedSub: { fontSize: 11, marginTop: 2 },
});
