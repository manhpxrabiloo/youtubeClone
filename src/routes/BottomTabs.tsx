/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {
  home_outline,
  home_solid,
  magnifying_glass,
  magnifying_glass_circle,
} from 'icons';
import {BottomTabParamList} from 'types';
import HomeStack from './HomeStack';
import SearchScreen from 'screen/SearchScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
        headerShown: false,
        tabBarStyle: {elevation: 0},
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#f50202',
        tabBarInactiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({focused}) => (
            <SvgXml
              xml={focused ? home_solid : home_outline}
              color={focused ? '#f50202' : '#000'}
              width={22}
              height={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({focused}) => (
            <SvgXml
              xml={focused ? magnifying_glass_circle : magnifying_glass}
              color={focused ? '#f50202' : '#000'}
              width={22}
              height={22}
            />
          ),
          // unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
