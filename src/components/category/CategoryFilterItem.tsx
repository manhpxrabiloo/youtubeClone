/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';

type CategoryFilterItemProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const CategoryFilterItem: FC<CategoryFilterItemProps> = ({
  title,
  isActive,
  onPress,
}) => {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.title,
        {
          color: isActive ? '#fff' : '#000',
          backgroundColor: isActive ? '#000' : '#f5f5f5',
        },
      ]}>
      {title}
    </Text>
  );
};

export default CategoryFilterItem;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: '500',
    lineHeight: 18,
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
