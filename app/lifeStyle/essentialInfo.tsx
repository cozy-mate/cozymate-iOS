import { useRouter } from 'expo-router';
import {
  GestureResponderEvent,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CustomTimeSelect from '@/components/common/customInput/customTimeSelect';
import AnimatedFieldComponent from '@/components/lifeStyle/animatedField';
import ProgressBarComponent from '@/components/lifeStyle/progressBar';
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
import {
  useRegisterLifeStyleStore,
  useShowLifeStyleInputStore,
} from '@/zustand/member-stat/member-stat';

export default function LifeStyleEssentialInfo() {
  const router = useRouter();

  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();
  const { showLifeStyleInput, setShowLifeStyleInput } = useShowLifeStyleInputStore();

  const stepChecks = [
    lifeStyle.wakeUpTime !== undefined,
    lifeStyle.sleepingTime !== undefined,
    lifeStyle.turnOffTime !== undefined,
    lifeStyle.smokingStatus !== '',
    lifeStyle.sleepingHabits !== undefined && lifeStyle.sleepingHabits.length !== 0,
    lifeStyle.coolingIntensity !== '',
    lifeStyle.heatingIntensity !== '',
    lifeStyle.intimacy !== '',
    lifeStyle.lifePattern !== '',
    lifeStyle.sharingStatus !== '',
    lifeStyle.gamingStatus !== '',
    lifeStyle.callingStatus !== '',
    lifeStyle.studyingStatus !== '',
    lifeStyle.eatingStatus !== '',
    lifeStyle.cleannessSensitivity !== '',
    lifeStyle.noiseSensitivity !== '',
    lifeStyle.cleaningFrequency !== '',
    lifeStyle.drinkingFrequency !== '',
    lifeStyle.personalities !== undefined && lifeStyle.personalities.length !== 0,
    lifeStyle.mbti !== '',
  ];

  const nowStep = stepChecks.filter(Boolean).length;

  const { trackButton } = useTracker();

  const handleNext = (event: GestureResponderEvent) => {
    event.stopPropagation();
    trackButton(ButtonEvent.next_essential, EventCategory.life_style);
    router.push('/lifeStyle/additionalInfo');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] mb-[16px]">
        <BackHeaderComponent title="필수정보">
          {lifeStyle.wakeUpTime !== undefined &&
            lifeStyle.sleepingTime !== undefined &&
            lifeStyle.turnOffTime !== undefined &&
            lifeStyle.smokingStatus !== '' &&
            lifeStyle.sleepingHabits !== undefined &&
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
            lifeStyle.personalities !== undefined &&
            lifeStyle.personalities.length !== 0 &&
            lifeStyle.mbti !== '' && (
              <TouchableOpacity
                onPress={handleNext}
                className="bg-subColor1 rounded-md px-[20px] py-[10px]"
              >
                <Text className="Semibold14 text-mainColor">다음</Text>
              </TouchableOpacity>
            )}
        </BackHeaderComponent>
      </View>

      <ProgressBarComponent totalStep={20} nowStep={nowStep} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            rowGap: 64,
            marginTop: 40,
            paddingBottom: 60,
          }}
        >
          <AnimatedFieldComponent
            show={showLifeStyleInput.showMbti}
            valueCheck={lifeStyle.mbti !== ''}
            animation={useInputAnimation(showLifeStyleInput.showMbti, 400)}
            type="GRID"
            title="MBTI를 선택해주세요"
            value={lifeStyle.mbti}
            items={mbtiItems}
            handleValue={(e: string) => {
              setLifeStyle({ mbti: String(e) });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showPersonalities}
            valueCheck={lifeStyle.personalities !== undefined}
            animation={useInputAnimation(showLifeStyleInput.showPersonalities, 400)}
            type="SELECT"
            title="성격을 선택해주세요 (중복선택 가능)"
            value={lifeStyle.personalities}
            items={personalitiesItems}
            handleValue={(e: any) => {
              setLifeStyle({ personalities: e });
              setShowLifeStyleInput({ showMbti: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showDrinkingFrequency}
            valueCheck={lifeStyle.drinkingFrequency !== ''}
            animation={useInputAnimation(showLifeStyleInput.showDrinkingFrequency, 400)}
            type="RADIO"
            title="음주 빈도를 선택해주세요"
            value={lifeStyle.drinkingFrequency}
            items={drinkingFrequencyItems}
            handleValue={(e: string) => {
              setLifeStyle({ drinkingFrequency: e });
              setShowLifeStyleInput({ showPersonalities: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showCleaningFrequency}
            valueCheck={lifeStyle.cleaningFrequency !== ''}
            animation={useInputAnimation(showLifeStyleInput.showCleaningFrequency, 400)}
            type="RADIO"
            title="청소 빈도를 선택해주세요"
            value={lifeStyle.cleaningFrequency}
            items={cleaningFrequencyItems}
            handleValue={(e: string) => {
              setLifeStyle({ cleaningFrequency: e });
              setShowLifeStyleInput({ showDrinkingFrequency: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showNoiseSensitivity}
            valueCheck={lifeStyle.noiseSensitivity !== ''}
            animation={useInputAnimation(showLifeStyleInput.showNoiseSensitivity, 400)}
            type="RADIO"
            title="소음 예민도를 선택해주세요"
            value={lifeStyle.noiseSensitivity}
            items={noiseSensitivityItems}
            handleValue={(e: string) => {
              setLifeStyle({ noiseSensitivity: e });
              setShowLifeStyleInput({ showCleaningFrequency: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showCleannessSensitivity}
            valueCheck={lifeStyle.noiseSensitivity !== ''}
            animation={useInputAnimation(showLifeStyleInput.showCleannessSensitivity, 400)}
            type="RADIO"
            title="청결 예민도를 선택해주세요"
            value={lifeStyle.cleannessSensitivity}
            items={cleannessSensitivityItems}
            handleValue={(e: string) => {
              setLifeStyle({ cleannessSensitivity: e });
              setShowLifeStyleInput({ showNoiseSensitivity: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showEatingStatus}
            valueCheck={lifeStyle.eatingStatus !== ''}
            animation={useInputAnimation(showLifeStyleInput.showEatingStatus, 400)}
            type="RADIO"
            title="방 안에서의 섭취여부를 선택해주세요"
            value={lifeStyle.eatingStatus}
            items={eatingStatusItems}
            handleValue={(e: string) => {
              setLifeStyle({ eatingStatus: e });
              setShowLifeStyleInput({ showCleannessSensitivity: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showStudyingStatus}
            valueCheck={lifeStyle.studyingStatus !== ''}
            animation={useInputAnimation(showLifeStyleInput.showStudyingStatus, 400)}
            type="RADIO"
            title="방 안에서의 공부 여부를 선택해주세요"
            value={lifeStyle.studyingStatus}
            items={studyingStatusItems}
            handleValue={(e: string) => {
              setLifeStyle({ studyingStatus: e });
              setShowLifeStyleInput({ showEatingStatus: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showCallingStatus}
            valueCheck={lifeStyle.callingStatus !== ''}
            animation={useInputAnimation(showLifeStyleInput.showCallingStatus, 400)}
            type="RADIO"
            title="방 안에서의 전화 여부를 선택해주세요"
            value={lifeStyle.callingStatus}
            items={callingStatusItems}
            handleValue={(e: string) => {
              setLifeStyle({ callingStatus: e });
              setShowLifeStyleInput({ showStudyingStatus: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showGamingStatus}
            valueCheck={lifeStyle.gamingStatus !== ''}
            animation={useInputAnimation(showLifeStyleInput.showGamingStatus, 400)}
            type="RADIO"
            title="방 안에서의 게임 여부를 선택해주세요"
            value={lifeStyle.gamingStatus}
            items={gamingStatusItems}
            handleValue={(e: string) => {
              setLifeStyle({ gamingStatus: e });
              setShowLifeStyleInput({ showCallingStatus: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showSharingStatus}
            valueCheck={lifeStyle.sharingStatus !== ''}
            animation={useInputAnimation(showLifeStyleInput.showSharingStatus, 400)}
            type="RADIO"
            title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
            value={lifeStyle.sharingStatus}
            items={sharingStatusItems}
            handleValue={(e: string) => {
              setLifeStyle({ sharingStatus: e });
              setShowLifeStyleInput({ showGamingStatus: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showIntimacy}
            valueCheck={lifeStyle.intimacy !== ''}
            animation={useInputAnimation(showLifeStyleInput.showIntimacy, 400)}
            type="RADIO"
            title="룸메이트와의 원하는 친밀도를 선택해주세요"
            value={lifeStyle.intimacy}
            items={intimacyItems}
            handleValue={(e: string) => {
              setLifeStyle({ intimacy: e });
              setShowLifeStyleInput({ showSharingStatus: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showLifePattern}
            valueCheck={lifeStyle.lifePattern !== ''}
            animation={useInputAnimation(showLifeStyleInput.showLifePattern, 400)}
            type="RADIO"
            title="생활 패턴을 선택해주세요"
            value={lifeStyle.lifePattern}
            items={lifePatternItems}
            handleValue={(e: string) => {
              setLifeStyle({ lifePattern: e });
              setShowLifeStyleInput({ showIntimacy: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showHeatingIntensity}
            valueCheck={lifeStyle.heatingIntensity !== ''}
            animation={useInputAnimation(showLifeStyleInput.showHeatingIntensity, 400)}
            type="RADIO"
            title="히터 강도를 선택해주세요"
            value={lifeStyle.heatingIntensity}
            items={heatingIntensityItems}
            handleValue={(e: string) => {
              setLifeStyle({ heatingIntensity: e });
              setShowLifeStyleInput({ showLifePattern: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showCoolingIntensity}
            valueCheck={lifeStyle.coolingIntensity !== ''}
            animation={useInputAnimation(showLifeStyleInput.showCoolingIntensity, 400)}
            type="RADIO"
            title="에어컨 강도를 선택해주세요"
            value={lifeStyle.coolingIntensity}
            items={coolingIntensityItems}
            handleValue={(e: string) => {
              setLifeStyle({ coolingIntensity: e });
              setShowLifeStyleInput({ showHeatingIntensity: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showSleepingHabits}
            valueCheck={lifeStyle.sleepingHabits !== undefined}
            animation={useInputAnimation(showLifeStyleInput.showSleepingHabits, 400)}
            type="SELECT"
            title="잠버릇을 선택해주세요 (중복선택 가능)"
            value={lifeStyle.sleepingHabits}
            items={sleepingHabitsItems}
            handleValue={(e: any) => {
              setLifeStyle({ sleepingHabits: e });
              setShowLifeStyleInput({ showCoolingIntensity: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showSmokingStatus}
            valueCheck={lifeStyle.smokingStatus !== ''}
            animation={useInputAnimation(showLifeStyleInput.showSmokingStatus, 400)}
            type="RADIO"
            title="흡연여부를 선택해주세요"
            value={lifeStyle.smokingStatus}
            items={smokingStatusItems}
            handleValue={(e: string) => {
              setLifeStyle({ smokingStatus: e });
              setShowLifeStyleInput({ showSleepingHabits: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showTurnOffTime}
            valueCheck={lifeStyle.turnOffTime !== undefined}
            animation={useInputAnimation(showLifeStyleInput.showTurnOffTime, 400)}
            type="TIME"
            title="소등시간을 선택해주세요"
            value={lifeStyle.turnOffTime}
            handleValue={(e: any) => {
              setLifeStyle({ turnOffTime: e });
              setShowLifeStyleInput({ showSmokingStatus: true });
            }}
          />

          <AnimatedFieldComponent
            show={showLifeStyleInput.showSleepingTime}
            valueCheck={lifeStyle.sleepingTime !== undefined}
            animation={useInputAnimation(showLifeStyleInput.showSleepingTime, 400)}
            type="TIME"
            title="취침시간을 선택해주세요"
            value={lifeStyle.sleepingTime}
            handleValue={(e: any) => {
              setLifeStyle({ sleepingTime: e });
              setShowLifeStyleInput({ showTurnOffTime: true });
            }}
          />

          <CustomTimeSelect
            title="기상시간을 선택해주세요"
            value={lifeStyle.wakeUpTime}
            onChange={(e) => {
              setLifeStyle({ wakeUpTime: Number(e) });
              setShowLifeStyleInput({ showSleepingTime: true });
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
