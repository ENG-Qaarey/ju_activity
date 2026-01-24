import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { ShieldCheck, FileText, Calendar, Clock, MapPin, Users, ChevronDown, Rocket, X, Check, Trash2, RefreshCw } from 'lucide-react-native';
import { GradientBackground } from '@/src/components/GradientBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { JuInput } from '@/src/components/JuInput';
import { JuButton } from '@/src/components/JuButton';
import { useRouter } from 'expo-router';

const CATEGORIES = ['Workshop', 'Seminar', 'Tech Talk', 'Innovation Forum', 'Networking', 'Make-up Session'];
const COORDINATORS = ['Dr. Ahmed Ali', 'Prof. Sarah Smith', 'Mr. John Doe', 'Dr. Mary Johnson'];

export default function AdminCreateActivity() {
  const router = useRouter();
  
  // Form State
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: '',
    coordinator: '',
    date: '',
    time: '',
    location: '',
    capacity: ''
  });

  // Calendar State
  const [viewingDate, setViewingDate] = React.useState(new Date(2026, 0, 1));
  const [showYearPicker, setShowYearPicker] = React.useState(false);

  // Modal State
  const [modalType, setModalType] = React.useState<'category' | 'coordinator' | 'date' | 'time' | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCapacityChange = (text: string) => {
    // Only allow numbers
    const cleanText = text.replace(/[^0-9]/g, '');
    updateField('capacity', cleanText);
  };

  const renderPickerModal = () => {
    if (modalType === 'date') return renderDateModal();
    if (modalType === 'time') return renderTimeModal();

    const isCategory = modalType === 'category';
    const data = isCategory ? CATEGORIES : COORDINATORS;
    const title = isCategory ? 'Select Category' : 'Assign Coordinator';
    const field = isCategory ? 'category' : 'coordinator';

    if (!modalType) return null;

    return (
      <Modal
        visible={modalType === 'category' || modalType === 'coordinator'}
        transparent
        animationType="fade"
        onRequestClose={() => setModalType(null)}
      >
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={() => setModalType(null)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => {
                    updateField(field, item);
                    setModalType(null);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    formData[field] === item && styles.modalItemTextSelected
                  ]}>{item}</Text>
                  {formData[field] === item && <Check size={18} color="#3B82F6" />}
                </TouchableOpacity>
              )}
            />
          </GlassCard>
        </View>
      </Modal>
    );
  };

  const renderDateModal = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const viewYear = viewingDate.getFullYear();
    const viewMonth = viewingDate.getMonth();
    
    // Calculate days in month
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
    
    // Previous month filler days
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
    const prevMonthFillers = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1);
    
    // Current month days
    const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Next month filler days (fill up to 42 cells for 6 weeks)
    const totalFilled = prevMonthFillers.length + currentDays.length;
    const nextMonthFillers = Array.from({ length: 42 - totalFilled }, (_, i) => i + 1);

    const changeMonth = (offset: number) => {
      setViewingDate(new Date(viewYear, viewMonth + offset, 1));
    };

    const jumpToToday = () => {
      const today = new Date();
      setViewingDate(new Date(today.getFullYear(), today.getMonth(), 1));
      const d = today.getDate();
      const m = today.getMonth() + 1;
      updateField('date', `${m < 10 ? '0'+m : m}/${d < 10 ? '0'+d : d}/${today.getFullYear()}`);
    };

    if (showYearPicker) return renderYearPicker();

    return (
      <Modal visible transparent animationType="fade" onRequestClose={() => setModalType(null)}>
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.premiumCalendarCard}>
            {/* High-End Header */}
            <View style={styles.premiumCalHeader}>
                <TouchableOpacity style={styles.premiumMonthSelector} onPress={() => setShowYearPicker(true)}>
                    <Text style={styles.premiumMonthText}>{monthNames[viewMonth]} {viewYear}</Text>
                    <ChevronDown size={14} color="#1A73E8" />
                </TouchableOpacity>
                <View style={styles.navControls}>
                    <TouchableOpacity style={styles.navBtn} onPress={() => changeMonth(-1)}>
                        <Text style={styles.navArrow}>↑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBtn} onPress={() => changeMonth(1)}>
                        <Text style={styles.navArrow}>↓</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Polished Weekdays */}
            <View style={styles.premiumWeekdayRow}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd, i) => (
                    <Text key={i} style={styles.premiumWeekdayText}>{wd}</Text>
                ))}
            </View>

            {/* Premium Grid */}
            <View style={styles.premiumGrid}>
                {prevMonthFillers.map(day => (
                    <View key={`prev-${day}`} style={styles.premiumDay}>
                        <Text style={styles.premiumDayFillerText}>{day}</Text>
                    </View>
                ))}
                {currentDays.map(day => {
                    const dStr = day < 10 ? `0${day}` : `${day}`;
                    const mStr = (viewMonth + 1) < 10 ? `0${viewMonth + 1}` : `${viewMonth + 1}`;
                    const dateStr = `${mStr}/${dStr}/${viewYear}`;
                    const isSelected = formData.date === dateStr;
                    return (
                        <TouchableOpacity 
                            key={day} 
                            style={[styles.premiumDay, isSelected && styles.premiumDaySelected]}
                            onPress={() => {
                                updateField('date', dateStr);
                                setModalType(null);
                            }}
                        >
                            <Text style={[styles.premiumDayText, isSelected && styles.premiumDayTextSelected]}>{day}</Text>
                        </TouchableOpacity>
                    );
                })}
                {nextMonthFillers.map(day => (
                    <View key={`next-${day}`} style={styles.premiumDay}>
                        <Text style={styles.premiumDayFillerText}>{day}</Text>
                    </View>
                ))}
            </View>

            {/* Smart Footer */}
            <View style={styles.premiumCalFooter}>
                <TouchableOpacity style={styles.footerAction} onPress={() => { updateField('date', ''); setModalType(null); }}>
                    <Trash2 size={16} color="#EF4444" />
                    <Text style={[styles.footerActionText, { color: '#EF4444' }]}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerAction} onPress={() => { jumpToToday(); setModalType(null); }}>
                    <RefreshCw size={16} color="#1A73E8" />
                    <Text style={styles.footerActionText}>Today</Text>
                </TouchableOpacity>
            </View>
          </GlassCard>
        </View>
      </Modal>
    );
  };

  const renderYearPicker = () => {
    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const viewYear = viewingDate.getFullYear();
    const viewMonth = viewingDate.getMonth();
    
    return (
      <Modal visible transparent animationType="fade" onRequestClose={() => setShowYearPicker(false)}>
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.premiumPickerCard}>
            <View style={styles.premiumPickerHeader}>
                <Text style={styles.premiumPickerTitle}>Jump to Date</Text>
                <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                    <X size={20} color="#64748B" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.pickerScroll}>
                {years.map(y => (
                    <View key={y}>
                        <TouchableOpacity 
                            style={[styles.pickerYearItem, viewYear === y && styles.pickerYearItemActive]}
                            onPress={() => setViewingDate(new Date(y, viewMonth, 1))}
                        >
                            <Text style={[styles.pickerYearText, viewYear === y && styles.pickerYearTextSelected]}>{y}</Text>
                            {viewYear === y && <Check size={16} color="#1A73E8" />}
                        </TouchableOpacity>

                        {viewYear === y && (
                            <View style={styles.pickerMonthGrid}>
                                {months.map((m, i) => (
                                    <TouchableOpacity 
                                        key={m} 
                                        style={[styles.pickerMonthBtn, viewMonth === i && styles.pickerMonthBtnSelected]}
                                        onPress={() => {
                                            setViewingDate(new Date(y, i, 1));
                                            setShowYearPicker(false);
                                        }}
                                    >
                                        <Text style={[styles.pickerMonthText, viewMonth === i && styles.pickerMonthTextSelected]}>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        <View style={styles.pickerDivider} />
                    </View>
                ))}
            </ScrollView>
          </GlassCard>
        </View>
      </Modal>
    );
  };

  const renderTimeModal = () => {
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const mins = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const periods = ['AM', 'PM'];

    const currentHour = formData.time.split(':')[0] || '09';
    const currentMin = (formData.time.split(':')[1] || '00').split(' ')[0] || '00';
    const currentPeriod = formData.time.split(' ')[1] || 'PM';

    const TimeColumn = ({ data, selected, onSelect }: any) => (
      <View style={styles.timeColumn}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.timeColumnScroll} 
          contentContainerStyle={styles.timeColumnContent}
        >
          {data.map((item: string) => {
            const isSelected = selected === item;
            return (
              <TouchableOpacity 
                key={item} 
                style={[styles.timeItem, isSelected && styles.timeItemSelected]}
                onPress={() => onSelect(item)}
              >
                <Text style={[styles.timeItemText, isSelected && styles.timeItemTextSelected]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );

    return (
      <Modal visible transparent animationType="fade" onRequestClose={() => setModalType(null)}>
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.premiumTimePickerCard}>
            <View style={styles.premiumPickerHeader}>
                <Text style={styles.premiumPickerTitle}>Select Time</Text>
                <TouchableOpacity onPress={() => setModalType(null)}>
                    <X size={20} color="#64748B" />
                </TouchableOpacity>
            </View>

            <View style={styles.timeColumnsContainer}>
              <TimeColumn 
                data={hours} 
                selected={currentHour} 
                onSelect={(h: string) => updateField('time', `${h}:${currentMin} ${currentPeriod}`)} 
              />
              <TimeColumn 
                data={mins} 
                selected={currentMin} 
                onSelect={(m: string) => updateField('time', `${currentHour}:${m} ${currentPeriod}`)} 
              />
              <TimeColumn 
                data={periods} 
                selected={currentPeriod} 
                onSelect={(p: string) => updateField('time', `${currentHour}:${currentMin} ${p}`)} 
              />
            </View>

            <TouchableOpacity 
              style={styles.confirmBtn}
              onPress={() => setModalType(null)}
            >
              <Text style={styles.confirmBtnText}>Confirm Time</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </Modal>
    );
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        {/* Admin Action Header */}
        <View style={styles.header}>
            <View style={styles.actionTag}>
                <ShieldCheck size={14} color="#64748B" />
                <Text style={styles.actionTagText}>ADMIN ACTION</Text>
            </View>
            <Text style={styles.title}>Publish Strategic Activity</Text>
            <Text style={styles.subtitle}>
                Spin up university-wide workshops, seminars, or urgent make-up sessions without waiting on coordinators.
            </Text>
        </View>

        {/* Form Card */}
        <GlassCard style={styles.card}>
            {/* Blueprint Header */}
            <View style={styles.blueprintHeader}>
                <FileText size={20} color="#3B82F6" />
                <Text style={styles.blueprintTitle}>Activity Blueprint</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
                <View style={styles.textAreaContainer}>
                    <Text style={styles.fieldLabel}>Activity Title *</Text>
                    <TextInput 
                        multiline 
                        numberOfLines={2} 
                        placeholder="e.g. University Innovation Forum" 
                        style={[styles.textArea, { height: 45, borderColor: '#3B82F6' }]}
                        placeholderTextColor="#94A3B8"
                        value={formData.title}
                        onChangeText={(text) => updateField('title', text)}
                    />
                </View>

                <View style={styles.textAreaContainer}>
                    <Text style={styles.fieldLabel}>Description *</Text>
                    <TextInput 
                        multiline 
                        numberOfLines={4} 
                        placeholder="Outline the purpose, speakers, and outcomes for this activity..." 
                        style={styles.textArea}
                        placeholderTextColor="#94A3B8"
                        value={formData.description}
                        onChangeText={(text) => updateField('description', text)}
                    />
                </View>

                {/* Two Column Layouts */}
                <View style={styles.row}>
                    <View style={styles.fieldColumn}>
                        <Text style={styles.fieldLabel}>Category *</Text>
                        <TouchableOpacity 
                          style={styles.selectBtn}
                          onPress={() => setModalType('category')}
                        >
                            <Text style={[styles.selectPlaceholder, formData.category && styles.selectActiveText]}>
                              {formData.category || 'Select category'}
                            </Text>
                            <ChevronDown size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldColumn}>
                        <Text style={styles.fieldLabel}>Assign Coordinator *</Text>
                        <TouchableOpacity 
                          style={styles.selectBtn}
                          onPress={() => setModalType('coordinator')}
                        >
                            <Text style={[styles.selectPlaceholder, formData.coordinator && styles.selectActiveText]}>
                              {formData.coordinator || 'Select coordinator'}
                            </Text>
                            <ChevronDown size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.fieldColumn}>
                        <Text style={styles.fieldLabel}>
                             <Calendar size={13} color="#475569" style={{ marginRight: 4 }} /> Date *
                        </Text>
                        <TouchableOpacity 
                          style={styles.inputWithIcon}
                          onPress={() => setModalType('date')}
                        >
                            <TextInput 
                              placeholder="mm/dd/yyyy" 
                              style={styles.innerInput} 
                              placeholderTextColor="#94A3B8" 
                              value={formData.date}
                              editable={false}
                            />
                            <Calendar size={18} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldColumn}>
                        <Text style={styles.fieldLabel}>
                            <Clock size={13} color="#475569" style={{ marginRight: 4 }} /> Time *
                        </Text>
                        <TouchableOpacity 
                          style={styles.inputWithIcon}
                          onPress={() => setModalType('time')}
                        >
                            <TextInput 
                              placeholder="--:-- --" 
                              style={styles.innerInput} 
                              placeholderTextColor="#94A3B8" 
                              value={formData.time}
                              editable={false}
                            />
                            <Clock size={18} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.fieldColumn}>
                        <Text style={styles.fieldLabel}>
                            <MapPin size={13} color="#475569" style={{ marginRight: 4 }} /> Location *
                        </Text>
                        <TextInput 
                            placeholder="Main Auditorium..." 
                            style={styles.singleLineInput} 
                            placeholderTextColor="#94A3B8" 
                            value={formData.location}
                            onChangeText={(text) => updateField('location', text)}
                        />
                    </View>
                    <View style={styles.fieldColumn}>
                        <Text style={styles.fieldLabel}>
                            <Users size={13} color="#475569" style={{ marginRight: 4 }} /> Capacity *
                        </Text>
                        <TextInput 
                            placeholder="Target" 
                            style={styles.singleLineInput} 
                            placeholderTextColor="#94A3B8" 
                            keyboardType="numeric"
                            value={formData.capacity}
                            onChangeText={handleCapacityChange}
                        />
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity 
                    style={styles.cancelBtn} 
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.publishBtn}
                  onPress={() => {
                    if (!formData.title || !formData.date) {
                      alert('Please fill at least the Title and Date.');
                      return;
                    }
                    console.log('Publishing:', formData);
                    alert('Activity Published Successfully!');
                    router.back();
                  }}
                >
                    <Rocket size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.publishText}>Publish Activity</Text>
                </TouchableOpacity>
            </View>
        </GlassCard>
        </ScrollView>
      </KeyboardAvoidingView>
      {renderPickerModal()}
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 12, paddingTop: 20, paddingBottom: 40 },
  header: { marginBottom: 10 },
  actionTag: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 4 },
  actionTagText: { fontSize: 9, fontWeight: '800', color: '#64748B', letterSpacing: 1 },
  title: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: '#64748B', lineHeight: 18 },
  card: { padding: 14, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.9)' },
  blueprintHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  blueprintTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  form: { gap: 10 },
  textAreaContainer: { width: '100%' },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#475569', marginBottom: 4, marginLeft: 2, flexDirection: 'row', alignItems: 'center' },
  textArea: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 10, height: 70, textAlignVertical: 'top', fontSize: 13, color: '#1E293B', borderWidth: 1, borderColor: '#E2E8F0' },
  row: { flexDirection: 'row', gap: 8 },
  fieldColumn: { flex: 1 },
  selectBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, height: 40, paddingHorizontal: 10 },
  selectPlaceholder: { fontSize: 12, color: '#94A3B8' },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, height: 40, paddingHorizontal: 10 },
  innerInput: { flex: 1, fontSize: 12, color: '#1E293B' },
  singleLineInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, height: 40, paddingHorizontal: 10, fontSize: 12, color: '#1E293B' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 16 },
  cancelBtn: { flex: 1, height: 44, borderRadius: 10, borderWidth: 1.5, borderColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  cancelText: { color: '#3B82F6', fontWeight: '800', fontSize: 13 },
  publishBtn: { flex: 1.2, height: 44, borderRadius: 10, backgroundColor: '#3B82F6', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  publishText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', maxHeight: '60%', padding: 20, borderRadius: 20, backgroundColor: '#FFFFFF' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  modalItemText: { fontSize: 14, color: '#475569', fontWeight: '500' },
  modalItemTextSelected: { color: '#3B82F6', fontWeight: '700' },
  selectActiveText: { color: '#1E293B', fontWeight: '600' },
  modalSub: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
  // Premium Calendar Logic UI
  premiumCalendarCard: { width: 320, padding: 20, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.95)', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  premiumCalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  premiumMonthSelector: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  premiumMonthText: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  navControls: { flexDirection: 'row', gap: 12 },
  navBtn: { width: 32, height: 32, backgroundColor: '#F1F5F9', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  navArrow: { fontSize: 18, color: '#1A73E8', fontWeight: '600' },
  premiumWeekdayRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  premiumWeekdayText: { width: 38, textAlign: 'center', fontSize: 12, fontWeight: '800', color: '#64748B', textTransform: 'uppercase' },
  premiumGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  premiumDay: { width: 38, height: 38, justifyContent: 'center', alignItems: 'center', marginBottom: 6, borderRadius: 10 },
  premiumDaySelected: { backgroundColor: '#1A73E8', shadowColor: '#1A73E8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  premiumDayText: { fontSize: 14, color: '#1E293B', fontWeight: '600' },
  premiumDayTextSelected: { color: '#FFFFFF', fontWeight: '800' },
  premiumDayFillerText: { fontSize: 14, color: '#CBD5E1', fontWeight: '400' },
  premiumCalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, borderTopWidth: 1.5, borderTopColor: '#F1F5F9', paddingTop: 15 },
  footerAction: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5 },
  footerActionText: { fontSize: 14, fontWeight: '800' },
  // Premium Picker Card (Year/Month Jump)
  premiumPickerCard: { width: 300, maxHeight: 400, borderRadius: 24, padding: 0, overflow: 'hidden', backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  premiumPickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  premiumPickerTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  pickerScroll: { flex: 1 },
  pickerYearItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: '#F8FAFC' },
  pickerYearItemActive: { backgroundColor: '#F1F5F9' },
  pickerYearText: { fontSize: 16, color: '#64748B', fontWeight: '700' },
  pickerYearTextSelected: { color: '#1A73E8', fontWeight: '900' },
  pickerMonthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 15, backgroundColor: '#FFFFFF' },
  pickerMonthBtn: { width: '22%', height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  pickerMonthBtnSelected: { backgroundColor: '#1A73E8', borderColor: '#1A73E8' },
  pickerMonthText: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  pickerMonthTextSelected: { color: '#FFFFFF', fontWeight: '800' },
  pickerDivider: { height: 1, backgroundColor: '#F1F5F9' },
  // Premium Time Picker UI
  premiumTimePickerCard: { width: 280, padding: 0, borderRadius: 24, backgroundColor: '#FFFFFF', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  timeColumnsContainer: { flexDirection: 'row', padding: 15, height: 300, gap: 8 },
  timeColumn: { flex: 1 },
  timeColumnScroll: { flex: 1 },
  timeColumnContent: { paddingVertical: 10 },
  timeItem: { paddingVertical: 12, alignItems: 'center', borderRadius: 6, marginBottom: 8 },
  timeItemSelected: { backgroundColor: '#1A73E8', borderWidth: 2, borderColor: '#000' },
  timeItemText: { fontSize: 18, color: '#475569', fontWeight: '500' },
  timeItemTextSelected: { color: '#FFFFFF', fontWeight: '800' },
  // Legacy/Common Picker Styles
  pickerSectionLabel: { fontSize: 11, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 12, marginBottom: 8, marginLeft: 4 },
  pickerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pickerItem: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F1F5F9', minWidth: 45, alignItems: 'center' },
  pickerItemSelected: { backgroundColor: '#3B82F6' },
  pickerItemText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  pickerItemTextSelected: { color: '#FFFFFF' },
  confirmBtn: { backgroundColor: '#3B82F6', borderRadius: 12, height: 44, justifyContent: 'center', alignItems: 'center', margin: 20, marginTop: 0 },
  confirmBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});

