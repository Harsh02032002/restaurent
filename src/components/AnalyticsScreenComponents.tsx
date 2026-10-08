import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TrendingUp, DollarSign, ShoppingBag, PieChart, Clock, Users, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle } from 'lucide-react-native';

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
};

const s = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 16 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: 'transparent' },
  tabActive: { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary },
  tabInactive: { backgroundColor: COLORS.white, borderColor: COLORS.border },
  tabTxtActive: { color: COLORS.primary, fontWeight: '800', fontSize: 13 },
  tabTxtInactive: { color: COLORS.textSecondary, fontWeight: '600', fontSize: 13 },
});

const TrendPill = ({ val, positive }: any) => (
  <View style={[s.flexRow, { backgroundColor: positive ? '#ECFDF5' : '#FEF2F2', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8 }]}>
    {positive ? <ArrowUpRight size={12} color={COLORS.vegGreen} /> : <ArrowDownRight size={12} color={COLORS.danger} />}
    <Text style={{ fontSize: 11, fontWeight: '800', color: positive ? COLORS.vegGreen : COLORS.danger, marginLeft: 2 }}>{val}</Text>
  </View>
);

export const AnalyticsHeader = ({ dateFilter, setDateFilter }: any) => {
  const dates = ['Today', '7 Days', '30 Days', 'Custom'];
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={s.title}>Performance Analytics</Text>
      <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4, fontWeight: '600', marginBottom: 16 }}>Understand your restaurant's performance.</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dates.map((d) => (
          <TouchableOpacity
            key={d}
            style={[s.tab, dateFilter === d ? s.tabActive : s.tabInactive]}
            onPress={() => setDateFilter(d)}
          >
            <Text style={dateFilter === d ? s.tabTxtActive : s.tabTxtInactive}>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export const KeyMetrics = ({ data }: any) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 12 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <DollarSign size={16} color={COLORS.textMuted} />
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '700', marginLeft: 4 }}>Revenue</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>₹{data.revenue.toLocaleString()}</Text>
      <View style={[s.flexRow, { marginTop: 8 }]}>
        <TrendPill val="12.4%" positive={true} />
        <Text style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: 4, fontWeight: '600' }}>vs last period</Text>
      </View>
    </View>
    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 12 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <ShoppingBag size={16} color={COLORS.textMuted} />
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '700', marginLeft: 4 }}>Orders</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>{data.orders}</Text>
      <View style={[s.flexRow, { marginTop: 8 }]}>
        <TrendPill val="8.2%" positive={true} />
        <Text style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: 4, fontWeight: '600' }}>vs last period</Text>
      </View>
    </View>
    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 12 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <TrendingUp size={16} color={COLORS.textMuted} />
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '700', marginLeft: 4 }}>Avg Order Value</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>₹{data.averageOrderValue}</Text>
      <View style={[s.flexRow, { marginTop: 8 }]}>
        <TrendPill val="4.1%" positive={true} />
        <Text style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: 4, fontWeight: '600' }}>vs last period</Text>
      </View>
    </View>
    <View style={[s.card, { width: '48%', marginBottom: 0, padding: 12 }]}>
      <View style={[s.flexRow, { marginBottom: 8 }]}>
        <PieChart size={16} color={COLORS.textMuted} />
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '700', marginLeft: 4 }}>Completion</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>{data.completionRate}%</Text>
      <View style={[s.flexRow, { marginTop: 8 }]}>
        <TrendPill val="2.3%" positive={false} />
        <Text style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: 4, fontWeight: '600' }}>vs last period</Text>
      </View>
    </View>
  </View>
);

export const RevenueChart = ({ chartData }: any) => {
  const max = Math.max(...chartData.map((d: any) => d.val));
  return (
    <View style={s.card}>
      <Text style={s.sectionTitle}>Revenue Trend</Text>
      <View style={[s.flexRow, { height: 120, alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 8 }]}>
        {chartData.map((d: any, idx: number) => {
          const height = (d.val / max) * 100;
          return (
            <View key={idx} style={{ alignItems: 'center' }}>
              <View style={{ width: 24, height: `${height}%`, backgroundColor: COLORS.primaryLight, borderRadius: 4, justifyContent: 'flex-end' }}>
                <View style={{ width: 24, height: 4, backgroundColor: COLORS.primary, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 8, fontWeight: '700' }}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const OrdersAnalysis = ({ data }: any) => (
  <View style={s.card}>
    <Text style={s.sectionTitle}>Orders Breakdown</Text>
    <View style={s.flexBetween}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.textPrimary }}>{data.orders}</Text>
        <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Total</Text>
      </View>
      <View style={{ width: 1, height: 30, backgroundColor: COLORS.border }} />
      <View style={{ alignItems: 'center', flex: 1 }}>
        <View style={s.flexRow}>
          <CheckCircle2 size={12} color={COLORS.vegGreen} style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.vegGreen }}>{data.completedOrders}</Text>
        </View>
        <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Completed</Text>
      </View>
      <View style={{ width: 1, height: 30, backgroundColor: COLORS.border }} />
      <View style={{ alignItems: 'center', flex: 1 }}>
        <View style={s.flexRow}>
          <XCircle size={12} color={COLORS.warning} style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.warning }}>{data.cancelledOrders}</Text>
        </View>
        <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Cancelled</Text>
      </View>
      <View style={{ width: 1, height: 30, backgroundColor: COLORS.border }} />
      <View style={{ alignItems: 'center', flex: 1 }}>
        <View style={s.flexRow}>
          <XCircle size={12} color={COLORS.danger} style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.danger }}>{data.rejectedOrders}</Text>
        </View>
        <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Rejected</Text>
      </View>
    </View>
  </View>
);

export const TopSellingDishes = ({ topDishes }: any) => (
  <View style={s.card}>
    <Text style={s.sectionTitle}>Top Selling Dishes</Text>
    {topDishes.map((dish: any, idx: number) => (
      <View key={idx} style={[s.flexBetween, { marginBottom: idx === topDishes.length - 1 ? 0 : 12 }]}>
        <View style={s.flexRow}>
          <Text style={{ fontSize: 14, fontWeight: '800', color: COLORS.textMuted, width: 20 }}>{idx + 1}.</Text>
          <Text style={{ fontSize: 14, fontWeight: '700', color: COLORS.textPrimary }}>{dish.name}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.textPrimary }}>{dish.orders} orders</Text>
          <Text style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' }}>₹{dish.revenue}</Text>
        </View>
      </View>
    ))}
  </View>
);

export const SalesByCategory = ({ categories }: any) => (
  <View style={s.card}>
    <Text style={s.sectionTitle}>Sales by Category</Text>
    {categories.map((cat: any, idx: number) => (
      <View key={idx} style={{ marginBottom: idx === categories.length - 1 ? 0 : 16 }}>
        <View style={[s.flexBetween, { marginBottom: 6 }]}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.textPrimary }}>{cat.name}</Text>
          <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.textPrimary }}>{cat.orders} ord. (₹{cat.revenue})</Text>
        </View>
        <View style={{ height: 6, backgroundColor: COLORS.borderLight, borderRadius: 3, width: '100%' }}>
          <View style={{ height: 6, backgroundColor: COLORS.primary, borderRadius: 3, width: `${cat.percentage}%` }} />
        </View>
      </View>
    ))}
  </View>
);

export const PerformanceSummary = ({ summary }: any) => (
  <View style={[s.card, { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary }]}>
    <View style={[s.flexRow, { marginBottom: 12 }]}>
      <TrendingUp size={18} color={COLORS.primary} />
      <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.primary, marginLeft: 8 }}>AI Insights</Text>
    </View>
    {summary.map((text: string, i: number) => (
      <View key={i} style={[s.flexRow, { marginBottom: 8, alignItems: 'flex-start' }]}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginTop: 6, marginRight: 8 }} />
        <Text style={{ fontSize: 13, color: COLORS.textPrimary, lineHeight: 18, fontWeight: '600', flex: 1 }}>{text}</Text>
      </View>
    ))}
  </View>
);

export const MiscInsights = ({ peakHours, customerInsights }: any) => (
  <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
    <View style={[s.card, { flex: 1, padding: 12, marginBottom: 0 }]}>
      <View style={[s.flexRow, { marginBottom: 12 }]}>
        <Clock size={16} color={COLORS.textMuted} />
        <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.textPrimary, marginLeft: 6 }}>Peak Hours</Text>
      </View>
      {peakHours.map((ph: string, i: number) => (
        <Text key={i} style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: '700', marginBottom: 4 }}>• {ph}</Text>
      ))}
    </View>
    <View style={[s.card, { flex: 1, padding: 12, marginBottom: 0 }]}>
      <View style={[s.flexRow, { marginBottom: 12 }]}>
        <Users size={16} color={COLORS.textMuted} />
        <Text style={{ fontSize: 13, fontWeight: '800', color: COLORS.textPrimary, marginLeft: 6 }}>Customers</Text>
      </View>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 4 }}>New: <Text style={{ color: COLORS.textPrimary, fontWeight: '800' }}>{customerInsights.new}</Text></Text>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 4 }}>Returning: <Text style={{ color: COLORS.textPrimary, fontWeight: '800' }}>{customerInsights.returning}</Text></Text>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' }}>Repeat Rate: <Text style={{ color: COLORS.primary, fontWeight: '800' }}>{customerInsights.repeatRate}%</Text></Text>
    </View>
  </View>
);

export const AnalyticsScreen = () => {
  const [dateFilter, setDateFilter] = useState('7 Days');

  // Backend ready mock data structure
  const analyticsData = {
    revenue: 124850,
    orders: 342,
    averageOrderValue: 365,
    completionRate: 94.5,
    completedOrders: 323,
    cancelledOrders: 14,
    rejectedOrders: 5,
    chartData: [
      { label: 'Mon', val: 12000 },
      { label: 'Tue', val: 15400 },
      { label: 'Wed', val: 14200 },
      { label: 'Thu', val: 18900 },
      { label: 'Fri', val: 24500 },
      { label: 'Sat', val: 28000 },
      { label: 'Sun', val: 11850 },
    ],
    topDishes: [
      { name: 'Hyderabadi Chicken Dum Biryani', orders: 48, revenue: 16320 },
      { name: 'Special Mutton Dum Biryani', orders: 32, revenue: 14720 },
      { name: 'Chicken Galouti Kebab', orders: 24, revenue: 7680 },
    ],
    categorySales: [
      { name: 'Biryani', orders: 120, revenue: 45000, percentage: 45 },
      { name: 'Starters', orders: 85, revenue: 22000, percentage: 22 },
      { name: 'Main Course', orders: 70, revenue: 35000, percentage: 35 },
      { name: 'Desserts & Bev', orders: 67, revenue: 22850, percentage: 22 },
    ],
    peakHours: ['12 PM – 2 PM', '7 PM – 10 PM'],
    customerInsights: {
      new: 142,
      returning: 200,
      repeatRate: 58,
    },
    insights: [
      "Your revenue increased 12.4% compared with the previous period.",
      "Hyderabadi Chicken Dum Biryani is your best-selling dish contributing highest to revenue.",
      "Evening orders (7 PM - 10 PM) are your busiest period, ensure staff readiness."
    ]
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <AnalyticsHeader dateFilter={dateFilter} setDateFilter={setDateFilter} />
        
        <PerformanceSummary summary={analyticsData.insights} />
        
        <KeyMetrics data={analyticsData} />
        
        <RevenueChart chartData={analyticsData.chartData} />
        
        <OrdersAnalysis data={analyticsData} />
        
        <TopSellingDishes topDishes={analyticsData.topDishes} />
        
        <SalesByCategory categories={analyticsData.categorySales} />
        
        <MiscInsights peakHours={analyticsData.peakHours} customerInsights={analyticsData.customerInsights} />
      </ScrollView>
    </View>
  );
};
