import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Download, BarChart3, PieChart, Users, Activity, ChevronRight, Calendar, Share2 } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { ThemedText } from '@/src/components/themed-text';

export default function AdminReports() {
  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <ThemedText style={styles.title}>Reports</ThemedText>
                <ThemedText style={styles.subtitle}>Data insights and exports</ThemedText>
            </View>
            <TouchableOpacity style={styles.configBtn}>
                <Share2 size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Global Summary Charts Placeholder */}
        <View style={styles.chartArea}>
            <GlassCard style={styles.mainChart}>
                <View style={styles.chartHeader}>
                    <BarChart3 size={20} color="#0EA5E9" />
                    <Text style={styles.chartTitle}>Monthly Engagement</Text>
                </View>
                {/* Visual Placeholder for a Chart */}
                <View style={styles.chartViz}>
                    <View style={[styles.bar, { height: '40%' }]} />
                    <View style={[styles.bar, { height: '60%' }]} />
                    <View style={[styles.bar, { height: '90%', backgroundColor: '#0EA5E9' }]} />
                    <View style={[styles.bar, { height: '70%' }]} />
                    <View style={[styles.bar, { height: '50%' }]} />
                    <View style={[styles.bar, { height: '80%' }]} />
                </View>
                <View style={styles.chartLabels}>
                    <Text style={styles.cl}>Aug</Text>
                    <Text style={styles.cl}>Sep</Text>
                    <Text style={[styles.cl, { color: '#1E293B', fontWeight: '800' }]}>Oct</Text>
                    <Text style={styles.cl}>Nov</Text>
                    <Text style={styles.cl}>Dec</Text>
                    <Text style={styles.cl}>Jan</Text>
                </View>
            </GlassCard>
        </View>

        {/* Available Reports */}
        <ThemedText style={styles.sectionTitle}>Available Reports</ThemedText>
        <ReportItem 
            title="User Activity Summary" 
            desc="Detailed breakdown of logins and actions" 
            format="PDF • 2.4 MB" 
            icon={Users}
            color="#0EA5E9"
        />
        <ReportItem 
            title="Event Participation" 
            desc="Registration and attendance metrics" 
            format="XLSX • 1.1 MB" 
            icon={Activity}
            color="#8B5CF6"
        />
        <ReportItem 
            title="System Performance" 
            desc="Server uptime and resource usage logs" 
            format="CSV • 540 KB" 
            icon={BarChart3}
            color="#F59E0B"
        />

        {/* Schedule Export */}
        <GlassCard style={styles.scheduleCard}>
            <Calendar size={24} color="#0EA5E9" />
            <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.schedTitle}>Scheduled Reports</Text>
                <Text style={styles.schedSub}>Weekly summary sent to admin@ju.edu</Text>
            </View>
            <TouchableOpacity><ChevronRight size={20} color="#CBD5E1" /></TouchableOpacity>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
}

function ReportItem({ title, desc, format, icon: Icon, color }: any) {
    return (
        <GlassCard style={styles.reportCard}>
            <View style={styles.reportLeft}>
                <View style={[styles.rIconBg, { backgroundColor: color + '10' }]}>
                    <Icon size={22} color={color} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.rTitle}>{title}</Text>
                    <Text style={styles.rDesc}>{desc}</Text>
                    <Text style={styles.rFormat}>{format}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.downloadBtn}>
                <Download size={20} color="#64748B" />
            </TouchableOpacity>
        </GlassCard>
    )
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 40, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '900', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  configBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  chartArea: { marginBottom: 32 },
  mainChart: { padding: 16 },
  chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
  chartTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  chartViz: { height: 120, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 10 },
  bar: { width: '12%', backgroundColor: '#E2E8F0', borderRadius: 6 },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 5 },
  cl: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#64748B', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  reportCard: { padding: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reportLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 16 },
  rIconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  rTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  rDesc: { fontSize: 12, color: '#64748B', marginTop: 2 },
  rFormat: { fontSize: 11, fontWeight: '700', color: '#94A3B8', marginTop: 6 },
  downloadBtn: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  scheduleCard: { padding: 16, marginTop: 16, flexDirection: 'row', alignItems: 'center' },
  schedTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  schedSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
});
