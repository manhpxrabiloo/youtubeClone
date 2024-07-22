import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import YoutubeCard from 'components/common/YoutubeCard';
import useVideosByCategoryId from 'hooks/useVideosByCategoryId';

type RelatedVideoProps = {
  ListHeaderComponent: React.ReactElement;
  categoryId: string;
  videoId: string;
};
const RelatedVideos: FC<RelatedVideoProps> = ({
  ListHeaderComponent,
  categoryId,
  videoId,
}) => {
  const {
    data: videos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useVideosByCategoryId(categoryId);
  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={
        videos
          ? videos.pages
              .flatMap(page => page.data)
              .filter(item => item.id !== videoId)
          : []
      }
      keyExtractor={({id}, index) => `${id}-${index}`}
      windowSize={21}
      initialNumToRender={10}
      bounces={false}
      overScrollMode={'never'}
      scrollEventThrottle={16}
      renderItem={({item}) => {
        const {
          id,
          snippet,
          statistics: {viewCount},
          contentDetails: {duration},
        } = item;
        return (
          <YoutubeCard
            data={{
              channelId: snippet.channelId,
              videoId: id,
              duration,
              title: snippet.title,
              publishedAt: snippet.publishedAt,
              channelTitle: snippet.channelTitle,
              viewCount,
              thumbnail: snippet.thumbnails.standard.url,
            }}
          />
        );
      }}
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
  );
};

export default RelatedVideos;

const styles = StyleSheet.create({activityIndicator: {marginBottom: 20}});
