export interface CreateRoleRequest {
  mateIdNameList: {
    mateId: number;
    nickname: string;
  }[];
  content: string;
  repeatDayList: string[] | null;
}

export interface UpdateRoleRequest {
  mateIdNameList: {
    mateId: number;
    nickname: string;
  }[];
  content: string;
  repeatDayList: string[] | null;
}
