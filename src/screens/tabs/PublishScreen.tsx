import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../theme';
import { Field } from '../../components/Field';
import { PrimaryButton } from '../../components/Button';

const CATEGORIES = [
  { key: 'tool', label: 'Outils' },
  { key: 'sport', label: 'Sport' },
  { key: 'photo', label: 'Photo' },
  { key: 'home', label: 'Maison' },
  { key: 'car', label: 'Mobilité' },
  { key: 'other', label: 'Autre' },
];

export const PublishScreen = () => {
  const [activeCategory, setActiveCategory] = useState('tool');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn}>
          <Text style={{ fontSize: 18, color: Colors.ink }}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.step}>Étape 2 sur 4</Text>
        <Text style={styles.draft}>Brouillon</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Décris ton objet</Text>
        <Text style={styles.sub}>Des photos lumineuses et un titre clair = 3× plus de demandes.</Text>

        {/* Photo upload */}
        <View style={styles.photos}>
          <View style={[styles.photoMain, { backgroundColor: '#E4DFFF' }]}>
            <Text style={{ fontSize: 28 }}>🔨</Text>
          </View>
          <View style={styles.photosSmall}>
            <View style={[styles.photoSm, { backgroundColor: '#E4DFFF' }]}>
              <Text style={{ fontSize: 20 }}>🔨</Text>
            </View>
            <TouchableOpacity style={styles.photoAdd}>
              <Text style={{ fontSize: 20, color: Colors.ink3 }}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.photoAddLarge}>
            <Text style={{ fontSize: 20, color: Colors.ink2 }}>📷</Text>
            <Text style={{ fontSize: 11, color: Colors.ink2, fontWeight: '600', marginTop: 4 }}>Ajouter</Text>
          </TouchableOpacity>
        </View>

        {/* Category */}
        <Text style={styles.sectionLabel}>CATÉGORIE</Text>
        <View style={styles.categories}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setActiveCategory(cat.key)}
              style={[styles.catTile, activeCategory === cat.key && styles.catTileActive]}
            >
              <Text style={[styles.catLabel, activeCategory === cat.key && styles.catLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Field label="TITRE DE L'ANNONCE" value={title} onChangeText={setTitle} placeholder="Ex : VTT électrique Moustache" />
        <Field label="PRIX PAR JOUR (€)" value={price} onChangeText={setPrice} placeholder="Ex : 25" keyboardType="number-pad" />
        <Field label="DESCRIPTION" value={description} onChangeText={setDescription} placeholder="Décris l'état, les accessoires inclus..." />
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Continuer" onPress={() => {}} disabled={!title.trim() || !price.trim()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 4 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line, alignItems: 'center', justifyContent: 'center' },
  step: { fontSize: 12, color: Colors.ink2, fontWeight: '600' },
  draft: { fontSize: 13, fontWeight: '700', color: Colors.violet },
  progressTrack: { marginHorizontal: 16, marginTop: 12, height: 4, backgroundColor: '#EEEDF4', borderRadius: 4, overflow: 'hidden' },
  progressFill: { width: '50%', height: '100%', backgroundColor: Colors.violet },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4, lineHeight: 30, color: Colors.ink },
  sub: { fontSize: 13.5, color: Colors.ink2, marginTop: 6, marginBottom: 18 },

  photos: { flexDirection: 'row', height: 140, gap: 8, marginBottom: 24 },
  photoMain: { flex: 1.4, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  photosSmall: { flex: 1, gap: 8 },
  photoSm: { flex: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  photoAdd: { flex: 1, borderRadius: 12, borderWidth: 2, borderColor: Colors.lineStrong, borderStyle: 'dashed', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  photoAddLarge: { flex: 1, borderRadius: 14, borderWidth: 2, borderColor: Colors.lineStrong, borderStyle: 'dashed', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },

  sectionLabel: { fontSize: 12, fontWeight: '700', color: Colors.ink2, marginBottom: 10, letterSpacing: 0.4 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  catTile: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.line },
  catTileActive: { backgroundColor: Colors.violetTint, borderWidth: 1.5, borderColor: Colors.violet },
  catLabel: { fontSize: 13, fontWeight: '600', color: Colors.ink },
  catLabelActive: { color: Colors.violet, fontWeight: '700' },

  footer: { paddingHorizontal: 20, paddingBottom: 28, paddingTop: 8 },
});
