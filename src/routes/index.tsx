import React from 'react';
import {RootStackParamList} from 'types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ChannelDetailScreen from 'screen/ChannelDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChannelDetail"
        component={ChannelDetailScreen}
        options={{
          headerTitleStyle: {fontSize: 18, fontWeight: '500'},
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
