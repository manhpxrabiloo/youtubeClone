import {OrderType, VideoDurationType, VideoType} from '@screen/SearchScreen';

export const orderData: {title: string; key: OrderType}[] = [
  {key: 'relevance', title: 'Mức độ liên quan'},
  {key: 'date', title: 'Ngày tải lên'},
  {key: 'viewCount', title: 'Lượt xem'},
  {key: 'rating', title: 'Xếp hạng'},
];
export const videoTypeData: {title: string; key: VideoType}[] = [
  {key: 'all', title: 'Tất cả'},
  {key: 'video', title: 'Video'},
  {key: 'channel', title: 'Kênh'},
  {key: 'playlist', title: 'Danh sách phát'},
];
export const videoDurationData: {title: string; key: VideoDurationType}[] = [
  {key: 'any', title: 'Bất kỳ'},
  {key: 'short', title: 'Dưới 4 phút'},
  {key: 'medium', title: '4 - 20 phút'},
  {key: 'long', title: 'Trên 20 phút'},
];
