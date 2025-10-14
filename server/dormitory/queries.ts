import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getDormitoryMenu, getDormitoryNotice, getDormitoryNoticePreview } from './dormitory';
import { GetDormitoryMenuRequest } from './request';

export const dormitoryQueries = createQueryKeys('dormitory', {
  menu: ({ date }: GetDormitoryMenuRequest) => ({
    queryKey: [date],
    queryFn: () => getDormitoryMenu({ date }),
  }),
  importantNoticeList: {
    queryKey: [true],
    queryFn: () => getDormitoryNotice({ page: 0, size: 100, isImportant: true }),
  },
  noticePreview: {
    queryKey: null,
    queryFn: () => getDormitoryNoticePreview(),
  },
  noticeList: () => ({
    queryKey: [false],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getDormitoryNotice({ page: pageParam, size: 10, isImportant: false }),
  }),
});
