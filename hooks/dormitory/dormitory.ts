import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';

import { queries } from '@/server';
import { GetDormitoryNoticeResponse } from '@/server/dormitory/response';

export const useGetDormitoryMenuAndNotice = () => {
  return useQueries({
    queries: [
      queries.dormitory.menu({ date: formatDateYYYYMMDDLocal(new Date()) }),
      queries.dormitory.noticePreview,
    ],
  });
};

export const useGetDormitoryMenu = (date?: string) => {
  const targetDate = date ?? formatDateYYYYMMDDLocal(new Date());
  return useQuery({
    ...queries.dormitory.menu({ date: targetDate }),
    retry: false,
    // @description 기숙사 관련 정보 파싱 간격이 1시간
    staleTime: 1000 * 60 * 60,
  });
};

function formatDateYYYYMMDDLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useGetDormitoryImportantNoticeList = () => {
  return useQuery({
    ...queries.dormitory.importantNoticeList,
    staleTime: 1000 * 60 * 60,
  });
};

export const useGetDormitoryNoticeList = () => {
  return useInfiniteQuery({
    ...queries.dormitory.noticeList(),
    getNextPageParam: (lastPage: GetDormitoryNoticeResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    initialPageParam: 0,
  });
};
