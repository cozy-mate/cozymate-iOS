export interface AddRoleRequest {
  mateIdList: number[];
  title: string;
  repeatDayList: string[];
}

export interface UpdateRoleRequest {
  title: string;
  repeatDayList: string[];
}
