type NumberItem = {
  index: number;
  title: string;
  value: number;
};

type StringItem = {
  index: number;
  title: string;
  value: string;
};

export const numOfRoommateItems: NumberItem[] = [
  { index: 1, title: '미정', value: 0 },
  { index: 2, title: '2인', value: 2 },
  { index: 3, title: '3인', value: 3 },
  { index: 4, title: '4인', value: 4 },
  { index: 5, title: '5인', value: 5 },
  { index: 6, title: '6인', value: 6 },
];

export const acceptanceItems: StringItem[] = [
  { index: 1, value: '합격', title: '합격' },
  { index: 2, value: '결과 대기중', title: '결과 대기중' },
  { index: 3, value: '예비번호를 받았어요!', title: '예비번호를 받았어요!' },
];

export const dormitoryItems: StringItem[] = [
  { index: 1, value: '제 1생활관', title: '제 1생활관' },
  { index: 2, value: '제 2생활관', title: '제 2생활관' },
  { index: 3, value: '제 3생활관', title: '제 3생활관' },
];

export const timeItems: NumberItem[] = [
  { index: 1, value: 1, title: '1' },
  { index: 2, value: 2, title: '2' },
  { index: 3, value: 3, title: '3' },
  { index: 4, value: 4, title: '4' },
  { index: 5, value: 5, title: '5' },
  { index: 6, value: 6, title: '6' },
  { index: 7, value: 7, title: '7' },
  { index: 8, value: 8, title: '8' },
  { index: 9, value: 9, title: '9' },
  { index: 10, value: 10, title: '10' },
  { index: 11, value: 11, title: '11' },
  { index: 12, value: 12, title: '12' },
];

export const smokingItems: StringItem[] = [
  { index: 1, value: '비흡연자', title: '비흡연자' },
  { index: 2, value: '연초', title: '연초' },
  { index: 3, value: '궐련형 전자담배', title: '궐련형 전자담배' },
  { index: 4, value: '액상형 전자담배', title: '액상형 전자담배' },
];

export const sleepingHabitItems: StringItem[] = [
  { index: 1, value: '잠버릇이 없어요', title: '잠버릇이 없어요' },
  { index: 2, value: '코골이', title: '코골이' },
  { index: 3, value: '이갈이', title: '이갈이' },
  { index: 4, value: '몽유병', title: '몽유병' },
  { index: 5, value: '잠꼬대', title: '잠꼬대' },
  { index: 6, value: '뒤척임', title: '뒤척임' },
];

export const airConditioningIntensityItems: NumberItem[] = [
  { index: 1, value: 0, title: '안 틀어요' },
  { index: 2, value: 1, title: '약하게 틀어요' },
  { index: 3, value: 2, title: '적당하게 틀어요' },
  { index: 4, value: 3, title: '강하게 틀어요' },
];

export const heatingIntensityItems: NumberItem[] = [
  { index: 1, value: 0, title: '안 틀어요' },
  { index: 2, value: 1, title: '약하게 틀어요' },
  { index: 3, value: 2, title: '적당하게 틀어요' },
  { index: 4, value: 3, title: '강하게 틀어요' },
];

export const lifePatternItems: StringItem[] = [
  { index: 1, value: '아침형 인간', title: '아침형 인간' },
  { index: 2, value: '새벽형 인간', title: '새벽형 인간' },
];

export const intimacyItems: StringItem[] = [
  { index: 1, value: '필요한 말만 했으면 좋겠어요', title: '필요한 말만 했으면 좋겠어요' },
  { index: 2, value: '어느정도 친하게 지내요', title: '어느정도 친하게 지내요' },
  { index: 3, value: '완전 친하게 지내요', title: '완전 친하게 지내요' },
];

export const canShareItems: StringItem[] = [
  { index: 1, value: '아무것도 공유하고 싶지 않아요', title: '아무것도 공유하고 싶지 않아요' },
  { index: 2, value: '휴지정도는 빌려줄 수 있어요', title: '휴지정도는 빌려줄 수 있어요' },
  { index: 3, value: '옷정도는 빌려줄 수 있어요', title: '옷정도는 빌려줄 수 있어요' },
  { index: 4, value: '칫솔만 아니면 돼요', title: '칫솔만 아니면 돼요' },
];

export const isPlayGameItems: StringItem[] = [
  { index: 1, value: '아예 하지 않아요', title: '아예 하지 않아요' },
  { index: 2, value: '키보드 채팅정도만 쳐요', title: '키보드 채팅정도만 쳐요' },
  { index: 3, value: '보이스 채팅도 해요', title: '보이스 채팅도 해요' },
];

export const isPhoneCallItems: StringItem[] = [
  { index: 1, value: '아예 하지 않아요', title: '아예 하지 않아요' },
  { index: 2, value: '급한 전화만 해요', title: '급한 전화만 해요' },
  { index: 3, value: '자주 해요', title: '자주 해요' },
];

export const studyingItems: StringItem[] = [
  { index: 1, value: '아예 하지 않아요', title: '아예 하지 않아요' },
  { index: 2, value: '시험기간 때만 해요', title: '시험기간 때만 해요' },
  { index: 3, value: '매일 해요', title: '매일 해요' },
];

export const intakeItems: StringItem[] = [
  { index: 1, value: '아예 안 먹어요', title: '아예 안 먹어요' },
  { index: 2, value: '음료만 마셔요', title: '음료만 마셔요' },
  { index: 3, value: '간단한 간식정도만 먹어요', title: '간단한 간식정도만 먹어요' },
  { index: 4, value: '배달음식도 먹어요', title: '배달음식도 먹어요' },
];

export const cleanSensitivityItems: NumberItem[] = [
  { index: 1, value: 1, title: '매우 예민하지 않아요' },
  { index: 2, value: 2, title: '예민하지 않아요' },
  { index: 3, value: 3, title: '보통이에요' },
  { index: 4, value: 4, title: '예민해요' },
  { index: 5, value: 5, title: '매우 예민해요' },
];

export const noiseSensitivityItems: NumberItem[] = [
  { index: 1, value: 1, title: '매우 예민하지 않아요' },
  { index: 2, value: 2, title: '예민하지 않아요' },
  { index: 3, value: 3, title: '보통이에요' },
  { index: 4, value: 4, title: '예민해요' },
  { index: 5, value: 5, title: '매우 예민해요' },
];

export const cleaningFrequencyItems: StringItem[] = [
  { index: 1, value: '한 달에 한 번 해요', title: '한 달에 한 번 해요' },
  { index: 2, value: '2주에 한 번 해요', title: '2주에 한 번 해요' },
  { index: 3, value: '일주일에 한 번 해요', title: '일주일에 한 번 해요' },
  { index: 4, value: '이틀에 한 번 해요', title: '이틀에 한 번 해요' },
  { index: 5, value: '매일매일 해요', title: '매일매일 해요' },
];

export const drinkingFrequencyItems: StringItem[] = [
  { index: 1, value: '아예 안 마셔요', title: '아예 안 마셔요' },
  { index: 2, value: '한 달에 한 두번 마셔요', title: '한 달에 한 두번 마셔요' },
  { index: 3, value: '일주일에 한 두번 마셔요', title: '일주일에 한 두번 마셔요' },
  { index: 4, value: '일주일에 네 번이상 마셔요', title: '일주일에 네 번이상 마셔요' },
  { index: 5, value: '거의 매일 마셔요', title: '거의 매일 마셔요' },
];

export const personalityItems: StringItem[] = [
  { index: 1, value: '조용해요', title: '조용해요' },
  { index: 2, value: '활발해요', title: '활발해요' },
  { index: 3, value: '말이 많아요', title: '말이 많아요' },
  { index: 4, value: '깔끔해요', title: '깔끔해요' },
  { index: 5, value: '부끄러움이 많아요', title: '부끄러움이 많아요' },
  { index: 6, value: '집이 좋아요', title: '집이 좋아요' },
  { index: 7, value: '바깥이 좋아요', title: '바깥이 좋아요' },
  { index: 8, value: '급해요', title: '급해요' },
  { index: 9, value: '느긋해요', title: '느긋해요' },
  { index: 10, value: '낯을 가려요', title: '낯을 가려요' },
  { index: 11, value: '귀차니즘이 있어요', title: '귀차니즘이 있어요' },
  { index: 12, value: '부지런해요', title: '부지런해요' },
];

export const mbtiItems: StringItem[] = [
  { index: 1, value: 'ISTJ', title: 'ISTJ' },
  { index: 2, value: 'ISFJ', title: 'ISFJ' },
  { index: 3, value: 'INFJ', title: 'INFJ' },
  { index: 4, value: 'INTJ', title: 'INTJ' },
  { index: 5, value: 'ISTP', title: 'ISTP' },
  { index: 6, value: 'ISFP', title: 'ISFP' },
  { index: 7, value: 'INFP', title: 'INFP' },
  { index: 8, value: 'INTP', title: 'INTP' },
  { index: 9, value: 'ESTP', title: 'ESTP' },
  { index: 10, value: 'ESFP', title: 'ESFP' },
  { index: 11, value: 'ENFP', title: 'ENFP' },
  { index: 12, value: 'ENTP', title: 'ENTP' },
  { index: 13, value: 'ESTJ', title: 'ESTJ' },
  { index: 14, value: 'ESFJ', title: 'ESFJ' },
  { index: 15, value: 'ENFJ', title: 'ENFJ' },
  { index: 16, value: 'ENTJ', title: 'ENTJ' },
];
