import fetchCategories from '@api/categories-api';
import {QUERY_KEY} from '@constants/query-key';
import {useQuery} from 'react-query';

export default function useCategory() {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES],
    queryFn: fetchCategories,
  });
}
