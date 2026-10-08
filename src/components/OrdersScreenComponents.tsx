import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';
import { Search, Filter, Clock, CheckCircle2, AlertCircle, Phone, MapPin, Check, X, ChevronRight, ShoppingBag, Bike } from 'lucide-react-native';

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
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  vegGreen: '#10B981',
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
});

export const OrdersHeader = ({ orders, isOpen }: any) => {
  const newCount = orders.filter((o: any) => o.status === 'new').length;
  const prepCount = orders.filter((o: any) => o.status === 'preparing').length;
  const readyCount = orders.filter((o: any) => o.status === 'ready').length;
  const outCount = orders.filter((o: any) => o.status === 'out_for_delivery').length;

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[s.flexBetween, { marginBottom: 16 }]}>
        <View>
          <Text style={s.title}>Kitchen Orders</Text>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2, fontWeight: '600' }}>{orders.length} Total Orders Today</Text>
        </View>
        <View style={[s.flexRow, { backgroundColor: isOpen ? '#ECFDF5' : '#FEF2F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 }]}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: isOpen ? COLORS.vegGreen : COLORS.danger, marginRight: 6 }} />
          <Text style={{ fontSize: 12, fontWeight: '800', color: isOpen ? '#047857' : '#B91C1C' }}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
        </View>
      </View>

      <View style={[s.flexBetween, { backgroundColor: COLORS.cardBackground, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderLight }]}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#3B82F6' }}>{newCount}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>New</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#D97706' }}>{prepCount}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Preparing</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#059669' }}>{readyCount}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Ready</Text>
        </View>
      </View>
    </View>
  );
};

export const OrderSearch = ({ searchQuery, setSearchQuery, dateFilter, setDateFilter }: any) => {
  const dates = ['Today', 'Yesterday', 'This Week'];
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[s.flexRow, { backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: COLORS.border, marginBottom: 12 }]}>
        <Search size={18} color={COLORS.textMuted} style={{ marginRight: 8 }} />
        <TextInput
          style={{ flex: 1, fontSize: 14, color: COLORS.textPrimary, fontWeight: '500' }}
          placeholder="Search by Order ID or Customer Name"
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date}
            style={[s.tab, dateFilter === date ? s.tabActive : s.tabInactive, { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 }]}
            onPress={() => setDateFilter(date)}
          >
            <Text style={dateFilter === date ? s.tabTxtActive : s.tabTxtInactive}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export const OrderTabs = ({ activeTab, setActiveTab }: any) => {
  const tabs = ['All', 'New', 'Preparing', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled'];
  return (
    <View style={{ marginBottom: 16 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[s.tab, activeTab === tab.toLowerCase().replace(/ /g, '_') ? s.tabActive : s.tabInactive]}
            onPress={() => setActiveTab(tab.toLowerCase().replace(/ /g, '_'))}
          >
            <Text style={activeTab === tab.toLowerCase().replace(/ /g, '_') ? s.tabTxtActive : s.tabTxtInactive}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export const OrderCard = ({ order, updateOrderStatus, onViewDetails }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return { bg: '#EFF6FF', text: '#1D4ED8', icon: <AlertCircle size={14} color="#3B82F6" /> };
      case 'preparing': return { bg: '#FEF3C7', text: '#B45309', icon: <Clock size={14} color="#D97706" /> };
      case 'ready': return { bg: '#ECFDF5', text: '#047857', icon: <CheckCircle2 size={14} color="#059669" /> };
      case 'out_for_delivery': return { bg: '#F3E8FF', text: '#7E22CE', icon: <Bike size={14} color="#9333EA" /> };
      case 'completed': return { bg: COLORS.background, text: COLORS.textSecondary, icon: <CheckCircle2 size={14} color={COLORS.textSecondary} /> };
      case 'cancelled': return { bg: '#FEF2F2', text: '#B91C1C', icon: <X size={14} color="#EF4444" /> };
      default: return { bg: COLORS.background, text: COLORS.textPrimary, icon: <AlertCircle size={14} color={COLORS.textPrimary} /> };
    }
  };

  const statusConfig = getStatusColor(order.status);

  return (
    <TouchableOpacity style={s.card} onPress={() => onViewDetails(order)} activeOpacity={0.7}>
      <View style={s.flexBetween}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.textPrimary }}>{order.id}</Text>
          <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>{order.customer}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={[s.flexRow, { backgroundColor: statusConfig.bg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }]}>
            {statusConfig.icon}
            <Text style={{ fontSize: 11, fontWeight: '800', color: statusConfig.text, marginLeft: 6, textTransform: 'uppercase' }}>
              {order.status.replace(/_/g, ' ')}
            </Text>
          </View>
          <Text style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginTop: 6 }}>{order.time}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: COLORS.background, padding: 12, borderRadius: 12, marginTop: 12 }}>
        <Text style={{ fontSize: 13, color: COLORS.textPrimary, lineHeight: 20, fontWeight: '600' }}>{order.items}</Text>
        {order.specialInstructions && (
          <View style={[s.flexRow, { marginTop: 8, backgroundColor: '#FEF2F2', padding: 8, borderRadius: 8 }]}>
            <AlertCircle size={12} color="#EF4444" />
            <Text style={{ fontSize: 12, color: '#B91C1C', fontWeight: '700', marginLeft: 6 }}>{order.specialInstructions}</Text>
          </View>
        )}
      </View>

      <View style={[s.flexBetween, { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.borderLight }]}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.textPrimary }}>₹{order.total}</Text>
        </View>
        <View style={s.flexRow}>
          <Text style={{ fontSize: 12, fontWeight: '800', color: COLORS.vegGreen, marginRight: 8 }}>{order.payment || 'Paid via UPI'}</Text>
        </View>
      </View>

      <View style={[s.flexRow, { marginTop: 16, gap: 8 }]}>
        {order.status === 'new' && (
          <>
            <TouchableOpacity style={s.btnSecondary} onPress={() => updateOrderStatus(order.id, 'cancelled')}>
              <Text style={{ color: COLORS.danger, fontWeight: '700', fontSize: 13 }}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnPrimary} onPress={() => updateOrderStatus(order.id, 'preparing')}>
              <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 13 }}>Accept & Prepare</Text>
            </TouchableOpacity>
          </>
        )}
        {order.status === 'preparing' && (
          <TouchableOpacity style={s.btnPrimary} onPress={() => updateOrderStatus(order.id, 'ready')}>
            <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 13 }}>Mark as Ready</Text>
          </TouchableOpacity>
        )}
        {order.status === 'ready' && (
          <TouchableOpacity style={[s.btnPrimary, { backgroundColor: COLORS.vegGreen }]} onPress={() => updateOrderStatus(order.id, 'out_for_delivery')}>
            <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 13 }}>Handover to Rider</Text>
          </TouchableOpacity>
        )}
        {order.status === 'out_for_delivery' && (
          <TouchableOpacity style={s.btnSecondary} onPress={() => updateOrderStatus(order.id, 'completed')}>
            <Text style={{ color: COLORS.textPrimary, fontWeight: '700', fontSize: 13 }}>Mark Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const EmptyOrderState = ({ filter }: any) => (
  <View style={{ alignItems: 'center', paddingVertical: 40 }}>
    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
      <ShoppingBag size={28} color={COLORS.textMuted} />
    </View>
    <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.textPrimary }}>No Orders Found</Text>
    <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center', maxWidth: 200, lineHeight: 18 }}>
      There are currently no orders in the "{filter.replace(/_/g, ' ')}" status.
    </Text>
  </View>
);

export const OrderDetailsModal = ({ order, visible, onClose, updateOrderStatus }: any) => {
  if (!order) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={[s.flexBetween, { padding: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight }]}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>Order Details</Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 8, backgroundColor: COLORS.borderLight, borderRadius: 16 }}>
            <X size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={[s.card, { padding: 20 }]}>
            <View style={s.flexBetween}>
              <Text style={{ fontSize: 22, fontWeight: '900', color: COLORS.textPrimary }}>{order.id}</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: COLORS.primary }}>{order.status.toUpperCase()}</Text>
            </View>
            <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4 }}>Placed at {order.time}</Text>
            
            <View style={{ height: 1, backgroundColor: COLORS.borderLight, marginVertical: 16 }} />
            
            <View style={s.flexRow}>
              <UserIcon size={18} color={COLORS.textSecondary} style={{ marginRight: 12 }} />
              <View>
                <Text style={{ fontSize: 14, fontWeight: '800', color: COLORS.textPrimary }}>{order.customer}</Text>
                <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>{order.phone || '+91 98765 43210'}</Text>
              </View>
            </View>
          </View>

          <Text style={[s.title, { fontSize: 16, marginBottom: 12, marginLeft: 4 }]}>Order Items</Text>
          <View style={s.card}>
            <Text style={{ fontSize: 14, color: COLORS.textPrimary, lineHeight: 22, fontWeight: '600' }}>{order.items}</Text>
            {order.specialInstructions && (
              <View style={[s.flexRow, { marginTop: 12, backgroundColor: '#FEF2F2', padding: 12, borderRadius: 8 }]}>
                <AlertCircle size={16} color="#EF4444" />
                <Text style={{ fontSize: 13, color: '#B91C1C', fontWeight: '700', marginLeft: 8 }}>Note: {order.specialInstructions}</Text>
              </View>
            )}
          </View>

          <Text style={[s.title, { fontSize: 16, marginBottom: 12, marginLeft: 4, marginTop: 8 }]}>Payment Summary</Text>
          <View style={s.card}>
            <View style={[s.flexBetween, { marginBottom: 8 }]}>
              <Text style={{ fontSize: 13, color: COLORS.textSecondary }}>Item Total</Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.textPrimary }}>₹{order.total}</Text>
            </View>
            <View style={[s.flexBetween, { marginBottom: 8 }]}>
              <Text style={{ fontSize: 13, color: COLORS.textSecondary }}>Taxes</Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: COLORS.textPrimary }}>Included</Text>
            </View>
            <View style={{ height: 1, backgroundColor: COLORS.borderLight, marginVertical: 12 }} />
            <View style={s.flexBetween}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.textPrimary }}>Grand Total</Text>
              <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>₹{order.total}</Text>
            </View>
            <View style={[s.flexRow, { marginTop: 12, justifyContent: 'flex-end' }]}>
              <Check size={14} color={COLORS.vegGreen} style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 12, fontWeight: '800', color: COLORS.vegGreen }}>{order.payment || 'PAID VIA UPI'}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export const OrdersScreen = ({ orders, updateOrderStatus, isOpen }: any) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = orders.filter((o: any) => {
    const matchesTab = activeTab === 'all' || o.status === activeTab;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <OrdersHeader orders={orders} isOpen={isOpen} />
        <OrderSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} dateFilter={dateFilter} setDateFilter={setDateFilter} />
        <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {filteredOrders.length > 0 ? (
          filteredOrders.map((ord: any) => (
            <OrderCard 
              key={ord.id} 
              order={ord} 
              updateOrderStatus={updateOrderStatus} 
              onViewDetails={setSelectedOrder}
            />
          ))
        ) : (
          <EmptyOrderState filter={activeTab} />
        )}
      </ScrollView>

      <OrderDetailsModal 
        order={selectedOrder} 
        visible={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        updateOrderStatus={updateOrderStatus} 
      />
    </View>
  );
};
