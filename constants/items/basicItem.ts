import { acceptanceItems, numOfRoommateItems, timeItems } from '@/constants/items/lifeStyleItem';

export const itemList = [
  {
    title: '기숙사 합격여부를 선택해주세요',
    key: 'acceptance',
    items: acceptanceItems,
    componentType: 'radio',
  },
  {
    title: '신청실의 인원을 선택해주세요',
    key: 'numOfRoommate',
    items: numOfRoommateItems,
    componentType: 'radio',
  },
  {
    title: '학번을 입력해주세요',
    key: 'admissionYear',
    items: timeItems,
    componentType: 'text',
  },
];
