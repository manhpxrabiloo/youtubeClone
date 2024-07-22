import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import React, {useCallback, useState} from 'react';
import YoutubeCard from '@components/common/YoutubeCard';
import CategoryFilterItem from '@components/category/CategoryFilterItem';
import Header from '@components/common/Header';
import {VideoType} from 'types';
import ActivityIndicatorComponent from '@components/common/ActivityIndicatorComponent';
import ErrorComponent from '@components/common/ErrorComponent';
import useCategory from '@hooks/useCategory';
import useVideosByCategoryId from '@hooks/useVideosByCategoryId';

const HEADER_HEIGHT = 100;
const HomeScreen = () => {
  const flatListVideosRef = useAnimatedRef<Animated.FlatList<VideoType>>();
  const translationY = useSharedValue(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const {data: categories, status, refetch: refetchCategories} = useCategory();
  const {
    data: videos,
    refetch,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useVideosByCategoryId(activeCategory, {enabled: !!categories});
  const handleChangeActiveCategory = useCallback((id: string) => {
    setActiveCategory(id);
    if (flatListVideosRef.current) {
      flatListVideosRef.current.scrollToOffset({offset: 0, animated: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const scrollHandler = useAnimatedScrollHandler<{translateY: number}>({
    onBeginDrag: (event, context) => {
      context.translateY = event.contentOffset.y;
    },
    onScroll: (event, context) => {
      translationY.value = event.contentOffset.y - context.translateY;
    },
  });
  const headerAnimatedStyles = useAnimatedStyle(() => {
    const translateY = withTiming(
      interpolate(translationY.value, [5, HEADER_HEIGHT], [0, -HEADER_HEIGHT], {
        extrapolateLeft: Extrapolation.CLAMP,
      }),
      {duration: 300, easing: Easing.linear},
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });
  if (status === 'loading') {
    return <ActivityIndicatorComponent />;
  }
  if (status === 'error') {
    return <ErrorComponent refetch={refetchCategories} />;
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerStyle, headerAnimatedStyles]}>
        <Header />
        <FlatList
          contentContainerStyle={styles.categoryContainer}
          data={
            categories
              ? [{id: 'all', snippet: {title: 'Tất cả'}}, ...categories]
              : []
          }
          keyExtractor={({snippet: {title}, id}) => `${title}-${id}`}
          renderItem={({item}) => (
            <CategoryFilterItem
              onPress={() => handleChangeActiveCategory(item.id)}
              title={item.snippet.title}
              isActive={item.id === activeCategory}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
      <Animated.FlatList
        style={styles.contentStyle}
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={scrollHandler}
        ref={flatListVideosRef}
        data={videos ? videos.pages.flatMap(page => page.data) : []}
        keyExtractor={({id}) => id}
        windowSize={21}
        initialNumToRender={10}
        bounces={false}
        overScrollMode={'never'}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          const {
            id: videoId,
            snippet: {title, publishedAt, channelTitle, thumbnails, channelId},
            statistics: {viewCount},
            contentDetails: {duration},
          } = item;
          return (
            <YoutubeCard
              data={{
                channelId,
                videoId,
                duration,
                title,
                publishedAt,
                channelTitle,
                viewCount,
                thumbnail: thumbnails.standard.url,
              }}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            progressViewOffset={140}
          />
        }
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    top: 0,
    zIndex: 5,
    backgroundColor: '#fff',
    height: HEADER_HEIGHT,
  },
  container: {backgroundColor: '#fff', flex: 1},
  categoryContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  activityIndicator: {marginBottom: 20},
  contentStyle: {paddingTop: HEADER_HEIGHT},
  contentContainerStyle: {paddingBottom: HEADER_HEIGHT},
});
