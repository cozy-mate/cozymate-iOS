export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]; // 요일 추출

  return `${month}/${day}(${dayOfWeek})`;
};
