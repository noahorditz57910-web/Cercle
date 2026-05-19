import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../theme';

const MENU_ITEMS = [
  { icon: '📦', label: 'Mes annonces', sub: '3 actives' },
  { icon: '📅', label: 'Mes réservations', sub: '1 en cours' },
  { icon: '⭐', label: 'Mes avis', sub: '4.9 · 18 avis' },
  { icon: '💳', label: 'Paiements', sub: 'Visa •••• 4242' },
  { icon: '🔔', label: 'Notifications', sub: '' },
  { icon: '🛡', label: 'Sécurité', sub: '' },
  { icon: '🚪', label: 'Se déconnecter', sub: '', danger: true },
];

export const ProfileScreen = () => (
  <SafeAreaView style={styles.root}>
    <ScrollView>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity>
          <Text style={styles.edit}>Modifier</Text>
        </TouchableOpacity>
      </View>

      {/* Profile card */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LM</Text>
          <View style={styles.verifyBadge}>
            <Text style={{ fontSize: 10, color: '#fff' }}>✓</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>Léa Moulin</Text>
          <Text style={styles.location}>📍 Paris 11ème</Text>
          <Text style={styles.joined}>Membre depuis mars 2024</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        {[
          { value: '18', label: 'Avis' },
          { value: '4.9', label: 'Note' },
          { value: '3', label: 'Annonces' },
        ].map((stat, i) => (
          <View key={i} style={[styles.stat, i < 2 && styles.statBorder]}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity key={i} style={[styles.menuItem, i === MENU_ITEMS.length - 1 && styles.menuItemLast]}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuLabel, (item as any).danger && { color: Colors.danger }]}>{item.label}</Text>
              {item.sub ? <Text style={styles.menuSub}>{item.sub}</Text> : null}
            </View>
            {!(item as any).danger && <Text style={{ color: Colors.ink3, fontSize: 18 }}>›</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6, color: Colors.ink },
  edit: { fontSize: 15, color: Colors.violet, fontWeight: '600' },

  card: { flexDirection: 'row', gap: 16, paddingHorizontal: 20, marginTop: 20, alignItems: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.warn, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatarText: { fontSize: 22, fontWeight: '800', color: '#2C2150' },
  verifyBadge: { position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.violet, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 20, fontWeight: '800', color: Colors.ink, letterSpacing: -0.3 },
  location: { fontSize: 13, color: Colors.ink2, marginTop: 4 },
  joined: { fontSize: 12, color: Colors.ink3, marginTop: 2 },

  stats: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 20, borderRadius: 16, borderWidth: 1, borderColor: Colors.line, overflow: 'hidden' },
  stat: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  statBorder: { borderRightWidth: 1, borderRightColor: Colors.line },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.ink, letterSpacing: -0.4 },
  statLabel: { fontSize: 12, color: Colors.ink2, marginTop: 2 },

  menu: { marginHorizontal: 20, marginTop: 24, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: Colors.line, overflow: 'hidden', marginBottom: 32 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.line },
  menuItemLast: { borderBottomWidth: 0 },
  menuIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  menuLabel: { fontSize: 15, fontWeight: '600', color: Colors.ink },
  menuSub: { fontSize: 12, color: Colors.ink2, marginTop: 2 },
});
