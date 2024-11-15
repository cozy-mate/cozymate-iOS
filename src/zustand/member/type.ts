export interface SignUp {
  nickname: string;
  gender: string;
  birthday: string;
  universityId: number;
  persona: number;
}

export interface Profile {
  memberId: number;
  nickname: string;
  gender: string;
  birthday: string;
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
