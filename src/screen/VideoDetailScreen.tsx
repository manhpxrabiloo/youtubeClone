import {StyleSheet, View} from 'react-native';
import React, {FC, useRef} from 'react';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from 'types';
import YoutubePlayer from 'react-native-youtube-iframe';
import {ASPECT_RATIO_VIDEO, WIDTH_SCREEN} from '@constants/size';
import VideoDetailInfo from '@components/video_detail/VideoDetailInfo';
import VideoDetailInfoBottomSheet from '@components/video_detail/VideoDetailInfoBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetForwardRef from '@components/common/BottomSheetForwardRef';
import VideoDetailCommentBottomSheet from '@components/comment/VideoDetailCommentBottomSheet';
import ActivityIndicatorComponent from '@components/common/ActivityIndicatorComponent';
import ErrorComponent from '@components/common/ErrorComponent';
import RelatedVideos from '@components/video_detail/RelatedVideos';
import useVideoDetail from '@hooks/useVideoDetail';

type VideoDetailScreenProps = {
  route: RouteProp<HomeStackParamList, 'VideoDetail'>;
};

const VideoDetailScreen: FC<VideoDetailScreenProps> = ({route}) => {
  const bottomSheetInfoRef = useRef<BottomSheet>(null);
  const bottomSheetCommentRef = useRef<BottomSheet>(null);
  const {videoId} = route.params;
  const {data: videoDetail, status, refetch} = useVideoDetail(videoId);
  const handleOpenInfoPress = () => bottomSheetInfoRef?.current?.expand();
  const handleCloseInfoPress = () => bottomSheetInfoRef?.current?.close();
  const handleOpenCommentPress = () => bottomSheetCommentRef?.current?.expand();
  const handleCloseCommentPress = () => bottomSheetCommentRef?.current?.close();
  if (status === 'loading') {
    return <ActivityIndicatorComponent />;
  }
  if (status === 'error') {
    return <ErrorComponent refetch={refetch} />;
  }

  if (videoDetail) {
    return (
      <View style={styles.container}>
        <YoutubePlayer
          height={WIDTH_SCREEN / ASPECT_RATIO_VIDEO}
          videoId={videoId}
        />
        <View style={styles.contentStyle}>
          <RelatedVideos
            ListHeaderComponent={
              <VideoDetailInfo
                videoDetail={videoDetail}
                onOpenInfoBottomSheet={handleOpenInfoPress}
                onOpenCommentBottomSheet={handleOpenCommentPress}
              />
            }
            categoryId={videoDetail.snippet.categoryId}
            videoId={videoId}
          />
          <BottomSheetForwardRef ref={bottomSheetInfoRef}>
            <VideoDetailInfoBottomSheet
              videoDetail={videoDetail}
              handleClosePress={handleCloseInfoPress}
            />
          </BottomSheetForwardRef>
          <BottomSheetForwardRef ref={bottomSheetCommentRef}>
            <VideoDetailCommentBottomSheet
              videoId={videoDetail.id}
              handleClosePress={handleCloseCommentPress}
            />
          </BottomSheetForwardRef>
        </View>
      </View>
    );
  }
  return;
};

export default VideoDetailScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  contentStyle: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1,
    overflow: 'hidden',
  },
});
