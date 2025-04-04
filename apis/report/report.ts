import { PostAxiosInstance } from '@/axios/axios.method';

import { CreateReportRequest } from './request';
import { CreateReportResponse } from './response';

// 신고하기
export const createReport = async (data: CreateReportRequest): Promise<CreateReportResponse> => {
  const response = await PostAxiosInstance<CreateReportResponse>(`/report`, data);

  return response.data;
};
