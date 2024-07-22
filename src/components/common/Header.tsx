import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {bell, magnifying_glass} from 'icons';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabParamList, HomeStackParamList} from 'types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
const logo = require('../../assets/images/logo_app.png');

type VideoDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParamList>
>;
const Header = () => {
  const navigation = useNavigation<VideoDetailScreenNavigationProp>();
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.icon_container}>
        <SvgXml xml={bell} width={24} height={24} color={'#000'} />
        <SvgXml
          xml={magnifying_glass}
          width={24}
          height={24}
          color={'#000'}
          onPress={() => navigation.jumpTo('Search')}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  icon_container: {gap: 15, flexDirection: 'row'},
  logo: {width: 100, height: 50, objectFit: 'contain', marginLeft: -5},
});
