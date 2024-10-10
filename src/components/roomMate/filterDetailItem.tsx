import React, { useState } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';

import SelectedBox from '@assets/roomMate/selectedBox.svg';
import NotSelectedBox from '@assets/roomMate/notSelectedBox.svg';

interface Item {
  index: number;
  value: number | string;
  name: string;
  meridian?: 'AM' | 'PM';
  select: boolean;
}

interface ItemList {
  title: string;
  value: Item[];
}

const RenderPressableItems: React.FC<{
  title: string;
  onSelectValue: (title: string, value: any) => void;
}> = ({ title, onSelectValue }) => {
  const [filterDetailItem, setFilterDetailItem] = useState<ItemList[]>([
    {
      title: '출생년도',
      value: [
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
      title: '학번',
      value: [
        { index: 1, value: 9, name: '09학번', select: false },
        { index: 2, value: 10, name: '10학번', select: false },
        { index: 3, value: 11, name: '11학번', select: false },
        { index: 4, value: 12, name: '12학번', select: false },
        { index: 5, value: 13, name: '13학번', select: false },
        { index: 6, value: 14, name: '14학번', select: false },
        { index: 7, value: 15, name: '15학번', select: false },
        { index: 8, value: 16, name: '16학번', select: false },
        { index: 9, value: 17, name: '17학번', select: false },
        { index: 10, value: 18, name: '18학번', select: false },
        { index: 11, value: 19, name: '19학번', select: false },
        { index: 12, value: 20, name: '20학번', select: false },
        { index: 13, value: 21, name: '21학번', select: false },
        { index: 14, value: 22, name: '22학번', select: false },
        { index: 15, value: 23, name: '23학번', select: false },
        { index: 16, value: 24, name: '24학번', select: false },
      ],
    },
    { title: '학번', value: [{ index: 1, value: '합격', name: '합격', select: false }] },
    {
      title: '합격여부',
      value: [
        { index: 1, value: '합격', name: '합격', select: false },
        { index: 2, value: '대기중', name: '대기중', select: false },
        { index: 3, value: '예비번호를 받았어요', name: '예비번호를 받았어요', select: false },
      ],
    },

    {
      title: '기상시간',
      value: [
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
        { index: 24, value: 24, name: '12:00', meridian: 'PM', select: false },
      ],
    },
    {
      title: '취침시간',
      value: [
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
        { index: 24, value: 24, name: '12:00', meridian: 'PM', select: false },
      ],
    },
    {
      title: '소등시간',
      value: [
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
        { index: 24, value: 24, name: '12:00', meridian: 'PM', select: false },
      ],
    },
    {
      title: '흡연여부',
      value: [
        { index: 1, value: '비흡연자', name: '비흡연자', select: false },
        { index: 2, value: '연초', name: '연초', select: false },
        { index: 3, value: '궐련형 전자담배', name: '궐련형 전자담배', select: false },
        { index: 4, value: '액상형 전자담배', name: '액상형 전자담배', select: false },
      ],
    },
    {
      title: '잠버릇',
      value: [
        { index: 1, value: '없어요', name: '없어요', select: false },
        { index: 2, value: '코골이', name: '코골이', select: false },
        { index: 3, value: '이갈이', name: '이갈이', select: false },
        { index: 4, value: '몽유병', name: '몽유병', select: false },
        { index: 5, value: '잠꼬대', name: '잠꼬대', select: false },
        { index: 6, value: '뒤척임', name: '뒤척임', select: false },
      ],
    },
    {
      title: '에어컨',
      value: [
        { index: 1, value: '약하게', name: '약하게', select: false },
        { index: 2, value: '적당하게', name: '적당하게', select: false },
        { index: 3, value: '강하게', name: '강하게', select: false },
      ],
    },
    {
      title: '히터',
      value: [
        { index: 1, value: '약하게', name: '약하게', select: false },
        { index: 2, value: '적당하게', name: '적당하게', select: false },
        { index: 3, value: '강하게', name: '강하게', select: false },
      ],
    },
    {
      title: '생활패턴',
      value: [
        { index: 1, value: '아침형 인간', name: '아침형 인간', select: false },
        { index: 2, value: '새벽형 인간', name: '새벽형 인간', select: false },
      ],
    },
    {
      title: '친밀도',
      value: [
        {
          index: 1,
          value: '필요한 말만',
          name: '필요한 말만',
          select: false,
        },
        { index: 2, value: '어느정도 친하게', name: '어느정도 친하게', select: false },
        { index: 3, value: '완전 친하게', name: '완전 친하게', select: false },
      ],
    },
    {
      title: '물건공유',
      value: [
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
        {
          index: 4,
          value: '칫솔만 아니면 돼요',
          name: '칫솔만 아니면 돼요',
          select: false,
        },
      ],
    },
    {
      title: '게임여부',
      value: [
        {
          index: 1,
          value: '아예 하지 않았으면 좋겠어요',
          name: '아예 하지 않았으면 좋겠어요',
          select: false,
        },
        {
          index: 2,
          value: '키보드 채팅까지는 괜찮아요',
          name: '키보드 채팅까지는 괜찮아요',
          select: false,
        },
        {
          index: 3,
          value: '보이스 채팅도 괜찮아요',
          name: '보이스 채팅도 괜찮아요',
          select: false,
        },
        {
          index: 4,
          value: '뭘하든 상관없어요',
          name: '뭘하든 상관없어요',
          select: false,
        },
      ],
    },
    {
      title: '전화여부',
      value: [
        {
          index: 1,
          value: '아예 하지 않았으면 좋겠어요',
          name: '아예 하지 않았으면 좋겠어요',
          select: false,
        },
        {
          index: 2,
          value: '부모님과의 전화는 괜찮아요',
          name: '부모님과의 전화는 괜찮아요',
          select: false,
        },
        {
          index: 3,
          value: '연인과의 전화만 아니면 돼요',
          name: '연인과의 전화만 아니면 돼요',
          select: false,
        },
        {
          index: 4,
          value: '누구랑하든 상관없어요',
          name: '누구랑하든 상관없어요',
          select: false,
        },
      ],
    },
    {
      title: '공부여부',
      value: [
        {
          index: 1,
          value: '아예 하지 않았으면 좋겠어요',
          name: '아예 하지 않았으면 좋겠어요',
          select: false,
        },
        {
          index: 2,
          value: '시험기간 때만 했으면 좋겠어요',
          name: '시험기간 때만 했으면 좋겠어요',
          select: false,
        },
        {
          index: 3,
          value: '매일해도 괜찮아요',
          name: '매일해도 괜찮아요',
          select: false,
        },
      ],
    },
    {
      title: '섭취여부',
      value: [
        {
          index: 1,
          value: '아예 먹지 않았으면 좋겠어요',
          name: '아예 먹지 않았으면 좋겠어요',
          select: false,
        },
        { index: 2, value: '음료만 가능해요', name: '음료만 가능해요', select: false },
        {
          index: 3,
          value: '간단한 간식은 괜찮아요',
          name: '간단한 간식은 괜찮아요',
          select: false,
        },
        {
          index: 4,
          value: '마음껏 먹어도 돼요',
          name: '마음껏 먹어도 돼요',
          select: false,
        },
      ],
    },
    {
      title: '청결예민도',
      value: [
        { index: 1, value: 1, name: '매우 예민하지 않아요', select: false },
        { index: 2, value: 2, name: '예민하지 않아요', select: false },
        { index: 3, value: 3, name: '보통이에요', select: false },
        { index: 4, value: 4, name: '예민해요', select: false },
        { index: 5, value: 5, name: '매우 예민해요', select: false },
      ],
    },
    {
      title: '소음예민도',
      value: [
        { index: 1, value: 1, name: '매우 예민하지 않아요', select: false },
        { index: 2, value: 2, name: '예민하지 않아요', select: false },
        { index: 3, value: 3, name: '보통이에요', select: false },
        { index: 4, value: 4, name: '예민해요', select: false },
        { index: 5, value: 5, name: '매우 예민해요', select: false },
      ],
    },
    {
      title: '청소빈도',
      value: [
        { index: 1, value: '거의 하지 않아요', name: '거의 하지 않아요', select: false },
        {
          index: 2,
          value: '한 달에 한 번씩 해요',
          name: '한 달에 한 번씩 해요',
          select: false,
        },
        {
          index: 3,
          value: '2주에 한 번씩 해요',
          name: '2주에 한 번씩 해요',
          select: false,
        },
        {
          index: 4,
          value: '일주일에 3~4번 하는 거 같아요',
          name: '일주일에 3~4번 하는 거 같아요',
          select: false,
        },
        {
          index: 5,
          value: '이틀에 한 번정도 해요',
          name: '이틀에 한 번정도 해요',
          select: false,
        },
        {
          index: 6,
          value: '매일 해요',
          name: '매일 해요',
          select: false,
        },
      ],
    },
    {
      title: '음주빈도',
      value: [
        { index: 1, value: '거의 마시지 않아요', name: '거의 마시지 않아요', select: false },
        {
          index: 2,
          value: '한 달에 한 두번정도 마셔요',
          name: '한 달에 한 두번정도 마셔요',
          select: false,
        },
        {
          index: 3,
          value: '2주에 한 두번정도 마셔요',
          name: '2주에 한 두번정도 마셔요',
          select: false,
        },
        {
          index: 4,
          value: '일주일에 한 두번정도 마셔요',
          name: '일주일에 한 두번정도 마셔요',
          select: false,
        },
        {
          index: 5,
          value: '일주일에 4번 이상 마셔요',
          name: '일주일에 4번 이상 마셔요',
          select: false,
        },
        {
          index: 6,
          value: '이틀에 한 번정도 마셔요',
          name: '이틀에 한 번정도 마셔요',
          select: false,
        },
        {
          index: 7,
          value: '거의 매일 마셔요',
          name: '거의 매일 마셔요',
          select: false,
        },
      ],
    },
    {
      title: '성격',
      value: [
        { index: 1, value: '조용해요', name: '조용해요', select: false },
        {
          index: 2,
          value: '활발해요',
          name: '활발해요',
          select: false,
        },
        {
          index: 3,
          value: '말이 많아요',
          name: '말이 많아요',
          select: false,
        },
        {
          index: 4,
          value: '깔끔해요',
          name: '깔끔해요',
          select: false,
        },
        {
          index: 5,
          value: '부끄러움이 많아요',
          name: '부끄러움이 많아요',
          select: false,
        },
        { index: 6, value: '집이 좋아요', name: '집이 좋아요', select: false },
        { index: 7, value: '바깥이 좋아요', name: '바깥이 좋아요', select: false },
      ],
    },
    {
      title: 'MBTI',
      value: [
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

  const filterItem = filterDetailItem.find((item) => item.title === title);

  const isGridStyle =
    title === '출생년도' ||
    title === '학번' ||
    title === 'MBTI' ||
    title === '기상시간' ||
    title === '취침시간' ||
    title === '소등시간';

  const isTime = title === '기상시간' || title === '취침시간' || title === '소등시간';

  const handleSelect = (categoryTitle: string, itemIndex: number) => {
    setFilterDetailItem((prevItems) =>
      prevItems.map((category) =>
        category.title === categoryTitle
          ? {
              ...category,
              value: category.value.map((item) =>
                item.index === itemIndex
                  ? { ...item, select: !item.select } // toggle the 'select' state
                  : item,
              ),
            }
          : category,
      ),
    );

    // Find the selected item
    const selectedCategory = filterDetailItem.find((category) => category.title === categoryTitle);
    const selectedItem = selectedCategory?.value.find((item) => item.index === itemIndex);

    if (selectedItem) {
      onSelectValue(categoryTitle, selectedItem); // Pass the updated value to the parent
    }
  };

  const renderItem = (item: Item) => {
    return (
      <Pressable
        key={item.index}
        className={`w-[75px] ${item.index % 4 === 0 && 'mr-2'}`}
        onPress={() => handleSelect(title, item.index)}
      >
        <View className="flex flex-row items-center">
          {item.select ? (
            <View className="p-[7px]">
              <SelectedBox />
            </View>
          ) : (
            <View className="p-[7px]">
              <NotSelectedBox />
            </View>
          )}
          <Text
            className={`${item.select ? 'font-medium text-basicFont' : 'font-normal text-disabledFont'}`}
          >
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  if (!filterItem) return null;

  const items: Item[] = filterItem.value as Item[];

  const amItems = items.filter((item) => item.meridian === 'AM');
  const pmItems = items.filter((item) => item.meridian === 'PM');

  return isGridStyle ? (
    isTime ? (
      <View>
        <View>
          <Text>AM</Text>
          <FlatList
            key={`grid-am-${title}`}
            data={amItems}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.index.toString()}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }} // Add spacing between columns
          />
        </View>

        <View>
          <Text>PM</Text>
          <FlatList
            key={`grid-pm-${title}`}
            data={pmItems}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.index.toString()}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }} // Add spacing between columns
          />
        </View>
      </View>
    ) : (
      <FlatList
        key={`grid-${title}`}
        data={items}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.index.toString()}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }} // Add spacing between columns
      />
    )
  ) : (
    <View className="flex flex-row flex-wrap">
      {filterItem.value.map((item) => (
        <Pressable
          key={item.index}
          className="mb-2 mr-2 flex flex-row items-center"
          onPress={() => handleSelect(title, item.index)}
        >
          <View className="p-[7px]">{item.select ? <SelectedBox /> : <NotSelectedBox />}</View>
          <Text
            className={`${item.select ? 'font-medium text-basicFont' : 'font-normal text-disabledFont'} text-sm`}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default RenderPressableItems;
