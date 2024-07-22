import fetchPlayListsByChannelId from '@api/playlist-api';
import {QUERY_KEY} from '@constants/query-key';
import {useQuery} from 'react-query';

export default function usePlayListChannelId(channelId: string) {
  return useQuery({
    queryKey: [QUERY_KEY.PLAYLISTS, channelId],
    queryFn: fetchPlayListsByChannelId,
  });
}
