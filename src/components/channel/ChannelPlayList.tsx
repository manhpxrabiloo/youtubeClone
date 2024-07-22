import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import PlayListCard from '@components/common/PlayListCard';
import usePlayListChannelId from '@hooks/usePlayListByChannelId';

type ChannelPlayListProps = {channelId: string};
const ChannelPlayList: FC<ChannelPlayListProps> = ({channelId}) => {
  const {data: playlists} = usePlayListChannelId(channelId);
  if (playlists && playlists.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Danh sách phát</Text>
        <View style={styles.playlists_container}>
          {playlists.map(item => (
            <PlayListCard
              key={item.id}
              title={item.snippet.title}
              thumbnail={item.snippet.thumbnails.high.url}
              publishedAt={item.snippet.publishedAt}
              itemCount={item.contentDetails.itemCount}
            />
          ))}
        </View>
      </View>
    );
  }
  return;
};

export default ChannelPlayList;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15, gap: 25},
  heading: {fontSize: 18, fontWeight: '700', color: '#000'},
  playlists_container: {gap: 15},
});
