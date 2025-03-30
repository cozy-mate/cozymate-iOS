import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreateInquiryRequest } from './request';
import { CheckHasInquiryResponse, CreateInquiryResponse, GetInquiryListResponse } from './response';

// 문의 내역 목록 조회
export const getInquiryList = async (): Promise<GetInquiryListResponse> => {
  const response = await GetAxiosInstance<GetInquiryListResponse>(`/inquiries`);

  return response.data;
};

// 문의 내역 존재 여부 조회
export const checkHasInquiry = async (): Promise<CheckHasInquiryResponse> => {
  const response = await GetAxiosInstance<CheckHasInquiryResponse>(`/inquiries/exist`);

  return response.data;
};

// 답변 완료로 변경

// 문의하기
export const createInquiry = async (data: CreateInquiryRequest): Promise<CreateInquiryResponse> => {
  const response = await PostAxiosInstance<CreateInquiryResponse>(`/inquiries`, data);

  return response.data;
};
