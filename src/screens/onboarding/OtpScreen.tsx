import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../theme';
import { PrimaryButton } from '../../components/Button';
import { TopBar } from '../../components/TopBar';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Otp'>;

export const OtpScreen = ({ navigation, route }: Props) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, i: number) => {
    const next = [...code];
    next[i] = text.slice(-1);
    setCode(next);
    if (text && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyPress = (key: string, i: number) => {
    if (key === 'Backspace' && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const full = code.every(Boolean);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopBar progress={32} />
      <View style={styles.content}>
        <Text style={styles.title}>Entre le code reçu</Text>
        <Text style={styles.sub}>
          Envoyé au <Text style={{ color: Colors.ink, fontWeight: '700' }}>{route.params?.phone || '+33 6 12 34 56 78'}</Text>.
        </Text>
        <View style={styles.inputs}>
          {code.map((d, i) => (
            <TextInput
              key={i}
              ref={r => { inputs.current[i] = r; }}
              style={[styles.cell, d ? styles.cellFilled : null]}
              value={d}
              onChangeText={t => handleChange(t, i)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={i === 0}
              selectTextOnFocus
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>Renvoyer le code</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          label="Continuer"
          onPress={() => navigation.navigate('Name')}
          disabled={!full}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6, lineHeight: 34, color: Colors.ink },
  sub: { fontSize: 14.5, color: Colors.ink2, lineHeight: 22, marginTop: 10 },
  inputs: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 32,
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.line,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: Colors.ink,
    backgroundColor: '#fff',
  },
  cellFilled: {
    borderColor: Colors.violet,
    backgroundColor: Colors.violetTint,
  },
  resend: { marginTop: 24, alignSelf: 'center' },
  resendText: { fontSize: 14, color: Colors.violet, fontWeight: '600' },
  footer: { paddingHorizontal: 24, paddingBottom: 28 },
});
