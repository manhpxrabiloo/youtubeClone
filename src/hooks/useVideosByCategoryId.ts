import fetchVideos, {FetchVideosResponse} from '@api/videos-api';
import {QUERY_KEY} from '@constants/query-key';
import {useInfiniteQuery, UseInfiniteQueryOptions} from 'react-query';

export default function useVideosByCategoryId(
  category: string,
  options?: UseInfiniteQueryOptions<
    FetchVideosResponse,
    unknown,
    FetchVideosResponse,
    FetchVideosResponse,
    string[]
  >,
) {
  return useInfiniteQuery({
    ...options,
    queryKey: [QUERY_KEY.VIDEOS, category],
    queryFn: fetchVideos,
    getNextPageParam: lastpage => lastpage.nextPageToken ?? false,
  });
}
