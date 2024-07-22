import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

type VideoDetailInfoProps = {
  title: string;
  viewCount: string;
  publishedAt: string;
  tags?: string;
};
const VideoDetailShortInfo: FC<VideoDetailInfoProps> = ({
  title,
  viewCount,
  publishedAt,
  tags,
}) => {
  const renderTags = () => {
    if (!tags) {
      return;
    }
    return (
      <React.Fragment>
        <Text style={styles.tags}>
          {'   '}
          {tags}
        </Text>{' '}
        <Text style={styles.see_more}>...Xem thêm</Text>
      </React.Fragment>
    );
  };
  return (
    <View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.more_info} numberOfLines={1} ellipsizeMode="middle">
        {viewCount} lượt xem
        {'   '}
        {publishedAt}
        {renderTags()}
      </Text>
    </View>
  );
};

export default VideoDetailShortInfo;

const styles = StyleSheet.create({
  title: {fontWeight: '600', fontSize: 16, color: '#000'},
  more_info: {fontSize: 12, marginTop: 5},
  tags: {color: '#000', fontWeight: '500'},
  see_more: {
    fontWeight: '500',
    color: '#000',
    fontSize: 12,
  },
});
