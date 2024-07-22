import {DEFAULT_PAGE_SIZE} from 'constants/common';
import {VideoType} from 'types';
import axiosClient from './axiosClient';

type FetchVideosParams = {
  pageParam?: string;
  queryKey: string[];
};

export type FetchVideosResponse = {
  data: VideoType[];
  nextPageToken: string;
};
export default async function fetchVideos({
  pageParam = '',
  queryKey,
}: FetchVideosParams): Promise<FetchVideosResponse> {
  const activeCategory = queryKey[1];
  const params: {
    part: string;
    chart: string;
    maxResults: number;
    hl: string;
    regionCode: string;
    videoCategoryId?: string;
    pageToken: string;
  } = {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    maxResults: DEFAULT_PAGE_SIZE,
    hl: 'vi',
    regionCode: 'VN',
    pageToken: pageParam,
  };
  if (activeCategory !== 'all') {
    params.videoCategoryId = activeCategory;
  }
  const result = await axiosClient.get('/videos', {
    params,
  });
  return {
    data: result.data.items,
    nextPageToken: result.data.nextPageToken,
  };
}
