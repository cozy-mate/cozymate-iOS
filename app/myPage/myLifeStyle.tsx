import { useState } from 'react';
import {
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
import CustomTextInputComponent from '@/components/lifeStyle/customTextInput';
import CustomTimeSelectComponent from '@/components/lifeStyle/customTimeSelect';
import {
  acceptanceItems,
  numOfRoommateItems,
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
import { useGetMyDetail } from '@/hooks/member-stat/member-stat';
import { useGetMyUniversityInfo } from '@/hooks/university/university';

export default function MyLifeStyle() {
  const { data } = useGetMyDetail();

  const { data: dormitories } = useGetMyUniversityInfo();

  const dormitoryItems = dormitories.result.dormitoryNames.map((item, index) => ({
    index,
    title: item,
    value: item,
  }));

  const [lifeStyle, setLifeStyle] = useState(data.result.memberStatDetail);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
            }}
            className="bg-subColor1 rounded-md px-[20px] py-[10px]"
          >
            <Text className="text-14 font-600 leading-14 text-mainColor">수정</Text>
          </Pressable>
        </BackHeaderComponent>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <View className="px-[20px] mt-[40px] gap-y-[64px] flex-1">
            <CustomTextInputComponent
              title="학번을 입력해주세요"
              value={lifeStyle.admissionYear}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, admissionYear: String(e) }));
              }}
              placeholder="ex. 23"
            />

            <CustomRadioComponent
              title="신청한 기숙사를 선택해주세요"
              value={lifeStyle.dormitoryName}
              items={dormitoryItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, dormitoryName: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="신청실의 인원을 선택해주세요"
              value={lifeStyle.numOfRoommate}
              items={numOfRoommateItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, numOfRoommate: Number(e) }));
              }}
            />

            <CustomRadioComponent
              title="기숙사 합격여부를 선택해주세요"
              value={lifeStyle.acceptance}
              items={acceptanceItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, acceptance: String(e) }));
              }}
            />

            <CustomTimeSelectComponent
              title="기상시간을 선택해주세요"
              timeValue={lifeStyle.wakeUpTime}
              meridianValue={lifeStyle.wakeUpMeridian}
              items={timeItems}
              handleTime={(e) => {
                setLifeStyle((prev) => ({ ...prev, wakeUpTime: Number(e) }));
              }}
              handleMeridian={(e) => {
                setLifeStyle((prev) => ({ ...prev, wakeUpMeridian: String(e) }));
              }}
            />

            <CustomTimeSelectComponent
              title="취침시간을 선택해주세요"
              timeValue={lifeStyle.sleepingTime}
              meridianValue={lifeStyle.sleepingMeridian}
              items={timeItems}
              handleTime={(e) => {
                setLifeStyle((prev) => ({ ...prev, sleepingTime: Number(e) }));
              }}
              handleMeridian={(e) => {
                setLifeStyle((prev) => ({ ...prev, sleepingMeridian: String(e) }));
              }}
            />

            <CustomTimeSelectComponent
              title="소등시간을 선택해주세요"
              timeValue={lifeStyle.turnOffTime}
              meridianValue={lifeStyle.turnOffMeridian}
              items={timeItems}
              handleTime={(e) => {
                setLifeStyle((prev) => ({ ...prev, turnOffTime: Number(e) }));
              }}
              handleMeridian={(e) => {
                setLifeStyle((prev) => ({ ...prev, turnOffMeridian: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="흡연여부를 선택해주세요"
              value={lifeStyle.smoking}
              items={smokingItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, smoking: String(e) }));
              }}
            />

            <CustomSelectComponent
              title="잠버릇을 선택해주세요 (중복선택 가능)"
              value={lifeStyle.sleepingHabit}
              items={sleepingHabitItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, sleepingHabit: e }));
              }}
            />

            <CustomRadioComponent
              title="에어컨 강도를 선택해주세요"
              value={lifeStyle.airConditioningIntensity}
              items={airConditioningIntensityItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, airConditioningIntensity: Number(e) }));
              }}
            />

            <CustomRadioComponent
              title="히터 강도를 선택해주세요"
              value={lifeStyle.heatingIntensity}
              items={heatingIntensityItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, heatingIntensity: Number(e) }));
              }}
            />

            <CustomRadioComponent
              title="생활 패턴을 선택해주세요"
              value={lifeStyle.lifePattern}
              items={lifePatternItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, lifePattern: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="룸메이트와의 원하는 친밀도를 선택해주세요"
              value={lifeStyle.intimacy}
              items={intimacyItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, intimacy: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="룸메이트끼리의 물건 공유 여부를 선택해주세요"
              value={lifeStyle.canShare}
              items={canShareItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, canShare: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="방 안에서의 게임 여부를 선택해주세요"
              value={lifeStyle.isPlayGame}
              items={isPlayGameItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, isPlayGame: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="방 안에서의 전화 여부를 선택해주세요"
              value={lifeStyle.isPhoneCall}
              items={isPhoneCallItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, isPhoneCall: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="방 안에서의 공부 여부를 선택해주세요"
              value={lifeStyle.studying}
              items={studyingItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, studying: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="방 안에서의 섭취여부를 선택해주세요"
              value={lifeStyle.intake}
              items={intakeItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, intake: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="청결 예민도를 선택해주세요"
              value={lifeStyle.cleanSensitivity}
              items={cleanSensitivityItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, cleanSensitivity: Number(e) }));
              }}
            />

            <CustomRadioComponent
              title="소음 예민도를 선택해주세요"
              value={lifeStyle.noiseSensitivity}
              items={noiseSensitivityItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, noiseSensitivity: Number(e) }));
              }}
            />

            <CustomRadioComponent
              title="청소 빈도를 선택해주세요"
              value={lifeStyle.cleaningFrequency}
              items={cleaningFrequencyItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, cleaningFrequency: String(e) }));
              }}
            />

            <CustomRadioComponent
              title="음주 빈도를 선택해주세요"
              value={lifeStyle.drinkingFrequency}
              items={drinkingFrequencyItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, drinkingFrequency: String(e) }));
              }}
            />

            <CustomSelectComponent
              title="성격을 선택해주세요 (중복선택 가능)"
              value={lifeStyle.personality}
              items={personalityItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, personality: e }));
              }}
            />

            <CustomGridRadioComponent
              title="MBTI를 선택해주세요"
              value={lifeStyle.mbti}
              items={mbtiItems}
              handleValue={(e) => {
                setLifeStyle((prev) => ({ ...prev, mbti: String(e) }));
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
