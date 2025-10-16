import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getS3Urls } from './s3';

export const s3Queries = createQueryKeys('s3', {
  getS3Urls: ({ s3Keys }: { s3Keys: string[] }) => ({
    queryKey: ['getS3Urls', s3Keys],
    queryFn: () => getS3Urls({ s3Keys }),
  }),
});
