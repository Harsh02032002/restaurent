import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal, Switch, Alert } from 'react-native';
import { Tag, Plus, Edit2, Trash2, X, Percent, DollarSign, Calendar, Users, Activity, TrendingUp } from 'lucide-react-native';

const COLORS = {
  primary: '#0F766E', // Calming Teal
  primaryLight: '#F0FDFA',
  accent: '#0D9488',
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  textPrimary: '#334155',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  white: '#FFFFFF',
  warning: '#F59E0B',
  danger: '#EF4444',
  vegGreen: '#10B981',
  dangerLight: '#FEE2E2',
};

const s = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  flexBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.5 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: 'transparent' },
  tabActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  tabInactive: { backgroundColor: COLORS.white, borderColor: COLORS.border },
  tabTxtActive: { color: COLORS.primary, fontWeight: '800', fontSize: 13 },
  tabTxtInactive: { color: COLORS.textSecondary, fontWeight: '600', fontSize: 13 },
  btnPrimary: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center', flex: 1 },
  btnSecondary: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, paddingVertical: 12, borderRadius: 12, alignItems: 'center', flex: 1 },
  input: { backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: COLORS.textPrimary, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 6, marginLeft: 4 },
});

export const OffersHeader = ({ offers, onAddPress }: any) => {
  const activeCount = offers.filter((o: any) => o.status === 'ACTIVE').length;
  const scheduledCount = offers.filter((o: any) => o.status === 'SCHEDULED').length;
  const expiredCount = offers.filter((o: any) => o.status === 'EXPIRED').length;
  const totalRedemptions = offers.reduce((sum: number, o: any) => sum + (o.redemptions || 0), 0);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={[s.flexBetween, { marginBottom: 16 }]}>
        <View>
          <Text style={s.title}>Offers & Coupons</Text>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2, fontWeight: '600' }}>Manage promotions to attract customers</Text>
        </View>
        <TouchableOpacity 
          style={[s.flexRow, { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 }]}
          onPress={onAddPress}
        >
          <Plus size={16} color={COLORS.white} />
          <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 13, marginLeft: 6 }}>Create</Text>
        </TouchableOpacity>
      </View>

      <View style={[s.flexBetween, { backgroundColor: COLORS.cardBackground, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderLight }]}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.vegGreen }}>{activeCount}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Active</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.warning }}>{scheduledCount}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Scheduled</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>{totalRedemptions}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Redemptions</Text>
        </View>
      </View>
    </View>
  );
};

export const OfferCard = ({ offer, onEdit, onDelete }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return { bg: '#ECFDF5', text: '#059669' };
      case 'SCHEDULED': return { bg: '#FEF3C7', text: '#D97706' };
      case 'EXPIRED': return { bg: COLORS.background, text: COLORS.textSecondary };
      case 'PAUSED': return { bg: '#F3E8FF', text: '#7E22CE' };
      default: return { bg: COLORS.background, text: COLORS.textPrimary };
    }
  };
  const statusColors = getStatusColor(offer.status);

  return (
    <View style={s.card}>
      <View style={s.flexBetween}>
        <View style={[s.flexRow, { backgroundColor: '#F8FAFC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed' }]}>
          <Tag size={14} color={COLORS.primary} />
          <Text style={{ fontSize: 15, fontWeight: '900', color: COLORS.textPrimary, marginLeft: 8, letterSpacing: 1 }}>{offer.code}</Text>
        </View>
        <View style={[s.flexRow, { backgroundColor: statusColors.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }]}>
          <Text style={{ fontSize: 11, fontWeight: '800', color: statusColors.text }}>{offer.status}</Text>
        </View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, marginTop: 16 }}>{offer.title}</Text>
      
      <View style={[s.flexRow, { marginTop: 12, gap: 16 }]}>
        <View style={s.flexRow}>
          <DollarSign size={14} color={COLORS.textMuted} />
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginLeft: 4, fontWeight: '600' }}>Min ₹{offer.minimumOrder}</Text>
        </View>
        <View style={s.flexRow}>
          <TrendingUp size={14} color={COLORS.textMuted} />
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginLeft: 4, fontWeight: '600' }}>Max ₹{offer.maximumDiscount}</Text>
        </View>
      </View>

      <View style={[s.flexRow, { marginTop: 8, gap: 16 }]}>
        <View style={s.flexRow}>
          <Calendar size={14} color={COLORS.textMuted} />
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginLeft: 4, fontWeight: '600' }}>Valid till {offer.endDate}</Text>
        </View>
        <View style={s.flexRow}>
          <Users size={14} color={COLORS.textMuted} />
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginLeft: 4, fontWeight: '600' }}>Used {offer.redemptions} / {offer.maxRedemptions}</Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: COLORS.borderLight, marginVertical: 16 }} />

      <View style={s.flexBetween}>
        <View>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' }}>Performance</Text>
          <Text style={{ fontSize: 14, fontWeight: '800', color: COLORS.textPrimary, marginTop: 2 }}>₹{offer.revenueGenerated || 0} revenue</Text>
        </View>

        <View style={s.flexRow}>
          <TouchableOpacity 
            style={[s.flexRow, { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: COLORS.background, borderRadius: 8, marginRight: 8 }]}
            onPress={() => onEdit(offer)}
          >
            <Edit2 size={12} color={COLORS.textPrimary} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, marginLeft: 4 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[s.flexRow, { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#FEF2F2', borderRadius: 8 }]}
            onPress={() => onDelete(offer.id)}
          >
            <Trash2 size={12} color={COLORS.danger} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.danger, marginLeft: 4 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const OfferFormModal = ({ visible, onClose, onSave, offer }: any) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxRedemptions, setMaxRedemptions] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  React.useEffect(() => {
    if (offer && visible) {
      setCode(offer.code || '');
      setTitle(offer.title || '');
      setDiscountType(offer.discountType || 'percentage');
      setDiscountValue(offer.discountValue ? offer.discountValue.toString() : '');
      setMinOrder(offer.minimumOrder ? offer.minimumOrder.toString() : '');
      setMaxDiscount(offer.maximumDiscount ? offer.maximumDiscount.toString() : '');
      setEndDate(offer.endDate || '');
      setMaxRedemptions(offer.maxRedemptions ? offer.maxRedemptions.toString() : '');
      setStatus(offer.status || 'ACTIVE');
    } else if (visible) {
      setCode('');
      setTitle('');
      setDiscountType('percentage');
      setDiscountValue('');
      setMinOrder('');
      setMaxDiscount('');
      setEndDate('30 Nov 2026');
      setMaxRedemptions('100');
      setStatus('ACTIVE');
    }
  }, [offer, visible]);

  const handleSave = () => {
    if (!code.trim() || !title.trim() || !discountValue) {
      Alert.alert('Validation Error', 'Code, title, and discount value are required.');
      return;
    }
    
    const savedOffer = {
      id: offer ? offer.id : `off-${Date.now()}`,
      code: code.trim().toUpperCase(),
      title: title.trim(),
      discountType,
      discountValue: parseFloat(discountValue) || 0,
      minimumOrder: parseFloat(minOrder) || 0,
      maximumDiscount: parseFloat(maxDiscount) || 0,
      startDate: offer ? offer.startDate : new Date().toISOString().split('T')[0],
      endDate: endDate,
      maxRedemptions: parseInt(maxRedemptions) || 100,
      redemptions: offer ? offer.redemptions : 0,
      revenueGenerated: offer ? offer.revenueGenerated : 0,
      status: status,
      applicableItems: 'all'
    };
    
    onSave(savedOffer);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={[s.flexBetween, { padding: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight }]}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>
            {offer ? 'Edit Offer' : 'Create Offer'}
          </Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 8, backgroundColor: COLORS.borderLight, borderRadius: 16 }}>
            <X size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={s.flexRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={s.label}>Coupon Code *</Text>
              <TextInput style={[s.input, { textTransform: 'uppercase', fontWeight: '800' }]} placeholder="e.g. FIRST50" value={code} onChangeText={setCode} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={s.label}>Status</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                {['ACTIVE', 'PAUSED'].map((st) => (
                  <TouchableOpacity key={st} style={[s.tab, status === st ? s.tabActive : s.tabInactive, { paddingVertical: 10 }]} onPress={() => setStatus(st)}>
                    <Text style={status === st ? s.tabTxtActive : s.tabTxtInactive}>{st}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <Text style={s.label}>Offer Title *</Text>
          <TextInput style={s.input} placeholder="e.g. 50% OFF on First Order" value={title} onChangeText={setTitle} />

          <View style={s.flexRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={s.label}>Discount Value *</Text>
              <TextInput style={s.input} placeholder="50" keyboardType="numeric" value={discountValue} onChangeText={setDiscountValue} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={s.label}>Type</Text>
              <View style={[s.flexRow, { marginBottom: 16 }]}>
                <TouchableOpacity style={[s.tab, discountType === 'percentage' ? s.tabActive : s.tabInactive, { paddingVertical: 10, flex: 1, marginRight: 4, alignItems: 'center' }]} onPress={() => setDiscountType('percentage')}>
                  <Text style={discountType === 'percentage' ? s.tabTxtActive : s.tabTxtInactive}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.tab, discountType === 'flat' ? s.tabActive : s.tabInactive, { paddingVertical: 10, flex: 1, marginLeft: 4, marginRight: 0, alignItems: 'center' }]} onPress={() => setDiscountType('flat')}>
                  <Text style={discountType === 'flat' ? s.tabTxtActive : s.tabTxtInactive}>Flat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={s.flexRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={s.label}>Min Order (₹)</Text>
              <TextInput style={s.input} placeholder="199" keyboardType="numeric" value={minOrder} onChangeText={setMinOrder} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={s.label}>Max Discount (₹)</Text>
              <TextInput style={s.input} placeholder="120" keyboardType="numeric" value={maxDiscount} onChangeText={setMaxDiscount} />
            </View>
          </View>

          <View style={s.flexRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={s.label}>Valid Until</Text>
              <TextInput style={s.input} placeholder="30 Nov 2026" value={endDate} onChangeText={setEndDate} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={s.label}>Max Redemptions</Text>
              <TextInput style={s.input} placeholder="100" keyboardType="numeric" value={maxRedemptions} onChangeText={setMaxRedemptions} />
            </View>
          </View>
        </ScrollView>
        <View style={[s.flexRow, { padding: 16, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.borderLight, gap: 12 }]}>
          <TouchableOpacity style={s.btnSecondary} onPress={onClose}>
            <Text style={{ color: COLORS.textPrimary, fontWeight: '700', fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnPrimary} onPress={handleSave}>
            <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 15 }}>{offer ? 'Update Offer' : 'Create Offer'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const EmptyOffersState = ({ tab }: any) => (
  <View style={{ alignItems: 'center', paddingVertical: 60 }}>
    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
      <Tag size={28} color={COLORS.textMuted} />
    </View>
    <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.textPrimary }}>No {tab !== 'All' ? tab : ''} Offers Found</Text>
    <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center', maxWidth: 220, lineHeight: 18 }}>
      You don't have any {tab.toLowerCase()} offers currently. Create one to attract more customers.
    </Text>
  </View>
);

export const OffersScreen = () => {
  const [offers, setOffers] = useState([
    {
      id: '1',
      code: 'FIRST50',
      title: '50% OFF on First Order',
      discountType: 'percentage',
      discountValue: 50,
      minimumOrder: 199,
      maximumDiscount: 120,
      startDate: '2026-10-01',
      endDate: '30 Oct 2026',
      maxRedemptions: 100,
      redemptions: 42,
      revenueGenerated: 14500,
      status: 'ACTIVE',
      applicableItems: 'all'
    },
    {
      id: '2',
      code: 'WELCOME100',
      title: 'Flat ₹100 Discount',
      discountType: 'flat',
      discountValue: 100,
      minimumOrder: 399,
      maximumDiscount: 100,
      startDate: '2026-10-01',
      endDate: '15 Nov 2026',
      maxRedemptions: 200,
      redemptions: 110,
      revenueGenerated: 56000,
      status: 'ACTIVE',
      applicableItems: 'all'
    },
    {
      id: '3',
      code: 'DIWALI20',
      title: '20% OFF Festive Special',
      discountType: 'percentage',
      discountValue: 20,
      minimumOrder: 499,
      maximumDiscount: 200,
      startDate: '2026-11-01',
      endDate: '15 Nov 2026',
      maxRedemptions: 500,
      redemptions: 0,
      revenueGenerated: 0,
      status: 'SCHEDULED',
      applicableItems: 'all'
    },
    {
      id: '4',
      code: 'SUMMER30',
      title: '30% OFF Summer Splash',
      discountType: 'percentage',
      discountValue: 30,
      minimumOrder: 149,
      maximumDiscount: 75,
      startDate: '2026-05-01',
      endDate: '31 May 2026',
      maxRedemptions: 300,
      redemptions: 300,
      revenueGenerated: 28000,
      status: 'EXPIRED',
      applicableItems: 'all'
    }
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState<any>(null);
  const tabs = ['All', 'Active', 'Scheduled', 'Expired', 'Paused'];

  const filteredOffers = offers.filter((o: any) => {
    return activeTab === 'All' || o.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (offer: any) => {
    setEditingOffer(offer);
    setModalVisible(true);
  };

  const handleSaveOffer = (offer: any) => {
    setOffers((prev: any) => {
      const exists = prev.find((o: any) => o.id === offer.id);
      if (exists) {
        return prev.map((o: any) => o.id === offer.id ? offer : o);
      } else {
        return [offer, ...prev];
      }
    });
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Offer",
      "Are you sure you want to delete this offer? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setOffers((prev: any) => prev.filter((o: any) => o.id !== id));
          } 
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <OffersHeader offers={offers} onAddPress={handleOpenAdd} />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[s.tab, activeTab === tab ? s.tabActive : s.tabInactive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={activeTab === tab ? s.tabTxtActive : s.tabTxtInactive}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer: any) => (
            <OfferCard 
              key={offer.id} 
              offer={offer} 
              onEdit={handleOpenEdit} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <EmptyOffersState tab={activeTab} />
        )}
      </ScrollView>

      <OfferFormModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSave={handleSaveOffer} 
        offer={editingOffer}
      />
    </View>
  );
};
