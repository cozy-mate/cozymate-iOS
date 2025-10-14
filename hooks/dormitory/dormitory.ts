import { useQueries } from '@tanstack/react-query';

import { queries } from '@/server';

export const useGetDormitoryMenuAndNotice = () => {
  return useQueries({
    queries: [
      // YYYY-MM-DD
      queries.dormitory.menu({ date: new Date().toISOString().split('T')[0] }),
      queries.dormitory.noticePreview,
    ],
  });
};
