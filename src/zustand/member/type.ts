export interface SignUp {
  nickname: string;
  gender: string;
  birthday: string;
  universityId: number;
  persona: number;
  majorName: string;
}

export interface Profile {
  memberId: number;
  nickname: string;
  gender: string;
  birthday: string;
  universityId: number;
  universityName: string;
  majorName: string;
  persona: number;
}

export interface MemberInfo {
  memberId: number;
  memberNickName: string;
  memberAge: number;
  memberPersona: number;
  equality: number;
}
