import { PostAxiosInstance } from '@axios/axios.method';

import { CreateReportRequest } from '@server/requestTypes/report';
import { CreateReportResponse } from '@server/responseTypes/report';

export const createReport = async (data: CreateReportRequest): Promise<CreateReportResponse> => {
  const response = await PostAxiosInstance<CreateReportResponse>(`/report`, data);

  return response.data;
};
