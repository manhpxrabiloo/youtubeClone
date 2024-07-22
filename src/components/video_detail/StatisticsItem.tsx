import {StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import {BottomSheetView} from '@gorhom/bottom-sheet';

type StatisticsItemProps = {value: string; label: string};
const StatisticsItem: FC<StatisticsItemProps> = ({value, label}) => {
  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </BottomSheetView>
  );
};

export default StatisticsItem;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  value: {fontSize: 18, fontWeight: '900', color: '#000'},
  label: {color: '#687076', fontSize: 12},
});
