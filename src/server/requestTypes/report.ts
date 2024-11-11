export interface CreateReportRequest {
  memberId: number;
  source: string;
  reason: string;
  content?: string;
}
