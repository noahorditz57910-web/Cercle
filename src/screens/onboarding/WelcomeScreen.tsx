import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../theme';
import { PrimaryButton, GhostButton } from '../../components/Button';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export const WelcomeScreen = ({ navigation }: Props) =>  (
  <View style={styles.root}>
    <View style={styles.hero}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.logo}>
        <View style={styles.logoIcon}>
          <View style={styles.outerRing} />
          <View style={styles.innerDot} />
        </View>
        <Text style={styles.logoText}>Cercle</Text>
      </View>
      <View style={styles.tagline}>
        <Text style={styles.taglineText}>Loue tout,{'\n'}partage <Text style={{ color: Colors.warn }}>plus</Text>.</Text>
      </View>
    </View>

    <SafeAreaView style={styles.bottom}>
      <Text style={styles.sub}>
        Rejoins <Text style={{ color: Colors.ink, fontWeight: '700' }}>32 000 voisins</Text> qui louent outils, vélos, matériel photo — au lieu d'acheter neuf.
      </Text>
      <PrimaryButton label="Créer un compte" onPress={() => navigation.navigate('Phone')} />
      <GhostButton
        label="Déjà inscrit ? Se connecter"
        color={Colors.violet}
        onPress={() => navigation.navigate('Phone')}
      />
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  hero: {
    height: 540,
    backgroundColor: Colors.violet,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  circle1: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: Colors.warn,
  },
  circle2: {
    position: 'absolute',
    top: 140,
    left: -40,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logo: {
    position: 'absolute',
    top: 70,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: Colors.violet,
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.violet,
  },
  logoText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 19,
    letterSpacing: -0.4,
  },
  tagline: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
  },
  taglineText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.8,
    lineHeight: 42,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 36,
    justifyContent: 'flex-end',
    gap: 8,
  },
  sub: {
    fontSize: 14.5,
    color: Colors.ink2,
    lineHeight: 22,
    marginBottom: 20,
  },
});
