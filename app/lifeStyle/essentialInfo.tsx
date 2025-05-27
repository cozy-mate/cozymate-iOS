import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
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
  coolingIntensityItems,
  sharingStatusItems,
  cleaningFrequencyItems,
  cleannessSensitivityItems,
  drinkingFrequencyItems,
  heatingIntensityItems,
  eatingStatusItems,
  intimacyItems,
  callingStatusItems,
  gamingStatusItems,
  lifePatternItems,
  mbtiItems,
  noiseSensitivityItems,
  personalitiesItems,
  sleepingHabitsItems,
  smokingStatusItems,
  studyingStatusItems,
} from '@/constants/items/lifeStyleItem';
import { useInputAnimation } from '@/hooks/useInputAnimation';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleEssentialInfo() {
  const router = useRouter();

  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();

  const [showSleepingTime, setShowSleepingTime] = useState<boolean>(false);
  const [showTurnOffTime, setShowTurnOffTime] = useState<boolean>(false);
  const [showSmokingStatus, setShowSmokingStatus] = useState<boolean>(false);
  const [showSleepingHabits, setShowSleepingHabits] = useState<boolean>(false);
  const [showCoolingIntensity, setShowCoolingIntensity] = useState<boolean>(false);
  const [showHeatingIntensity, setShowHeatingIntensity] = useState<boolean>(false);
  const [showLifePattern, setShowLifePattern] = useState<boolean>(false);
  const [showIntimacy, setShowIntimacy] = useState<boolean>(false);
  const [showSharingStatus, setShowSharingStatus] = useState<boolean>(false);
  const [showGamingStatus, setShowGamingStatus] = useState<boolean>(false);
  const [showCallingStatus, setShowCallingStatus] = useState<boolean>(false);
  const [showStudyingStatus, setShowStudyingStatus] = useState<boolean>(false);
  const [showEatingStatus, setShowEatingStatus] = useState<boolean>(false);
  const [showCleannessSensitivity, setShowCleannessSensitivity] = useState<boolean>(false);
  const [showNoiseSensitivity, setShowNoiseSensitivity] = useState<boolean>(false);
  const [showCleaningFrequency, setShowCleaningFrequency] = useState<boolean>(false);
  const [showDrinkingFrequency, setShowDrinkingFrequency] = useState<boolean>(false);
  const [showPersonalities, setShowPersonalities] = useState<boolean>(false);
  const [showMbti, setShowMbti] = useState<boolean>(false);

  const sleepingTimeAnimation = useInputAnimation(showSleepingTime, 400);
  const turnOffTimeAnimation = useInputAnimation(showTurnOffTime, 400);
  const smokingStatusAnimation = useInputAnimation(showSmokingStatus, 400);
  const sleepingHabitsAnimation = useInputAnimation(showSleepingHabits, 400);
  const coolingIntensityAnimation = useInputAnimation(showCoolingIntensity, 400);
  const heatingIntensityAnimation = useInputAnimation(showHeatingIntensity, 400);
  const lifePatternAnimation = useInputAnimation(showLifePattern, 400);
  const intimacyAnimation = useInputAnimation(showIntimacy, 400);
  const sharingStatusAnimation = useInputAnimation(showSharingStatus, 400);
  const gamingStatusAnimation = useInputAnimation(showGamingStatus, 400);
  const callingStatusAnimation = useInputAnimation(showCallingStatus, 400);
  const studyingStatusAnimation = useInputAnimation(showStudyingStatus, 400);
  const eatingStatusAnimation = useInputAnimation(showEatingStatus, 400);
  const cleannessSensitivityAnimation = useInputAnimation(showCleannessSensitivity, 400);
  const noiseSensitivityAnimation = useInputAnimation(showNoiseSensitivity, 400);
  const cleaningFrequencyAnimation = useInputAnimation(showCleaningFrequency, 400);
  const drinkingFrequencyAnimation = useInputAnimation(showDrinkingFrequency, 400);
  const personalitiesAnimation = useInputAnimation(showPersonalities, 400);
  const mbtiAnimation = useInputAnimation(showMbti, 400);

  const { trackButton } = useTracker();

  const handleNext = (event: GestureResponderEvent) => {
    event.stopPropagation();
    trackButton(ButtonEvent.next_essential, EventCategory.life_style);
    router.push('/lifeStyle/additionalInfo');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent title="필수정보">
          {lifeStyle.wakeUpTime !== undefined &&
            lifeStyle.sleepingTime !== undefined &&
            lifeStyle.turnOffTime !== undefined &&
            lifeStyle.smokingStatus !== '' &&
            lifeStyle.sleepingHabits.length !== 0 &&
            lifeStyle.coolingIntensity !== '' &&
            lifeStyle.heatingIntensity !== '' &&
            lifeStyle.intimacy !== '' &&
            lifeStyle.lifePattern !== '' &&
            lifeStyle.sharingStatus !== '' &&
            lifeStyle.gamingStatus !== '' &&
            lifeStyle.callingStatus !== '' &&
            lifeStyle.studyingStatus !== '' &&
            lifeStyle.eatingStatus !== '' &&
            lifeStyle.cleannessSensitivity !== '' &&
            lifeStyle.noiseSensitivity !== '' &&
            lifeStyle.cleaningFrequency !== '' &&
            lifeStyle.drinkingFrequency !== '' &&
            lifeStyle.personalities.length !== 0 &&
            lifeStyle.mbti !== '' && (
              <Pressable
                onPress={handleNext}
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

            {(showPersonalities || lifeStyle.personalities.length !== 0) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.personalities.length !== 0 ? 1 : personalitiesAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.personalities.length !== 0
                          ? 0
                          : personalitiesAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomSelectComponent
                  title="성격을 선택해주세요 (중복선택 가능)"
                  value={lifeStyle.personalities}
                  items={personalitiesItems}
                  handleValue={(e) => {
                    setLifeStyle({ personalities: e });
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
                    setShowPersonalities(true);
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

            {(showNoiseSensitivity || lifeStyle.noiseSensitivity !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.noiseSensitivity !== '' ? 1 : noiseSensitivityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.noiseSensitivity !== ''
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
                    setLifeStyle({ noiseSensitivity: String(e) });
                    setShowCleaningFrequency(true);
                  }}
                />
              </Animated.View>
            )}

            {(showCleannessSensitivity || lifeStyle.cleannessSensitivity !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.cleannessSensitivity !== ''
                      ? 1
                      : cleannessSensitivityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.cleannessSensitivity !== ''
                          ? 0
                          : cleannessSensitivityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="청결 예민도를 선택해주세요"
                  value={lifeStyle.cleannessSensitivity}
                  items={cleannessSensitivityItems}
                  handleValue={(e) => {
                    setLifeStyle({ cleannessSensitivity: String(e) });
                    setShowNoiseSensitivity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showEatingStatus || lifeStyle.eatingStatus !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.eatingStatus !== '' ? 1 : eatingStatusAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.eatingStatus !== '' ? 0 : eatingStatusAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 섭취여부를 선택해주세요"
                  value={lifeStyle.eatingStatus}
                  items={eatingStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ eatingStatus: String(e) });
                    setShowCleannessSensitivity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showStudyingStatus || lifeStyle.studyingStatus !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.studyingStatus !== '' ? 1 : studyingStatusAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.studyingStatus !== '' ? 0 : studyingStatusAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 공부 여부를 선택해주세요"
                  value={lifeStyle.studyingStatus}
                  items={studyingStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ studyingStatus: String(e) });
                    setShowEatingStatus(true);
                  }}
                />
              </Animated.View>
            )}

            {(showCallingStatus || lifeStyle.callingStatus !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.callingStatus !== '' ? 1 : callingStatusAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.callingStatus !== '' ? 0 : callingStatusAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 전화 여부를 선택해주세요"
                  value={lifeStyle.callingStatus}
                  items={callingStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ callingStatus: String(e) });
                    setShowStudyingStatus(true);
                  }}
                />
              </Animated.View>
            )}

            {(showGamingStatus || lifeStyle.gamingStatus !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.gamingStatus !== '' ? 1 : gamingStatusAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.gamingStatus !== '' ? 0 : gamingStatusAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="방 안에서의 게임 여부를 선택해주세요"
                  value={lifeStyle.gamingStatus}
                  items={gamingStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ gamingStatus: String(e) });
                    setShowCallingStatus(true);
                  }}
                />
              </Animated.View>
            )}

            {(showSharingStatus || lifeStyle.sharingStatus !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.sharingStatus !== '' ? 1 : sharingStatusAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.sharingStatus !== '' ? 0 : sharingStatusAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
                  value={lifeStyle.sharingStatus}
                  items={sharingStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ sharingStatus: String(e) });
                    setShowGamingStatus(true);
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
                    setShowSharingStatus(true);
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

            {(showHeatingIntensity || lifeStyle.heatingIntensity !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.heatingIntensity !== '' ? 1 : heatingIntensityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.heatingIntensity !== ''
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
                    setLifeStyle({ heatingIntensity: String(e) });
                    setShowLifePattern(true);
                  }}
                />
              </Animated.View>
            )}

            {(showCoolingIntensity || lifeStyle.coolingIntensity !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.coolingIntensity !== '' ? 1 : coolingIntensityAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.coolingIntensity !== ''
                          ? 0
                          : coolingIntensityAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="에어컨 강도를 선택해주세요"
                  value={lifeStyle.coolingIntensity}
                  items={coolingIntensityItems}
                  handleValue={(e) => {
                    setLifeStyle({ coolingIntensity: String(e) });
                    setShowHeatingIntensity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showSleepingHabits || lifeStyle.sleepingHabits.length !== 0) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.sleepingHabits.length !== 0 ? 1 : sleepingHabitsAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.sleepingHabits.length !== 0
                          ? 0
                          : sleepingHabitsAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomSelectComponent
                  title="잠버릇을 선택해주세요 (중복선택 가능)"
                  value={lifeStyle.sleepingHabits}
                  items={sleepingHabitsItems}
                  handleValue={(e) => {
                    setLifeStyle({ sleepingHabits: e });
                    setShowCoolingIntensity(true);
                  }}
                />
              </Animated.View>
            )}

            {(showSmokingStatus || lifeStyle.smokingStatus !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.smokingStatus !== '' ? 1 : smokingStatusAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.smokingStatus !== '' ? 0 : smokingStatusAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="흡연여부를 선택해주세요"
                  value={lifeStyle.smokingStatus}
                  items={smokingStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ smokingStatus: String(e) });
                    setShowSleepingHabits(true);
                  }}
                />
              </Animated.View>
            )}

            {showTurnOffTime || lifeStyle.turnOffTime !== undefined ? (
              <Animated.View
                style={{
                  opacity: lifeStyle.turnOffTime !== undefined ? 1 : turnOffTimeAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.turnOffTime !== undefined ? 0 : turnOffTimeAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomTimeSelectComponent
                  title="소등시간을 선택해주세요"
                  value={lifeStyle.turnOffTime}
                  onChange={(e) => {
                    setLifeStyle({ turnOffTime: Number(e) });
                    setShowSmokingStatus(true);
                  }}
                />
              </Animated.View>
            ) : null}

            {showSleepingTime || lifeStyle.sleepingTime !== undefined ? (
              <Animated.View
                style={{
                  opacity: lifeStyle.sleepingTime !== undefined ? 1 : sleepingTimeAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.sleepingTime !== undefined ? 0 : sleepingTimeAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomTimeSelectComponent
                  title="취침시간을 선택해주세요"
                  value={lifeStyle.sleepingTime}
                  onChange={(e) => {
                    setLifeStyle({ sleepingTime: Number(e) });
                    setShowTurnOffTime(true);
                  }}
                />
              </Animated.View>
            ) : null}

            <CustomTimeSelectComponent
              title="기상시간을 선택해주세요"
              value={lifeStyle.wakeUpTime}
              onChange={(e) => {
                setLifeStyle({ wakeUpTime: Number(e) });
                setShowSleepingTime(true);
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
