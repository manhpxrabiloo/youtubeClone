import {StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {SvgXml} from 'react-native-svg';
import {x_mark} from 'icons';
import {VideoType} from 'types';
import StatisticsVideoDetailInfo from './StatisticsVideoDetailInfo';
import {ScrollView} from 'react-native-gesture-handler';
import ChannelShortInfo from 'components/channel/ChannelShortInfo';

type VideoDetailInfoBottomSheetProps = {
  videoDetail: VideoType;
  handleClosePress: () => void;
};
const VideoDetailInfoBottomSheet: FC<VideoDetailInfoBottomSheetProps> = ({
  handleClosePress,
  videoDetail,
}) => {
  const renderDescription = () => {
    if (!videoDetail.snippet.description) {
      return;
    }
    return (
      <Text style={styles.description}>{videoDetail.snippet.description}</Text>
    );
  };
  return (
    <BottomSheetView style={styles.container}>
      <BottomSheetView style={styles.header_container}>
        <Text style={styles.header_title}>Nội dung mô tả</Text>
        <SvgXml
          xml={x_mark}
          width={30}
          height={30}
          color="#000"
          onPress={handleClosePress}
        />
      </BottomSheetView>
      <ScrollView
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.video_title}>{videoDetail.snippet.title}</Text>
        <StatisticsVideoDetailInfo
          viewCount={videoDetail.statistics.viewCount}
          likeCount={videoDetail.statistics.likeCount}
          publishedAt={videoDetail.snippet.publishedAt}
        />
        {renderDescription()}
        <ChannelShortInfo channelId={videoDetail.snippet.channelId} />
      </ScrollView>
    </BottomSheetView>
  );
};

export default VideoDetailInfoBottomSheet;

const styles = StyleSheet.create({
  container: {flex: 1},
  header_container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
  },
  header_title: {
    fontWeight: '600',
    fontSize: 22,
    color: '#000',
  },
  contentContainer: {paddingHorizontal: 10, paddingVertical: 20},
  video_title: {fontWeight: '700', fontSize: 16, lineHeight: 24, color: '#000'},
  description: {
    backgroundColor: '#f6f6f6',
    color: '#000',
    padding: 15,
    borderRadius: 12,
  },
});
