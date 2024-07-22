import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet';
import {SvgXml} from 'react-native-svg';
import {x_mark} from 'icons';
import CommentSection from './CommentSection';
import useCommentThread from 'hooks/useCommentThread';

type VideoDetailCommentBottomSheetProps = {
  videoId: string;
  handleClosePress: () => void;
};
const VideoDetailCommentBottomSheet: FC<VideoDetailCommentBottomSheetProps> = ({
  videoId,
  handleClosePress,
}) => {
  const {
    data: comments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCommentThread(videoId);
  return (
    <BottomSheetView style={styles.container}>
      <BottomSheetView style={styles.header_container}>
        <Text style={styles.header_title}>Bình luận</Text>
        <SvgXml
          xml={x_mark}
          width={30}
          height={30}
          color="#000"
          onPress={handleClosePress}
        />
      </BottomSheetView>
      <BottomSheetFlatList
        contentContainerStyle={styles.contentContainer}
        data={comments ? comments.pages.flatMap(page => page.data) : []}
        keyExtractor={item => `${item.id}`}
        windowSize={21}
        initialNumToRender={10}
        bounces={false}
        overScrollMode={'never'}
        renderItem={({item}) => <CommentSection data={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : null
        }
      />
    </BottomSheetView>
  );
};

export default VideoDetailCommentBottomSheet;

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
  contentContainer: {gap: 20, padding: 15},
  activityIndicator: {marginBottom: 20},
});
