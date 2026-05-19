import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../theme';

const CONVERSATIONS = [
  { id: '1', name: 'Camille L.', item: 'VTT électrique Moustache', time: '14:32', preview: 'Super ! Je vous confirme la dispo pour samedi.', unread: 2, color: '#FDE6D2' },
  { id: '2', name: 'Atelier Voltaire', item: 'Perceuse-visseuse 18V', time: 'Hier', preview: 'Parfait, à vendredi alors 👍', unread: 0, color: '#E4DFFF' },
  { id: '3', name: 'Studio Bastille', item: 'Sony α7 IV', time: 'Lun', preview: 'La caméra est disponible ce week-end.', unread: 0, color: '#D7F4E6' },
  { id: '4', name: 'Thomas R.', item: 'Tente 4 places', time: '28/04', preview: 'Merci pour votre avis ! 😊', unread: 0, color: '#FFD9E0' },
];

export const MessagesScreen = () => (
  <SafeAreaView style={styles.root}>
    <View style={styles.header}>
      <Text style={styles.title}>Messages</Text>
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Modifier</Text>
      </TouchableOpacity>
    </View>

    <ScrollView contentContainerStyle={styles.list}>
      {CONVERSATIONS.map(conv => (
        <TouchableOpacity key={conv.id} style={styles.row}>
          <View style={[styles.avatar, { backgroundColor: conv.color }]}>
            <Text style={styles.avatarInitials}>{conv.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.rowTop}>
              <Text style={styles.name}>{conv.name}</Text>
              <Text style={styles.time}>{conv.time}</Text>
            </View>
            <Text style={styles.item} numberOfLines={1}>{conv.item}</Text>
            <Text style={[styles.preview, conv.unread > 0 && styles.previewBold]} numberOfLines={1}>{conv.preview}</Text>
          </View>
          {conv.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conv.unread}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6, color: Colors.ink },
  editBtn: {},
  editText: { fontSize: 15, color: Colors.violet, fontWeight: '600' },
  list: { paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: Colors.line, gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontSize: 16, fontWeight: '800', color: '#2C2150' },
  content: { flex: 1 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  name: { fontSize: 15, fontWeight: '700', color: Colors.ink },
  time: { fontSize: 12, color: Colors.ink3 },
  item: { fontSize: 12, color: Colors.violet, fontWeight: '600', marginTop: 2 },
  preview: { fontSize: 13, color: Colors.ink2, marginTop: 2 },
  previewBold: { fontWeight: '700', color: Colors.ink },
  badge: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.violet, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 12, fontWeight: '800', color: '#fff' },
});
