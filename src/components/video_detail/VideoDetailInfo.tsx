import {Pressable, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import formatViewCount from '@utils/formatViewCount';
import formatRelativeTime from '@utils/formatRelativeTime';
import ChannelShortInfo from '@components/channel/ChannelShortInfo';
import VideoDetailShortInfo from './VideoDetailShortInfo';
import {VideoType} from 'types';
import ActionVideo from './ActionVideo';
import CommentBox from 'components/comment/CommentBox';

type VideoDetailInfoProps = {
  videoDetail: VideoType;
  onOpenInfoBottomSheet: () => void;
  onOpenCommentBottomSheet: () => void;
};
const VideoDetailInfo: FC<VideoDetailInfoProps> = ({
  videoDetail,
  onOpenInfoBottomSheet,
  onOpenCommentBottomSheet,
}) => {
  return (
    <View style={styles.info_container}>
      <View style={styles.pH_10}>
        <Pressable onPress={onOpenInfoBottomSheet}>
          <VideoDetailShortInfo
            title={videoDetail.snippet.title}
            viewCount={formatViewCount(videoDetail.statistics.viewCount)}
            publishedAt={formatRelativeTime(videoDetail.snippet.publishedAt)}
            tags={videoDetail.snippet?.tags?.map(item => `#${item}`).join(' ')}
          />
        </Pressable>
        <ChannelShortInfo channelId={videoDetail.snippet.channelId} />
      </View>
      <ActionVideo
        likeCount={formatViewCount(videoDetail.statistics.likeCount)}
        videoId={videoDetail.id}
      />
      <Pressable onPress={onOpenCommentBottomSheet}>
        <CommentBox
          videoId={videoDetail.id}
          commentCount={videoDetail.statistics.commentCount}
        />
      </Pressable>
    </View>
  );
};

export default VideoDetailInfo;

const styles = StyleSheet.create({
  info_container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 10,
  },
  pH_10: {paddingHorizontal: 10},
});
