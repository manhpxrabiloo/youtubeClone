import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {FC, useCallback} from 'react';
import {SvgXml} from 'react-native-svg';
import {ellipsis_vertical} from 'icons';
import formatViewCount from '@utils/formatViewCount';
import formatRelativeTime from '@utils/formatRelativeTime';
import formatDuration from '@utils/formatDuration';
import {ASPECT_RATIO_VIDEO, WIDTH_SCREEN} from 'constants/size';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabParamList, HomeStackParamList} from 'types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';

type YoutubeCardProps = {
  data: {
    videoId: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    viewCount?: string;
    publishedAt: Date;
    duration?: string;
    channelId: string;
  };
};
type VideoDetailScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  StackNavigationProp<HomeStackParamList>
>;

const YoutubeCard: FC<YoutubeCardProps> = ({
  data: {
    title,
    thumbnail,
    channelTitle,
    viewCount,
    publishedAt,
    duration,
    videoId,
    channelId,
  },
}) => {
  const navigation = useNavigation<VideoDetailScreenNavigationProp>();
  const renderDuration = useCallback(() => {
    if (!duration) {
      return (
        <Image
          source={{
            uri: thumbnail,
            width: WIDTH_SCREEN,
            height: WIDTH_SCREEN / ASPECT_RATIO_VIDEO,
          }}
          resizeMode="cover"
        />
      );
    }
    return (
      <View>
        <Image
          source={{
            uri: thumbnail,
            width: WIDTH_SCREEN,
            height: WIDTH_SCREEN / ASPECT_RATIO_VIDEO,
          }}
          resizeMode="cover"
        />
        <Text style={styles.duration}>{formatDuration(duration)}</Text>
      </View>
    );
  }, [duration, thumbnail]);
  return (
    <Pressable
      onPress={() => navigation.navigate('VideoDetail', {videoId, channelId})}>
      {renderDuration()}
      <View style={styles.info_card}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1720247521903-3e53f723b339?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            width: 40,
            height: 40,
          }}
          style={styles.thumbnail_card}
          resizeMode="cover"
        />
        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.more_info}>
            {channelTitle}
            {viewCount
              ? ` - ${formatViewCount(viewCount)} lượt xem`
              : null} - {formatRelativeTime(publishedAt)}
          </Text>
        </View>
        <SvgXml xml={ellipsis_vertical} width={20} height={20} color={'#000'} />
      </View>
    </Pressable>
  );
};

export default YoutubeCard;

const styles = StyleSheet.create({
  duration: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 10,
    fontSize: 10,
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#242526ab',
    borderRadius: 4,
  },
  info_card: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  thumbnail_card: {borderRadius: 20},
  title_container: {flex: 1},
  title: {color: '#000', fontWeight: '500'},
  more_info: {fontSize: 12, marginTop: 5},
});
