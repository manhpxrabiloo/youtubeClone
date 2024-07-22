import {FilterType} from '@screen/SearchScreen';
import fetchSearchVideo from 'api/search-video-api';
import {QUERY_KEY} from 'constants/query-key';
import {useQuery} from 'react-query';

export default function useSearchVideo(searchTerm: string, filter: FilterType) {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH_VIDEO, searchTerm, filter],
    queryFn: fetchSearchVideo,
    enabled: !!searchTerm,
  });
}
