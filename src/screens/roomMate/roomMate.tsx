import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';

import { RoomMateScreenProps } from '@type/param/stack';
import CheckBoxContainer from '@components/roomMate/checkBoxContainer';

import Background from '@assets/roomMate/background.svg';
import PlusButton from '@assets/roomMate/plusButton.svg';

import SchoolLogo from '@assets/roomMate/schoolLogo.svg';
import MagnifierIcon from '@assets/roomMate/magnifier.svg';
import DownToggleIcon from '@assets/roomMate/downToggle.svg';
import RightToggleIcon from '@assets/roomMate/rightToggle.svg';

import SameAnswerContainer from '@components/roomMate/sameAnswerContainer';
import SimilarLifeStyleContainer from '@components/roomMate/similarLifeStyleContainer';
import { getOtherUserDetailData, getUserDetailData, searchUsers } from '@server/api/member-stat';
import { useRecoilState } from 'recoil';
import { MyLifeStyleState, OtherBasicData, OtherLifeStyleState } from '@recoil/recoil';
import { useSearchUsers, useSearchUsersWithFilters } from '@hooks/api/member-stat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UserItem = {
  memberId: number;
  memberName: string;
  memberNickName: string;
  memberAge: number;
  memberPersona: number;
  numOfRoommate: number;
  equality: number;
};

const RoomMateScreen = ({ navigation }: RoomMateScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const [filterList, setFilterList] = useState<string[]>([]); // 필터 목록
  const [page, setPage] = useState<number>(0); // 페이지네이션

  const [, setMyLifeStyleData] = useRecoilState(MyLifeStyleState); // 내 라이프 스타일 데이터
  const [displayedUsers, setDisplayedUsers] = useState<UserItem[]>([]); // 표시할 사용자 목록

  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const [, setOthersBasicData] = useRecoilState(OtherBasicData); // 다른 사용자의 기본 데이터
  const [, setOthersLifeStyleData] = useRecoilState(OtherLifeStyleState); // 다른 사용자의 라이프스타일 데이터

  const [items, setItems] = useState([
    { index: 1, id: 'admissionYear', name: '학번', select: false },
    { index: 2, id: 'major', name: '학과', select: false },
    { index: 3, id: 'numOfRoommate', name: '신청실', select: false },
    { index: 4, id: 'acceptance', name: '합격여부', select: false },
    { index: 5, id: 'wakeUpTime', name: '기상시간', select: false },
    { index: 6, id: 'sleepingTime', name: '취침시간', select: false },
    { index: 7, id: 'turnOffTime', name: '소등시간', select: false },
    { index: 8, id: 'smoking', name: '흡연여부', select: false },
    { index: 9, id: 'sleepingHabit', name: '잠버릇', select: false },
    { index: 10, id: 'airConditioningIntensity', name: '에어컨 강도', select: false },
    { index: 11, id: 'heatingIntensity', name: '히터 강도', select: false },
    { index: 12, id: 'lifePattern', name: '생활패턴', select: false },
    { index: 13, id: 'intimacy', name: '친밀도', select: false },
    { index: 14, id: 'canShare', name: '물건공유', select: false },
    { index: 15, id: 'studying', name: '공부여부', select: false },
    { index: 16, id: 'isPlayGame', name: '게임여부', select: false },
    { index: 17, id: 'isPhoneCall', name: '전화여부', select: false },
    { index: 18, id: 'intake', name: '섭취여부', select: false },
    { index: 19, id: 'cleanSensitivity', name: '청결예민도', select: false },
    { index: 20, id: 'noiseSensitivity', name: '소음예민도', select: false },
    { index: 21, id: 'cleaningFrequency', name: '청소빈도', select: false },
    { index: 22, id: 'personality', name: '성격', select: false },
    { index: 23, id: 'mbti', name: 'MBTI', select: false },
  ]);

  // const { data: sameanswerdata } = useSearchUsersWithFilters(filterList);
  // const { data: similarmatedata } = useSearchUsers();

  const getMyLifeStyle = async () => {
    try {
      const response = await getUserDetailData();
      setMyLifeStyleData(response.result);
    } catch (error: any) {
      console.log(error.response.data);
      navigation.replace('LifeStyleOnboardingScreen'); // replace 사용하여 화면 대체
    }
  };

  // 같은 답변을 한 사용자 목록을 가져오는 함수
  const getSameAnswerMate = async () => {
    try {
      const response = await searchUsers(filterList); // 필터를 적용하여 검색
      setDisplayedUsers(response.result.result);
      setHasNextPage(response.result.hasNext);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // 비슷한 답변을 한 사용자 목록을 가져오는 함수
  const getSimilarAnswerData = async () => {
    try {
      const response = await searchUsers(undefined, page); // 페이지네이션 적용하여 검색
      setDisplayedUsers(response.result.result);
      setHasNextPage(response.result.hasNext);
    } catch (error) {
      console.log(error);
    }
  };

  // 다른 사용자의 라이프스타일을 가져오는 함수
  const getOthersLifeStyle = async (user: UserItem) => {
    try {
      const response = await getOtherUserDetailData(user.memberId);
      setOthersBasicData(user);
      setOthersLifeStyleData(response.result);
      navigation.navigate('UserDetailScreen');
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // 필터에 따라 사용자 데이터를 가져오는 로직
  useEffect(() => {
    // 필터가 변경될 때 페이지와 사용자 목록을 초기화
    setPage(0);
    setDisplayedUsers([]);

    if (filterList.length > 0) {
      // 필터가 있을 때: 같은 답변을 한 사용자 목록을 가져옴
      getSameAnswerMate();
    } else {
      // 필터가 없을 때: 비슷한 답변을 한 사용자 목록을 가져옴
      getSimilarAnswerData();
    }
  }, [filterList]); // 필터 목록 변경 시 실행

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row h-[132px] px-4 justify-between items-center pt-[65px] mb-6 bg-[#CADFFF] rounded-br-[40px]">
        <Background style={{ position: 'absolute' }} />
        <Pressable>
          <View className="flex-row items-center py-2">
            <SchoolLogo />
            <Text className="text-lg font-semibold text-[#5B9CFF] ml-[6px]">인하대학교</Text>
          </View>
        </Pressable>
        <Pressable>
          <MagnifierIcon />
        </Pressable>
      </View>

      <ScrollView className="flex-1">
        <Text className="px-[18px] text-lg font-semibold leading-5 tracking-tight text-emphasizedFont mb-4">
          원하는 칩을 선택하면{'\n'}나와 똑같은 답변을 한 사용자만 떠요!
        </Text>
        <CheckBoxContainer
          value={filterList}
          setValue={setFilterList}
          items={items}
          setItems={setItems}
        />

        {/* 사용자 목록 */}
        <View
          className="flex flex-col items-center px-4 mb-9"
          style={{ paddingBottom: bottom + 40 }}
        >
          {displayedUsers.length > 0 &&
            displayedUsers.map((user, index) => (
              <SameAnswerContainer index={index} user={user} toUserDetail={getOthersLifeStyle} />
            ))}
          {hasNextPage && (
            <Pressable className="flex flex-row items-center py-2 pl-5 pr-6 bg-colorBox rounded-[35px] mt-6">
              <PlusButton />
              <Text className="text-xs font-semibold text-colorFont ml-1.5">더보기</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomMateScreen;
