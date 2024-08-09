export const postTimeUtil = (time: string) => {
    const postedDate = new Date(time);
    const postedTime = postedDate.getTime();
    const now = new Date();
    const nowTime = now.getTime();
    const diff = nowTime - postedTime;
    const diffMin = diff / 60000;
    const diffHour = diffMin / 60;
    const diffDay = diffHour / 24;
    
    if (diffMin < 60) {
      return `${Math.floor(diffMin)}분 전`;
    } else if (diffHour < 24) {
      return `${Math.floor(diffHour)}시간 전`;
    } else if (diffDay < 4) {
      return `${Math.floor(diffDay)}일 전`;
    }
    return `${postedDate.getFullYear()}년 ${postedDate.getMonth() + 1}월 ${postedDate.getDate()}일`;
  };
  