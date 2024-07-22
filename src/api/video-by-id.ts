import {VideoType} from 'types';
import axiosClient from './axiosClient';

type FetchVideosParams = {
  pageParam?: string;
  queryKey: string[];
};

type FetchVideosResponse = VideoType;
export default async function fetchVideoById({
  queryKey,
}: FetchVideosParams): Promise<FetchVideosResponse> {
  const videoId = queryKey[1];
  const result = await axiosClient.get('/videos', {
    params: {
      part: 'snippet,contentDetails,statistics',
      id: videoId,
      regionCode: 'VN',
      hl: 'vi',
    },
  });
  return result.data.items[0];
}
