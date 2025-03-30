import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Animated,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CustomGridRadioComponent from '@/components/lifeStyle/customGridRadio';
import CustomRadioComponent from '@/components/lifeStyle/customRadio';
import CustomSelectComponent from '@/components/lifeStyle/customSelect';
import CustomTimeSelectComponent from '@/components/lifeStyle/customTimeSelect';
import {
  airConditioningIntensityItems,
  canShareItems,
  cleaningFrequencyItems,
  cleanSensitivityItems,
  drinkingFrequencyItems,
  heatingIntensityItems,
  intakeItems,
  intimacyItems,
  isPhoneCallItems,
  isPlayGameItems,
  lifePatternItems,
  mbtiItems,
  noiseSensitivityItems,
  personalityItems,
  sleepingHabitItems,
  smokingItems,
  studyingItems,
  timeItems,
} from '@/constants/items/lifeStyleItem';
import { useInputAnimation } from '@/hooks/useInputAnimation';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleEssentialInfo() {
  const router = useRouter();

  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();

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

  console.log(lifeStyle);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent title="필수정보">
          {lifeStyle.wakeUpMeridian !== '' &&
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
            lifeStyle.mbti !== '' && (
              <Pressable
                onPress={(event) => {
                  router.push('/lifeStyle/additionalInfo');
                  event.stopPropagation();
                }}
                className="bg-subColor1 rounded-md px-[20px] py-[10px]"
              >
                <Text className="text-14 font-600 leading-14 text-mainColor">다음</Text>
              </Pressable>
            )}
        </BackHeaderComponent>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <View className="px-[20px] mt-[40px] gap-y-[64px] flex-1">
            {(showMbti || lifeStyle.mbti !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.mbti !== '' ? 1 : mbtiAnimation.opacity,
                  transform: [{ translateY: lifeStyle.mbti !== '' ? 0 : mbtiAnimation.translateY }],
                }}
              >
                <CustomGridRadioComponent
                  title="MBTI를 선택해주세요"
                  value={lifeStyle.mbti}
                  items={mbtiItems}
                  handleValue={(e) => {
                    setLifeStyle({ mbti: String(e) });
                  }}
                />
              </Animated.View>
            )}

            {(showPersonality || lifeStyle.personality.length !== 0) && (
              <Animated.View
                style={{
                  opacity: lifeStyle.personality.length !== 0 ? 1 : personalityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.personality.length !== 0 ? 0 : personalityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomSelectComponent
                  title="성격을 선택해주세요 (중복선택 가능)"
                  value={lifeStyle.personality}
                  items={personalityItems}
                  handleValue={(e) => {
                    setLifeStyle({ personality: e });
                    setShowMbti(true);
                  }}
                />
              </Animated.View>
            )}

            {(showDrinkingFrequency || lifeStyle.drinkingFrequency !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.drinkingFrequency !== '' ? 1 : drinkingFrequencyAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.drinkingFrequency !== ''
                          ? 0
                          : drinkingFrequencyAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="음주 빈도를 선택해주세요"
                  value={lifeStyle.drinkingFrequency}
                  items={drinkingFrequencyItems}
                  handleValue={(e) => {
                    setLifeStyle({ drinkingFrequency: String(e) });
                    setShowPersonality(true);
                  }}
                />
              </Animated.View>
            )}

            {(showCleaningFrequency || lifeStyle.cleaningFrequency !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.cleaningFrequency !== '' ? 1 : cleaningFrequencyAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.cleaningFrequency !== ''
                          ? 0
                          : cleaningFrequencyAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="청소 빈도를 선택해주세요"
                  value={lifeStyle.cleaningFrequency}
                  items={cleaningFrequencyItems}
                  handleValue={(e) => {
                    setLifeStyle({ cleaningFrequency: String(e) });
                    setShowDrinkingFrequency(true);
                  }}
                />
              </Animated.View>
            )}

            {(showNoiseSensitivity || lifeStyle.noiseSensitivity !== undefined) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.noiseSensitivity !== undefined
                      ? 1
                      : noiseSensitivityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.noiseSensitivity !== undefined
                          ? 0
                          : noiseSensitivityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="소음 예민도를 선택해주세요"
                  value={lifeStyle.noiseSensitivity}
                  items={noiseSensitivityItems}
                  handleValue={(e) => {
                    setLifeStyle({ noiseSensitivity: Number(e) });
                    setShowCleaningFrequency(true);
                  }}
                />
              </Animated.View>
            )}

            {(showCleanSensitivity || lifeStyle.cleanSensitivity !== undefined) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.cleanSensitivity !== undefined
                      ? 1
                      : cleanSensitivityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.cleanSensitivity !== undefined
                          ? 0
                          : cleanSensitivityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="청결 예민도를 선택해주세요"
                  value={lifeStyle.cleanSensitivity}
                  items={cleanSensitivityItems}
                  handleValue={(e) => {
                    setLifeStyle({ cleanSensitivity: Number(e) });
                    setShowNoiseSensitivity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showIntake || lifeStyle.intake !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.intake !== '' ? 1 : intakeAnimation.opacity,
                  transform: [
                    { translateY: lifeStyle.intake !== '' ? 0 : intakeAnimation.translateY },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 섭취여부를 선택해주세요"
                  value={lifeStyle.intake}
                  items={intakeItems}
                  handleValue={(e) => {
                    setLifeStyle({ intake: String(e) });
                    setShowCleanSensitivity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showStudying || lifeStyle.studying !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.studying !== '' ? 1 : studyingAnimation.opacity,
                  transform: [
                    { translateY: lifeStyle.studying !== '' ? 0 : studyingAnimation.translateY },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 공부 여부를 선택해주세요"
                  value={lifeStyle.studying}
                  items={studyingItems}
                  handleValue={(e) => {
                    setLifeStyle({ studying: String(e) });
                    setShowIntake(true);
                  }}
                />
              </Animated.View>
            )}

            {(showIsPhoneCall || lifeStyle.isPhoneCall !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.isPhoneCall !== '' ? 1 : isPhoneCallAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.isPhoneCall !== '' ? 0 : isPhoneCallAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 전화 여부를 선택해주세요"
                  value={lifeStyle.isPhoneCall}
                  items={isPhoneCallItems}
                  handleValue={(e) => {
                    setLifeStyle({ isPhoneCall: String(e) });
                    setShowStudying(true);
                  }}
                />
              </Animated.View>
            )}

            {(showIsPlayGame || lifeStyle.isPlayGame !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.isPlayGame !== '' ? 1 : isPlayGameAnimation.opacity,
                  transform: [
                    {
                      translateY: lifeStyle.isPlayGame !== '' ? 0 : isPlayGameAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 게임 여부를 선택해주세요"
                  value={lifeStyle.isPlayGame}
                  items={isPlayGameItems}
                  handleValue={(e) => {
                    setLifeStyle({ isPlayGame: String(e) });
                    setShowIsPhoneCall(true);
                  }}
                />
              </Animated.View>
            )}

            {(showCanShare || lifeStyle.canShare !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.canShare !== '' ? 1 : canShareAnimation.opacity,
                  transform: [
                    { translateY: lifeStyle.canShare !== '' ? 0 : canShareAnimation.translateY },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
                  value={lifeStyle.canShare}
                  items={canShareItems}
                  handleValue={(e) => {
                    setLifeStyle({ canShare: String(e) });
                    setShowIsPlayGame(true);
                  }}
                />
              </Animated.View>
            )}

            {(showIntimacy || lifeStyle.intimacy !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.intimacy !== '' ? 1 : intimacyAnimation.opacity,
                  transform: [
                    { translateY: lifeStyle.intimacy !== '' ? 0 : intimacyAnimation.translateY },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="룸메이트와의 원하는 친밀도를 선택해주세요"
                  value={lifeStyle.intimacy}
                  items={intimacyItems}
                  handleValue={(e) => {
                    setLifeStyle({ intimacy: String(e) });
                    setShowCanShare(true);
                  }}
                />
              </Animated.View>
            )}

            {(showLifePattern || lifeStyle.lifePattern !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.lifePattern !== '' ? 1 : lifePatternAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.lifePattern !== '' ? 0 : lifePatternAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="생활 패턴을 선택해주세요"
                  value={lifeStyle.lifePattern}
                  items={lifePatternItems}
                  handleValue={(e) => {
                    setLifeStyle({ lifePattern: String(e) });
                    setShowIntimacy(true);
                  }}
                />
              </Animated.View>
            )}

            {(showHeatingIntensity || lifeStyle.heatingIntensity !== undefined) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.heatingIntensity !== undefined
                      ? 1
                      : heatingIntensityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.heatingIntensity !== undefined
                          ? 0
                          : heatingIntensityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="히터 강도를 선택해주세요"
                  value={lifeStyle.heatingIntensity}
                  items={heatingIntensityItems}
                  handleValue={(e) => {
                    setLifeStyle({ heatingIntensity: Number(e) });
                    setShowLifePattern(true);
                  }}
                />
              </Animated.View>
            )}

            {(showAirConditioningIntensity || lifeStyle.airConditioningIntensity !== undefined) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.airConditioningIntensity !== undefined
                      ? 1
                      : airConditioningIntensityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.airConditioningIntensity !== undefined
                          ? 0
                          : airConditioningIntensityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="에어컨 강도를 선택해주세요"
                  value={lifeStyle.airConditioningIntensity}
                  items={airConditioningIntensityItems}
                  handleValue={(e) => {
                    setLifeStyle({ airConditioningIntensity: Number(e) });
                    setShowHeatingIntensity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showSleepingHabit || lifeStyle.sleepingHabit.length !== 0) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.sleepingHabit.length !== 0 ? 1 : sleepingHabitAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.sleepingHabit.length !== 0
                          ? 0
                          : sleepingHabitAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomSelectComponent
                  title="잠버릇을 선택해주세요 (중복선택 가능)"
                  value={lifeStyle.sleepingHabit}
                  items={sleepingHabitItems}
                  handleValue={(e) => {
                    setLifeStyle({ sleepingHabit: e });
                    setShowAirConditioningIntensity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showSmoking || lifeStyle.smoking !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.smoking !== '' ? 1 : smokingAnimation.opacity,
                  transform: [
                    { translateY: lifeStyle.smoking !== '' ? 0 : smokingAnimation.translateY },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="흡연여부를 선택해주세요"
                  value={lifeStyle.smoking}
                  items={smokingItems}
                  handleValue={(e) => {
                    setLifeStyle({ smoking: String(e) });
                    setShowSleepingHabit(true);
                  }}
                />
              </Animated.View>
            )}

            {(showTurnOffTime ||
              (lifeStyle.turnOffTime !== undefined && lifeStyle.turnOffMeridian !== '')) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.turnOffTime !== undefined && lifeStyle.turnOffMeridian !== ''
                      ? 1
                      : turnOffTimeAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.turnOffTime !== undefined && lifeStyle.turnOffMeridian !== ''
                          ? 0
                          : turnOffTimeAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomTimeSelectComponent
                  title="소등시간을 선택해주세요"
                  timeValue={lifeStyle.turnOffTime}
                  meridianValue={lifeStyle.turnOffMeridian}
                  items={timeItems}
                  handleTime={(e) => {
                    setLifeStyle({ turnOffTime: Number(e) });
                    if (e && lifeStyle.turnOffMeridian) {
                      setShowSmoking(true);
                    }
                  }}
                  handleMeridian={(e) => {
                    setLifeStyle({ turnOffMeridian: String(e) });
                    if (e && lifeStyle.turnOffTime) {
                      setShowSmoking(true);
                    }
                  }}
                />
              </Animated.View>
            )}

            {(showSleepingTime ||
              (lifeStyle.sleepingTime !== undefined && lifeStyle.sleepingMeridian !== '')) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.sleepingTime !== undefined && lifeStyle.sleepingMeridian !== ''
                      ? 1
                      : sleepingTimeAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.sleepingTime !== undefined && lifeStyle.sleepingMeridian !== ''
                          ? 0
                          : sleepingTimeAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomTimeSelectComponent
                  title="취침시간을 선택해주세요"
                  timeValue={lifeStyle.sleepingTime}
                  meridianValue={lifeStyle.sleepingMeridian}
                  items={timeItems}
                  handleTime={(e) => {
                    setLifeStyle({ sleepingTime: Number(e) });
                    if (e && lifeStyle.sleepingMeridian) {
                      setShowTurnOffTime(true);
                    }
                  }}
                  handleMeridian={(e) => {
                    setLifeStyle({ sleepingMeridian: String(e) });
                    if (e && lifeStyle.sleepingTime) {
                      setShowTurnOffTime(true);
                    }
                  }}
                />
              </Animated.View>
            )}

            <CustomTimeSelectComponent
              title="기상시간을 선택해주세요"
              timeValue={lifeStyle.wakeUpTime}
              meridianValue={lifeStyle.wakeUpMeridian}
              items={timeItems}
              handleTime={(e) => {
                setLifeStyle({ wakeUpTime: Number(e) });
                if (e && lifeStyle.wakeUpMeridian) {
                  setShowSleepingTime(true);
                }
              }}
              handleMeridian={(e) => {
                setLifeStyle({ wakeUpMeridian: String(e) });
                if (e && lifeStyle.wakeUpTime) {
                  setShowSleepingTime(true);
                }
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
