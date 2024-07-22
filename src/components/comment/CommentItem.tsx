import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import formatRelativeTime from '@utils/formatRelativeTime';
import {SvgXml} from 'react-native-svg';
import {hand_thumb_down, hand_thumb_up} from 'icons';

type CommenItemProps = {
  data: {
    authorProfileImageUrl: string;
    authorDisplayName: string;
    publishedAt: Date;
    textDisplay: string;
    likeCount: number;
  };
};
const CommentItem: FC<CommenItemProps> = ({data}) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    textDisplay,
    likeCount,
  } = data;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: authorProfileImageUrl,
          width: 30,
          height: 30,
        }}
        style={styles.avatar}
      />
      <View style={styles.comment_content}>
        <Text style={styles.authorDisplayName}>
          {authorDisplayName} . {formatRelativeTime(publishedAt)}
        </Text>
        <Text style={styles.textDisplay}>{textDisplay}</Text>
        <View style={styles.action}>
          <View style={styles.action_like}>
            <SvgXml xml={hand_thumb_up} width={18} height={18} color="#000" />
            <Text style={styles.likeCount}>{likeCount || ''}</Text>
          </View>
          <SvgXml xml={hand_thumb_down} width={18} height={18} color="#000" />
        </View>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'flex-start', gap: 10},
  avatar: {borderRadius: 15},
  comment_content: {flex: 1},
  authorDisplayName: {fontSize: 12, color: '#687076'},
  textDisplay: {color: '#000'},
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 20,
  },
  action_like: {flexDirection: 'row', alignItems: 'center', gap: 5},
  likeCount: {color: '#000'},
});
