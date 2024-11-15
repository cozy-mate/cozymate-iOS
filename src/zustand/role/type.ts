export interface RoleItem {
  roleId: number;
  mateList: { mateId: number; nickname: string }[];
  content: string;
  repeatDayList: string[];
  isAllDays: boolean;
}
