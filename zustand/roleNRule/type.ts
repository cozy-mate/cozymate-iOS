import { MateIdNameListItem } from '@/type/role';

export interface SelectedItem {
  id: number;
  content: string;
  mateIdList: number[];
  timePoint: string;

  mateIdNameList: MateIdNameListItem[];
  repeatDayList: string[] | null;

  memo: string;
}
