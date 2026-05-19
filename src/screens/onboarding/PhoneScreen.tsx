import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../theme';
import { PrimaryButton } from '../../components/Button';
import { Field } from '../../components/Field';
import { TopBar } from '../../components/TopBar';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Phone'>;

export const PhoneScreen = ({ navigation }: Props) => {
  const [phone, setPhone] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar progress={16} />
        <View style={styles.content}>
          <Text style={styles.title}>Ton numéro de mobile</Text>
          <Text style={styles.sub}>
            On t'envoie un code à 6 chiffres pour vérifier que c'est bien toi. Tarif standard.
          </Text>
          <View style={{ marginTop: 28 }}>
            <Field
              label="NUMÉRO DE MOBILE"
              value={phone}
              onChangeText={setPhone}
              placeholder="6 12 34 56 78"
              prefix="🇫🇷 +33"
              keyboardType="phone-pad"
              autoFocus
            />
          </View>
          <Text style={styles.legal}>
            En continuant tu acceptes nos{' '}
            <Text style={{ color: Colors.ink, textDecorationLine: 'underline' }}>CGU</Text>
            {' '}et notre{' '}
            <Text style={{ color: Colors.ink, textDecorationLine: 'underline' }}>Politique de confidentialité</Text>.
          </Text>
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            label="Recevoir le code"
            onPress={() => navigation.navigate('Otp', { phone })}
            disabled={phone.length < 9}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6, lineHeight: 34, color: Colors.ink },
  sub: { fontSize: 14.5, color: Colors.ink2, lineHeight: 22, marginTop: 10 },
  legal: { fontSize: 12, color: Colors.ink3, lineHeight: 18, marginTop: 8 },
  footer: { paddingHorizontal: 24, paddingBottom: 28 },
});
