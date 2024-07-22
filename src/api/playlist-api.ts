import {PlayListType} from 'types';
import axiosClient from './axiosClient';

type FetchPlayListParams = {
  queryKey: string[];
};

type FetchPlayListResponse = PlayListType[];

export default async function fetchPlayListsByChannelId({
  queryKey,
}: FetchPlayListParams): Promise<FetchPlayListResponse> {
  const channelId = queryKey[1];
  const response = await axiosClient.get<{items: PlayListType[]}>(
    '/playlists',
    {
      params: {part: 'snippet,contentDetails', maxResults: 50, channelId},
    },
  );
  return response.data.items.filter(
    item => !item.snippet.thumbnails.high.url.includes('no_thumbnail'),
  );
}
