import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../theme';

interface Props {
  label: string;
  onPress?: () => void;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton = ({ label, onPress, color = Colors.violet, disabled, style }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
    style={[styles.btn, { backgroundColor: disabled ? '#E2E0EE' : color }, style]}
  >
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export const GhostButton = ({ label, onPress, color = Colors.ink }: Props) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.ghost}>
    <Text style={[styles.label, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.violet,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 6,
  },
  ghost: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
