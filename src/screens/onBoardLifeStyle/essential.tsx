import React, { useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import {
  timeItems,
  mbtiItems,
  intakeItems,
  smokingItems,
  intimacyItems,
  canShareItems,
  studyingItems,
  isPlayGameItems,
  lifePatternItems,
  isPhoneCallItems,
  personalityItems,
  sleepingHabitItems,
  heatingIntensityItems,
  cleanSensitivityItems,
  noiseSensitivityItems,
  cleaningFrequencyItems,
  drinkingFrequencyItems,
  airConditioningIntensityItems,
} from './essentialData';

import AnimationView from '@components/onBoardLifeStyle/animationView';
import TimeRadioComponent from '@components/onBoardLifeStyle/timeRadio';
import LifeStyleHeaderComponent from '@components/onBoardLifeStyle/header';
import StringRadioComponent from '@components/onBoardLifeStyle/stringRadio';
import NumberRadioComponent from '@components/onBoardLifeStyle/numberRadio';
import StringCheckComponent from '@components/onBoardLifeStyle/stringCheck';

import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useInputAnimation } from '@hooks/inputAnimation';
import useCompletionPercentage from '@hooks/useCompletionPercentage';

import { EssentialLifyStyleScreenProps } from '@type/param/rootStack';

const EssentialLifyStyle = ({ navigation }: EssentialLifyStyleScreenProps) => {
  const { lifeStyle } = useNewLifeStyleStore();

  const [showSleepingTime, setShowSleepingTime] = useState<boolean>(false);
  const [showTurnOffTime, setShowTurnOffTime] = useState<boolean>(false);
  const [showSmoking, setShowSmoking] = useState<boolean>(false);
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
  const [showDrinkingFrequency, setShowDrinkingFrequency] = useState<boolean>(false);
  const [showPersonality, setShowPersonality] = useState<boolean>(false);
  const [showMbti, setShowMbti] = useState<boolean>(false);

  const sleepingTimeAnimation = useInputAnimation(showSleepingTime, 400);
  const turnOffTimeAnimation = useInputAnimation(showTurnOffTime, 400);
  const smokingAnimation = useInputAnimation(showSmoking, 400);
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
  const drinkingFrequencyAnimation = useInputAnimation(showDrinkingFrequency, 400);
  const personalityAnimation = useInputAnimation(showPersonality, 400);
  const mbtiAnimation = useInputAnimation(showMbti, 400);

  const toBack = () => {
    navigation.goBack();
  };

  const toEssential = () => {
    navigation.navigate('AdditionalLifeStyleScreen');
  };

  const totalFields = 23;
  const progressWidth = useCompletionPercentage({
    fields: {
      wakeUpMeridian: lifeStyle.wakeUpMeridian,
      wakeUpTime: lifeStyle.wakeUpTime,
      sleepingMeridian: lifeStyle.sleepingMeridian,
      sleepingTime: lifeStyle.sleepingTime,
      turnOffMeridian: lifeStyle.turnOffMeridian,
      turnOffTime: lifeStyle.turnOffTime,
      smoking: lifeStyle.smoking,
      sleepingHabit: lifeStyle.sleepingHabit,
      airConditioningIntensity: lifeStyle.airConditioningIntensity,
      heatingIntensity: lifeStyle.heatingIntensity,
      lifePattern: lifeStyle.lifePattern,
      intimacy: lifeStyle.intimacy,
      canShare: lifeStyle.canShare,
      isPlayGame: lifeStyle.isPlayGame,
      isPhoneCall: lifeStyle.isPhoneCall,
      studying: lifeStyle.studying,
      intake: lifeStyle.intake,
      cleanSensitivity: lifeStyle.cleanSensitivity,
      noiseSensitivity: lifeStyle.noiseSensitivity,
      cleaningFrequency: lifeStyle.cleaningFrequency,
      drinkingFrequency: lifeStyle.drinkingFrequency,
      personality: lifeStyle.personality,
      mbti: lifeStyle.mbti,
    },
    totalFields,
  });

  const canNext =
    lifeStyle.wakeUpMeridian !== '' &&
    lifeStyle.wakeUpTime !== undefined &&
    lifeStyle.sleepingMeridian !== '' &&
    lifeStyle.sleepingTime !== undefined &&
    lifeStyle.turnOffMeridian !== '' &&
    lifeStyle.turnOffTime !== undefined &&
    lifeStyle.smoking !== '' &&
    lifeStyle.sleepingHabit.length !== 0 &&
    lifeStyle.airConditioningIntensity !== undefined &&
    lifeStyle.heatingIntensity !== undefined &&
    lifeStyle.intimacy !== '' &&
    lifeStyle.lifePattern !== '' &&
    lifeStyle.canShare !== '' &&
    lifeStyle.isPlayGame !== '' &&
    lifeStyle.isPhoneCall !== '' &&
    lifeStyle.studying !== '' &&
    lifeStyle.intake !== '' &&
    lifeStyle.cleanSensitivity !== undefined &&
    lifeStyle.noiseSensitivity !== undefined &&
    lifeStyle.cleaningFrequency !== '' &&
    lifeStyle.drinkingFrequency !== '' &&
    lifeStyle.personality.length !== 0 &&
    lifeStyle.mbti !== '';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LifeStyleHeaderComponent
        title="필수정보"
        toBack={toBack}
        isComplete={canNext}
        buttonText="다음"
        buttonFunc={toEssential}
        width={progressWidth}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, rowGap: 56, paddingBottom: 34 }}>
        {/* MBTI 선택 */}
        <AnimationView isShow={showMbti || !!lifeStyle.mbti} inputAnimation={mbtiAnimation}>
          <StringRadioComponent title="MBTI를 선택해주세요" items={mbtiItems} value="mbti" />
        </AnimationView>

        {/* 성격 선택 */}
        <AnimationView
          isShow={showPersonality || lifeStyle.personality.length !== 0}
          inputAnimation={personalityAnimation}
        >
          <StringCheckComponent
            title="성격을 선택해주세요 (중복선택 가능)"
            items={personalityItems}
            value="personality"
            showNext={setShowMbti}
          />
        </AnimationView>

        {/* 음주 빈도 선택 */}
        <AnimationView
          isShow={showDrinkingFrequency || !!lifeStyle.drinkingFrequency}
          inputAnimation={drinkingFrequencyAnimation}
        >
          <StringRadioComponent
            title="음주 빈도를 선택해주세요"
            items={drinkingFrequencyItems}
            value="drinkingFrequency"
            showNext={setShowPersonality}
          />
        </AnimationView>

        {/* 청소 빈도 선택 */}
        <AnimationView
          isShow={showCleaningFrequency || !!lifeStyle.cleaningFrequency}
          inputAnimation={cleaningFrequencyAnimation}
        >
          <StringRadioComponent
            title="청소 빈도를 선택해주세요"
            items={cleaningFrequencyItems}
            value="cleaningFrequency"
            showNext={setShowDrinkingFrequency}
          />
        </AnimationView>

        {/* 소음 예민도 선택 */}
        <AnimationView
          isShow={showNoiseSensitivity || !!lifeStyle.noiseSensitivity}
          inputAnimation={noiseSensitivityAnimation}
        >
          <NumberRadioComponent
            title="소음 예민도를 선택해주세요"
            items={noiseSensitivityItems}
            value="noiseSensitivity"
            showNext={setShowCleaningFrequency}
          />
        </AnimationView>

        {/* 청결 예민도 선택 */}
        <AnimationView
          isShow={showCleanSensitivity || !!lifeStyle.cleanSensitivity}
          inputAnimation={cleanSensitivityAnimation}
        >
          <NumberRadioComponent
            title="청결 예민도를 선택해주세요"
            items={cleanSensitivityItems}
            value="cleanSensitivity"
            showNext={setShowNoiseSensitivity}
          />
        </AnimationView>

        {/* 섭취 여부 선택 */}
        <AnimationView isShow={showIntake || !!lifeStyle.intake} inputAnimation={intakeAnimation}>
          <StringRadioComponent
            title="방 안에서의 섭취여부를 선택해주세요"
            items={intakeItems}
            value="intake"
            showNext={setShowCleanSensitivity}
          />
        </AnimationView>

        {/* 공부 여부 선택 */}
        <AnimationView
          isShow={showStudying || !!lifeStyle.studying}
          inputAnimation={studyingAnimation}
        >
          <StringRadioComponent
            title="방 안에서의 공부 여부를 선택해주세요"
            items={studyingItems}
            value="studying"
            showNext={setShowIntake}
          />
        </AnimationView>

        {/* 전화 여부 선택 */}
        <AnimationView
          isShow={showIsPhoneCall || !!lifeStyle.isPhoneCall}
          inputAnimation={isPhoneCallAnimation}
        >
          <StringRadioComponent
            title="방 안에서의 전화 여부를 선택해주세요"
            items={isPhoneCallItems}
            value="isPhoneCall"
            showNext={setShowStudying}
          />
        </AnimationView>

        {/* 게임 여부 선택 */}
        <AnimationView
          isShow={showIsPlayGame || !!lifeStyle.isPlayGame}
          inputAnimation={isPlayGameAnimation}
        >
          <StringRadioComponent
            title="방 안에서의 게임 여부를 선택해주세요"
            items={isPlayGameItems}
            value="isPlayGame"
            showNext={setShowIsPhoneCall}
          />
        </AnimationView>

        {/* 물건 공유 선택 */}
        <AnimationView
          isShow={showCanShare || !!lifeStyle.canShare}
          inputAnimation={canShareAnimation}
        >
          <StringRadioComponent
            title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
            items={canShareItems}
            value="canShare"
            showNext={setShowIsPlayGame}
          />
        </AnimationView>

        {/* 친밀도 선택 */}
        <AnimationView
          isShow={showIntimacy || !!lifeStyle.intimacy}
          inputAnimation={intimacyAnimation}
        >
          <StringRadioComponent
            title="룸메이트와 원하는 친밀도를 선택해주세요"
            items={intimacyItems}
            value="intimacy"
            showNext={setShowCanShare}
          />
        </AnimationView>

        {/* 생활 패턴 선택 */}
        <AnimationView
          isShow={showLifePattern || !!lifeStyle.lifePattern}
          inputAnimation={lifePatternAnimation}
        >
          <StringRadioComponent
            title="생활 패턴을 선택해주세요"
            items={lifePatternItems}
            value="lifePattern"
            showNext={setShowIntimacy}
          />
        </AnimationView>

        {/* 히터 강도 선택 */}
        <AnimationView
          isShow={showHeatingIntensity || !!lifeStyle.heatingIntensity}
          inputAnimation={heatingIntensityAnimation}
        >
          <NumberRadioComponent
            title="히터 강도를 선택해주세요"
            items={heatingIntensityItems}
            value="heatingIntensity"
            showNext={setShowLifePattern}
          />
        </AnimationView>

        {/* 에어컨 강도 선택 */}
        <AnimationView
          isShow={showAirConditioningIntensity || !!lifeStyle.airConditioningIntensity}
          inputAnimation={airConditioningIntensityAnimation}
        >
          <NumberRadioComponent
            title="에어컨 강도를 선택해주세요"
            items={airConditioningIntensityItems}
            value="airConditioningIntensity"
            showNext={setShowHeatingIntensity}
          />
        </AnimationView>

        {/* 잠버릇 선택 */}
        <AnimationView
          isShow={showSleepingHabit || lifeStyle.sleepingHabit.length !== 0}
          inputAnimation={sleepingHabitAnimation}
        >
          <StringCheckComponent
            title="잠버릇을 선택해주세요 (중복선택 가능)"
            items={sleepingHabitItems}
            value="sleepingHabit"
            showNext={setShowAirConditioningIntensity}
          />
        </AnimationView>

        {/* 흡연여부 선택 */}
        <AnimationView
          isShow={showSmoking || !!lifeStyle.smoking}
          inputAnimation={smokingAnimation}
        >
          <StringRadioComponent
            title="흡연여부를 선택해주세요"
            items={smokingItems}
            value="smoking"
            showNext={setShowSleepingHabit}
          />
        </AnimationView>

        {/* 소등시간 선택 */}
        <AnimationView
          isShow={showTurnOffTime || !!lifeStyle.turnOffTime}
          inputAnimation={turnOffTimeAnimation}
        >
          <TimeRadioComponent
            title="소등시간을 선택해주세요"
            items={timeItems}
            value="turnOffTime"
            meridian="turnOffMeridian"
            showNext={setShowSmoking}
          />
        </AnimationView>

        {/* 취침시간 선택 */}
        <AnimationView
          isShow={showSleepingTime || !!lifeStyle.sleepingTime}
          inputAnimation={sleepingTimeAnimation}
        >
          <TimeRadioComponent
            title="취침시간을 선택해주세요"
            items={timeItems}
            value="sleepingTime"
            meridian="sleepingMeridian"
            showNext={setShowTurnOffTime}
          />
        </AnimationView>

        {/* 기상시간 선택 */}

        <TimeRadioComponent
          title="기상시간을 선택해주세요"
          items={timeItems}
          value="wakeUpTime"
          meridian="wakeUpMeridian"
          showNext={setShowSleepingTime}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EssentialLifyStyle;
