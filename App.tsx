import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from 'routes';
import {onlineManager, QueryClient, QueryClientProvider} from 'react-query';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import NetInfoComponent from 'components/common/NetInfoComponent';

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});
const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
          <NetInfoComponent />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({container: {flex: 1}});

export default App;
