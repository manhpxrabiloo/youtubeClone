import axios from 'axios';
import {BASE_YOUTUBE_URL_API, KEY_YOUTUBE_API} from '@constants/api-key';

const axiosClient = axios.create({
  baseURL: BASE_YOUTUBE_URL_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {key: KEY_YOUTUBE_API},
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
