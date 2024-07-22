import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {CommentThread} from 'types';
import CommentItem from './CommentItem';

type CommentSectionProps = {data: CommentThread};
const CommentSection: FC<CommentSectionProps> = ({data}) => {
  const [seeMore, setSeeMore] = useState(false);
  const {
    snippet: {
      topLevelComment: {
        snippet: {
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          textDisplay,
          likeCount,
        },
      },
      totalReplyCount,
    },
    replies,
  } = data;
  return (
    <View>
      <CommentItem
        data={{
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          textDisplay,
          likeCount,
        }}
      />
      {totalReplyCount > 0 ? (
        <View style={styles.reply_container}>
          {!seeMore ? (
            <Text
              style={styles.totalReplyCount}
              onPress={() => setSeeMore(true)}>
              {totalReplyCount} phản hồi
            </Text>
          ) : null}
          {seeMore
            ? replies?.comments?.map(item => (
                <CommentItem
                  key={item.id}
                  data={{
                    authorDisplayName: item.snippet.authorDisplayName,
                    authorProfileImageUrl: item.snippet.authorProfileImageUrl,
                    publishedAt: item.snippet.publishedAt,
                    textDisplay: item.snippet.textDisplay,
                    likeCount: item.snippet.likeCount,
                  }}
                />
              ))
            : null}
        </View>
      ) : null}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  reply_container: {paddingLeft: 40},
  totalReplyCount: {fontWeight: '500', color: '#1a73e8'},
});
