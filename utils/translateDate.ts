import moment from 'moment';

export function formatDateToKorean(dateString: string) {
  const date = moment(dateString).toDate();

  const formatter = new Intl.DateTimeFormat('ko-KR', {
    weekday: 'short',
    timeZone: 'Asia/Seoul',
  });
  const weekday = formatter.format(date);

  return `${date.getMonth() + 1}/${date.getDate()}(${weekday})`;
}

export function formatDate(dateString: string) {
  const target = moment(dateString);
  if (!target.isValid()) return '';

  const now = moment();
  const diffMinutes = Math.max(0, now.diff(target, 'minutes'));
  const diffHours = Math.max(0, now.diff(target, 'hours'));
  const diffDays = Math.max(0, now.diff(target, 'days'));

  if (diffMinutes < 1) {
    return '방금';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }
  return target.format('YY.MM.DD');
}
