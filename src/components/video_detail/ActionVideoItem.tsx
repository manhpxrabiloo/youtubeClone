import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

const ActionVideoItem = ({
  data,
}: {
  data: {
    key: string;
    icon: string;
    title: string;
  }[];
}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.action_item,
            data.length > 1 && data.length - 1 === index && styles.border_left,
          ]}>
          <SvgXml xml={item.icon} width={18} height={18} color="#000" />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default ActionVideoItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingVertical: 7,
    flexDirection: 'row',
  },
  action_item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
  },
  title: {color: '#000', fontSize: 12, fontWeight: '500'},
  border_left: {borderLeftWidth: 0.5, borderLeftColor: '#abb0b6'},
});
