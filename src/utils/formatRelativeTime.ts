import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/vi'; // Import ngôn ngữ tiếng Việt

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// Thiết lập Day.js để sử dụng ngôn ngữ tiếng Việt
dayjs.locale('vi');

// Tùy chỉnh định dạng thời gian tương đối (nếu cần)
dayjs.updateLocale('vi', {
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: 'vài giây',
    m: 'một phút',
    mm: '%d phút',
    h: 'một giờ',
    hh: '%d giờ',
    d: 'một ngày',
    dd: '%d ngày',
    M: 'một tháng',
    MM: '%d tháng',
    y: 'một năm',
    yy: '%d năm',
  },
});

export default function formatRelativeTime(dateString: Date): string {
  return dayjs(dateString).fromNow();
}
