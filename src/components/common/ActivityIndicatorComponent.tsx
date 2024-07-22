import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const ActivityIndicatorComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'#f50202'} />
    </View>
  );
};

export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
