import { DeleteAxiosInstance, GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { GeneratePresignedUrlRequest } from './request';
import { DeleteFileResponse, GeneratePresignedUrlResponse, GetS3UrlsResponse } from './response';

export const getS3Urls = async ({ s3Keys }: { s3Keys: string[] }) => {
  const response = await GetAxiosInstance<GetS3UrlsResponse>('/api/files/presigned-urls', {
    params: {
      s3Keys,
    },
  });
  return response.data;
};

export const generatePresignedUrl = async ({
  requests,
}: {
  requests: GeneratePresignedUrlRequest[];
}) => {
  const response = await PostAxiosInstance<
    GeneratePresignedUrlResponse,
    GeneratePresignedUrlRequest[]
  >('/api/files/presigned-urls', requests);
  return response.data;
};

export const deleteFile = async ({ s3Key }: { s3Key: string }) => {
  const response = await DeleteAxiosInstance<DeleteFileResponse>('/delete', {
    s3Key,
  });
  return response.data;
};
