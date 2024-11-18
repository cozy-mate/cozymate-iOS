import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import { SendInquiryRequest } from '@server/requestTypes/inquiry';
import {
  SendInquiryResponse,
  GetInquiryListResponse,
  CheckHasInquiryResponse,
} from '@server/responseTypes/inquiry';

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

// 문의하기
export const sendInquiry = async (data: SendInquiryRequest): Promise<SendInquiryResponse> => {
  const reseponse = await PostAxiosInstance<SendInquiryResponse>(`/inquiries`, data);

  return reseponse.data;
};
