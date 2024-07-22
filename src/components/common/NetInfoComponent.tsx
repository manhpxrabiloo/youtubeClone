import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

const NetInfoComponent = () => {
  const {isConnected} = useNetInfo();
  if (isConnected === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Mất kết nối mạng</Text>
      </View>
    );
  }
  return;
};

export default NetInfoComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    paddingVertical: 5,
  },
  text: {color: '#fff', fontSize: 12, textAlign: 'center'},
});
