export interface GetInquiryListResponse {
  result: {
    inquiryId: number;
    persona: number;
    nickname: string;
    content: string;
    datetime: string;
    status: string;
  }[];
}

export interface CheckHasInquiryResponse {
  result: boolean;
}

export interface SendInquiryResponse {
  result: string;
}
