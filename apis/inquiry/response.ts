import { InquiryData } from '@/type/inquiry';

export interface GetInquiryListResponse {
  result: InquiryData[];
}

export interface CheckHasInquiryResponse {
  result: boolean;
}

export interface CreateInquiryResponse {
  result: string;
}
