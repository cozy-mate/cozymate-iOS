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

export const timeItems: NumberItem[] = [
  { index: 1, value: 1, name: '1' },
  { index: 2, value: 2, name: '2' },
  { index: 3, value: 3, name: '3' },
  { index: 4, value: 4, name: '4' },
  { index: 5, value: 5, name: '5' },
  { index: 6, value: 6, name: '6' },
  { index: 7, value: 7, name: '7' },
  { index: 8, value: 8, name: '8' },
  { index: 9, value: 9, name: '9' },
  { index: 10, value: 10, name: '10' },
  { index: 11, value: 11, name: '11' },
  { index: 12, value: 12, name: '12' },
];

export const smokingItems: StringItem[] = [
  { index: 1, value: '비흡연자', name: '비흡연자' },
  { index: 2, value: '연초', name: '연초' },
  { index: 3, value: '궐련형 전자담배', name: '궐련형 전자담배' },
  { index: 4, value: '액상형 전자담배', name: '액상형 전자담배' },
];

export const sleepingHabitItems: StringItem[] = [
  { index: 1, value: '잠버릇이 없어요', name: '잠버릇이 없어요' },
  { index: 2, value: '코골이', name: '코골이' },
  { index: 3, value: '이갈이', name: '이갈이' },
  { index: 4, value: '몽유병', name: '몽유병' },
  { index: 5, value: '잠꼬대', name: '잠꼬대' },
  { index: 6, value: '뒤척임', name: '뒤척임' },
];

export const airConditioningIntensityItems: NumberItem[] = [
  { index: 1, value: 0, name: '안 틀어요' },
  { index: 2, value: 1, name: '약하게 틀어요' },
  { index: 3, value: 2, name: '적당하게 틀어요' },
  { index: 4, value: 3, name: '강하게 틀어요' },
];

export const heatingIntensityItems: NumberItem[] = [
  { index: 1, value: 0, name: '안 틀어요' },
  { index: 2, value: 1, name: '약하게 틀어요' },
  { index: 3, value: 2, name: '적당하게 틀어요' },
  { index: 4, value: 3, name: '강하게 틀어요' },
];

export const lifePatternItems: StringItem[] = [
  { index: 1, value: '아침형 인간', name: '아침형 인간' },
  { index: 2, value: '새벽형 인간', name: '새벽형 인간' },
];

export const intimacyItems: StringItem[] = [
  { index: 1, value: '필요한 말만 했으면 좋겠어요', name: '필요한 말만 했으면 좋겠어요' },
  { index: 2, value: '어느정도 친하게 지내요', name: '어느정도 친하게 지내요' },
  { index: 3, value: '완전 친하게 지내요', name: '완전 친하게 지내요' },
];

export const canShareItems: StringItem[] = [
  { index: 1, value: '아무것도 공유하고싶지 않아요', name: '아무것도 공유하고싶지 않아요' },
  { index: 2, value: '휴지정도는 빌려줄 수 있어요', name: '휴지정도는 빌려줄 수 있어요' },
  { index: 3, value: '옷정도는 빌려줄 수 있어요', name: '옷정도는 빌려줄 수 있어요' },
  { index: 4, value: '칫솔만 아니면 돼요', name: '칫솔만 아니면 돼요' },
];

export const isPlayGameItems: StringItem[] = [
  { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요' },
  { index: 2, value: '키보드 채팅정도만 쳐요', name: '키보드 채팅정도만 쳐요' },
  { index: 3, value: '보이스 채팅도 해요', name: '보이스 채팅도 해요' },
];

export const isPhoneCallItems: StringItem[] = [
  { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요' },
  { index: 2, value: '급한 전화만 해요', name: '급한 전화만 해요' },
  { index: 3, value: '자주 해요', name: '자주 해요' },
];

export const studyingItems: StringItem[] = [
  { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요' },
  { index: 2, value: '시험기간 때만 해요', name: '시험기간 때만 해요' },
  { index: 3, value: '매일 해요', name: '매일 해요' },
];

export const intakeItems: StringItem[] = [
  { index: 1, value: '아예 안 먹어요', name: '아예 안 먹어요' },
  { index: 2, value: '음료만 마셔요', name: '음료만 마셔요' },
  { index: 3, value: '간단한 간식정도만 먹어요', name: '간단한 간식정도만 먹어요' },
  { index: 4, value: '배달음식도 먹어요', name: '배달음식도 먹어요' },
];

export const cleanSensitivityItems: NumberItem[] = [
  { index: 1, value: 1, name: '매우 예민하지 않아요' },
  { index: 2, value: 2, name: '예민하지 않아요' },
  { index: 3, value: 3, name: '보통이에요' },
  { index: 4, value: 4, name: '예민해요' },
  { index: 5, value: 5, name: '매우 예민해요' },
];

export const noiseSensitivityItems: NumberItem[] = [
  { index: 1, value: 1, name: '매우 예민하지 않아요' },
  { index: 2, value: 2, name: '예민하지 않아요' },
  { index: 3, value: 3, name: '보통이에요' },
  { index: 4, value: 4, name: '예민해요' },
  { index: 5, value: 5, name: '매우 예민해요' },
];

export const cleaningFrequencyItems: StringItem[] = [
  { index: 1, value: '한 달에 한 번 해요', name: '한 달에 한 번 해요' },
  { index: 2, value: '2주에 한 번 해요', name: '2주에 한 번 해요' },
  { index: 3, value: '일주일에 한 번 해요', name: '일주일에 한 번 해요' },
  { index: 4, value: '이틀에 한 번 해요', name: '이틀에 한 번 해요' },
  { index: 5, value: '매일매일 해요', name: '매일매일 해요' },
];

export const drinkingFrequencyItems: StringItem[] = [
  { index: 1, value: '아예 안 마셔요', name: '아예 안 마셔요' },
  { index: 2, value: '한 달에 한 두번 마셔요', name: '한 달에 한 두번 마셔요' },
  { index: 3, value: '일주일에 한 두번 마셔요', name: '일주일에 한 두번 마셔요' },
  { index: 4, value: '일주일에 네 번이상 마셔요', name: '일주일에 네 번이상 마셔요' },
  { index: 5, value: '거의 매일 마셔요', name: '거의 매일 마셔요' },
];

export const personalityItems: StringItem[] = [
  { index: 1, value: '조용해요', name: '조용해요' },
  { index: 2, value: '활발해요', name: '활발해요' },
  { index: 3, value: '말이 많아요', name: '말이 많아요' },
  { index: 4, value: '깔끔해요', name: '깔끔해요' },
  { index: 5, value: '부끄러움이 많아요', name: '부끄러움이 많아요' },
  { index: 6, value: '집이 좋아요', name: '집이 좋아요' },
  { index: 7, value: '바깥이 좋아요', name: '바깥이 좋아요' },
  { index: 8, value: '급해요', name: '급해요' },
  { index: 9, value: '느긋해요', name: '느긋해요' },
  { index: 10, value: '낯을 가려요', name: '낯을 가려요' },
  { index: 11, value: '귀차니즘이 있어요', name: '귀차니즘이 있어요' },
  { index: 12, value: '부지런해요', name: '부지런해요' },
];

export const mbtiItems: StringItem[] = [
  { index: 1, value: 'ISTJ', name: 'ISTJ' },
  { index: 2, value: 'ISFJ', name: 'ISFJ' },
  { index: 3, value: 'INFJ', name: 'INFJ' },
  { index: 4, value: 'INTJ', name: 'INTJ' },
  { index: 5, value: 'ISTP', name: 'ISTP' },
  { index: 6, value: 'ISFP', name: 'ISFP' },
  { index: 7, value: 'INFP', name: 'INFP' },
  { index: 8, value: 'INTP', name: 'INTP' },
  { index: 9, value: 'ESTP', name: 'ESTP' },
  { index: 10, value: 'ESFP', name: 'ESFP' },
  { index: 11, value: 'ENFP', name: 'ENFP' },
  { index: 12, value: 'ENTP', name: 'ENTP' },
  { index: 13, value: 'ESTJ', name: 'ESTJ' },
  { index: 14, value: 'ESFJ', name: 'ESFJ' },
  { index: 15, value: 'ENFJ', name: 'ENFJ' },
  { index: 16, value: 'ENTJ', name: 'ENTJ' },
];
