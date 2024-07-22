import fetchVideoById from '@api/video-by-id';
import {QUERY_KEY} from '@constants/query-key';
import {useQuery} from 'react-query';

export default function useVideoDetail(videoId: string) {
  return useQuery({
    queryKey: [QUERY_KEY.VIDEO_DETAIL, videoId],
    queryFn: fetchVideoById,
  });
}
