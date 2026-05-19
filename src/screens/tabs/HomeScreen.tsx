import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors } from '../../theme';
import { useLocation } from '../../hooks/useLocation';
import { getDistanceMeters, formatDistance } from '../../utils/distance';

const CATEGORIES = [
  { key: 'all', label: 'Tout' },
  { key: 'tool', label: 'Outils' },
  { key: 'sport', label: 'Sport' },
  { key: 'photo', label: 'Photo' },
  { key: 'home', label: 'Maison' },
  { key: 'car', label: 'Mobilité' },
];

const DISTANCE_FILTERS = [
  { label: 'Tout', maxMeters: Infinity },
  { label: '500 m', maxMeters: 500 },
  { label: '1 km', maxMeters: 1000 },
  { label: '2 km', maxMeters: 2000 },
  { label: '5 km', maxMeters: 5000 },
  { label: '10 km', maxMeters: 10000 },
];

const LISTINGS = [
  {
    id: '1',
    title: 'VTT électrique Moustache',
    owner: 'Chez Camille · 5 locations',
    kind: 'part',
    city: 'Paris 11',
    price: '28',
    rating: '4.96',
    count: 124,
    featured: true,
    color: '#FDE6D2',
    coords: { lat: 48.8534, lng: 2.3708 },
  },
  {
    id: '2',
    title: 'Perceuse-visseuse 18V + 2 batteries',
    owner: 'Atelier Voltaire · Pro vérifié',
    kind: 'pro',
    city: 'Paris 11',
    price: '9',
    rating: '4.89',
    count: 312,
    color: '#E4DFFF',
    coords: { lat: 48.8559, lng: 2.3667 },
  },
  {
    id: '3',
    title: 'Sony α7 IV + objectif 50mm f/1.8',
    owner: 'Studio Bastille · Pro vérifié',
    kind: 'pro',
    city: 'Paris 11',
    price: '65',
    rating: '5.0',
    count: 48,
    color: '#D7F4E6',
    coords: { lat: 48.8537, lng: 2.3695 },
  },
  {
    id: '4',
    title: 'Tente 4 places + matelas gonflables',
    owner: 'Chez Thomas · 12 locations',
    kind: 'part',
    city: 'Paris 12',
    price: '22',
    rating: '4.78',
    count: 36,
    color: '#FFD9E0',
    coords: { lat: 48.8492, lng: 2.3800 },
  },
];

const Badge = ({ kind }: { kind: string }) => (
  <View style={[styles.badge, kind === 'pro' ? styles.badgePro : styles.badgePart]}>
    <Text style={[styles.badgeText, kind === 'pro' ? { color: '#fff' } : { color: Colors.ink }]}>
      {kind === 'pro' ? 'PRO' : 'Particulier'}
    </Text>
  </View>
);

type Listing = typeof LISTINGS[0] & { computedDist: number };

const Card = ({ item }: { item: Listing }) => (
  <View style={styles.card}>
    <View style={[styles.cardImg, { backgroundColor: item.color }]}>
      {item.featured && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>★ POPULAIRE</Text>
        </View>
      )}
      <View style={styles.heartBtn}>
        <Text style={{ color: '#fff', fontSize: 14 }}>♡</Text>
      </View>
      <View style={{ position: 'absolute', top: 10, left: 10 }}>
        <Badge kind={item.kind} />
      </View>
    </View>
    <View style={styles.cardBody}>
      <View style={styles.cardRow}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardRating}>★ {item.rating}</Text>
      </View>
      <Text style={styles.cardOwner}>{item.owner}</Text>
      <Text style={styles.cardCity}>📍 {item.city} · {formatDistance(item.computedDist)}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{item.price}€ <Text style={styles.cardUnit}>/ jour</Text></Text>
        <TouchableOpacity style={styles.reserveBtn}>
          <Text style={styles.reserveText}>Réserver →</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDistanceIdx, setActiveDistanceIdx] = useState(0);
  const location = useLocation();

  const userCoords = location.status === 'loading' ? null : location.coords;

  const filteredListings = useMemo<Listing[]>(() => {
    const maxMeters = DISTANCE_FILTERS[activeDistanceIdx].maxMeters;

    return LISTINGS
      .map(item => ({
        ...item,
        computedDist: userCoords
          ? getDistanceMeters(userCoords, item.coords)
          : 0,
      }))
      .filter(item => !userCoords || item.computedDist <= maxMeters)
      .sort((a, b) => a.computedDist - b.computedDist);
  }, [userCoords, activeDistanceIdx]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>📍 Localisation</Text>
            <Text style={styles.locationName}>
              {location.status === 'loading'
                ? 'Localisation...'
                : location.status === 'denied'
                ? 'Paris 11ème (par défaut) ›'
                : 'Ma position ›'}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.bellBtn}>
              <Text style={{ fontSize: 16 }}>🔔</Text>
              <View style={styles.notifDot} />
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LM</Text>
            </View>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Que cherchez-vous à louer ?</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={{ color: '#fff', fontSize: 16 }}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Promo banner */}
        <View style={styles.banner}>
          <View style={styles.bannerBubble1} />
          <View style={styles.bannerBubble2} />
          <Text style={styles.bannerTag}>NOUVEAU</Text>
          <Text style={styles.bannerTitle}>Loue, dépanne, recommence.{'\n'}Près de chez toi.</Text>
          <TouchableOpacity style={styles.bannerCta}>
            <Text style={styles.bannerCtaText}>Découvrir →</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setActiveCategory(cat.key)}
              style={[styles.catItem, activeCategory === cat.key && styles.catItemActive]}
            >
              <Text style={[styles.catLabel, activeCategory === cat.key && styles.catLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Distance filter */}
        <View style={styles.distanceHeader}>
          <Text style={styles.distanceTitle}>📍 Distance</Text>
          {location.status === 'denied' && (
            <Text style={styles.distanceFallback}>Position approximative</Text>
          )}
          {location.status === 'loading' && (
            <ActivityIndicator size="small" color={Colors.violet} />
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {DISTANCE_FILTERS.map((f, idx) => (
            <TouchableOpacity
              key={f.label}
              onPress={() => setActiveDistanceIdx(idx)}
              style={[styles.distChip, activeDistanceIdx === idx && styles.distChipActive]}
            >
              <Text style={[styles.distChipText, activeDistanceIdx === idx && styles.distChipTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section header */}
        <View style={styles.sectionRow}>
          <View>
            <Text style={styles.sectionTitle}>À louer près de toi</Text>
            <Text style={styles.sectionSub}>
              {filteredListings.length} annonce{filteredListings.length !== 1 ? 's' : ''}
              {activeDistanceIdx > 0 ? ` · moins de ${DISTANCE_FILTERS[activeDistanceIdx].label}` : ''}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Aucune annonce</Text>
            <Text style={styles.emptyText}>
              Aucun article disponible dans un rayon de{' '}
              {DISTANCE_FILTERS[activeDistanceIdx].label}.
            </Text>
            <TouchableOpacity onPress={() => setActiveDistanceIdx(0)}>
              <Text style={styles.emptyAction}>Élargir la recherche</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listings}>
            {filteredListings.map(item => <Card key={item.id} item={item} />)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 },
  locationLabel: { fontSize: 11.5, color: Colors.ink2, fontWeight: '600', letterSpacing: 0.4, textTransform: 'uppercase' },
  locationName: { fontSize: 19, fontWeight: '800', letterSpacing: -0.4, color: Colors.ink, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.violet, borderWidth: 2, borderColor: '#fff' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.warn, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '800', color: '#2C2150' },

  searchRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 16, alignItems: 'center' },
  searchBar: { flex: 1, height: 50, borderRadius: 25, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, gap: 10 },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: { fontSize: 14.5, color: Colors.ink3, fontWeight: '500' },
  filterBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.ink, alignItems: 'center', justifyContent: 'center' },

  banner: { marginHorizontal: 20, marginTop: 14, borderRadius: 20, padding: 18, backgroundColor: Colors.violet, overflow: 'hidden', position: 'relative' },
  bannerBubble1: { position: 'absolute', right: -30, top: -30, width: 130, height: 130, borderRadius: 65, backgroundColor: 'rgba(255,255,255,0.08)' },
  bannerBubble2: { position: 'absolute', right: 20, bottom: -50, width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.06)' },
  bannerTag: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: 'rgba(255,255,255,0.85)' },
  bannerTitle: { marginTop: 4, fontSize: 17, fontWeight: '800', color: '#fff', letterSpacing: -0.3, lineHeight: 22, maxWidth: 220 },
  bannerCta: { marginTop: 10, alignSelf: 'flex-start', height: 30, paddingHorizontal: 12, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.18)', justifyContent: 'center' },
  bannerCtaText: { fontSize: 12, fontWeight: '700', color: '#fff' },

  categories: { marginTop: 18 },
  catItem: { height: 36, paddingHorizontal: 16, borderRadius: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, justifyContent: 'center' },
  catItemActive: { backgroundColor: Colors.ink, borderColor: Colors.ink },
  catLabel: { fontSize: 13.5, fontWeight: '600', color: Colors.ink },
  catLabelActive: { color: '#fff', fontWeight: '700' },

  distanceHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  distanceTitle: { fontSize: 14, fontWeight: '700', color: Colors.ink },
  distanceFallback: { fontSize: 12, color: Colors.ink3, fontWeight: '500' },

  distChip: { height: 36, paddingHorizontal: 16, borderRadius: 18, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.line, justifyContent: 'center' },
  distChipActive: { backgroundColor: Colors.violet, borderColor: Colors.violet },
  distChipText: { fontSize: 13, fontWeight: '600', color: Colors.ink },
  distChipTextActive: { color: '#fff', fontWeight: '700' },

  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 19, fontWeight: '800', letterSpacing: -0.3, color: Colors.ink },
  sectionSub: { fontSize: 12.5, color: Colors.ink2, marginTop: 2 },
  seeAll: { fontSize: 13, fontWeight: '700', color: Colors.violet },

  listings: { paddingHorizontal: 20, gap: 16, paddingBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: Colors.line },
  cardImg: { height: 168, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  heartBtn: { position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(14,11,43,0.35)', alignItems: 'center', justifyContent: 'center' },
  popularBadge: { position: 'absolute', bottom: 10, left: 10, height: 24, paddingHorizontal: 9, borderRadius: 6, backgroundColor: Colors.warn, justifyContent: 'center' },
  popularText: { fontSize: 11, fontWeight: '800', color: '#2C2150', letterSpacing: 0.4 },
  badge: { height: 22, paddingHorizontal: 8, borderRadius: 11, justifyContent: 'center' },
  badgePro: { backgroundColor: Colors.violet },
  badgePart: { backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line },
  badgeText: { fontSize: 10.5, fontWeight: '700', letterSpacing: 0.3 },
  cardBody: { padding: 14 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 },
  cardTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: Colors.ink, letterSpacing: -0.2 },
  cardRating: { fontSize: 13.5, fontWeight: '700', color: Colors.ink },
  cardOwner: { fontSize: 13, color: Colors.ink2, marginTop: 4 },
  cardCity: { fontSize: 12.5, color: Colors.ink2, marginTop: 6 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.line, borderStyle: 'dashed' },
  cardPrice: { fontSize: 18, fontWeight: '800', color: Colors.ink, letterSpacing: -0.3 },
  cardUnit: { fontSize: 13, color: Colors.ink2, fontWeight: '500' },
  reserveBtn: { height: 36, paddingHorizontal: 14, borderRadius: 18, backgroundColor: Colors.violet, justifyContent: 'center' },
  reserveText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: Colors.ink, marginBottom: 8 },
  emptyText: { fontSize: 14.5, color: Colors.ink2, textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  emptyAction: { fontSize: 14, fontWeight: '700', color: Colors.violet },
});
