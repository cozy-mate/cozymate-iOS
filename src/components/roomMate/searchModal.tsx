import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Pressable, ScrollView } from 'react-native';

import SearchModalItem from './searchModalItem';

import XButton from '@assets/roomMate/xButton.svg';
import SelectedBox from '@assets/roomMate/selectedBox.svg';
import SmallXButton from '@assets/roomMate/smallXButton.svg';
import NotSelectedBox from '@assets/roomMate/notSelectedBox.svg';

interface SearchModalProps {
  onClose: () => void;
}

interface SelectedValueList {
  [key: string]: (string | number)[];
}

interface FilterList {
  index: number;
  key: string;
  title: string;
  selected: boolean;
}

interface ItemList {
  [key: string]: {
    index: number;
    value: string | number;
    name: string;
    meridian?: string;
    select: boolean;
  }[];
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  // 필터링 항목 목록
  const [filterList, setFilterList] = useState<FilterList[]>([
    { index: 1, key: 'birthYear', title: '출생년도', selected: true },
    { index: 2, key: 'acceptance', title: '합격여부', selected: false },
    { index: 3, key: 'admissionYear', title: '학번', selected: false },
    { index: 4, key: 'major', title: '학과', selected: false },
    { index: 5, key: 'wakeUpTime', title: '기상시간', selected: false },
    { index: 6, key: 'sleepingTime', title: '취침시간', selected: false },
    { index: 7, key: 'turnOffTime', title: '소등시간', selected: false },
    { index: 8, key: 'smoking', title: '흡연여부', selected: false },
    { index: 9, key: 'sleepingHabit', title: '잠버릇', selected: false },
    { index: 10, key: 'airConditioningIntensity', title: '에어컨', selected: false },
    { index: 11, key: 'heatingIntensity', title: '히터', selected: false },
    { index: 12, key: 'lifePattern', title: '생활패턴', selected: false },
    { index: 13, key: 'intimacy', title: '친밀도', selected: false },
    { index: 14, key: 'canShare', title: '물건공유', selected: false },
    { index: 15, key: 'isPlayGame', title: '게임여부', selected: false },
    { index: 16, key: 'isPhoneCall', title: '전화여부', selected: false },
    { index: 17, key: 'studying', title: '공부여부', selected: false },
    { index: 18, key: 'intake', title: '섭취여부', selected: false },
    { index: 19, key: 'cleanSensitivity', title: '청결예민도', selected: false },
    { index: 20, key: 'noiseSensitivity', title: '소음예민도', selected: false },
    { index: 21, key: 'cleaningFrequency', title: '청소빈도', selected: false },
    { index: 22, key: 'drinkingFrequency', title: '음주빈도', selected: false },
    { index: 23, key: 'personality', title: '성격', selected: false },
    { index: 24, key: 'mbti', title: 'MBTI', selected: false },
  ]);

  // 선택된 필터링 항목
  const [selectedFilter, setSelectedFilter] = useState<string>('birthYear');

  // 필터링 선택
  const handleFilter = (filterList: FilterList) => {
    // 선택한 필터링의 selected를 true로 변경 (나머지 항목은 false)
    setFilterList((prevList) =>
      prevList.map(
        (filter) =>
          filter.index === filterList.index
            ? { ...filter, selected: true } // Set the selected item to true
            : { ...filter, selected: false }, // Set all other items to false
      ),
    );

    setSelectedFilter(filterList.key);
  };

  // 필터 세부 아이템
  const [filterDetailItem, setFilterDetailItem] = useState<ItemList[]>([
    {
      birthYear: [
        { index: 1, value: 1990, name: '1990년', select: false },
        { index: 2, value: 1991, name: '1991년', select: false },
        { index: 3, value: 1992, name: '1992년', select: false },
        { index: 4, value: 1993, name: '1993년', select: false },
        { index: 5, value: 1994, name: '1994년', select: false },
        { index: 6, value: 1995, name: '1995년', select: false },
        { index: 7, value: 1996, name: '1996년', select: false },
        { index: 8, value: 1997, name: '1997년', select: false },
        { index: 9, value: 1998, name: '1998년', select: false },
        { index: 10, value: 1999, name: '1999년', select: false },
        { index: 11, value: 2000, name: '2000년', select: false },
        { index: 12, value: 2001, name: '2001년', select: false },
        { index: 13, value: 2002, name: '2002년', select: false },
        { index: 14, value: 2003, name: '2003년', select: false },
        { index: 15, value: 2004, name: '2004년', select: false },
        { index: 16, value: 2005, name: '2005년', select: false },
      ],
    },
    {
      admissionYear: [
        { index: 1, value: '09', name: '09학번', select: false },
        { index: 2, value: '10', name: '10학번', select: false },
        { index: 3, value: '11', name: '11학번', select: false },
        { index: 4, value: '12', name: '12학번', select: false },
        { index: 5, value: '13', name: '13학번', select: false },
        { index: 6, value: '14', name: '14학번', select: false },
        { index: 7, value: '15', name: '15학번', select: false },
        { index: 8, value: '16', name: '16학번', select: false },
        { index: 9, value: '17', name: '17학번', select: false },
        { index: 10, value: '18', name: '18학번', select: false },
        { index: 11, value: '19', name: '19학번', select: false },
        { index: 12, value: '20', name: '20학번', select: false },
        { index: 13, value: '21', name: '21학번', select: false },
        { index: 14, value: '22', name: '22학번', select: false },
        { index: 15, value: '23', name: '23학번', select: false },
        { index: 16, value: '24', name: '24학번', select: false },
      ],
    },
    {
      acceptance: [
        { index: 1, value: '합격', name: '합격', select: false },
        { index: 2, value: '결과대기중', name: '결과대기중', select: false },
        { index: 3, value: '예비번호를 받았어요', name: '예비번호를 받았어요', select: false },
      ],
    },

    {
      wakeUpTime: [
        { index: 1, value: 1, name: '01:00', meridian: 'AM', select: false },
        { index: 2, value: 2, name: '02:00', meridian: 'AM', select: false },
        { index: 3, value: 3, name: '03:00', meridian: 'AM', select: false },
        { index: 4, value: 4, name: '04:00', meridian: 'AM', select: false },
        { index: 5, value: 5, name: '05:00', meridian: 'AM', select: false },
        { index: 6, value: 6, name: '06:00', meridian: 'AM', select: false },
        { index: 7, value: 7, name: '07:00', meridian: 'AM', select: false },
        { index: 8, value: 8, name: '08:00', meridian: 'AM', select: false },
        { index: 9, value: 9, name: '09:00', meridian: 'AM', select: false },
        { index: 10, value: 10, name: '10:00', meridian: 'AM', select: false },
        { index: 11, value: 11, name: '11:00', meridian: 'AM', select: false },
        { index: 12, value: 12, name: '12:00', meridian: 'AM', select: false },
        { index: 13, value: 13, name: '01:00', meridian: 'PM', select: false },
        { index: 14, value: 14, name: '02:00', meridian: 'PM', select: false },
        { index: 15, value: 15, name: '03:00', meridian: 'PM', select: false },
        { index: 16, value: 16, name: '04:00', meridian: 'PM', select: false },
        { index: 17, value: 17, name: '05:00', meridian: 'PM', select: false },
        { index: 18, value: 18, name: '06:00', meridian: 'PM', select: false },
        { index: 19, value: 19, name: '07:00', meridian: 'PM', select: false },
        { index: 20, value: 20, name: '08:00', meridian: 'PM', select: false },
        { index: 21, value: 21, name: '09:00', meridian: 'PM', select: false },
        { index: 22, value: 22, name: '10:00', meridian: 'PM', select: false },
        { index: 23, value: 23, name: '11:00', meridian: 'PM', select: false },
        { index: 24, value: 0, name: '12:00', meridian: 'PM', select: false },
      ],
    },
    {
      sleepingTime: [
        { index: 1, value: 1, name: '01:00', meridian: 'AM', select: false },
        { index: 2, value: 2, name: '02:00', meridian: 'AM', select: false },
        { index: 3, value: 3, name: '03:00', meridian: 'AM', select: false },
        { index: 4, value: 4, name: '04:00', meridian: 'AM', select: false },
        { index: 5, value: 5, name: '05:00', meridian: 'AM', select: false },
        { index: 6, value: 6, name: '06:00', meridian: 'AM', select: false },
        { index: 7, value: 7, name: '07:00', meridian: 'AM', select: false },
        { index: 8, value: 8, name: '08:00', meridian: 'AM', select: false },
        { index: 9, value: 9, name: '09:00', meridian: 'AM', select: false },
        { index: 10, value: 10, name: '10:00', meridian: 'AM', select: false },
        { index: 11, value: 11, name: '11:00', meridian: 'AM', select: false },
        { index: 12, value: 12, name: '12:00', meridian: 'AM', select: false },
        { index: 13, value: 13, name: '01:00', meridian: 'PM', select: false },
        { index: 14, value: 14, name: '02:00', meridian: 'PM', select: false },
        { index: 15, value: 15, name: '03:00', meridian: 'PM', select: false },
        { index: 16, value: 16, name: '04:00', meridian: 'PM', select: false },
        { index: 17, value: 17, name: '05:00', meridian: 'PM', select: false },
        { index: 18, value: 18, name: '06:00', meridian: 'PM', select: false },
        { index: 19, value: 19, name: '07:00', meridian: 'PM', select: false },
        { index: 20, value: 20, name: '08:00', meridian: 'PM', select: false },
        { index: 21, value: 21, name: '09:00', meridian: 'PM', select: false },
        { index: 22, value: 22, name: '10:00', meridian: 'PM', select: false },
        { index: 23, value: 23, name: '11:00', meridian: 'PM', select: false },
        { index: 24, value: 0, name: '12:00', meridian: 'PM', select: false },
      ],
    },
    {
      turnOffTime: [
        { index: 1, value: 1, name: '01:00', meridian: 'AM', select: false },
        { index: 2, value: 2, name: '02:00', meridian: 'AM', select: false },
        { index: 3, value: 3, name: '03:00', meridian: 'AM', select: false },
        { index: 4, value: 4, name: '04:00', meridian: 'AM', select: false },
        { index: 5, value: 5, name: '05:00', meridian: 'AM', select: false },
        { index: 6, value: 6, name: '06:00', meridian: 'AM', select: false },
        { index: 7, value: 7, name: '07:00', meridian: 'AM', select: false },
        { index: 8, value: 8, name: '08:00', meridian: 'AM', select: false },
        { index: 9, value: 9, name: '09:00', meridian: 'AM', select: false },
        { index: 10, value: 10, name: '10:00', meridian: 'AM', select: false },
        { index: 11, value: 11, name: '11:00', meridian: 'AM', select: false },
        { index: 12, value: 12, name: '12:00', meridian: 'AM', select: false },
        { index: 13, value: 13, name: '01:00', meridian: 'PM', select: false },
        { index: 14, value: 14, name: '02:00', meridian: 'PM', select: false },
        { index: 15, value: 15, name: '03:00', meridian: 'PM', select: false },
        { index: 16, value: 16, name: '04:00', meridian: 'PM', select: false },
        { index: 17, value: 17, name: '05:00', meridian: 'PM', select: false },
        { index: 18, value: 18, name: '06:00', meridian: 'PM', select: false },
        { index: 19, value: 19, name: '07:00', meridian: 'PM', select: false },
        { index: 20, value: 20, name: '08:00', meridian: 'PM', select: false },
        { index: 21, value: 21, name: '09:00', meridian: 'PM', select: false },
        { index: 22, value: 22, name: '10:00', meridian: 'PM', select: false },
        { index: 23, value: 23, name: '11:00', meridian: 'PM', select: false },
        { index: 24, value: 0, name: '12:00', meridian: 'PM', select: false },
      ],
    },
    {
      smoking: [
        { index: 1, value: '비흡연자', name: '비흡연자', select: false },
        { index: 2, value: '연초', name: '연초', select: false },
        { index: 3, value: '궐련형 전자담배', name: '궐련형 전자담배', select: false },
        { index: 4, value: '액상형 전자담배', name: '액상형 전자담배', select: false },
      ],
    },
    {
      sleepingHabit: [
        { index: 1, value: '잠버릇이 없어요', name: '잠버릇이 없어요', select: false },
        { index: 2, value: '코골이', name: '코골이', select: false },
        { index: 3, value: '이갈이', name: '이갈이', select: false },
        { index: 4, value: '몽유병', name: '몽유병', select: false },
        { index: 5, value: '잠꼬대', name: '잠꼬대', select: false },
        { index: 6, value: '뒤척임', name: '뒤척임', select: false },
      ],
    },
    {
      airConditioningIntensity: [
        { index: 1, value: 0, name: '안 틀어요', select: false },
        { index: 2, value: 1, name: '약하게 틀어요', select: false },
        { index: 3, value: 2, name: '적당하게 틀어요', select: false },
        { index: 4, value: 3, name: '세게 틀어요', select: false },
      ],
    },
    {
      heatingIntensity: [
        { index: 1, value: 0, name: '안 틀어요', select: false },
        { index: 2, value: 1, name: '약하게 틀어요', select: false },
        { index: 3, value: 2, name: '적당하게 틀어요', select: false },
        { index: 4, value: 3, name: '세게 틀어요', select: false },
      ],
    },
    {
      lifePattern: [
        { index: 1, value: '아침형 인간', name: '아침형 인간', select: false },
        { index: 2, value: '새벽형 인간', name: '새벽형 인간', select: false },
      ],
    },
    {
      intimacy: [
        {
          index: 1,
          value: '필요한 말만 했으면 좋겠어요',
          name: '필요한 말만 했으면 좋겠어요',
          select: false,
        },
        {
          index: 2,
          value: '어느정도 친하게 지내요',
          name: '어느정도 친하게 지내요',
          select: false,
        },
        { index: 3, value: '완전 친하게 지내요', name: '완전 친하게 지내요', select: false },
      ],
    },
    {
      canShare: [
        {
          index: 1,
          value: '아무것도 공유하고 싶지 않아요',
          name: '아무것도 공유하고 싶지 않아요',
          select: false,
        },
        {
          index: 2,
          value: '휴지정도는 빌려줄 수 있어요',
          name: '휴지정도는 빌려줄 수 있어요',
          select: false,
        },
        {
          index: 3,
          value: '옷정도는 빌려줄 수 있어요',
          name: '옷정도는 빌려줄 수 있어요',
          select: false,
        },
        { index: 4, value: '칫솔만 아니면 돼요', name: '칫솔만 아니면 돼요', select: false },
      ],
    },
    {
      isPlayGame: [
        { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요', select: false },
        {
          index: 2,
          value: '키보드 채팅정도만 쳐요',
          name: '키보드 채팅정도만 쳐요',
          select: false,
        },
        { index: 3, value: '보이스 채팅도 해요', name: '보이스 채팅도 해요', select: false },
      ],
    },
    {
      isPhoneCall: [
        { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요', select: false },
        { index: 2, value: '급한 전화만 해요', name: '급한 전화만 해요', select: false },
        { index: 3, value: '자주 해요', name: '자주 해요', select: false },
      ],
    },
    {
      studying: [
        { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요', select: false },
        { index: 2, value: '시험기간 때만 해요', name: '시험기간 때만 해요', select: false },
        { index: 3, value: '매일 해요', name: '매일 해요', select: false },
      ],
    },
    {
      intake: [
        { index: 1, value: '아예 안 먹어요', name: '아예 안 먹어요', select: false },
        { index: 2, value: '음료만 마셔요', name: '음료만 마셔요', select: false },
        {
          index: 3,
          value: '간단한 간식정도만 먹어요',
          name: '간단한 간식정도만 먹어요',
          select: false,
        },
        { index: 4, value: '배달음식도 먹어요', name: '배달음식도 먹어요', select: false },
      ],
    },
    {
      cleanSensitivity: [
        { index: 1, value: 1, name: '매우 예민하지 않아요', select: false },
        { index: 2, value: 2, name: '예민하지 않아요', select: false },
        { index: 3, value: 3, name: '보통이에요', select: false },
        { index: 4, value: 4, name: '예민해요', select: false },
        { index: 5, value: 5, name: '매우 예민해요', select: false },
      ],
    },
    {
      noiseSensitivity: [
        { index: 1, value: 1, name: '매우 예민하지 않아요', select: false },
        { index: 2, value: 2, name: '예민하지 않아요', select: false },
        { index: 3, value: 3, name: '보통이에요', select: false },
        { index: 4, value: 4, name: '예민해요', select: false },
        { index: 5, value: 5, name: '매우 예민해요', select: false },
      ],
    },
    {
      cleaningFrequency: [
        { index: 1, value: '한 달에 한 번 해요', name: '한 달에 한 번 해요', select: false },
        { index: 2, value: '2주에 한 번 해요', name: '2주에 한 번 해요', select: false },
        { index: 3, value: '일주일에 한 번 해요', name: '일주일에 한 번 해요', select: false },
        { index: 4, value: '이틀에 한 번 해요', name: '이틀에 한 번 해요', select: false },
        { index: 5, value: '매일매일 해요', name: '매일매일 해요', select: false },
      ],
    },
    {
      drinkingFrequency: [
        { index: 1, value: '아예 안 마셔요', name: '아예 안 마셔요', select: false },
        {
          index: 2,
          value: '한 달에 한 두번 마셔요',
          name: '한 달에 한 두번 마셔요',
          select: false,
        },
        {
          index: 3,
          value: '일주일에 한 두번 마셔요',
          name: '일주일에 한 두번 마셔요',
          select: false,
        },
        {
          index: 4,
          value: '일주일에 네 번 이상 마셔요',
          name: '일주일에 네 번 이상 마셔요',
          select: false,
        },
        { index: 5, value: '거의 매일 마셔요', name: '거의 매일 마셔요', select: false },
      ],
    },
    {
      personality: [
        { index: 1, value: '조용해요', name: '조용해요', select: false },
        { index: 2, value: '활발해요', name: '활발해요', select: false },
        { index: 3, value: '말이 많아요', name: '말이 많아요', select: false },
        { index: 4, value: '깔끔해요', name: '깔끔해요', select: false },
        { index: 5, value: '부끄러움이 많아요', name: '부끄러움이 많아요', select: false },
        { index: 6, value: '집이 좋아요', name: '집이 좋아요', select: false },
        { index: 7, value: '바깥이 좋아요', name: '바깥이 좋아요', select: false },
        { index: 8, value: '급해요', name: '급해요', select: false },
        { index: 9, value: '느긋해요', name: '느긋해요', select: false },
        { index: 10, value: '낯을 가려요', name: '낯을 가려요', select: false },
        { index: 11, value: '낯을 가리지 않아요', name: '낯을 가리지 않아요', select: false },
        { index: 12, value: '귀차니즘이 있어요', name: '귀차니즘이 있어요', select: false },
        { index: 13, value: '부지런해요', name: '부지런해요', select: false },
      ],
    },
    {
      mbti: [
        { index: 1, value: 'ISTJ', name: 'ISTJ', select: false },
        { index: 2, value: 'ISFJ', name: 'ISFJ', select: false },
        { index: 3, value: 'INFJ', name: 'INFJ', select: false },
        { index: 4, value: 'INTJ', name: 'INTJ', select: false },
        { index: 5, value: 'ISTP', name: 'ISTP', select: false },
        { index: 6, value: 'ISFP', name: 'ISFP', select: false },
        { index: 7, value: 'INFP', name: 'INFP', select: false },
        { index: 8, value: 'INTP', name: 'INTP', select: false },
        { index: 9, value: 'ESTP', name: 'ESTP', select: false },
        { index: 10, value: 'ESFP', name: 'ESFP', select: false },
        { index: 11, value: 'ENFP', name: 'ENFP', select: false },
        { index: 12, value: 'ENTP', name: 'ENTP', select: false },
        { index: 13, value: 'ESTJ', name: 'ESTJ', select: false },
        { index: 14, value: 'ESFJ', name: 'ESFJ', select: false },
        { index: 15, value: 'ENFJ', name: 'ENFJ', select: false },
        { index: 16, value: 'ENTJ', name: 'ENTJ', select: false },
      ],
    },
  ]);

  const selectedItems = filterDetailItem.find((item) => item[selectedFilter]);

  // 선택한 필터링 값
  const [selectedValueList, setSelectedValueList] = useState<SelectedValueList>({
    birthYear: [],
    acceptance: [],
    admissionYear: [],
    major: [],
    wakeUpTime: [],
    sleepingTime: [],
    turnOffTime: [],
    smoking: [],
    sleepingHabit: [],
    airConditioningIntensity: [],
    heatingIntensity: [],
    lifePattern: [],
    intimacy: [],
    canShare: [],
    isPlayGame: [],
    isPhoneCall: [],
    studying: [],
    intake: [],
    cleanSensitivity: [],
    noiseSensitivity: [],
    cleaningFrequency: [],
    drinkingFrequency: [],
    personality: [],
    mbti: [],
  });

  // 필터 세부 항목 선택 핸들러
  const handleDetailSelect = (filterKey: string, item: any) => {
    setFilterDetailItem((prevList) =>
      prevList.map((filter) => {
        if (filterKey in filter) {
          return {
            ...filter,
            [filterKey]: filter[filterKey].map((detail) =>
              detail.index === item.index ? { ...detail, select: !detail.select } : detail,
            ),
          };
        }
        return filter;
      }),
    );

    // 선택된 값을 selectedValueList에 추가
    setSelectedValueList((prevSelected) => {
      const updatedList = { ...prevSelected };
      if (!updatedList[filterKey]) {
        updatedList[filterKey] = [];
      }

      // 선택된 항목의 select 값에 따라 추가 또는 제거
      if (item.select) {
        updatedList[filterKey] = updatedList[filterKey].filter((value) => value !== item.value);
      } else {
        updatedList[filterKey].push(item.value); // value 값을 추가
      }

      return updatedList;
    });
  };

  // 모든 키의 값을 빈 배열로 초기화하는 메서드
  const clearAllValues = () => {
    setSelectedValueList((prevSelected) => {
      const updatedList = { ...prevSelected };
      Object.keys(updatedList).forEach((key) => {
        updatedList[key] = []; // 각 키의 값을 빈 배열로 설정
      });
      return updatedList;
    });
  };

  return (
    <Modal transparent={true} animationType="slide">
      <View className="absolute left-0 top-0 flex h-screen w-screen flex-col justify-end bg-modalBack">
        <View className="flex h-3/4 flex-col justify-between rounded-t-[20px] bg-white px-5 py-3">
          <View className="flex flex-col">
            <Pressable
              onPress={onClose}
              className="mb-2 flex h-10 flex-row items-center justify-end"
            >
              <XButton />
            </Pressable>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mb-4 border-b border-b-[#f6f6f6]"
            >
              {filterList.map((filter) => (
                <Pressable
                  key={filter.index}
                  onPress={() => handleFilter(filter)}
                  className={`px-1 py-2 ${
                    filter.selected ? 'border-b border-b-emphasizedFont' : 'border-0'
                  }`}
                >
                  <Text
                    className={`pb-2 ${
                      filter.selected
                        ? 'font-semibold text-emphasizedFont'
                        : 'font-medium text-disabledFont'
                    }`}
                  >
                    {filter.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <SearchModalItem
              selectedItems={selectedItems}
              selectedFilter={selectedFilter}
              selectFunc={handleDetailSelect}
            />

            {/* <View className="flex flex-row flex-wrap">
              {selectedItems &&
                selectedItems[selectedFilter].map((detail) => (
                  <Pressable
                    key={detail.index}
                    onPress={() => handleDetailSelect(selectedFilter, detail)}
                    className="mr-2 flex flex-row items-center"
                  >
                    <View className="p-[7px]">
                      {detail.select ? <SelectedBox /> : <NotSelectedBox />}
                    </View>
                    <Text>{detail.name}</Text>
                  </Pressable>
                ))}
            </View> */}
          </View>

          <View className="flex flex-row items-center justify-between">
            {Object.entries(selectedValueList)
              .filter(([_, values]) => values.length > 0) // 빈 배열 제외
              .map(([key, values]) => (
                <View key={key} className="flex flex-row items-center">
                  {values.map((value, index) => (
                    <Pressable
                      key={`${key}-${index}`}
                      className="flex flex-row items-center rounded-full border border-main1 bg-sub2 py-1 pl-3.5 pr-1.5"
                    >
                      <Text className="text-sm font-semibold text-main1">{value}</Text>
                      <View className="p-2">
                        <SmallXButton />
                      </View>
                    </Pressable>
                  ))}
                </View>
              ))}
            <Pressable onPress={clearAllValues}>
              <Text>초기화</Text>
            </Pressable>
          </View>

          <Pressable className="mb-5 rounded-xl bg-main1 p-4">
            <Text className="text-center text-base font-semibold text-white">
              2명의 룸메이트 보기
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
