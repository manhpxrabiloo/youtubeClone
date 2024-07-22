import {ChannelType} from 'types';
import axiosClient from './axiosClient';

type FetchChannelParams = {
  queryKey: string[];
};

type FetchChannelResponse = ChannelType;
export default async function fetchChannelById({
  queryKey,
}: FetchChannelParams): Promise<FetchChannelResponse> {
  const id = queryKey[1];
  const response = await axiosClient.get<{items: ChannelType[]}>('/channels', {
    params: {part: 'snippet, contentDetails, statistics', id},
  });
  return response.data.items[0];
}
