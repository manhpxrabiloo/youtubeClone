import {SearchYouTubeData} from 'types';
import axiosClient from './axiosClient';
import {
  FilterType,
  OrderType,
  VideoDurationType,
  VideoType,
} from '@screen/SearchScreen';

type FetchSearchVideoParams = {
  queryKey: (string | FilterType)[];
};

type FetchSearchVideoResponse = SearchYouTubeData[];

type ParamType = {
  part: string;
  q: string;
  maxResults: number;
  order: OrderType;
  videoDuration?: VideoDurationType;
  type?: VideoType;
};

export default async function fetchSearchVideo({
  queryKey,
}: FetchSearchVideoParams): Promise<FetchSearchVideoResponse> {
  const q = queryKey[1] as string;
  const {order, type, videoDuration} = queryKey[2] as FilterType;
  const params: ParamType = {
    part: 'snippet',
    q,
    maxResults: 50,
    order,
  };
  if (type !== 'all') {
    params.type = type;
  }
  if (type === 'video') {
    params.videoDuration = videoDuration;
  }
  const response = await axiosClient.get<{
    items: SearchYouTubeData[];
  }>('/search', {
    params,
  });
  return response.data.items;
}
