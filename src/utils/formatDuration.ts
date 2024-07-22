import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function formatDuration(isoDuration: string): string {
  const dur = dayjs.duration(isoDuration);
  const hours = dur.hours();
  const minutes = dur.minutes().toString().padStart(2, '0');
  const seconds = dur.seconds().toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
