import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

type ErrorComponentProps = {refetch: () => void};

const ErrorComponent: FC<ErrorComponentProps> = ({refetch}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Xảy ra lỗi{' '}
        <Text style={styles.refetch} onPress={refetch}>
          thử lại
        </Text>
      </Text>
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {color: '#000'},
  refetch: {
    fontWeight: '500',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    color: '#f50202',
  },
});
