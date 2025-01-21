import React, { useRef } from 'react';
import { Text, TextInput } from 'react-native';
import { View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import { dormitoryItems, acceptanceItems, numOfRoommateItems } from '../onBoardLifeStyle/basicData';
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
} from '../onBoardLifeStyle/essentialData';

import LoadingComponent from '@components/commonComponents/loading';
import TextInputComponent from '@components/onBoardLifeStyle/textInput';
import TimeRadioComponent from '@components/onBoardLifeStyle/timeRadio';
import LifeStyleHeaderComponent from '@components/onBoardLifeStyle/header';
import StringRadioComponent from '@components/onBoardLifeStyle/stringRadio';
import NumberRadioComponent from '@components/onBoardLifeStyle/numberRadio';
import StringCheckComponent from '@components/onBoardLifeStyle/stringCheck';

import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useUpdateMemberStat } from '@hooks/api/member-stat';

import { LifeStyleEditScreenProps } from '@type/param/stack';

import TopButton from '@assets/lifeStyle/topButton.svg';

const LifeStyleEditScreen = ({ navigation }: LifeStyleEditScreenProps) => {
  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const toBack = () => {
    navigation.goBack();
  };

  const { mutateAsync: updateInfo, isPending } = useUpdateMemberStat();

  const handleUpdate = async () => {
    try {
      await updateInfo({
        admissionYear: lifeStyle.admissionYear,
        dormitoryName: lifeStyle.dormitoryName,
        numOfRoommate: lifeStyle.numOfRoommate,
        acceptance: lifeStyle.acceptance,
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
        selfIntroduction: lifeStyle.selfIntroduction,
      });

      navigation.goBack();
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isPending && <LoadingComponent />}
      <LifeStyleHeaderComponent
        title=""
        toBack={toBack}
        isComplete={true}
        buttonText="수정"
        buttonFunc={handleUpdate}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingHorizontal: 20, rowGap: 56, paddingBottom: 34 }}
      >
        <TextInputComponent title="학번을 입력해주세요" isNumber={true} value="admissionYear" />

        <StringRadioComponent
          title="신청한 기숙사를 선택해주세요"
          items={dormitoryItems}
          value="dormitoryName"
        />

        <NumberRadioComponent
          title="신청실의 인원을 선택해주세요"
          items={numOfRoommateItems}
          value="numOfRoommate"
        />

        <StringRadioComponent
          title="기숙사 합격여부를 선택해주세요"
          items={acceptanceItems}
          value="acceptance"
        />

        <TimeRadioComponent
          title="기상시간을 선택해주세요"
          items={timeItems}
          value="wakeUpTime"
          meridian="wakeUpMeridian"
        />

        <TimeRadioComponent
          title="취침시간을 선택해주세요"
          items={timeItems}
          value="sleepingTime"
          meridian="sleepingMeridian"
        />

        <TimeRadioComponent
          title="소등시간을 선택해주세요"
          items={timeItems}
          value="turnOffTime"
          meridian="turnOffMeridian"
        />

        <StringRadioComponent
          title="흡연여부를 선택해주세요"
          items={smokingItems}
          value="smoking"
        />

        <StringCheckComponent
          title="잠버릇을 선택해주세요 (중복선택 가능)"
          items={sleepingHabitItems}
          value="sleepingHabit"
        />

        <NumberRadioComponent
          title="에어컨 강도를 선택해주세요"
          items={airConditioningIntensityItems}
          value="airConditioningIntensity"
        />

        <NumberRadioComponent
          title="히터 강도를 선택해주세요"
          items={heatingIntensityItems}
          value="heatingIntensity"
        />

        <StringRadioComponent
          title="생활 패턴을 선택해주세요"
          items={lifePatternItems}
          value="lifePattern"
        />

        <StringRadioComponent
          title="룸메이트와 원하는 친밀도를 선택해주세요"
          items={intimacyItems}
          value="intimacy"
        />

        <StringRadioComponent
          title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
          items={canShareItems}
          value="canShare"
        />

        <StringRadioComponent
          title="방 안에서의 게임 여부를 선택해주세요"
          items={isPlayGameItems}
          value="isPlayGame"
        />

        <StringRadioComponent
          title="방 안에서의 전화 여부를 선택해주세요"
          items={isPhoneCallItems}
          value="isPhoneCall"
        />

        <StringRadioComponent
          title="방 안에서의 공부 여부를 선택해주세요"
          items={studyingItems}
          value="studying"
        />

        <StringRadioComponent
          title="방 안에서의 섭취여부를 선택해주세요"
          items={intakeItems}
          value="intake"
        />

        <NumberRadioComponent
          title="청결 예민도를 선택해주세요"
          items={cleanSensitivityItems}
          value="cleanSensitivity"
        />

        <NumberRadioComponent
          title="소음 예민도를 선택해주세요"
          items={noiseSensitivityItems}
          value="noiseSensitivity"
        />

        <StringRadioComponent
          title="청소 빈도를 선택해주세요"
          items={cleaningFrequencyItems}
          value="cleaningFrequency"
        />

        <StringRadioComponent
          title="음주 빈도를 선택해주세요"
          items={drinkingFrequencyItems}
          value="drinkingFrequency"
        />

        <StringCheckComponent
          title="성격을 선택해주세요 (중복선택 가능)"
          items={personalityItems}
          value="personality"
        />

        <StringRadioComponent title="MBTI를 선택해주세요" items={mbtiItems} value="mbti" />

        <View className="space-y-3">
          <Text className="text-base font-semibold text-emphasizedFont">
            하고싶은 말을 적어주세요 (선택)
          </Text>
          <TextInput
            value={lifeStyle.selfIntroduction}
            onChangeText={(text: string) => setNewLifeStyle({ selfIntroduction: text })}
            placeholder="내용을 입력해주세요"
            multiline
            className="h-[270px] rounded-xl bg-colorBox p-4 pb-20"
          />
        </View>
      </ScrollView>

      <View className="fixed bottom-28 right-5 flex w-fit items-end">
        <Pressable onPress={scrollToTop}>
          <TopButton />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LifeStyleEditScreen;
