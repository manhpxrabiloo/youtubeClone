import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {useQuery} from 'react-query';
import {QUERY_KEY} from 'constants/query-key';
import fetchChannelById from 'api/chanel-api';
import formatViewCount from 'utils/formatViewCount';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabParamList, RootStackParamList} from 'types';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ChannelShortInfoProps = {
  channelId: string;
  containerStyle?: ViewStyle;
};

type VideoDetailScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'HomeStack'>,
  StackNavigationProp<RootStackParamList>
>;

const ChannelShortInfo: FC<ChannelShortInfoProps> = ({
  channelId,
  containerStyle,
}) => {
  const navigation = useNavigation<VideoDetailScreenNavigationProp>();
  const {data: chanelDetail} = useQuery({
    queryKey: [QUERY_KEY.CHANNEL_DETAIL, channelId],
    queryFn: fetchChannelById,
  });
  if (chanelDetail) {
    const {
      snippet: {title, thumbnails},
      statistics: {subscriberCount},
    } = chanelDetail;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChannelDetail', {channelId, title})}
        style={[styles.container, containerStyle]}>
        <Image
          source={{uri: thumbnails.default.url, width: 40, height: 40}}
          style={styles.thumbnail_channel}
        />
        <View>
          <Text
            style={styles.title_channel}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.subscriberCount_channel}>
            {formatViewCount(subscriberCount)} người đăng ký
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return;
};

export default ChannelShortInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'nowrap',
  },
  thumbnail_channel: {borderRadius: 20},
  title_channel: {fontWeight: '500', color: '#000'},
  subscriberCount_channel: {
    fontSize: 12,
    color: '#687076',
  },
});
