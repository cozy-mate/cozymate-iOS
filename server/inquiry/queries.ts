import { createQueryKeys } from '@lukemorales/query-key-factory';
import { checkHasInquiry, getInquiryList } from './inquiry';

export const inquiryQueries = createQueryKeys('inquiry', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => getInquiryList(),
  }),
  exist: () => ({
    queryKey: ['exist'],
    queryFn: () => checkHasInquiry(),
  }),
});
