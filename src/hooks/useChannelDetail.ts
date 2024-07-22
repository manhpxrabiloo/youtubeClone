import fetchChannelById from '@api/chanel-api';
import {QUERY_KEY} from '@constants/query-key';
import {useQuery} from 'react-query';

export default function useChannelDetail(channelId: string) {
  return useQuery({
    queryKey: [QUERY_KEY.CHANNEL_DETAIL, channelId],
    queryFn: fetchChannelById,
  });
}
