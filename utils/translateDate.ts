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
