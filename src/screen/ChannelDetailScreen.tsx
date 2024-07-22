import {ScrollView, StyleSheet} from 'react-native';
import React, {FC, useLayoutEffect} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'types';
import ActivityIndicatorComponent from '@components/common/ActivityIndicatorComponent';
import ErrorComponent from '@components/common/ErrorComponent';
import ChannelIntroduce from '@components/channel/ChannelIntroduce';
import ChannelPlayList from '@components/channel/ChannelPlayList';
import useChannelDetail from '@hooks/useChannelDetail';

type ChannelDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'ChannelDetail'>;
  navigation: NavigationProp<RootStackParamList, 'ChannelDetail'>;
};

const ChannelDetailScreen: FC<ChannelDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {channelId, title} = route.params;
  const {data: chanelDetail, status, refetch} = useChannelDetail(channelId);
  useLayoutEffect(() => {
    navigation.setOptions({title});
  }, [navigation, title]);
  if (status === 'loading') {
    return <ActivityIndicatorComponent />;
  }
  if (status === 'error') {
    return <ErrorComponent refetch={refetch} />;
  }
  if (chanelDetail) {
    const {
      snippet: {
        thumbnails: {
          high: {url: thumbnailUrl},
        },
        title: channelTitle,
        description,
      },
      statistics: {subscriberCount, videoCount},
    } = chanelDetail;
    return (
      <ScrollView style={styles.container}>
        <ChannelIntroduce
          channelTitle={channelTitle}
          thumbnailUrl={thumbnailUrl}
          subscriberCount={subscriberCount}
          videoCount={videoCount}
          description={description}
        />
        <ChannelPlayList channelId={channelId} />
      </ScrollView>
    );
  }
};

export default ChannelDetailScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});
