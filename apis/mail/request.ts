export interface SendMailRequest {
  mailAddress: string;
  universityId: number;
}

export interface VerifyMailRequest {
  code: string;
  universityId: number;
  majorName: string;
}
