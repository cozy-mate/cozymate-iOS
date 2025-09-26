import { createQueryKeys } from '@lukemorales/query-key-factory';
import { checkHasInquiry, getInquiryList } from './inquiry';

export const inquiryQueries = createQueryKeys('inquiry', {
  getInquiryList: () => ({
    queryKey: ['list'],
    queryFn: () => getInquiryList(),
  }),
  checkHasInquiry: () => ({
    queryKey: ['exist'],
    queryFn: () => checkHasInquiry(),
  }),
});
