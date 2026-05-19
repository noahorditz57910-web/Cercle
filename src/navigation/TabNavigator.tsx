import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/tabs/HomeScreen';
import { SearchScreen } from '../screens/tabs/SearchScreen';
import { PublishScreen } from '../screens/tabs/PublishScreen';
import { MessagesScreen } from '../screens/tabs/MessagesScreen';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';
import { Colors } from '../theme';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabBar = ({ state, descriptors, navigation }: any) => {
  const tabs = [
    { key: 'Home', label: 'Accueil', icon: '⌂' },
    { key: 'Search', label: 'Recherche', icon: '⌕' },
    { key: 'Publish', label: 'Publier', icon: '+', fab: true },
    { key: 'Messages', label: 'Messages', icon: '✉' },
    { key: 'Profile', label: 'Profil', icon: '◯' },
  ];

  return (
    <View style={styles.bar}>
      {tabs.map((tab, i) => {
        const isFocused = state.index === i;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: state.routes[i].key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(state.routes[i].name);
          }
        };

        if (tab.fab) {
          return (
            <View key={tab.key} style={styles.fabWrap}>
              <TouchableOpacity onPress={onPress} style={[styles.fab, isFocused && styles.fabActive]} activeOpacity={0.85}>
                <Text style={styles.fabIcon}>+</Text>
              </TouchableOpacity>
              <Text style={[styles.fabLabel, isFocused && { color: Colors.violet }]}>{tab.label}</Text>
            </View>
          );
        }

        return (
          <TouchableOpacity key={tab.key} onPress={onPress} style={styles.tab} activeOpacity={0.7}>
            <Text style={[styles.icon, isFocused && { color: Colors.violet }]}>{tab.icon}</Text>
            <Text style={[styles.label, isFocused && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Publish" component={PublishScreen} />
    <Tab.Screen name="Messages" component={MessagesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    paddingBottom: 24,
    paddingTop: 2,
    shadowColor: '#0E0B2B',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 10,
  },
  tab: { flex: 1, alignItems: 'center', gap: 4, paddingTop: 8 },
  icon: { fontSize: 22, color: Colors.ink2 },
  label: { fontSize: 10.5, fontWeight: '600', color: Colors.ink2 },
  labelActive: { color: Colors.violet, fontWeight: '700' },
  fabWrap: { flex: 1, alignItems: 'center', position: 'relative' },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.violet,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
    shadowColor: Colors.violet,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 8,
  },
  fabActive: { backgroundColor: Colors.violetDeep },
  fabIcon: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 32 },
  fabLabel: { fontSize: 10.5, fontWeight: '700', color: Colors.violet, marginTop: 16 },
});
