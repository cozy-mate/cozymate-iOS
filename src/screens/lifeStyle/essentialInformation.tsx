import CustomRadioInputBox from '@components/common/customRadioInputBox';
import { lifeStyleState } from '@recoil/recoil';
import { LifeStyle } from '@recoil/type';
import { EssentialLifeStyleScreenProps } from '@type/param/loginStack';
import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import BackHeader from 'src/layout/backHeader';

import { useInputAnimation } from '@hooks/inputAnimation';

type Item = {
  index: number;
  value: string | boolean;
  name: string;
  select: boolean;
};

const EssentialInformationComponent = ({ navigation }: EssentialLifeStyleScreenProps) => {
  const [lifeStyle, setLifeStyle] = useRecoilState(lifeStyleState);

  const [wakeUpMeridian, setWakeUpMeridian] = useState<string>('');
  const [wakeUpTime, setWakeUpTime] = useState<number>(0);
  const [sleepingMeridian, setSleepingMeridian] = useState<string>('');
  const [sleepingTime, setSleepingTime] = useState<number>(0);
  const [turnOffMeridian, setTurnOffMeridian] = useState<string>('');
  const [turnOffTime, setTurnOffTime] = useState<number>(0);
  const [smokingState, setSmokingState] = useState<string>('');
  const [sleepingHabit, setSleepingHabit] = useState<string>('');
  const [airConditioningIntensity, setAirConditioningIntensity] = useState<number>(0);
  const [heatingIntensity, setHeatingIntensity] = useState<number>(0);
  const [lifePattern, setLifePattern] = useState<string>('');
  const [intimacy, setIntimacy] = useState<string>('');
  const [canShare, setCanShare] = useState<boolean>(false);
  const [isPlayGame, setIsPlayGame] = useState<boolean>(false);
  const [isPhoneCall, setIsPhoneCall] = useState<boolean>(false);
  const [studying, setStudying] = useState<string>('');
  const [intake, setIntake] = useState<string>('');
  const [cleanSensitivity, setCleanSensitivity] = useState<number>(0);
  const [noiseSensitivity, setNoiseSensitivity] = useState<number>(0);
  const [cleaningFrequency, setCleaningFrequency] = useState<string>('');
  const [personality, setPersonality] = useState<string>('');
  const [mbti, setMbti] = useState<string>('');

  const canNext =
    wakeUpMeridian !== '' &&
    wakeUpTime !== 0 &&
    sleepingMeridian !== '' &&
    sleepingTime !== 0 &&
    turnOffMeridian !== '' &&
    turnOffTime !== 0 &&
    smokingState !== '' &&
    sleepingHabit !== '' &&
    airConditioningIntensity !== 0 &&
    heatingIntensity !== 0 &&
    lifePattern !== '' &&
    intimacy !== '' &&
    canShare !== null &&
    isPlayGame !== null &&
    isPhoneCall !== null &&
    studying !== '' &&
    intake !== '' &&
    cleanSensitivity !== 0 &&
    noiseSensitivity !== 0 &&
    cleaningFrequency !== '' &&
    personality !== '' &&
    mbti !== '';

  const toPrev = () => {
    navigation.navigate('BasicLifeStyleScreen');
  };

  const toNext = async (): Promise<void> => {
    setLifeStyle((prevState: LifeStyle) => ({
      ...prevState,
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
      personality: personality,
      mbti: mbti,
    }));

    navigation.navigate('MainScreen');
  };

  const [showSleepingTime, setShowSleepingTime] = useState<boolean>(false);
  const [showTurnOffTime, setShowTurnOffTime] = useState<boolean>(false);
  const [showSmokingState, setShowSmokingState] = useState<boolean>(false);
  const [showSleepingHabit, setShowSleepingHabit] = useState<boolean>(false);
  const [showAirConditioningIntensity, setShowAirConditioningIntensity] = useState<boolean>(false);
  const [showHeatingIntensity, setShowHeatingIntensity] = useState<boolean>(false);
  const [showLifePattern, setShowLifePattern] = useState<boolean>(false);
  const [showIntimacy, setShowIntimacy] = useState<boolean>(false);
  const [showCanShare, setShowCanShare] = useState<boolean>(false);
  const [showIsPlayGame, setShowIsPlayGame] = useState<boolean>(false);
  const [showIsPhoneCall, setShowIsPhoneCall] = useState<boolean>(false);
  const [showStudying, setShowStudying] = useState<boolean>(false);
  const [showIntake, setShowIntake] = useState<boolean>(false);
  const [showCleanSensitivity, setShowCleanSensitivity] = useState<boolean>(false);
  const [showNoiseSensitivity, setShowNoiseSensitivity] = useState<boolean>(false);
  const [showCleaningFrequency, setShowCleaningFrequency] = useState<boolean>(false);
  const [showPersonality, setShowPersonality] = useState<boolean>(false);
  const [showMbti, setShowMbti] = useState<boolean>(false);

  const sleepingTimeAnimation = useInputAnimation(showSleepingTime, 400);
  const turnOffTimeAnimation = useInputAnimation(showTurnOffTime, 400);
  const smokingStateAnimation = useInputAnimation(showSmokingState, 400);
  const sleepingHabitAnimation = useInputAnimation(showSleepingHabit, 400);
  const airConditioningIntensityAnimation = useInputAnimation(showAirConditioningIntensity, 400);
  const heatingIntensityAnimation = useInputAnimation(showHeatingIntensity, 400);
  const lifePatternAnimation = useInputAnimation(showLifePattern, 400);
  const intimacyAnimation = useInputAnimation(showIntimacy, 400);
  const canShareAnimation = useInputAnimation(showCanShare, 400);
  const isPlayGameAnimation = useInputAnimation(showIsPlayGame, 400);
  const isPhoneCallAnimation = useInputAnimation(showIsPhoneCall, 400);
  const studyingAnimation = useInputAnimation(showStudying, 400);
  const intakeAnimation = useInputAnimation(showIntake, 400);
  const cleanSensitivityAnimation = useInputAnimation(showCleanSensitivity, 400);
  const noiseSensitivityAnimation = useInputAnimation(showNoiseSensitivity, 400);
  const cleaningFrequencyAnimation = useInputAnimation(showCleaningFrequency, 400);
  const personalityAnimation = useInputAnimation(showPersonality, 400);
  const mbtiAnimation = useInputAnimation(showMbti, 400);

  const [wakeUpTimeItems, setWakeUpTimeItems] = useState<Item[]>([
    { index: 1, value: '1', name: '1', select: false },
    { index: 2, value: '2', name: '2', select: false },
    { index: 3, value: '3', name: '3', select: false },
    { index: 4, value: '4', name: '4', select: false },
    { index: 5, value: '5', name: '5', select: false },
    { index: 6, value: '6', name: '6', select: false },
    { index: 7, value: '7', name: '7', select: false },
    { index: 8, value: '8', name: '8', select: false },
    { index: 9, value: '9', name: '9', select: false },
    { index: 10, value: '10', name: '10', select: false },
    { index: 11, value: '11', name: '11', select: false },
    { index: 12, value: '12', name: '12', select: false },
  ]);

  const [sleepingTimeItems, setSleepingTimeItems] = useState<Item[]>([
    { index: 1, value: '1', name: '1', select: false },
    { index: 2, value: '2', name: '2', select: false },
    { index: 3, value: '3', name: '3', select: false },
    { index: 4, value: '4', name: '4', select: false },
    { index: 5, value: '5', name: '5', select: false },
    { index: 6, value: '6', name: '6', select: false },
    { index: 7, value: '7', name: '7', select: false },
    { index: 8, value: '8', name: '8', select: false },
    { index: 9, value: '9', name: '9', select: false },
    { index: 10, value: '10', name: '10', select: false },
    { index: 11, value: '11', name: '11', select: false },
    { index: 12, value: '12', name: '12', select: false },
  ]);

  const [turnOffTimeItems, setTurnOffTimeItems] = useState<Item[]>([
    { index: 1, value: '1', name: '1', select: false },
    { index: 2, value: '2', name: '2', select: false },
    { index: 3, value: '3', name: '3', select: false },
    { index: 4, value: '4', name: '4', select: false },
    { index: 5, value: '5', name: '5', select: false },
    { index: 6, value: '6', name: '6', select: false },
    { index: 7, value: '7', name: '7', select: false },
    { index: 8, value: '8', name: '8', select: false },
    { index: 9, value: '9', name: '9', select: false },
    { index: 10, value: '10', name: '10', select: false },
    { index: 11, value: '11', name: '11', select: false },
    { index: 12, value: '12', name: '12', select: false },
  ]);

  const [smokingStateItems, setSmokingStateItems] = useState<Item[]>([
    { index: 1, value: 'X', name: 'X', select: false },
    { index: 2, value: '연초', name: '연초', select: false },
    { index: 3, value: '전자담배', name: '전자담배', select: false },
    { index: 4, value: '끊는 중이에요', name: '끊는 중이에요', select: false },
  ]);

  const [sleepingHabitItems, setSleepingHabitItems] = useState<Item[]>([
    { index: 1, value: 'X', name: 'X', select: false },
    { index: 2, value: '코골이', name: '코골이', select: false },
    { index: 3, value: '이갈이', name: '이갈이', select: false },
    { index: 4, value: '몽유병', name: '몽유병', select: false },
    { index: 5, value: '잠꼬대', name: '잠꼬대', select: false },
  ]);

  const [airConditioningIntensityItems, setAirConditioningIntensityItems] = useState<Item[]>([
    { index: 1, value: '세게 틀어요', name: '세게 틀어요', select: false },
    { index: 2, value: '적당하게 틀어요', name: '적당하게 틀어요', select: false },
    { index: 3, value: '약하게 틀어요', name: '약하게 틀어요', select: false },
  ]);

  const [heatingIntensityItems, setHeatingIntensityItems] = useState<Item[]>([
    { index: 1, value: '세게 틀어요', name: '세게 틀어요', select: false },
    { index: 2, value: '적당하게 틀어요', name: '적당하게 틀어요', select: false },
    { index: 3, value: '약하게 틀어요', name: '약하게 틀어요', select: false },
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
    { index: 1, value: true, name: 'O', select: false },
    { index: 2, value: false, name: 'X', select: false },
  ]);

  const [isPlayGameItems, setIsPlayGameItems] = useState<Item[]>([
    { index: 1, value: 'O', name: 'O', select: false },
    { index: 2, value: 'X', name: 'X', select: false },
  ]);

  const [isPhoneCallItems, setIsPhoneCallItems] = useState<Item[]>([
    { index: 1, value: 'O', name: 'O', select: false },
    { index: 2, value: 'X', name: 'X', select: false },
  ]);

  const [studyingItems, setStudyingItems] = useState<Item[]>([
    { index: 1, value: 'O', name: 'O', select: false },
    { index: 2, value: 'X', name: 'X', select: false },
    { index: 3, value: '때마다 다를 거 같아요', name: '때마다 다를 거 같아요', select: false },
  ]);

  const [intakeItems, setIntakeItems] = useState<Item[]>([
    {
      index: 1,
      value: '아예 안 먹었으면 좋겠어요',
      name: '아예 안 먹었으면 좋겠어요',
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
      value: '방에서 마음껏 먹어도 돼요',
      name: '방에서 마음껏 먹어도 돼요',
      select: false,
    },
  ]);

  const [cleanSensitivityItems, setCleanSensitivityItems] = useState<Item[]>([
    { index: 1, value: '매우 예민해요', name: '매우 예민해요', select: false },
    { index: 2, value: '예민해요', name: '예민해요', select: false },
    { index: 3, value: '보통이에요', name: '보통이에요', select: false },
    { index: 4, value: '예민하지 않아요', name: '예민하지 않아요', select: false },
    { index: 5, value: '매우 예민하지 않아요', name: '매우 예민하지 않아요', select: false },
  ]);

  const [noiseSensitivityItems, setNoiseSensitivityItems] = useState<Item[]>([
    { index: 1, value: '매우 예민해요', name: '매우 예민해요', select: false },
    { index: 2, value: '예민해요', name: '예민해요', select: false },
    { index: 3, value: '보통이에요', name: '보통이에요', select: false },
    { index: 4, value: '예민하지 않아요', name: '예민하지 않아요', select: false },
    {
      index: 5,
      value: '매우 예민하지 않아요',
      name: '매우 예민하지 않아요',
      select: false,
    },
  ]);

  const [cleaningFrequencyItems, setCleaningFrequencyItems] = useState<Item[]>([
    { index: 1, value: '매일매일 해요', name: '매일매일 해요', select: false },
    {
      index: 2,
      value: '이틀에 한 번 정도 해요',
      name: '이틀에 한 번 정도 해요',
      select: false,
    },
    {
      index: 3,
      value: '일주일에 3-4번 하는 거 같아요',
      name: '일주일에 3-4번 하는 거 같아요',
      select: false,
    },
    {
      index: 4,
      value: '2주에 한 번씩 해요',
      name: '2주에 한 번씩 해요',
      select: false,
    },
    {
      index: 5,
      value: '한 달에 한 번씩 해요',
      name: '한 달에 한 번씩 해요',
      select: false,
    },
    { index: 6, value: '거의 안 해요', name: '거의 안 해요', select: false },
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

  useEffect(() => {
    console.log(lifeStyle);
  }, [lifeStyle]);

  return (
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <BackHeader
        title="필수정보"
        buttonString="다음"
        leftPressFunc={toPrev}
        rightPressFunc={toNext}
        canNext={canNext}
        width={210}
      />
      <ScrollView className="px-5">
        {showMbti && (
          <Animated.View
            style={{
              opacity: mbtiAnimation.opacity,
              transform: [{ translateY: mbtiAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="MBTI를 알려주세요!"
              value={mbti}
              setValue={setMbti}
              items={mbtiItems}
              setItems={setMbtiItems}
              isTime={false}
              isWide={true}
              width={70}
            />
          </Animated.View>
        )}

        {showPersonality && (
          <Animated.View
            style={{
              opacity: personalityAnimation.opacity,
              transform: [{ translateY: personalityAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="당신의 성격을 알려주세요!"
              value={personality}
              setValue={(text) => {
                setPersonality(text);
                setShowMbti(!!text);
              }}
              items={personalityItems}
              setItems={setPersonalityItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showCleaningFrequency && (
          <Animated.View
            style={{
              opacity: cleaningFrequencyAnimation.opacity,
              transform: [{ translateY: cleaningFrequencyAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="평소에 청소를 얼만큼 하시나요?"
              value={cleaningFrequency}
              setValue={(text) => {
                setCleaningFrequency(text);
                setShowPersonality(!!text);
              }}
              items={cleaningFrequencyItems}
              setItems={setCleaningFrequencyItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showNoiseSensitivity && (
          <Animated.View
            style={{
              opacity: noiseSensitivityAnimation.opacity,
              transform: [{ translateY: noiseSensitivityAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="소음 예민도를 선택해주세요"
              value={noiseSensitivity}
              setValue={(text) => {
                setNoiseSensitivity(text);
                setShowCleaningFrequency(!!text);
              }}
              items={noiseSensitivityItems}
              setItems={setNoiseSensitivityItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showCleanSensitivity && (
          <Animated.View
            style={{
              opacity: cleanSensitivityAnimation.opacity,
              transform: [{ translateY: cleanSensitivityAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="청결 예민도를 선택해주세요"
              value={cleanSensitivity}
              setValue={(text) => {
                setCleanSensitivity(text);
                setShowNoiseSensitivity(!!text);
              }}
              items={cleanSensitivityItems}
              setItems={setCleanSensitivityItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showIntake && (
          <Animated.View
            style={{
              opacity: intakeAnimation.opacity,
              transform: [{ translateY: intakeAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="섭취여부를 선택해주세요"
              value={intake}
              setValue={(text) => {
                setIntake(text);
                setShowCleanSensitivity(!!text);
              }}
              items={intakeItems}
              setItems={setIntakeItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showStudying && (
          <Animated.View
            style={{
              opacity: studyingAnimation.opacity,
              transform: [{ translateY: studyingAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="방 안에서 공부 여부를 선택해주세요"
              value={studying}
              setValue={(text) => {
                setStudying(text);
                setShowIntake(!!text);
              }}
              items={studyingItems}
              setItems={setStudyingItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showIsPhoneCall && (
          <Animated.View
            style={{
              opacity: isPhoneCallAnimation.opacity,
              transform: [{ translateY: isPhoneCallAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="방 안에서 전화 여부를 선택해주세요"
              value={isPhoneCall}
              setValue={(text) => {
                setIsPhoneCall(text);
                setShowStudying(!!text);
              }}
              items={isPhoneCallItems}
              setItems={setIsPhoneCallItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showIsPlayGame && (
          <Animated.View
            style={{
              opacity: isPlayGameAnimation.opacity,
              transform: [{ translateY: isPlayGameAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="방 안에서 게임 여부를 선택해주세요"
              value={isPlayGame}
              setValue={(text) => {
                setIsPlayGame(text);
                setShowIsPhoneCall(!!text);
              }}
              items={isPlayGameItems}
              setItems={setIsPlayGameItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showCanShare && (
          <Animated.View
            style={{
              opacity: canShareAnimation.opacity,
              transform: [{ translateY: canShareAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
              value={canShare}
              setValue={(text) => {
                setCanShare(text);
                setShowIsPlayGame(!!text);
              }}
              items={canShareItems}
              setItems={setCanShareItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showIntimacy && (
          <Animated.View
            style={{
              opacity: intimacyAnimation.opacity,
              transform: [{ translateY: intimacyAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="친밀도를 선택해주세요"
              value={intimacy}
              setValue={(text) => {
                setIntimacy(text);
                setShowCanShare(!!text);
              }}
              items={intimacyItems}
              setItems={setIntimacyItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showLifePattern && (
          <Animated.View
            style={{
              opacity: lifePatternAnimation.opacity,
              transform: [{ translateY: lifePatternAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="생활 패턴을 입력해주세요"
              value={lifePattern}
              setValue={(text) => {
                setLifePattern(text);
                setShowIntimacy(!!text);
              }}
              items={lifePatternItems}
              setItems={setLifePatternItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showHeatingIntensity && (
          <Animated.View
            style={{
              opacity: heatingIntensityAnimation.opacity,
              transform: [{ translateY: heatingIntensityAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="히터 강도를 선택해주세요"
              value={heatingIntensity}
              setValue={(text) => {
                setHeatingIntensity(text);
                setShowLifePattern(!!text);
              }}
              items={heatingIntensityItems}
              setItems={setHeatingIntensityItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showAirConditioningIntensity && (
          <Animated.View
            style={{
              opacity: airConditioningIntensityAnimation.opacity,
              transform: [{ translateY: airConditioningIntensityAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="에어컨 강도를 선택해주세요"
              value={airConditioningIntensity}
              setValue={(text) => {
                setAirConditioningIntensity(text);
                setShowHeatingIntensity(!!text);
              }}
              items={airConditioningIntensityItems}
              setItems={setAirConditioningIntensityItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showSleepingHabit && (
          <Animated.View
            style={{
              opacity: sleepingHabitAnimation.opacity,
              transform: [{ translateY: sleepingHabitAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="잠버릇을 선택해주세요"
              value={sleepingHabit}
              setValue={(text) => {
                setSleepingHabit(text);
                setShowAirConditioningIntensity(!!text);
              }}
              items={sleepingHabitItems}
              setItems={setSleepingHabitItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showSmokingState && (
          <Animated.View
            style={{
              opacity: smokingStateAnimation.opacity,
              transform: [{ translateY: smokingStateAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="흡연여부를 선택해주세요"
              value={smokingState}
              setValue={(text) => {
                setSmokingState(text);
                setShowSleepingHabit(!!text);
              }}
              items={smokingStateItems}
              setItems={setSmokingStateItems}
              isTime={false}
            />
          </Animated.View>
        )}

        {showTurnOffTime && (
          <Animated.View
            style={{
              opacity: turnOffTimeAnimation.opacity,
              transform: [{ translateY: turnOffTimeAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="소등시간을 선택해주세요"
              value={turnOffTime}
              setValue={(text) => {
                setTurnOffTime(text);
                setShowSmokingState(!!text);
              }}
              meridian={turnOffMeridian}
              setMeridian={setTurnOffMeridian}
              items={turnOffTimeItems}
              setItems={setTurnOffTimeItems}
              isTime={true}
              isWide={true}
              width={48}
              count={6}
            />
          </Animated.View>
        )}

        {showSleepingTime && (
          <Animated.View
            style={{
              opacity: sleepingTimeAnimation.opacity,
              transform: [{ translateY: sleepingTimeAnimation.translateY }],
            }}
          >
            <CustomRadioInputBox
              title="취침시간을 선택해주세요"
              value={sleepingTime}
              setValue={(text) => {
                setSleepingTime(text);
                setShowTurnOffTime(!!text);
              }}
              meridian={sleepingMeridian}
              setMeridian={setSleepingMeridian}
              items={sleepingTimeItems}
              setItems={setSleepingTimeItems}
              isTime={true}
              isWide={true}
              width={48}
              count={6}
            />
          </Animated.View>
        )}

        <CustomRadioInputBox
          title="기상시간을 선택해주세요"
          value={wakeUpTime}
          setValue={(text) => {
            setWakeUpTime(text);
            setShowSleepingTime(!!text);
          }}
          meridian={wakeUpMeridian}
          setMeridian={setWakeUpMeridian}
          items={wakeUpTimeItems}
          setItems={setWakeUpTimeItems}
          isTime={true}
          isWide={true}
          width={48}
          count={6}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EssentialInformationComponent;
