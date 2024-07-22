import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import StatisticsItem from './StatisticsItem';
import formatViewCount from 'utils/formatViewCount';
import dayjs from 'dayjs';

type StatisticsVideoDetailInfoProps = {
  viewCount: string;
  likeCount: string;
  publishedAt: Date;
};
const StatisticsVideoDetailInfo: FC<StatisticsVideoDetailInfoProps> = ({
  viewCount,
  likeCount,
  publishedAt,
}) => {
  const formatDay = dayjs(publishedAt);
  return (
    <BottomSheetView style={styles.statistics_container}>
      <StatisticsItem value={formatViewCount(viewCount)} label="Lượt thích" />
      <StatisticsItem value={formatViewCount(likeCount)} label="Lượt xem" />
      <StatisticsItem
        value={`${formatDay.get('date')} thg ${formatDay.get('month')}`}
        label={`${formatDay.get('year')}`}
      />
    </BottomSheetView>
  );
};

export default StatisticsVideoDetailInfo;

const styles = StyleSheet.create({
  statistics_container: {flexDirection: 'row', marginVertical: 20},
});
