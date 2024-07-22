import {CommentThread} from 'types';
import axiosClient from './axiosClient';

type FetchCommentThreadParams = {
  pageParam?: string;
  queryKey: string[];
};

type FetchCommentThreadResponse = {
  data: CommentThread[];
  nextPageToken: string;
};
export default async function fetchCommentThread({
  pageParam = '',
  queryKey,
}: FetchCommentThreadParams): Promise<FetchCommentThreadResponse> {
  const videoId = queryKey[1];
  const result = await axiosClient.get<{
    items: CommentThread[];
    nextPageToken: string;
  }>('/commentThreads', {
    params: {
      part: 'snippet,replies',
      order: 'relevance',
      pageToken: pageParam,
      videoId,
    },
  });
  return {
    data: result.data.items,
    nextPageToken: result.data.nextPageToken,
  };
}
