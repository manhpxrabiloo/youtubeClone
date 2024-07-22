import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {WIDTH_SCREEN} from 'constants/size';
import formatViewCount from 'utils/formatViewCount';

const PADDING = 10;
const THUMBNAIL_WIDTH = WIDTH_SCREEN - PADDING * 2;
type ChannelIntroduceProps = {
  thumbnailUrl: string;
  channelTitle: string;
  subscriberCount: string;
  description: string;
  videoCount: string;
};
const ChannelIntroduce: FC<ChannelIntroduceProps> = ({
  thumbnailUrl,
  channelTitle,
  subscriberCount,
  videoCount,
  description,
}) => {
  return (
    <View style={styles.introduce_container}>
      <Image
        source={{
          uri: thumbnailUrl,
          width: THUMBNAIL_WIDTH,
          height: 120,
        }}
        style={styles.chanel_thumbnail}
        resizeMode="cover"
      />
      <View style={styles.avatar_container}>
        <Image
          source={{uri: thumbnailUrl, width: 80, height: 80}}
          resizeMode="cover"
          style={styles.chanel_avatar}
        />
        <View>
          <Text style={styles.chanel_title}>{channelTitle}</Text>
          <View style={styles.statistic_container}>
            <Text style={styles.statistic_text}>
              {formatViewCount(subscriberCount)} người đăng ký
            </Text>
            <View style={styles.statistic_dot} />
            <Text style={styles.statistic_text}>
              {formatViewCount(videoCount)} video
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default ChannelIntroduce;

const styles = StyleSheet.create({
  introduce_container: {paddingHorizontal: PADDING},
  chanel_thumbnail: {borderRadius: 12},
  avatar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  chanel_avatar: {borderRadius: 40, borderWidth: 1, borderColor: '#ccc'},
  chanel_title: {
    fontWeight: '700',
    color: '#000',
    fontSize: 18,
    paddingBottom: 5,
  },
  statistic_container: {flexDirection: 'row', alignItems: 'center', gap: 5},
  statistic_text: {color: '#687076'},
  statistic_dot: {
    width: 4,
    height: 4,
    backgroundColor: '#687076',
    borderRadius: 4,
  },
  description: {color: '#000'},
});
