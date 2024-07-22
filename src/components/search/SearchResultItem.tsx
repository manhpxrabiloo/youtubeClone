import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ChannelData, PlaylistData, SearchYouTubeData, VideoData} from 'types';
import YoutubeCard from 'components/common/YoutubeCard';
import ChannelShortInfo from 'components/channel/ChannelShortInfo';
import PlayListCard from 'components/common/PlayListCard';

type SearchResultItemProps = {data: SearchYouTubeData};
const SearchResultItem: FC<SearchResultItemProps> = ({data}) => {
  if (data.id.kind === 'youtube#video') {
    const {
      id: {videoId},
      snippet: {channelId, title, publishedAt, channelTitle, thumbnails},
    } = data as VideoData;
    return (
      <YoutubeCard
        data={{
          channelId,
          videoId,
          title,
          publishedAt,
          channelTitle,
          thumbnail: thumbnails.high.url,
        }}
      />
    );
  }
  if (data.id.kind === 'youtube#channel') {
    const {
      id: {channelId},
    } = data as ChannelData;
    return (
      <ChannelShortInfo
        channelId={channelId}
        containerStyle={styles.channel_item_container}
      />
    );
  }
  if (data.id.kind === 'youtube#playlist') {
    const {
      snippet: {
        title,
        publishedAt,
        thumbnails: {
          high: {url: thumbnail},
        },
      },
    } = data as PlaylistData;
    return (
      <PlayListCard
        title={title}
        publishedAt={publishedAt}
        thumbnail={thumbnail}
        containerStyle={styles.playlist_item_container}
      />
    );
  }
  return;
};

export default SearchResultItem;

const styles = StyleSheet.create({
  channel_item_container: {
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBlockColor: '#ccc',
  },
  playlist_item_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBlockColor: '#ccc',
  },
});
