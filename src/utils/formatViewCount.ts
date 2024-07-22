export default function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount, 10);

  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'Tr';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'N';
  }

  return count.toString();
}
