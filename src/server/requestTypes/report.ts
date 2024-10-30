export interface CreateReportRequest {
  reportedMemberId: number;
  reportSource: string;
  reportReason: string;
  content: string;
}
