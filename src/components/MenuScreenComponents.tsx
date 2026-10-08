import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal, Switch, Image, Alert } from 'react-native';
import { Search, Plus, Edit2, Trash2, Clock, Check, X, AlertCircle, Image as ImageIcon } from 'lucide-react-native';

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

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop';

const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
  <View style={{ width: 14, height: 14, borderWidth: 1, borderColor: isVeg ? COLORS.vegGreen : COLORS.danger, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: isVeg ? COLORS.vegGreen : COLORS.danger }} />
  </View>
);

export const MenuHeader = ({ menuItems, onAddPress }: any) => {
  const total = menuItems.length;
  const inStock = menuItems.filter((i: any) => i.inStock).length;
  const outOfStock = total - inStock;

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={[s.flexBetween, { marginBottom: 16 }]}>
        <Text style={s.title}>Menu Manager</Text>
        <TouchableOpacity 
          style={[s.flexRow, { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 }]}
          onPress={onAddPress}
        >
          <Plus size={16} color={COLORS.white} />
          <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 13, marginLeft: 6 }}>Add Dish</Text>
        </TouchableOpacity>
      </View>

      <View style={[s.flexBetween, { backgroundColor: COLORS.cardBackground, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderLight }]}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>{total}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Total</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.vegGreen }}>{inStock}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Available</Text>
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: COLORS.border }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.danger }}>{outOfStock}</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: COLORS.textSecondary, marginTop: 2 }}>Out of Stock</Text>
        </View>
      </View>
    </View>
  );
};

export const MenuSearchAndFilter = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }: any) => {
  const categories = ['All', 'Starters', 'Biryani', 'Main Course', 'Breads', 'Desserts', 'Beverages'];
  
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[s.flexRow, { backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: COLORS.border, marginBottom: 12 }]}>
        <Search size={18} color={COLORS.textMuted} style={{ marginRight: 8 }} />
        <TextInput
          style={{ flex: 1, fontSize: 14, color: COLORS.textPrimary, fontWeight: '500' }}
          placeholder="Search dish by name..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[s.tab, activeCategory === cat ? s.tabActive : s.tabInactive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={activeCategory === cat ? s.tabTxtActive : s.tabTxtInactive}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export const MenuItemCard = ({ item, onEdit, onDelete, toggleStock }: any) => {
  return (
    <View style={[s.card, { opacity: item.inStock ? 1 : 0.6 }]}>
      <View style={s.flexRow}>
        <Image 
          source={{ uri: item.image || DEFAULT_IMAGE }} 
          style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: COLORS.borderLight }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={s.flexBetween}>
            <View style={[s.flexRow, { flex: 1, marginRight: 8 }]}>
              <VegIcon isVeg={item.type === 'veg' || item.isVeg} />
              <Text style={{ fontSize: 15, fontWeight: '800', color: COLORS.textPrimary, marginLeft: 6, flex: 1 }} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '900', color: COLORS.textPrimary }}>₹{item.price}</Text>
          </View>
          
          <Text style={{ fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 4 }}>{item.category}</Text>
          
          {item.desc ? (
            <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4, lineHeight: 16 }} numberOfLines={2}>
              {item.desc || item.description}
            </Text>
          ) : null}
          
          <View style={[s.flexRow, { marginTop: 8 }]}>
            <Clock size={12} color={COLORS.textMuted} />
            <Text style={{ fontSize: 11, color: COLORS.textSecondary, marginLeft: 4, fontWeight: '600' }}>{item.prepTime || item.preparationTime || 15} mins prep</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: COLORS.borderLight, marginVertical: 12 }} />

      <View style={s.flexBetween}>
        <View style={s.flexRow}>
          <Switch
            value={item.inStock}
            onValueChange={() => toggleStock(item.id)}
            trackColor={{ false: COLORS.dangerLight, true: '#D1FAE5' }}
            thumbColor={item.inStock ? COLORS.vegGreen : COLORS.danger}
            style={{ transform: [{ scale: 0.8 }] }}
          />
          <Text style={{ fontSize: 12, fontWeight: '700', color: item.inStock ? COLORS.vegGreen : COLORS.danger, marginLeft: 4 }}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        <View style={s.flexRow}>
          <TouchableOpacity 
            style={[s.flexRow, { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: COLORS.background, borderRadius: 8, marginRight: 8 }]}
            onPress={() => onEdit(item)}
          >
            <Edit2 size={12} color={COLORS.textPrimary} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, marginLeft: 4 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[s.flexRow, { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#FEF2F2', borderRadius: 8 }]}
            onPress={() => onDelete(item.id)}
          >
            <Trash2 size={12} color={COLORS.danger} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: COLORS.danger, marginLeft: 4 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const DishFormModal = ({ visible, onClose, onSave, dish, categories }: any) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [category, setCategory] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [inStock, setInStock] = useState(true);

  React.useEffect(() => {
    if (dish && visible) {
      setName(dish.name || '');
      setDesc(dish.desc || dish.description || '');
      setPrice(dish.price ? dish.price.toString() : '');
      setPrepTime(dish.prepTime ? dish.prepTime.toString() : '15');
      setCategory(dish.category || 'Starters');
      setIsVeg(dish.type === 'veg' || dish.isVeg === true);
      setImageUrl(dish.image || '');
      setInStock(dish.inStock !== false);
    } else if (visible) {
      setName('');
      setDesc('');
      setPrice('');
      setPrepTime('15');
      setCategory('Starters');
      setIsVeg(true);
      setImageUrl('');
      setInStock(true);
    }
  }, [dish, visible]);

  const handleSave = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Dish name and price are required.');
      return;
    }
    
    const savedDish = {
      id: dish ? dish.id : `dish-${Date.now()}`,
      name: name.trim(),
      desc: desc.trim(),
      description: desc.trim(),
      price: parseFloat(price) || 0,
      prepTime: parseInt(prepTime) || 15,
      preparationTime: parseInt(prepTime) || 15,
      category: category,
      type: isVeg ? 'veg' : 'non-veg',
      isVeg: isVeg,
      image: imageUrl.trim() || DEFAULT_IMAGE,
      inStock: inStock,
      isAvailable: inStock,
    };
    
    onSave(savedDish);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={[s.flexBetween, { padding: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight }]}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: COLORS.textPrimary }}>
            {dish ? 'Edit Dish' : 'Add New Dish'}
          </Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 8, backgroundColor: COLORS.borderLight, borderRadius: 16 }}>
            <X size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={s.label}>Dish Name *</Text>
          <TextInput style={s.input} placeholder="e.g. Chicken Dum Biryani" value={name} onChangeText={setName} />

          <Text style={s.label}>Description</Text>
          <TextInput style={[s.input, { height: 80, textAlignVertical: 'top' }]} placeholder="Dish description..." multiline value={desc} onChangeText={setDesc} />

          <View style={s.flexRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={s.label}>Price (₹) *</Text>
              <TextInput style={s.input} placeholder="0.00" keyboardType="numeric" value={price} onChangeText={setPrice} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={s.label}>Prep Time (mins)</Text>
              <TextInput style={s.input} placeholder="15" keyboardType="numeric" value={prepTime} onChangeText={setPrepTime} />
            </View>
          </View>

          <Text style={s.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {categories.filter((c: string) => c !== 'All').map((cat: string) => (
              <TouchableOpacity key={cat} style={[s.tab, category === cat ? s.tabActive : s.tabInactive, { paddingVertical: 10 }]} onPress={() => setCategory(cat)}>
                <Text style={category === cat ? s.tabTxtActive : s.tabTxtInactive}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={s.label}>Image URL (Optional)</Text>
          <View style={[s.input, s.flexRow, { paddingVertical: 0, paddingRight: 0 }]}>
            <ImageIcon size={18} color={COLORS.textMuted} style={{ marginRight: 8 }} />
            <TextInput style={{ flex: 1, height: 48, color: COLORS.textPrimary }} placeholder="https://..." value={imageUrl} onChangeText={setImageUrl} />
          </View>

          <View style={[s.card, { marginTop: 8 }]}>
            <View style={[s.flexBetween, { marginBottom: 16 }]}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '800', color: COLORS.textPrimary }}>Dietary Preference</Text>
                <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>Mark as Vegetarian</Text>
              </View>
              <Switch value={isVeg} onValueChange={setIsVeg} trackColor={{ false: COLORS.dangerLight, true: '#D1FAE5' }} thumbColor={isVeg ? COLORS.vegGreen : COLORS.danger} />
            </View>
            <View style={{ height: 1, backgroundColor: COLORS.borderLight, marginBottom: 16 }} />
            <View style={s.flexBetween}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '800', color: COLORS.textPrimary }}>Availability</Text>
                <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>Currently in stock</Text>
              </View>
              <Switch value={inStock} onValueChange={setInStock} trackColor={{ false: COLORS.dangerLight, true: '#D1FAE5' }} thumbColor={inStock ? COLORS.vegGreen : COLORS.danger} />
            </View>
          </View>

        </ScrollView>
        <View style={[s.flexRow, { padding: 16, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.borderLight, gap: 12 }]}>
          <TouchableOpacity style={s.btnSecondary} onPress={onClose}>
            <Text style={{ color: COLORS.textPrimary, fontWeight: '700', fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnPrimary} onPress={handleSave}>
            <Text style={{ color: COLORS.white, fontWeight: '800', fontSize: 15 }}>Save Dish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const EmptyMenuState = ({ query, category }: any) => (
  <View style={{ alignItems: 'center', paddingVertical: 60 }}>
    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
      <Search size={28} color={COLORS.textMuted} />
    </View>
    <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.textPrimary }}>No Dishes Found</Text>
    <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center', maxWidth: 220, lineHeight: 18 }}>
      {query ? `No results for "${query}"` : category !== 'All' ? `No dishes found in category "${category}"` : 'Your menu is empty. Add some dishes to get started.'}
    </Text>
  </View>
);

export const MenuScreen = ({ menuItems, setMenuItems }: any) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDish, setEditingDish] = useState<any>(null);

  const categories = ['All', 'Starters', 'Biryani', 'Main Course', 'Breads', 'Desserts', 'Beverages'];

  const filteredItems = menuItems.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingDish(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (dish: any) => {
    setEditingDish(dish);
    setModalVisible(true);
  };

  const handleSaveDish = (dish: any) => {
    setMenuItems((prev: any) => {
      const exists = prev.find((i: any) => i.id === dish.id);
      if (exists) {
        return prev.map((i: any) => i.id === dish.id ? dish : i);
      } else {
        return [dish, ...prev];
      }
    });
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Dish",
      "Are you sure you want to delete this dish?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setMenuItems((prev: any) => prev.filter((i: any) => i.id !== id));
          } 
        }
      ]
    );
  };

  const toggleStock = (id: string) => {
    setMenuItems((prev: any) => prev.map((item: any) => {
      if (item.id === id) {
        return { ...item, inStock: !item.inStock, isAvailable: !item.inStock };
      }
      return item;
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <MenuHeader menuItems={menuItems} onAddPress={handleOpenAdd} />
        <MenuSearchAndFilter 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          activeCategory={activeCategory} setActiveCategory={setActiveCategory}
        />

        {filteredItems.length > 0 ? (
          filteredItems.map((item: any) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onEdit={handleOpenEdit} 
              onDelete={handleDelete} 
              toggleStock={toggleStock} 
            />
          ))
        ) : (
          <EmptyMenuState query={searchQuery} category={activeCategory} />
        )}
      </ScrollView>

      <DishFormModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSave={handleSaveDish} 
        dish={editingDish}
        categories={categories}
      />
    </View>
  );
};
