import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../theme';
import { PrimaryButton } from '../../components/Button';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Done'>;

export const DoneScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.root}>
    <View style={styles.center}>
      <View style={styles.badge}>
        <View style={styles.outerRing} />
        <View style={styles.innerDot} />
      </View>
      <Text style={styles.title}>Bienvenue dans Cercle !</Text>
      <Text style={styles.sub}>
        Ton compte est prêt. Explore les annonces de tes voisins ou publie le tien.
      </Text>
    </View>
    <View style={styles.footer}>
      <PrimaryButton label="Explorer les annonces →" onPress={() => navigation.navigate('Main' as any)} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.violetSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  outerRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: Colors.violet,
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.violet,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.ink,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    color: Colors.ink2,
    lineHeight: 22,
    textAlign: 'center',
  },
  footer: { paddingHorizontal: 24, paddingBottom: 28 },
});
