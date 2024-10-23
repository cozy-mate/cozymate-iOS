import { Text } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import CustomTextInputBox from '@components/common/customTextInputBox';
import CustomRadioInputBox from '@components/common/customRadioInputBox';
import CustomCheckBoxInput from '@components/lifeStyle/customCheckBoxInput';

import { updateUserData } from '@server/api/member-stat';

import { useGetUserDetailData } from '@hooks/api/member-stat';

import { LifeStyleEditScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import TopButton from '@assets/lifeStyle/topButton.svg';

type Item = {
  index: number;
  value: string | number;
  name: string;
  select: boolean;
};

const LifeStyleEditScreen = ({ navigation }: LifeStyleEditScreenProps) => {
  const toMyPage = () => {
    navigation.goBack();
  };

  const [admissionYear, setAdmissionYear] = useState<string>('');
  const [numOfRoommate, setNumOfRoommate] = useState<number>(0);
  const [acceptance, setAcceptance] = useState<string>('');
  const [wakeUpMeridian, setWakeUpMeridian] = useState<string>('');
  const [wakeUpTime, setWakeUpTime] = useState<number>(0);
  const [sleepingMeridian, setSleepingMeridian] = useState<string>('');
  const [sleepingTime, setSleepingTime] = useState<number>(0);
  const [turnOffMeridian, setTurnOffMeridian] = useState<string>('');
  const [turnOffTime, setTurnOffTime] = useState<number>(0);
  const [smokingState, setSmokingState] = useState<string>('');
  const [sleepingHabit, setSleepingHabit] = useState<string[]>([]);
  const [airConditioningIntensity, setAirConditioningIntensity] = useState<number>(0);
  const [heatingIntensity, setHeatingIntensity] = useState<number>(0);
  const [lifePattern, setLifePattern] = useState<string>('');
  const [intimacy, setIntimacy] = useState<string>('');
  const [canShare, setCanShare] = useState<string>('');
  const [isPlayGame, setIsPlayGame] = useState<string>('');
  const [isPhoneCall, setIsPhoneCall] = useState<string>('');
  const [studying, setStudying] = useState<string>('');
  const [intake, setIntake] = useState<string>('');
  const [cleanSensitivity, setCleanSensitivity] = useState<number>(0);
  const [noiseSensitivity, setNoiseSensitivity] = useState<number>(0);
  const [cleaningFrequency, setCleaningFrequency] = useState<string>('');
  const [drinkingFrequency, setDrinkingFrequency] = useState<string>('');
  const [personality, setPersonality] = useState<string[]>([]);
  const [mbti, setMbti] = useState<string>('');
  const [selfIntroduction, setSelfIntroduction] = useState<string>('');

  const [numOfRoommateItems, setNumOfRoommateItems] = useState<Item[]>([
    { index: 1, value: 0, name: '미정', select: false },
    { index: 2, value: 2, name: '2인', select: false },
    { index: 3, value: 3, name: '3인', select: false },
    { index: 4, value: 4, name: '4인', select: false },
    { index: 5, value: 5, name: '5인', select: false },
    { index: 6, value: 6, name: '6인', select: false },
  ]);

  const [acceptanceItems, setAcceptanceItems] = useState<Item[]>([
    { index: 1, value: '합격', name: '합격', select: false },
    { index: 2, value: '결과 대기중', name: '결과 대기중', select: false },
    { index: 3, value: '예비번호를 받았어요!', name: '예비번호를 받았어요!', select: false },
  ]);

  const [wakeUpTimeItems, setWakeUpTimeItems] = useState<Item[]>([
    { index: 1, value: 1, name: '1', select: false },
    { index: 2, value: 2, name: '2', select: false },
    { index: 3, value: 3, name: '3', select: false },
    { index: 4, value: 4, name: '4', select: false },
    { index: 5, value: 5, name: '5', select: false },
    { index: 6, value: 6, name: '6', select: false },
    { index: 7, value: 7, name: '7', select: false },
    { index: 8, value: 8, name: '8', select: false },
    { index: 9, value: 9, name: '9', select: false },
    { index: 10, value: 10, name: '10', select: false },
    { index: 11, value: 11, name: '11', select: false },
    { index: 12, value: 12, name: '12', select: false },
  ]);

  const [sleepingTimeItems, setSleepingTimeItems] = useState<Item[]>([
    { index: 1, value: 1, name: '1', select: false },
    { index: 2, value: 2, name: '2', select: false },
    { index: 3, value: 3, name: '3', select: false },
    { index: 4, value: 4, name: '4', select: false },
    { index: 5, value: 5, name: '5', select: false },
    { index: 6, value: 6, name: '6', select: false },
    { index: 7, value: 7, name: '7', select: false },
    { index: 8, value: 8, name: '8', select: false },
    { index: 9, value: 9, name: '9', select: false },
    { index: 10, value: 10, name: '10', select: false },
    { index: 11, value: 11, name: '11', select: false },
    { index: 12, value: 12, name: '12', select: false },
  ]);

  const [turnOffTimeItems, setTurnOffTimeItems] = useState<Item[]>([
    { index: 1, value: 1, name: '1', select: false },
    { index: 2, value: 2, name: '2', select: false },
    { index: 3, value: 3, name: '3', select: false },
    { index: 4, value: 4, name: '4', select: false },
    { index: 5, value: 5, name: '5', select: false },
    { index: 6, value: 6, name: '6', select: false },
    { index: 7, value: 7, name: '7', select: false },
    { index: 8, value: 8, name: '8', select: false },
    { index: 9, value: 9, name: '9', select: false },
    { index: 10, value: 10, name: '10', select: false },
    { index: 11, value: 11, name: '11', select: false },
    { index: 12, value: 12, name: '12', select: false },
  ]);

  const [smokingStateItems, setSmokingStateItems] = useState<Item[]>([
    { index: 1, value: '비흡연자', name: '비흡연자', select: false },
    { index: 2, value: '연초', name: '연초', select: false },
    { index: 3, value: '궐련형 전자담배', name: '궐련형 전자담배', select: false },
    { index: 4, value: '액상형 전자담배', name: '액상형 전자담배', select: false },
  ]);

  const [sleepingHabitItems, setSleepingHabitItems] = useState<Item[]>([
    { index: 1, value: '잠버릇이 없어요', name: '잠버릇이 없어요', select: false },
    { index: 2, value: '코골이', name: '코골이', select: false },
    { index: 3, value: '이갈이', name: '이갈이', select: false },
    { index: 4, value: '몽유병', name: '몽유병', select: false },
    { index: 5, value: '잠꼬대', name: '잠꼬대', select: false },
    { index: 6, value: '뒤척임', name: '뒤척임', select: false },
  ]);

  const [airConditioningIntensityItems, setAirConditioningIntensityItems] = useState<Item[]>([
    { index: 1, value: 0, name: '안 틀어요', select: false },
    { index: 2, value: 1, name: '약하게 틀어요', select: false },
    { index: 3, value: 2, name: '적당하게 틀어요', select: false },
    { index: 4, value: 3, name: '강하게 틀어요', select: false },
  ]);

  const [heatingIntensityItems, setHeatingIntensityItems] = useState<Item[]>([
    { index: 1, value: 0, name: '안 틀어요', select: false },
    { index: 2, value: 1, name: '약하게 틀어요', select: false },
    { index: 3, value: 2, name: '적당하게 틀어요', select: false },
    { index: 4, value: 3, name: '강하게 틀어요', select: false },
  ]);

  const [lifePatternItems, setLifePatternItems] = useState<Item[]>([
    { index: 1, value: '아침형 인간', name: '아침형 인간', select: false },
    { index: 2, value: '새벽형 인간', name: '새벽형 인간', select: false },
  ]);

  const [intimacyItems, setIntimacyItems] = useState<Item[]>([
    {
      index: 1,
      value: '필요한 말만 했으면 좋겠어요',
      name: '필요한 말만 했으면 좋겠어요',
      select: false,
    },
    { index: 2, value: '어느정도 친하게 지내요', name: '어느정도 친하게 지내요', select: false },
    { index: 3, value: '완전 친하게 지내요', name: '완전 친하게 지내요', select: false },
  ]);

  const [canShareItems, setCanShareItems] = useState<Item[]>([
    {
      index: 1,
      value: '아무것도 공유하고싶지 않아요',
      name: '아무것도 공유하고싶지 않아요',
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
  ]);

  const [isPlayGameItems, setIsPlayGameItems] = useState<Item[]>([
    { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요', select: false },
    { index: 2, value: '키보드 채팅정도만 쳐요', name: '키보드 채팅정도만 쳐요', select: false },
    { index: 3, value: '보이스 채팅도 해요', name: '보이스 채팅도 해요', select: false },
  ]);

  const [isPhoneCallItems, setIsPhoneCallItems] = useState<Item[]>([
    { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요', select: false },
    { index: 2, value: '급한 전화만 해요', name: '급한 전화만 해요', select: false },
    { index: 3, value: '자주 해요', name: '자주 해요', select: false },
  ]);

  const [studyingItems, setStudyingItems] = useState<Item[]>([
    { index: 1, value: '아예 하지 않아요', name: '아예 하지 않아요', select: false },
    { index: 2, value: '시험기간 때만 해요', name: '시험기간 때만 해요', select: false },
    { index: 3, value: '매일 해요', name: '매일 해요', select: false },
  ]);

  const [intakeItems, setIntakeItems] = useState<Item[]>([
    {
      index: 1,
      value: '아예 안 먹어요',
      name: '아예 안 먹어요',
      select: false,
    },
    { index: 2, value: '음료만 마셔요', name: '음료만 마셔요', select: false },
    {
      index: 3,
      value: '간단한 간식정도만 먹어요',
      name: '간단한 간식정도만 먹어요',
      select: false,
    },
    {
      index: 4,
      value: '배달음식도 먹어요',
      name: '배달음식도 먹어요',
      select: false,
    },
  ]);

  const [cleanSensitivityItems, setCleanSensitivityItems] = useState<Item[]>([
    { index: 1, value: 1, name: '매우 예민하지 않아요', select: false },
    { index: 2, value: 2, name: '예민하지 않아요', select: false },
    { index: 3, value: 3, name: '보통이에요', select: false },
    { index: 4, value: 4, name: '예민해요', select: false },
    { index: 5, value: 5, name: '매우 예민해요', select: false },
  ]);

  const [noiseSensitivityItems, setNoiseSensitivityItems] = useState<Item[]>([
    { index: 1, value: 1, name: '매우 예민하지 않아요', select: false },
    { index: 2, value: 2, name: '예민하지 않아요', select: false },
    { index: 3, value: 3, name: '보통이에요', select: false },
    { index: 4, value: 4, name: '예민해요', select: false },
    { index: 5, value: 5, name: '매우 예민해요', select: false },
  ]);

  const [cleaningFrequencyItems, setCleaningFrequencyItems] = useState<Item[]>([
    { index: 1, value: '한 달에 한 번 해요', name: '한 달에 한 번 해요', select: false },
    {
      index: 2,
      value: '2주에 한 번 해요',
      name: '2주에 한 번 해요',
      select: false,
    },
    {
      index: 3,
      value: '일주일에 한 번 해요',
      name: '일주일에 한 번 해요',
      select: false,
    },
    {
      index: 4,
      value: '일주일에 3-4번 하는 거 같아요',
      name: '일주일에 3-4번 하는 거 같아요',
      select: false,
    },
    {
      index: 5,
      value: '이틀에 한 번 해요',
      name: '이틀에 한 번 해요',
      select: false,
    },
    {
      index: 6,
      value: '매일매일 해요',
      name: '매일매일 해요',
      select: false,
    },
  ]);

  const [drinkingFrequencyItems, setDrinkingFrequencyItems] = useState<Item[]>([
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
      value: '일주일에 네 번이상 마셔요',
      name: '일주일에 네 번이상 마셔요',
      select: false,
    },
    {
      index: 5,
      value: '거의 매일 마셔요',
      name: '거의 매일 마셔요',
      select: false,
    },
  ]);

  const [personalityItems, setPersonalityItems] = useState<Item[]>([
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
    { index: 8, value: '급해요', name: '급해요', select: false },
    { index: 9, value: '느긋해요', name: '느긋해요', select: false },
    { index: 10, value: '낯을 가려요', name: '낯을 가려요', select: false },
    { index: 11, value: '귀차니즘이 있어요', name: '귀차니즘이 있어요', select: false },
    { index: 12, value: '부지런해요', name: '부지런해요', select: false },
  ]);

  const [mbtiItems, setMbtiItems] = useState<Item[]>([
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
  ]);

  const { data } = useGetUserDetailData();

  useEffect(() => {
    if (data && data.result) {
      const result = data.result;

      setAdmissionYear(result.admissionYear.toString());
      setNumOfRoommate(result.numOfRoommate);
      setAcceptance(result.acceptance);
      setWakeUpMeridian(result.wakeUpMeridian);
      setWakeUpTime(result.wakeUpTime);
      setSleepingMeridian(result.sleepingMeridian);
      setSleepingTime(result.sleepingTime);
      setTurnOffMeridian(result.turnOffMeridian);
      setTurnOffTime(result.turnOffTime);
      setSmokingState(result.smokingState);
      setSleepingHabit(result.sleepingHabit);
      setAirConditioningIntensity(result.airConditioningIntensity);
      setHeatingIntensity(result.heatingIntensity);
      setLifePattern(result.lifePattern);
      setIntimacy(result.intimacy);
      setCanShare(result.canShare);
      setIsPlayGame(result.isPlayGame);
      setIsPhoneCall(result.isPhoneCall);
      setStudying(result.studying);
      setIntake(result.intake);
      setCleanSensitivity(result.cleanSensitivity);
      setNoiseSensitivity(result.noiseSensitivity);
      setCleaningFrequency(result.cleaningFrequency);
      setPersonality(result.personality);
      setMbti(result.mbti);
      setSelfIntroduction(result.selfIntroduction);

      setNumOfRoommateItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.numOfRoommate,
        })),
      );

      setAcceptanceItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.acceptance,
        })),
      );

      setWakeUpTimeItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.wakeUpTime,
        })),
      );

      setSleepingTimeItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.sleepingTime,
        })),
      );

      setTurnOffTimeItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.turnOffTime,
        })),
      );

      setSmokingStateItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.smokingState,
        })),
      );

      setSleepingHabitItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: typeof item.value === 'string' && result.sleepingHabit.includes(item.value),
        })),
      );

      setAirConditioningIntensityItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.airConditioningIntensity,
        })),
      );

      setHeatingIntensityItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.heatingIntensity,
        })),
      );

      setLifePatternItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.lifePattern,
        })),
      );

      setIntimacyItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.intimacy,
        })),
      );

      setCanShareItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.canShare,
        })),
      );

      setIsPlayGameItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.isPlayGame,
        })),
      );

      setIsPhoneCallItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.isPhoneCall,
        })),
      );

      setStudyingItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.studying,
        })),
      );

      setIntakeItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.intake,
        })),
      );

      setCleanSensitivityItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.cleanSensitivity,
        })),
      );

      setNoiseSensitivityItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.noiseSensitivity,
        })),
      );

      setCleaningFrequencyItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.cleaningFrequency,
        })),
      );

      setPersonalityItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: typeof item.value === 'string' && result.personality.includes(item.value),
        })),
      );

      setMbtiItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          select: item.value === result.mbti,
        })),
      );
    }
  }, [data]);

  const updateInfo = async () => {
    try {
      await updateUserData({
        universityId: 1,
        major: '',
        admissionYear: admissionYear,
        numOfRoommate: numOfRoommate,
        acceptance: acceptance,
        wakeUpMeridian: wakeUpMeridian,
        wakeUpTime: wakeUpTime,
        sleepingMeridian: sleepingMeridian,
        sleepingTime: sleepingTime,
        turnOffMeridian: turnOffMeridian,
        turnOffTime: turnOffTime,
        smokingState: smokingState,
        sleepingHabit: sleepingHabit,
        airConditioningIntensity: airConditioningIntensity,
        heatingIntensity: heatingIntensity,
        lifePattern: lifePattern,
        intimacy: intimacy,
        canShare: canShare,
        isPlayGame: isPlayGame,
        isPhoneCall: isPhoneCall,
        studying: studying,
        intake: intake,
        cleanSensitivity: cleanSensitivity,
        noiseSensitivity: noiseSensitivity,
        cleaningFrequency: cleaningFrequency,
        drinkingFrequency: drinkingFrequency,
        personality: personality,
        mbti: mbti,
        selfIntroduction: selfIntroduction,
      });

      navigation.goBack();
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <>
      <View className="flex-1 bg-white">
        <SafeAreaView className="bg-white" />
        <ScrollView className="flex-1 bg-white px-5" ref={scrollViewRef}>
          <View className="mb-10 mt-2 flex flex-row justify-between">
            <Pressable onPress={toMyPage}>
              <BackButton />
            </Pressable>

            <Pressable
              className="flex flex-row items-center rounded-md bg-sub1 px-5 py-2.5"
              onPress={updateInfo}
            >
              <Text className="text-xs font-semibold text-main1">수정</Text>
            </Pressable>
          </View>

          <CustomTextInputBox
            title="학번을 입력해주세요"
            value={admissionYear}
            setValue={setAdmissionYear}
            placeholder="ex. 23"
          />

          <CustomRadioInputBox
            title="신청실의 인원을 선택해주세요"
            value={numOfRoommate}
            setValue={setNumOfRoommate}
            items={numOfRoommateItems}
            setItems={setNumOfRoommateItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="기숙사 합격여부를 선택해주세요"
            value={acceptance}
            setValue={setAcceptance}
            items={acceptanceItems}
            setItems={setAcceptanceItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="기상시간을 선택해주세요"
            value={wakeUpTime}
            setValue={setWakeUpTime}
            meridian={wakeUpMeridian}
            setMeridian={setWakeUpMeridian}
            items={wakeUpTimeItems}
            setItems={setWakeUpTimeItems}
            isTime={true}
            isWide={true}
            width={48}
            count={6}
          />

          <CustomRadioInputBox
            title="취침시간을 선택해주세요"
            value={sleepingTime}
            setValue={setSleepingTime}
            meridian={sleepingMeridian}
            setMeridian={setSleepingMeridian}
            items={sleepingTimeItems}
            setItems={setSleepingTimeItems}
            isTime={true}
            isWide={true}
            width={48}
            count={6}
          />

          <CustomRadioInputBox
            title="소등시간을 선택해주세요"
            value={turnOffTime}
            setValue={setTurnOffTime}
            meridian={turnOffMeridian}
            setMeridian={setTurnOffMeridian}
            items={turnOffTimeItems}
            setItems={setTurnOffTimeItems}
            isTime={true}
            isWide={true}
            width={48}
            count={6}
          />

          <CustomRadioInputBox
            title="흡연여부를 선택해주세요"
            value={smokingState}
            setValue={setSmokingState}
            items={smokingStateItems}
            setItems={setSmokingStateItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="잠버릇을 선택해주세요 (중복선택 가능)"
            value={sleepingHabit}
            setValue={setSleepingHabit}
            items={sleepingHabitItems}
            setItems={setSleepingHabitItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="에어컨 강도를 선택해주세요"
            value={airConditioningIntensity}
            setValue={setAirConditioningIntensity}
            items={airConditioningIntensityItems}
            setItems={setAirConditioningIntensityItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="히터 강도를 선택해주세요"
            value={heatingIntensity}
            setValue={setHeatingIntensity}
            items={heatingIntensityItems}
            setItems={setHeatingIntensityItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="생활 패턴을 선택해주세요"
            value={lifePattern}
            setValue={setLifePattern}
            items={lifePatternItems}
            setItems={setLifePatternItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="룸메이트와의 원하는 친밀도를 선택해주세요"
            value={intimacy}
            setValue={setIntimacy}
            items={intimacyItems}
            setItems={setIntimacyItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
            value={canShare}
            setValue={setCanShare}
            items={canShareItems}
            setItems={setCanShareItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="방 안에서의 게임 여부를 선택해주세요"
            value={isPlayGame}
            setValue={setIsPlayGame}
            items={isPlayGameItems}
            setItems={setIsPlayGameItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="방 안에서 전화 여부를 선택해주세요"
            value={isPhoneCall}
            setValue={setIsPhoneCall}
            items={isPhoneCallItems}
            setItems={setIsPhoneCallItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="방 안에서의 공부 여부를 선택해주세요"
            value={studying}
            setValue={setStudying}
            items={studyingItems}
            setItems={setStudyingItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="방 안에서의 섭취여부를 선택해주세요"
            value={intake}
            setValue={setIntake}
            items={intakeItems}
            setItems={setIntakeItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="청결 예민도를 선택해주세요"
            value={cleanSensitivity}
            setValue={setCleanSensitivity}
            items={cleanSensitivityItems}
            setItems={setCleanSensitivityItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="소음 예민도를 선택해주세요"
            value={noiseSensitivity}
            setValue={setNoiseSensitivity}
            items={noiseSensitivityItems}
            setItems={setNoiseSensitivityItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="청소 빈도를 선택해주세요"
            value={cleaningFrequency}
            setValue={setCleaningFrequency}
            items={cleaningFrequencyItems}
            setItems={setCleaningFrequencyItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="음주 빈도를 선택해주세요"
            value={drinkingFrequency}
            setValue={setDrinkingFrequency}
            items={drinkingFrequencyItems}
            setItems={setDrinkingFrequencyItems}
            isTime={false}
          />

          <CustomCheckBoxInput
            title="성격을 선택해주세요 (중복선택 가능)"
            value={personality}
            setValue={setPersonality}
            items={personalityItems}
            setItems={setPersonalityItems}
            isTime={false}
          />

          <CustomRadioInputBox
            title="MBTI를 선택해주세요"
            value={mbti}
            setValue={setMbti}
            items={mbtiItems}
            setItems={setMbtiItems}
            isTime={false}
            isWide={true}
            width={70}
          />
        </ScrollView>
      </View>

      <View className="fixed bottom-28 right-5 flex w-fit items-end">
        <Pressable onPress={scrollToTop}>
          <TopButton />
        </Pressable>
      </View>
    </>
  );
};

export default LifeStyleEditScreen;
