type NumberItem = {
  index: number;
  value: number;
  name: string;
};

type StringItem = {
  index: number;
  value: string;
  name: string;
};

export const numOfRoommateItems: NumberItem[] = [
  { index: 1, value: 0, name: '미정' },
  { index: 2, value: 2, name: '2인' },
  { index: 3, value: 3, name: '3인' },
  { index: 4, value: 4, name: '4인' },
  { index: 5, value: 5, name: '5인' },
  { index: 6, value: 6, name: '6인' },
];

export const acceptanceItems: StringItem[] = [
  { index: 1, value: '합격', name: '합격' },
  { index: 2, value: '결과 대기중', name: '결과 대기중' },
  { index: 3, value: '예비번호를 받았어요!', name: '예비번호를 받았어요!' },
];

export const dormitoryItems: StringItem[] = [
  { index: 1, value: '제 1생활관', name: '제 1생활관' },
  { index: 2, value: '제 2생활관', name: '제 2생활관' },
  { index: 3, value: '제 3생활관', name: '제 3생활관' },
];
