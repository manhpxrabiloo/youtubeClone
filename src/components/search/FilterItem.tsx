import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

type DataType = {key: any; title: string};
type FilterItemProps = {
  label: string;
  data: DataType[];
  value: any;
  onChange: (item: DataType) => void;
};
const FilterItem: FC<FilterItemProps> = ({label, data, value, onChange}) => {
  return (
    <View style={styles.filterItem}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        containerStyle={styles.containerDropdown}
        style={styles.dropdown}
        placeholderStyle={styles.text}
        selectedTextStyle={styles.text}
        itemTextStyle={styles.text}
        activeColor={'#fff'}
        labelField="title"
        valueField="key"
        data={data}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  label: {color: '#000', width: 90},
  filterItem: {gap: 15, flexDirection: 'row', alignItems: 'center'},
  text: {color: '#000', fontSize: 16},
  dropdown: {flex: 1},
  containerDropdown: {
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    borderWidth: 0,
  },
});
