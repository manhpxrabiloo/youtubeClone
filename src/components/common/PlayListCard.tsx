import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {ASPECT_RATIO_VIDEO, WIDTH_SCREEN} from '@constants/size';
import formatRelativeTime from '@utils/formatRelativeTime';

const PLAYLIST_THUMBNAIL_WIDTH = WIDTH_SCREEN / 2.4;
type PlayListCardProps = {
  title: string;
  publishedAt: Date;
  thumbnail: string;
  itemCount?: number;
  containerStyle?: ViewStyle;
};
const PlayListCard: FC<PlayListCardProps> = ({
  title,
  publishedAt,
  thumbnail,
  itemCount,
  containerStyle,
}) => {
  return (
    <View style={[styles.playlist_card, containerStyle]}>
      <View style={styles.playlit_thumnail_wrapper}>
        <Image
          source={{
            uri: thumbnail,
            width: PLAYLIST_THUMBNAIL_WIDTH - 8,
            height: (PLAYLIST_THUMBNAIL_WIDTH - 8) / ASPECT_RATIO_VIDEO,
          }}
          style={[
            styles.playlist_thumbnail,
            styles.playlist_thumbnail_backdrop,
          ]}
          resizeMode="cover"
        />
        <Image
          source={{
            uri: thumbnail,
            width: PLAYLIST_THUMBNAIL_WIDTH,
            height: PLAYLIST_THUMBNAIL_WIDTH / ASPECT_RATIO_VIDEO,
          }}
          style={styles.playlist_thumbnail}
          resizeMode="cover"
        />
      </View>
      <View style={styles.playlist_card_right}>
        <Text numberOfLines={3} style={styles.playlist_title}>
          {title}
        </Text>
        <Text>
          {itemCount ? `${itemCount} video, ` : null}đăng{' '}
          {formatRelativeTime(publishedAt)}
        </Text>
      </View>
    </View>
  );
};

export default PlayListCard;

const styles = StyleSheet.create({
  playlit_thumnail_wrapper: {position: 'relative', alignItems: 'center'},
  playlist_thumbnail_backdrop: {position: 'absolute', top: -5},
  playlist_thumbnail: {borderRadius: 8},
  playlist_card: {flexDirection: 'row', gap: 10},
  playlist_card_right: {flex: 1},
  playlist_title: {color: '#000', fontWeight: '500'},
});
