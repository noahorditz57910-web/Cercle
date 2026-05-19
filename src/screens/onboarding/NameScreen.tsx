import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../theme';
import { PrimaryButton } from '../../components/Button';
import { Field } from '../../components/Field';
import { TopBar } from '../../components/TopBar';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Name'>;

export const NameScreen = ({ navigation }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar progress={50} />
        <View style={styles.content}>
          <Text style={styles.title}>Comment tu t'appelles ?</Text>
          <Text style={styles.sub}>Ces infos sont visibles sur ton profil public.</Text>
          <View style={{ marginTop: 28 }}>
            <Field label="PRÉNOM" value={firstName} onChangeText={setFirstName} placeholder="Marie" autoFocus />
            <Field label="NOM" value={lastName} onChangeText={setLastName} placeholder="Dupont" />
          </View>
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            label="Continuer"
            onPress={() => navigation.navigate('Done')}
            disabled={!firstName.trim() || !lastName.trim()}
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
  footer: { paddingHorizontal: 24, paddingBottom: 28 },
});
