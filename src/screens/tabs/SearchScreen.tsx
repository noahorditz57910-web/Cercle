import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors } from '../../theme';
import { useLocation } from '../../hooks/useLocation';
import { getDistanceMeters, formatDistance } from '../../utils/distance';

const DISTANCE_FILTERS = [
  { label: 'Tout', maxMeters: Infinity },
  { label: '< 1 km', maxMeters: 1000 },
  { label: '< 2 km', maxMeters: 2000 },
  { label: '< 5 km', maxMeters: 5000 },
  { label: '< 10 km', maxMeters: 10000 },
];

const RESULTS = [
  {
    id: '1',
    title: 'Perceuse-visseuse 18V',
    owner: 'Atelier Voltaire',
    kind: 'pro',
    price: '9',
    rating: '4.89',
    color: '#E4DFFF',
    coords: { lat: 48.8559, lng: 2.3667 },
  },
  {
    id: '2',
    title: 'Perceuse à percussion Bosch',
    owner: 'Chez Karim',
    kind: 'part',
    price: '7',
    rating: '4.7',
    color: '#E4DFFF',
    coords: { lat: 48.8612, lng: 2.3720 },
  },
  {
    id: '3',
    title: 'Visseuse 12V compacte',
    owner: 'Bricomarket Pro',
    kind: 'pro',
    price: '8',
    rating: '4.95',
    color: '#E4DFFF',
    coords: { lat: 48.8480, lng: 2.3650 },
  },
  {
    id: '4',
    title: 'Pack perceuse + meuleuse',
    owner: 'Chez Mathieu',
    kind: 'part',
    price: '14',
    rating: '4.6',
    color: '#E4DFFF',
    coords: { lat: 48.8400, lng: 2.3500 },
  },
];

const OTHER_FILTERS = ['Pro vérifié', 'Dispo ce w-e', 'Moins de 15€/j'];

const Badge = ({ kind }: { kind: string }) => (
  <View style={[styles.badge, kind === 'pro' ? styles.badgePro : styles.badgePart]}>
    <Text style={[styles.badgeText, kind === 'pro' ? { color: '#fff' } : { color: Colors.ink }]}>
      {kind === 'pro' ? 'PRO' : 'Particulier'}
    </Text>
  </View>
);

type Result = typeof RESULTS[0] & { computedDist: number };

const SmallCard = ({ item }: { item: Result }) => (
  <TouchableOpacity style={styles.card}>
    <View style={[styles.cardImg, { backgroundColor: item.color }]} />
    <View style={styles.cardContent}>
      <View style={styles.cardTop}>
        <Badge kind={item.kind} />
        <Text style={styles.dist}> · {formatDistance(item.computedDist)}</Text>
      </View>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.owner}>{item.owner}</Text>
      <View style={styles.cardBottom}>
        <Text style={styles.rating}>★ {item.rating}</Text>
        <Text style={styles.price}>{item.price}€<Text style={styles.unit}>/j</Text></Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const SearchScreen = () => {
  const [activeDistIdx, setActiveDistIdx] = useState(0);
  const [activeOtherFilters, setActiveOtherFilters] = useState<string[]>([]);
  const location = useLocation();

  const userCoords = location.status === 'loading' ? null : location.coords;

  const filteredResults = useMemo<Result[]>(() => {
    const maxMeters = DISTANCE_FILTERS[activeDistIdx].maxMeters;
    return RESULTS
      .map(item => ({
        ...item,
        computedDist: userCoords ? getDistanceMeters(userCoords, item.coords) : 0,
      }))
      .filter(item => !userCoords || item.computedDist <= maxMeters)
      .sort((a, b) => a.computedDist - b.computedDist);
  }, [userCoords, activeDistIdx]);

  const toggleOtherFilter = (f: string) =>
    setActiveOtherFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );

  const activeFilterCount = (activeDistIdx > 0 ? 1 : 0) + activeOtherFilters.length;

  return (
    <SafeAreaView style={styles.root}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={{ color: Colors.ink, fontSize: 18 }}>‹</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.ink }}>perceuse</Text>
          <View style={styles.divider} />
          <Text style={{ fontSize: 12.5, color: Colors.ink2 }}>Sam 14 — Dim 15</Text>
        </View>
      </View>

      {/* Filters row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        {/* Active filters summary chip */}
        <TouchableOpacity style={[styles.chip, activeFilterCount > 0 && styles.chipActive]}>
          <Text style={[styles.chipText, activeFilterCount > 0 && { color: '#fff' }]}>
            ⚙ Filtres{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
          </Text>
        </TouchableOpacity>

        {/* Distance chips */}
        {DISTANCE_FILTERS.slice(1).map((f, i) => {
          const idx = i + 1;
          const active = activeDistIdx === idx;
          return (
            <TouchableOpacity
              key={f.label}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setActiveDistIdx(active ? 0 : idx)}
            >
              <Text style={[styles.chipText, active && { color: '#fff' }]}>
                📍 {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Other filters */}
        {OTHER_FILTERS.map(f => {
          const active = activeOtherFilters.includes(f);
          return (
            <TouchableOpacity
              key={f}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => toggleOtherFilter(f)}
            >
              <Text style={[styles.chipText, active && { color: '#fff' }]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Location status */}
      {location.status !== 'granted' && (
        <View style={styles.locationBanner}>
          {location.status === 'loading' ? (
            <>
              <ActivityIndicator size="small" color={Colors.violet} />
              <Text style={styles.locationBannerText}>Localisation en cours...</Text>
            </>
          ) : (
            <Text style={styles.locationBannerText}>
              📍 Position approximative — active la géolocalisation pour des distances précises
            </Text>
          )}
        </View>
      )}

      {/* Mini map */}
      <View style={styles.mapContainer}>
        <View style={styles.mapBg} />
        {filteredResults.slice(0, 3).map((item, i) => {
          const positions = [
            { left: 40, top: 40 },
            { left: 140, top: 75 },
            { left: 220, top: 45 },
          ];
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.pin, { left: positions[i].left, top: positions[i].top }, i === 0 && styles.pinActive]}
            >
              <Text style={[styles.pinText, i === 0 && { color: '#fff' }]}>{item.price}€</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.mapCta}>
          <Text style={styles.mapCtaText}>📍 Voir la carte</Text>
        </TouchableOpacity>
      </View>

      {/* Results header */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsCount}>
          {filteredResults.length} résultat{filteredResults.length !== 1 ? 's' : ''}
          {activeDistIdx > 0 ? ` · ${DISTANCE_FILTERS[activeDistIdx].label}` : ''}
        </Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Text style={styles.sortText}>
            Trier : <Text style={{ color: Colors.ink, fontWeight: '700' }}>Plus proche</Text> ›
          </Text>
        </TouchableOpacity>
      </View>

      {filteredResults.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>Aucun résultat</Text>
          <Text style={styles.emptyText}>
            Élargis le rayon ou retire un filtre.
          </Text>
          <TouchableOpacity onPress={() => setActiveDistIdx(0)}>
            <Text style={styles.emptyAction}>Supprimer le filtre distance</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.list}>
          {filteredResults.map(item => <SmallCard key={item.id} item={item} />)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingTop: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, alignItems: 'center', justifyContent: 'center' },
  searchBox: { flex: 1, height: 44, borderRadius: 22, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 8 },
  divider: { width: 1, height: 20, backgroundColor: Colors.line, marginHorizontal: 4 },

  filters: { marginTop: 12 },
  chip: { height: 36, paddingHorizontal: 14, borderRadius: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, justifyContent: 'center' },
  chipActive: { backgroundColor: Colors.violet, borderColor: Colors.violet },
  chipText: { fontSize: 12.5, fontWeight: '600', color: Colors.ink },

  locationBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginTop: 10, padding: 10, backgroundColor: Colors.violetTint, borderRadius: 12, borderWidth: 1, borderColor: Colors.violetSoft },
  locationBannerText: { fontSize: 12, color: Colors.ink2, flex: 1, lineHeight: 17 },

  mapContainer: { marginHorizontal: 16, marginTop: 14, height: 152, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: Colors.line, position: 'relative', backgroundColor: Colors.violetSoft },
  mapBg: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.violetTint },
  pin: { position: 'absolute', height: 28, paddingHorizontal: 10, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#fff', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
  pinActive: { backgroundColor: Colors.violet, borderColor: Colors.violet },
  pinText: { fontSize: 12, fontWeight: '800', color: Colors.ink },
  mapCta: { position: 'absolute', bottom: 10, right: 10, height: 30, paddingHorizontal: 12, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 },
  mapCtaText: { fontSize: 11.5, fontWeight: '700', color: Colors.ink },

  resultsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 16, paddingVertical: 14 },
  resultsCount: { fontSize: 15, fontWeight: '800', letterSpacing: -0.2, color: Colors.ink },
  sortBtn: {},
  sortText: { fontSize: 12.5, color: Colors.ink2, fontWeight: '600' },

  list: { paddingHorizontal: 16, gap: 10, paddingBottom: 24 },
  card: { flexDirection: 'row', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 10, borderWidth: 1, borderColor: Colors.line },
  cardImg: { width: 88, height: 88, borderRadius: 12 },
  cardContent: { flex: 1, justifyContent: 'space-between', paddingVertical: 2 },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  badge: { height: 20, paddingHorizontal: 7, borderRadius: 10, justifyContent: 'center' },
  badgePro: { backgroundColor: Colors.violet },
  badgePart: { backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line },
  badgeText: { fontSize: 10, fontWeight: '700' },
  dist: { fontSize: 11, color: Colors.ink3, fontWeight: '600' },
  title: { fontSize: 14, fontWeight: '700', color: Colors.ink, letterSpacing: -0.2, marginTop: 4 },
  owner: { fontSize: 12, color: Colors.ink2, marginTop: 2 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  rating: { fontSize: 12.5, fontWeight: '700', color: Colors.ink },
  price: { fontSize: 14, fontWeight: '800', color: Colors.ink, letterSpacing: -0.3 },
  unit: { fontSize: 11, color: Colors.ink2, fontWeight: '500' },

  emptyState: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 32 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyTitle: { fontSize: 17, fontWeight: '800', color: Colors.ink, marginBottom: 6 },
  emptyText: { fontSize: 14, color: Colors.ink2, textAlign: 'center', lineHeight: 21, marginBottom: 14 },
  emptyAction: { fontSize: 14, fontWeight: '700', color: Colors.violet },
});
