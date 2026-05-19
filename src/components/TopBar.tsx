import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  progress?: number;
}

export const TopBar = ({ progress }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>
      {progress !== undefined && (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress}%` as any }]} />
        </View>
      )}
    </View>
  );
};

const BackIcon = () => (
  <View style={{ width: 14, height: 14, borderTopWidth: 2, borderLeftWidth: 2, borderColor: Colors.ink, transform: [{ rotate: '-45deg' }] }} />
);

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F0F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    flex: 1,
    height: 4,
    backgroundColor: '#EEEDF4',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.violet,
    borderRadius: 4,
  },
});
