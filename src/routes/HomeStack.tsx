import React from 'react';
import {HomeStackParamList} from 'types';
import HomeScreen from 'screen/HomeScreen';
import VideoDetailScreen from '@screen/VideoDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
