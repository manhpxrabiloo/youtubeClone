import {FlatList, StyleSheet} from 'react-native';
import React, {FC, useMemo} from 'react';
import {
  arrow_down_tray,
  bookmark,
  flag,
  hand_thumb_down,
  hand_thumb_up,
  share,
} from 'icons';
import ActionVideoItem from './ActionVideoItem';

type ActionVideoProps = {likeCount: string; videoId: string};
const ActionVideo: FC<ActionVideoProps> = ({likeCount, videoId}) => {
  const data = useMemo(
    () => [
      [
        {key: 'like', icon: hand_thumb_up, title: likeCount},
        {key: 'disLike', icon: hand_thumb_down, title: ''},
      ],
      [{key: 'share', icon: share, title: 'Chia sẻ'}],
      [{key: 'dowload', icon: arrow_down_tray, title: 'Tải xuống'}],
      [{key: 'save', icon: bookmark, title: 'Lưu'}],
      [{key: 'report', icon: flag, title: 'Báo vi phạm'}],
    ],
    [likeCount],
  );
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({item}) => <ActionVideoItem data={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ActionVideo;

const styles = StyleSheet.create({container: {paddingHorizontal: 10, gap: 10}});
