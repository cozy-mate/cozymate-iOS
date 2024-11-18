import React, { useState } from 'react';
import { FlatList } from 'react-native';

import FilteringModalItem from './filteringModalItem';

interface Item {
  index: number;
  value: string | number;
  name: string;
  meridian?: string;
  select: boolean;
}

interface ItemList {
  [key: string]: Item[];
}

interface SelectedValueList {
  [key: string]: (string | number)[];
}

interface FilteringOptionProps {
  selectedFilter: string;
  selectFunc: React.Dispatch<React.SetStateAction<SelectedValueList>>;
}

const FilteringOption: React.FC<FilteringOptionProps> = ({ selectedFilter, selectFunc }) => {
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

  const isGridStyle =
    selectedFilter === 'birthYear' ||
    selectedFilter === 'admissionYear' ||
    selectedFilter === 'MBTI' ||
    selectedFilter === 'wakeUpTime' ||
    selectedFilter === 'sleepingTime' ||
    selectedFilter === 'turnOffTime';

  const isTime =
    selectedFilter === '기상시간' || selectedFilter === '취침시간' || selectedFilter === '소등시간';

  const handleDetailSelect = (filterKey: string, item: any) => {
    setFilterDetailItem((prevList) =>
      prevList.map((filter) => {
        if (filterKey in filter) {
          return {
            ...filter,
            [filterKey]: filter[filterKey].map((detail) =>
              detail.index === item.index
                ? { ...detail, select: !detail.select } // Toggle select state
                : detail,
            ),
          };
        }
        return filter;
      }),
    );

    // Update selected values in selectedValueList
    selectFunc((prevSelected) => {
      const updatedList = { ...prevSelected };
      if (!updatedList[filterKey]) {
        updatedList[filterKey] = [];
      }

      // Toggle the select value
      if (item.select) {
        updatedList[filterKey] = updatedList[filterKey].filter((value) => value !== item.value);
      } else {
        updatedList[filterKey].push(item.value);
      }

      return updatedList;
    });
  };

  return (
    <FlatList
      data={selectedItems ? selectedItems[selectedFilter] : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <FilteringModalItem
          item={item}
          selectedFilter={selectedFilter}
          selectFunc={handleDetailSelect}
        />
      )}
      showsVerticalScrollIndicator={false}
      numColumns={isGridStyle ? 4 : 0}
      columnWrapperStyle={isGridStyle && { justifyContent: 'space-between' }}
      contentContainerStyle={{ columnGap: 8, rowGap: 8 }}
      key={selectedFilter}
    />
  );
};

export default FilteringOption;
