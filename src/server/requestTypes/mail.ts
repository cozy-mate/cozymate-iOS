export interface VerifyMailRequest {
  code: string;
  universityId: number;
  majorName: string;
}

export interface SendMailRequest {
  mailAddress: string;
  universityId: number;
}
