import {
  airConditioningIntensityItems,
  heatingIntensityItems,
  sleepingHabitItems,
  smokingItems,
  timeItems,
} from '@/constants/items/lifeStyleItem';

export const itemList = [
  {
    title: '히터 강도를 선택해주세요',
    key: 'heatingIntensity',
    items: heatingIntensityItems,
    componentType: 'radio',
  },
  {
    title: '에어컨 강도를 선택해주세요',
    key: 'airConditioningIntensity',
    items: airConditioningIntensityItems,
    componentType: 'radio',
  },
  {
    title: '잠버릇을 선택해주세요 (중복선택 가능)',
    key: 'sleepingHabit',
    items: sleepingHabitItems,
    componentType: 'select',
  },
  {
    title: '흡연 여부를 선택해주세요',
    key: 'smoking',
    items: smokingItems,
    componentType: 'radio',
  },
  {
    title: '소등시간을 선택해주세요',
    key: 'turnOffTime',
    items: timeItems,
    componentType: 'radio',
  },
  {
    title: '취침시간을 선택해주세요',
    key: 'sleepingTime',
    items: timeItems,
    componentType: 'radio',
  },
  {
    title: '기상시간을 선택해주세요',
    key: 'wakeUpTime',
    items: timeItems,
    componentType: 'radio',
  },
];
