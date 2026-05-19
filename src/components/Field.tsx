import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../theme';

interface Props {
  label?: string;
  value: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  keyboardType?: 'default' | 'phone-pad' | 'number-pad' | 'email-address';
  autoFocus?: boolean;
  secureTextEntry?: boolean;
}

export const Field = ({ label, value, onChangeText, placeholder, prefix, keyboardType, autoFocus, secureTextEntry }: Props) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={styles.wrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.box, focused && styles.boxFocused]}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.ink3}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.ink2,
    marginBottom: 8,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  box: {
    height: 54,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  boxFocused: {
    borderWidth: 1.5,
    borderColor: Colors.violet,
    shadowColor: Colors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  prefix: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.ink2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.ink,
    fontWeight: '500',
  },
});
