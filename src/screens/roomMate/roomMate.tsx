import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';

import { RoomMateScreenProps } from '@type/param/loginStack';
import CheckBoxContainer from '@components/roomMate/checkBoxContainer';

import Background from '@assets/roomMate/background.svg';

import SchoolLogo from '@assets/roomMate/schoolLogo.svg';
import MagnifierIcon from '@assets/roomMate/magnifier.svg';
import ToggleIcon from '@assets/roomMate/toggle.svg';

import SameAnswerContainer from '@components/roomMate/sameAnswerContainer';
import SimilarLifeStyleContainer from '@components/roomMate/similarLifeStyleContainer';
import { getOtherUserDetailData, getUserDetailData, searchUsers } from '@server/api/member-stat';
import { useRecoilState } from 'recoil';
import { MyLifeStyleState, OtherBasicData, OtherLifeStyleState } from '@recoil/recoil';
import { useSearchUsers, useSearchUsersWithFilters } from '@hooks/api/member-stat';

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
  const [filterList, setFilterList] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [, setMyLifeStyleData] = useRecoilState(MyLifeStyleState);
  const [sameAnswerData, setSameAnswerData] = useState<UserItem[]>([]);
  const [similarAnswerData, setSimilarAnswerData] = useState<UserItem[]>([]);

  const [, setOthersBasicData] = useRecoilState(OtherBasicData);
  const [, setOthersLifeStyleData] = useRecoilState(OtherLifeStyleState);

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
      navigation.reset({
        index: 0,
        routes: [{ name: 'LifeStyleOnboardingScreen' }],
      });
    }
  };

  const getSameAnswerMate = async () => {
    try {
      const response = await searchUsers(filterList);

      setSameAnswerData(response.result.result);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const getSimilarAnswerData = async () => {
    try {
      const response = await searchUsers();

      setSimilarAnswerData(response.result.result);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

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

  useEffect(() => {
    getMyLifeStyle();
    if (filterList.length > 0) {
      getSameAnswerMate();
    }
    getSimilarAnswerData();
  }, [filterList, page]);

  return (
    <View className="flex-1 bg-[#F7FAFF]">
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
        <CheckBoxContainer
          value={filterList}
          setValue={setFilterList}
          items={items}
          setItems={setItems}
        />

        <View className="flex-1 bg-white drop-shadow-topShadow rounded-tl-[30px]">
          <View className="flex px-5 pt-6 ">
            <View className="flex flex-col">
              <View className="flex flex-row items-center justify-between mb-3 leading-loose">
                <Text className="px-1 text-base font-semibold leading-5 tracking-tight text-emphasizedFont">
                  원하는 칩을 선택하면{'\n'}나와 똑같은 답변을 한 사용자만 떠요!
                </Text>
                <Pressable>
                  <View className="pl-1 pr-2 py-[6px]">
                    <ToggleIcon />
                  </View>
                </Pressable>
              </View>

              <View className="flex flex-col mb-9">
                {isLoading ? (
                  <Text>Loading...</Text>
                ) : filterList.length === 0 ? (
                  <View className="h-[108px] flex justify-center items-center">
                    <Text className="text-sm font-medium text-disabledFont">칩을 선택해보세요</Text>
                  </View>
                ) : sameAnswerData.length > 0 ? (
                  sameAnswerData.map((user, index) => (
                    <SameAnswerContainer
                      key={index}
                      user={user}
                      toUserDetail={getOthersLifeStyle}
                    />
                  ))
                ) : (
                  <View className="h-[108px] flex justify-center items-center">
                    <Text className="text-sm font-medium text-disabledFont">
                      해당 칩에 같은 답변을 한 사용자가 없어요
                    </Text>
                  </View>
                )}
              </View>

              {/* 비슷한 라이프 스타일 */}
              <View>
                <View className="flex flex-row items-center justify-between mb-3 leading-loose">
                  <Text className="px-1 text-base font-semibold leading-5 tracking-tight text-emphasizedFont">
                    나와 비슷한{'\n'}라이프 스타일을 갖고 있어요!
                  </Text>
                  <Pressable>
                    <View className="pl-1 pr-2 py-[6px]">
                      <ToggleIcon />
                    </View>
                  </Pressable>
                </View>

                <View className="flex bg-white gap-x-3">
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="flex flex-row "
                  >
                    {similarAnswerData.map((user, index) => (
                      <SimilarLifeStyleContainer
                        key={index}
                        user={user}
                        toUserDetail={getOthersLifeStyle}
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomMateScreen;
