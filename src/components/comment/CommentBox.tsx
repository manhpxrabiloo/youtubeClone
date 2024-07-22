import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import formatViewCount from 'utils/formatViewCount';
import useCommentThread from 'hooks/useCommentThread';

const CommentBox = ({
  videoId,
  commentCount,
}: {
  videoId: string;
  commentCount: string;
}) => {
  const {data: comment} = useCommentThread(videoId);
  if (comment && comment.pages.length > 0) {
    const {
      snippet: {topLevelComment},
    } = comment.pages[0].data[0];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Bình luận{'  '}
          <Text style={styles.comment_count}>
            {formatViewCount(commentCount)}
          </Text>
        </Text>
        <View style={styles.comment_container}>
          <Image
            style={styles.avatar}
            source={{
              uri: topLevelComment.snippet.authorProfileImageUrl,
              width: 30,
              height: 30,
            }}
          />
          <Text numberOfLines={2} style={styles.comment_content}>
            {topLevelComment.snippet.textOriginal}
          </Text>
        </View>
      </View>
    );
  }
  return;
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 15,
    marginHorizontal: 10,
    gap: 10,
  },
  title: {color: '#000', fontWeight: '600'},
  comment_container: {flexDirection: 'row', alignItems: 'center', gap: 10},
  avatar: {borderRadius: 15},
  comment_content: {fontSize: 12, lineHeight: 18, color: '#000', flex: 1},
  comment_count: {color: '#687076', fontWeight: '400', fontSize: 12},
});
