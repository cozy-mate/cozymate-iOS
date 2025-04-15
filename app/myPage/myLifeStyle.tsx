import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
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
  numOfRoommateItems,
  cleaningFrequencyItems,
  drinkingFrequencyItems,
  heatingIntensityItems,
  intimacyItems,
  lifePatternItems,
  mbtiItems,
  noiseSensitivityItems,
  dormJoiningStatusItems,
  smokingStatusItems,
  sleepingHabitsItems,
  coolingIntensityItems,
  sharingStatusItems,
  gamingStatusItems,
  callingStatusItems,
  studyingStatusItems,
  eatingStatusItems,
  cleannessSensitivityItems,
  personalitiesItems,
} from '@/constants/items/lifeStyleItem';
import { useSuspenseGetMyDetail, useUpdateMemberDetail } from '@/hooks/member-stat/member-stat';
import { useGetMyUniversityInfo } from '@/hooks/university/university';

export default function MyLifeStyle() {
  const { data } = useSuspenseGetMyDetail();

  const { data: dormitories } = useGetMyUniversityInfo();

  const dormitoryItems = dormitories.result.dormitoryNames.map((item, index) => ({
    index,
    title: item,
    value: item,
  }));

  const [lifeStyle, setLifeStyle] = useState(data.result.memberStatDetail);

  const { mutateAsync: updateLifeStyle } = useUpdateMemberDetail();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              updateLifeStyle(lifeStyle);
            }}
            className="bg-subColor1 rounded-md px-[20px] py-[10px]"
          >
            <Text className="text-14 font-600 leading-14 text-mainColor">수정</Text>
          </Pressable>
        </BackHeaderComponent>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {data?.result.memberStatDetail !== undefined && lifeStyle !== undefined && (
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
                value={lifeStyle.dormName}
                items={dormitoryItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, dormName: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="신청실의 인원을 선택해주세요"
                value={lifeStyle.numOfRoommate}
                items={numOfRoommateItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, numOfRoommate: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="기숙사 합격여부를 선택해주세요"
                value={lifeStyle.dormJoiningStatus}
                items={dormJoiningStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, dormJoiningStatus: String(e) }));
                }}
              />

              <CustomTimeSelectComponent
                title="기상시간을 선택해주세요"
                value={lifeStyle.wakeUpTime}
                onChange={(e: number) => {
                  setLifeStyle((prev) => ({ ...prev, wakeUpTime: Number(e) }));
                }}
              />

              <CustomTimeSelectComponent
                title="취침시간을 선택해주세요"
                value={lifeStyle.sleepingTime}
                onChange={(e: number) => {
                  setLifeStyle((prev) => ({ ...prev, sleepingTime: Number(e) }));
                }}
              />

              <CustomTimeSelectComponent
                title="소등시간을 선택해주세요"
                value={lifeStyle.turnOffTime}
                onChange={(e: number) => {
                  setLifeStyle((prev) => ({ ...prev, turnOffTime: Number(e) }));
                }}
              />

              <CustomRadioComponent
                title="흡연여부를 선택해주세요"
                value={lifeStyle.smokingStatus}
                items={smokingStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, smokingStatus: String(e) }));
                }}
              />

              <CustomSelectComponent
                title="잠버릇을 선택해주세요 (중복선택 가능)"
                value={lifeStyle.sleepingHabits}
                items={sleepingHabitsItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, sleepingHabits: e }));
                }}
              />

              <CustomRadioComponent
                title="에어컨 강도를 선택해주세요"
                value={lifeStyle.coolingIntensity}
                items={coolingIntensityItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, coolingIntensity: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="히터 강도를 선택해주세요"
                value={lifeStyle.heatingIntensity}
                items={heatingIntensityItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, heatingIntensity: String(e) }));
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
                value={lifeStyle.sharingStatus}
                items={sharingStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, sharingStatus: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="방 안에서의 게임 여부를 선택해주세요"
                value={lifeStyle.gamingStatus}
                items={gamingStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, gamingStatus: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="방 안에서의 전화 여부를 선택해주세요"
                value={lifeStyle.callingStatus}
                items={callingStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, callingStatus: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="방 안에서의 공부 여부를 선택해주세요"
                value={lifeStyle.studyingStatus}
                items={studyingStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, studyingStatus: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="방 안에서의 섭취여부를 선택해주세요"
                value={lifeStyle.eatingStatus}
                items={eatingStatusItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, eatingStatus: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="청결 예민도를 선택해주세요"
                value={lifeStyle.cleannessSensitivity}
                items={cleannessSensitivityItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, cleannessSensitivity: String(e) }));
                }}
              />

              <CustomRadioComponent
                title="소음 예민도를 선택해주세요"
                value={lifeStyle.noiseSensitivity}
                items={noiseSensitivityItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, noiseSensitivity: String(e) }));
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
                value={lifeStyle.personalities}
                items={personalitiesItems}
                handleValue={(e) => {
                  setLifeStyle((prev) => ({ ...prev, personalities: e }));
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

              <View className="gap-y-[12px]">
                <Text className="text-16 font-600 leading-16 text-emphasizedFont mx-[4px]">
                  하고싶은 말을 적어주세요 (선택)
                </Text>
                <TextInput
                  value={lifeStyle.selfIntroduction}
                  onChangeText={(e: string) =>
                    setLifeStyle((prev) => ({ ...prev, selfIntroduction: e }))
                  }
                  className="bg-colorBox h-[270px] rounded-xl p-[16px] text-14 font-500 leading-14 text-basicFont"
                  placeholder="내용을 입력해주세요"
                  placeholderTextColor={'#ACADB4'}
                  multiline
                />
              </View>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
