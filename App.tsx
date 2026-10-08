import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  TextInput,
  Modal,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Store,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  Plus,
  Edit2,
  Trash2,
  Tag,
  BarChart3,
  User,
  Power,
  Check,
  X,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Percent,
} from 'lucide-react-native';
import { DashboardHeader, RestaurantStatusCard, StatsCards, QuickActions, LiveOrders, KitchenSummary, AlertsSection, PerformanceSummary } from './src/components/DashboardComponents';
import { OrdersScreen } from './src/components/OrdersScreenComponents';
import { MenuScreen } from './src/components/MenuScreenComponents';
import { OffersScreen } from './src/components/OffersScreenComponents';
import { AnalyticsScreen } from './src/components/AnalyticsScreenComponents';

const COLORS = {
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
};

type ScreenTab = 'dashboard' | 'orders' | 'menu' | 'offers' | 'analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('dashboard');
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-98421',
      customer: 'Aarav Sharma',
      phone: '+91 98765 43210',
      items: '2 × Hyderabadi Chicken Dum Biryani\n1 × Extra Raita',
      specialInstructions: 'Make it extra spicy, please add extra lemon.',
      subtotal: 450,
      deliveryFee: 50,
      tax: 33,
      total: 533,
      time: '7:15 PM (5 mins ago)',
      createdAt: '2026-10-08T19:15:00',
      status: 'new', // new | preparing | ready | out_for_delivery | completed | cancelled
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
    },
    {
      id: 'ORD-87120',
      customer: 'Ananya Roy',
      phone: '+91 87654 32109',
      items: '1 × Pepperoni Overload Pizza (Medium)',
      subtotal: 390,
      deliveryFee: 40,
      tax: 34,
      total: 464,
      time: '7:02 PM (18 mins ago)',
      createdAt: '2026-10-08T19:02:00',
      status: 'preparing',
      paymentMethod: 'CREDIT CARD',
      paymentStatus: 'PAID',
    },
    {
      id: 'ORD-65322',
      customer: 'Rahul Verma',
      phone: '+91 76543 21098',
      items: '1 × Paneer Tikka Masala\n2 × Garlic Naan',
      subtotal: 420,
      deliveryFee: 50,
      tax: 40,
      total: 510,
      time: '6:45 PM (35 mins ago)',
      createdAt: '2026-10-08T18:45:00',
      status: 'ready',
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
    },
  ]);

  // Live Menu Items State
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Hyderabadi Chicken Dum Biryani',
      category: 'Biryani',
      price: 340,
      inStock: true,
      isAvailable: true,
      isVeg: false,
      type: 'non-veg',
      desc: 'Slow cooked fragrant basmati rice with succulent chicken.',
      description: 'Slow cooked fragrant basmati rice with succulent chicken.',
      prepTime: 20,
      preparationTime: 20,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&auto=format&fit=crop',
      addons: [],
    },
    {
      id: '2',
      name: 'Special Mutton Dum Biryani',
      category: 'Biryani',
      price: 460,
      inStock: true,
      isAvailable: true,
      isVeg: false,
      type: 'non-veg',
      desc: 'Tender baby lamb cooked in handi with saffron basmati rice.',
      description: 'Tender baby lamb cooked in handi with saffron basmati rice.',
      prepTime: 25,
      preparationTime: 25,
      image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=300&auto=format&fit=crop',
      addons: [],
    },
    {
      id: '3',
      name: 'Paneer Tikka Dum Biryani',
      category: 'Biryani',
      price: 290,
      inStock: false,
      isAvailable: false,
      isVeg: true,
      type: 'veg',
      desc: 'Charcoal grilled cottage cheese cubes in spiced rice.',
      description: 'Charcoal grilled cottage cheese cubes in spiced rice.',
      prepTime: 18,
      preparationTime: 18,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop',
      addons: [],
    },
    {
      id: '4',
      name: 'Chicken Galouti Kebab (4 pcs)',
      category: 'Starters',
      price: 320,
      inStock: true,
      isAvailable: true,
      isVeg: false,
      type: 'non-veg',
      desc: 'Melt in mouth minced chicken kebabs.',
      description: 'Melt in mouth minced chicken kebabs.',
      prepTime: 15,
      preparationTime: 15,
      image: 'https://images.unsplash.com/photo-1599487405270-20f5c1d68a98?q=80&w=300&auto=format&fit=crop',
      addons: [],
    },
  ]);

  const updateOrderStatus = (id: string, nextStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Screen Body */}
        <View style={styles.screenBody}>
          {activeTab === 'dashboard' && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
              <RestaurantStatusCard isOpen={isOpen} setIsOpen={setIsOpen} />
              <StatsCards />
              <QuickActions setActiveTab={setActiveTab} />
              <KitchenSummary orders={orders} setActiveTab={setActiveTab} />
              <AlertsSection menuItems={menuItems} orders={orders} />
              <PerformanceSummary />
              <LiveOrders orders={orders} updateOrderStatus={updateOrderStatus} />
            </ScrollView>
          )}

          {activeTab === 'orders' && (
            <OrdersScreen orders={orders} updateOrderStatus={updateOrderStatus} isOpen={isOpen} />
          )}

          {activeTab === 'menu' && (
            <MenuScreen menuItems={menuItems} setMenuItems={setMenuItems} />
          )}

          {activeTab === 'offers' && (
            <OffersScreen />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsScreen />
          )}
        </View>



        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('dashboard')}>
            <BarChart3 size={20} color={activeTab === 'dashboard' ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.navLbl, activeTab === 'dashboard' && styles.activeLbl]}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('orders')}>
            <ShoppingBag size={20} color={activeTab === 'orders' ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.navLbl, activeTab === 'orders' && styles.activeLbl]}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('menu')}>
            <Store size={20} color={activeTab === 'menu' ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.navLbl, activeTab === 'menu' && styles.activeLbl]}>Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('offers')}>
            <Tag size={20} color={activeTab === 'offers' ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.navLbl, activeTab === 'offers' && styles.activeLbl]}>Offers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('analytics')}>
            <TrendingUp size={20} color={activeTab === 'analytics' ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.navLbl, activeTab === 'analytics' && styles.activeLbl]}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    zIndex: 10,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  brandSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  storeToggleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
  },
  storeStatusText: {
    fontSize: 12,
    fontWeight: '800',
    marginRight: 8,
  },
  txtOpen: {
    color: COLORS.primary,
  },
  txtClosed: {
    color: COLORS.danger,
  },
  screenBody: {
    flex: 1,
  },
  scrollPadding: {
    padding: 20,
    paddingBottom: 100,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  bgOpen: {
    backgroundColor: COLORS.primaryLight,
  },
  bgClosed: {
    backgroundColor: '#FEE2E2',
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  bannerTxt: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  revenueCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  revLbl: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  revVal: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginVertical: 8,
    letterSpacing: -1,
  },
  revSub: {
    fontSize: 13,
    color: COLORS.vegGreen,
    fontWeight: '700',
  },
  grid4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  gridItem: {
    alignItems: 'center',
  },
  gridVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  gridLbl: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 16,
    borderRadius: 20,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickTxt: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  orderCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  ordHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  ordId: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  ordTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  ordItems: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  ordTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 10,
  },
  ordActions: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  actionBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnTxt: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  readyTxt: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.vegGreen,
    marginLeft: 6,
  },
  pageHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  pageSubTitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  addDishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  addDishTxt: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vegBox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  itemCat: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  itemDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  itemActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  editTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 4,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.danger,
    marginLeft: 4,
  },
  stockToggle: {
    alignItems: 'flex-end',
  },
  stockTxt: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  txtInStock: {
    color: COLORS.vegGreen,
  },
  txtOutStock: {
    color: COLORS.danger,
  },
  offerCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeTxt: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  activeBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.vegGreen,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  offerHead: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  offerDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    fontSize: 14,
  },
  bold: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    paddingBottom: 16,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  modalBody: {
    maxHeight: 500,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginTop: 12,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  activeVegChip: {
    backgroundColor: '#ECFDF5',
    borderColor: COLORS.vegGreen,
  },
  activeNonVegChip: {
    backgroundColor: '#FEE2E2',
    borderColor: COLORS.danger,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  activeTypeTxt: {
    color: COLORS.textPrimary,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  activeCatPill: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  catPillTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeCatPillTxt: {
    color: COLORS.white,
    fontWeight: '800',
  },
  saveCta: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  saveCtaTxt: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navLbl: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 4,
  },
  activeLbl: {
    color: COLORS.primary,
    fontWeight: '900',
  },
});
