import {
  useMutation,
  useSuspenseQuery,
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { SendInquiryRequest } from '@server/requestTypes/inquiry';
import { sendInquiry, getInquiryList, checkHasInquiry } from '@server/api/inquiry';
import {
  SendInquiryResponse,
  GetInquiryListResponse,
  CheckHasInquiryResponse,
} from '@server/responseTypes/inquiry';

// 문의 내역 목록 조회
export const useGetInquiry = (): UseSuspenseQueryResult<GetInquiryListResponse, unknown> => {
  return useSuspenseQuery({
    queryKey: [`/inquiries`],
    queryFn: () => getInquiryList(),
  });
};

// 문의 내역 존재 여부 조회
export const useCheckHasInquiry = (): UseSuspenseQueryResult<CheckHasInquiryResponse, unknown> => {
  return useSuspenseQuery({
    queryKey: [`/inquiries/exist`],
    queryFn: () => checkHasInquiry(),
  });
};

// 문의하기
export const useSendInquiry = (): UseMutationResult<
  SendInquiryResponse,
  void,
  SendInquiryRequest,
  unknown
> => {
  return useMutation({
    mutationFn: (data: SendInquiryRequest) => sendInquiry(data),
  });
};
