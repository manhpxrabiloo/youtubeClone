import {CategoryType} from 'types';
import axiosClient from './axiosClient';

export default async function fetchCategories(): Promise<CategoryType[]> {
  const response = await axiosClient.get<{items: CategoryType[]}>(
    '/videoCategories',
    {
      params: {part: 'snippet', hl: 'vi', regionCode: 'VN'},
    },
  );
  return response.data.items.filter(item => item.snippet.assignable);
}
