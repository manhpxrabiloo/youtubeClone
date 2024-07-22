import fetchCommentThread from 'api/comment-thread-api';
import {QUERY_KEY} from 'constants/query-key';
import {useInfiniteQuery} from 'react-query';

export default function useCommentThread(videoId: string) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.COMMENT_THREAD, videoId],
    queryFn: fetchCommentThread,
    getNextPageParam: lastpage => lastpage.nextPageToken ?? false,
  });
}
