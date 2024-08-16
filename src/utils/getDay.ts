export const getDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    weekday: 'short',
  };
  const dayOfWeek = new Intl.DateTimeFormat('ko-KR', options).format(date);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}(${dayOfWeek})`;
};
