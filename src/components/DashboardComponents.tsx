import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { Store, ShoppingBag, Check, CheckCircle2, AlertCircle, TrendingUp, Clock, Bell, User as UserIcon, ChefHat, Plus, Activity, PieChart, Info } from 'lucide-react-native';

export const COLORS = {
  primary: '#0F766E', // Calming Teal
  primaryLight: '#F0FDFA',
  accent: '#0D9488',
  background: '#F8FAFC', // Very soft slate/blue tint
  cardBackground: '#FFFFFF',
  textPrimary: '#334155', // Softer black/slate
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  white: '#FFFFFF',
  starYellow: '#F59E0B',
  vegGreen: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  dangerLight: '#FEE2E2',
};

const s = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

// 1. TOP HEADER
export const DashboardHeader = ({ isOpen, setIsOpen }: any) => (
  <View style={[s.flexBetween, { paddingHorizontal: 20, paddingVertical: 14, backgroundColor: COLORS.cardBackground, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 3, zIndex: 10 }]}>
    <View style={s.flexRow}>
      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
        <Store size={24} color={COLORS.primary} />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.5 }}>The Royal Biryani House</Text>
        <View style={s.flexRow}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: isOpen ? COLORS.vegGreen : COLORS.danger, marginRight: 6 }} />
          <Text style={{ fontSize: 12, fontWeight: '700', color: isOpen ? COLORS.vegGreen : COLORS.danger }}>
            {isOpen ? 'Accepting Orders' : 'Currently Closed'}
          </Text>
        </View>
      </View>
    </View>
    <View style={s.flexRow}>
      <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
        <Bell size={20} color={COLORS.textSecondary} />
        <View style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.danger }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
        <UserIcon size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  </View>
);

// 2. RESTAURANT STATUS
export const RestaurantStatusCard = ({ isOpen, setIsOpen }: any) => (
  <View style={[s.card, { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isOpen ? '#ECFDF5' : '#FEF2F2', borderColor: isOpen ? '#D1FAE5' : '#FEE2E2' }]}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '900', color: isOpen ? '#065F46' : '#991B1B' }}>
        {isOpen ? 'Store is Open' : 'Store is Closed'}
      </Text>
      <Text style={{ fontSize: 13, color: isOpen ? '#047857' : '#B91C1C', marginTop: 4, fontWeight: '600' }}>
        {isOpen ? 'You are visible and accepting online orders.' : 'Customers cannot place orders right now.'}
      </Text>
      <View style={[s.flexRow, { marginTop: 8 }]}>
        <Clock size={14} color={isOpen ? '#047857' : '#B91C1C'} />
        <Text style={{ fontSize: 12, color: isOpen ? '#047857' : '#B91C1C', marginLeft: 6, fontWeight: '700' }}>Today's Hours: 11:00 AM - 11:00 PM</Text>
      </View>
    </View>
    <View style={{ alignItems: 'flex-end', paddingLeft: 16 }}>
      <Switch
        value={isOpen}
        onValueChange={setIsOpen}
        trackColor={{ false: '#FCA5A5', true: '#6EE7B7' }}
        thumbColor={isOpen ? '#10B981' : '#EF4444'}
      />
      <Text style={{ fontSize: 11, fontWeight: '800', color: isOpen ? '#065F46' : '#991B1B', marginTop: 8, textAlign: 'right' }}>
        {isOpen ? 'PAUSE ORDERS' : 'OPEN STORE'}
      </Text>
    </View>
  </View>
);

// 3. STATS CARDS (TODAY'S OVERVIEW)
export const StatsCards = () => (
  <View style={[s.flexBetween, { marginBottom: 20, flexWrap: 'wrap', gap: 12 }]}>
    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 16 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <View style={{ padding: 6, backgroundColor: COLORS.primaryLight, borderRadius: 8, marginRight: 8 }}>
          <TrendingUp size={16} color={COLORS.primary} />
        </View>
        <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.textSecondary }}>Revenue</Text>
      </View>
      <Text style={{ fontSize: 22, fontWeight: '900', color: COLORS.textPrimary }}>₹18,450</Text>
      <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.vegGreen, marginTop: 4 }}>+14% from yesterday</Text>
    </View>

    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 16 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <View style={{ padding: 6, backgroundColor: '#EFF6FF', borderRadius: 8, marginRight: 8 }}>
          <ShoppingBag size={16} color="#3B82F6" />
        </View>
        <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.textSecondary }}>Orders</Text>
      </View>
      <Text style={{ fontSize: 22, fontWeight: '900', color: COLORS.textPrimary }}>124</Text>
      <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 4 }}>22 pending</Text>
    </View>

    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 16 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <View style={{ padding: 6, backgroundColor: '#ECFDF5', borderRadius: 8, marginRight: 8 }}>
          <CheckCircle2 size={16} color={COLORS.vegGreen} />
        </View>
        <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.textSecondary }}>Completed</Text>
      </View>
      <Text style={{ fontSize: 22, fontWeight: '900', color: COLORS.textPrimary }}>110</Text>
      <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 4 }}>88% completion</Text>
    </View>

    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 16 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <View style={{ padding: 6, backgroundColor: '#FEF2F2', borderRadius: 8, marginRight: 8 }}>
          <AlertCircle size={16} color={COLORS.danger} />
        </View>
        <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.textSecondary }}>Cancelled</Text>
      </View>
      <Text style={{ fontSize: 22, fontWeight: '900', color: COLORS.textPrimary }}>6</Text>
      <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.danger, marginTop: 4 }}>-2 compared to yday</Text>
    </View>
  </View>
);

// 4. QUICK ACTIONS
export const QuickActions = ({ setActiveTab }: any) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={s.sectionTitle}>Quick Actions</Text>
    <View style={s.flexRow}>
      <TouchableOpacity onPress={() => setActiveTab('orders')} style={{ flex: 1, backgroundColor: COLORS.cardBackground, padding: 16, borderRadius: 16, alignItems: 'center', marginRight: 8, borderWidth: 1, borderColor: COLORS.borderLight }}>
        <ChefHat size={24} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={{ fontSize: 12, fontWeight: '800', color: COLORS.textPrimary }}>KDS / Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('menu')} style={{ flex: 1, backgroundColor: COLORS.cardBackground, padding: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: COLORS.borderLight }}>
        <Store size={24} color={COLORS.accent} style={{ marginBottom: 8 }} />
        <Text style={{ fontSize: 12, fontWeight: '800', color: COLORS.textPrimary }}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('analytics')} style={{ flex: 1, backgroundColor: COLORS.cardBackground, padding: 16, borderRadius: 16, alignItems: 'center', marginLeft: 8, borderWidth: 1, borderColor: COLORS.borderLight }}>
        <Activity size={24} color={COLORS.vegGreen} style={{ marginBottom: 8 }} />
        <Text style={{ fontSize: 12, fontWeight: '800', color: COLORS.textPrimary }}>Analytics</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// 6. KITCHEN SUMMARY
export const KitchenSummary = ({ orders, setActiveTab }: any) => {
  const newOrders = orders.filter((o: any) => o.status === 'new').length;
  const preparing = orders.filter((o: any) => o.status === 'preparing').length;
  const ready = orders.filter((o: any) => o.status === 'ready').length;

  return (
    <View style={s.card}>
      <View style={s.flexBetween}>
        <Text style={s.sectionTitle}>Kitchen Pipeline</Text>
        <TouchableOpacity onPress={() => setActiveTab('orders')}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.primary }}>View KDS</Text>
        </TouchableOpacity>
      </View>
      <View style={[s.flexBetween, { marginTop: 8 }]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: COLORS.accent }}>{newOrders}</Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginTop: 4 }}>New</Text>
        </View>
        <View style={{ width: 1, height: 40, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#F59E0B' }}>{preparing}</Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginTop: 4 }}>Preparing</Text>
        </View>
        <View style={{ width: 1, height: 40, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: COLORS.vegGreen }}>{ready}</Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginTop: 4 }}>Ready</Text>
        </View>
      </View>
    </View>
  );
};

// 7. ALERTS SECTION
export const AlertsSection = ({ menuItems, orders }: any) => {
  const outOfStockCount = menuItems.filter((i: any) => !i.inStock).length;
  if (outOfStockCount === 0) return null;

  return (
    <View style={[s.card, { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }]}>
      <View style={s.flexRow}>
        <AlertCircle size={20} color={COLORS.danger} />
        <Text style={{ fontSize: 14, fontWeight: '800', color: '#991B1B', marginLeft: 8 }}>Action Required</Text>
      </View>
      <Text style={{ fontSize: 13, color: '#B91C1C', marginTop: 8, fontWeight: '600', lineHeight: 20 }}>
        {outOfStockCount} items on your menu are currently marked as out of stock. Customers cannot order them.
      </Text>
    </View>
  );
};

// 8. PERFORMANCE SUMMARY
export const PerformanceSummary = () => (
  <View style={s.card}>
    <View style={[s.flexRow, { marginBottom: 16 }]}>
      <PieChart size={20} color={COLORS.textPrimary} style={{ marginRight: 8 }} />
      <Text style={[s.sectionTitle, { marginBottom: 0 }]}>Today's Performance</Text>
    </View>
    
    <View style={s.flexBetween}>
      <View>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' }}>Average Order Value</Text>
        <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary, marginTop: 4 }}>₹452.00</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' }}>Avg Prep Time</Text>
        <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary, marginTop: 4 }}>18 mins</Text>
      </View>
    </View>
    
    <View style={{ height: 6, backgroundColor: COLORS.border, borderRadius: 3, marginTop: 16, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: '88%', backgroundColor: COLORS.vegGreen, borderRadius: 3 }} />
    </View>
    <Text style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 8, fontWeight: '600' }}>88% Orders Completed Successfully</Text>
  </View>
);

// 5. LIVE ORDERS
export const LiveOrders = ({ orders, updateOrderStatus }: any) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={[s.flexBetween, { marginBottom: 12 }]}>
        <Text style={s.sectionTitle}>Active Orders</Text>
        <View style={{ backgroundColor: COLORS.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: '800', color: COLORS.primary }}>{orders.length} Total</Text>
        </View>
      </View>
      
      {orders.map((ord: any) => (
        <View key={ord.id} style={s.card}>
          <View style={s.flexBetween}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.textPrimary }}>{ord.id}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>{ord.customer}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={[s.flexRow, { backgroundColor: ord.status === 'new' ? '#EFF6FF' : ord.status === 'preparing' ? '#FEF3C7' : '#ECFDF5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }]}>
                {ord.status === 'new' && <AlertCircle size={14} color="#3B82F6" />}
                {ord.status === 'preparing' && <ChefHat size={14} color="#D97706" />}
                {ord.status === 'ready' && <CheckCircle2 size={14} color="#059669" />}
                <Text style={{ fontSize: 12, fontWeight: '800', color: ord.status === 'new' ? '#1D4ED8' : ord.status === 'preparing' ? '#B45309' : '#047857', marginLeft: 6, textTransform: 'uppercase' }}>
                  {ord.status}
                </Text>
              </View>
              <Text style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginTop: 6 }}>{ord.time}</Text>
            </View>
          </View>
          
          <View style={{ backgroundColor: COLORS.background, padding: 12, borderRadius: 12, marginTop: 16 }}>
            <Text style={{ fontSize: 13, color: COLORS.textPrimary, lineHeight: 20, fontWeight: '500' }}>{ord.items}</Text>
          </View>
          
          <View style={[s.flexBetween, { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.borderLight }]}>
            <View>
              <Text style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' }}>Total Bill</Text>
              <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.textPrimary, marginTop: 2 }}>₹{ord.total}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' }}>Payment</Text>
              <View style={s.flexRow}>
                <Check size={12} color={COLORS.vegGreen} style={{ marginTop: 2, marginRight: 4 }} />
                <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.vegGreen, marginTop: 2 }}>{ord.payment}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ marginTop: 16 }}>
            {ord.status === 'new' && (
              <TouchableOpacity
                style={{ backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 }}
                onPress={() => updateOrderStatus(ord.id, 'preparing')}
              >
                <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: '800' }}>Accept & Prepare</Text>
              </TouchableOpacity>
            )}

            {ord.status === 'preparing' && (
              <TouchableOpacity
                style={{ backgroundColor: COLORS.warning, paddingVertical: 14, borderRadius: 12, alignItems: 'center', shadowColor: COLORS.warning, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 }}
                onPress={() => updateOrderStatus(ord.id, 'ready')}
              >
                <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: '800' }}>Mark as Ready</Text>
              </TouchableOpacity>
            )}

            {ord.status === 'ready' && (
              <View style={[s.flexRow, { backgroundColor: '#ECFDF5', paddingVertical: 14, borderRadius: 12, justifyContent: 'center' }]}>
                <CheckCircle2 size={18} color={COLORS.vegGreen} />
                <Text style={{ color: COLORS.vegGreen, fontSize: 14, fontWeight: '800', marginLeft: 8 }}>Waiting for Rider...</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
