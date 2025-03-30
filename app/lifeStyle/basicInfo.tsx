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
import CustomRadioComponent from '@/components/lifeStyle/customRadio';
import CustomTextInputComponent from '@/components/lifeStyle/customTextInput';
import { acceptanceItems, numOfRoommateItems } from '@/constants/items/lifeStyleItem';
import { useGetMyUniversityInfo } from '@/hooks/university/university';
import { useInputAnimation } from '@/hooks/useInputAnimation';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleBasicInfo() {
  const router = useRouter();

  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();

  const { data } = useGetMyUniversityInfo();

  const dormitoryItems = data.result.dormitoryNames.map((item, index) => ({
    index,
    title: item,
    value: item,
  }));

  const [showDormitoryName, setShowDormitoryName] = useState<boolean>(false);
  const [showRoommateInput, setShowRoommateInput] = useState<boolean>(false);
  const [showAcceptance, setShowAcceptance] = useState<boolean>(false);

  const dormitoryNameAnimation = useInputAnimation(showDormitoryName, 400);
  const roommateInputAnimation = useInputAnimation(showRoommateInput, 400);
  const acceptanceInputAnimation = useInputAnimation(showAcceptance, 400);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent title="기본정보">
          {lifeStyle.admissionYear !== '' &&
            lifeStyle.dormitoryName !== '' &&
            lifeStyle.numOfRoommate !== undefined &&
            lifeStyle.acceptance !== '' && (
              <Pressable
                onPress={(event) => {
                  router.push('/lifeStyle/essentialInfo');
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
          <View className="px-[20px] mt-8 gap-y-14 flex-1">
            {(showAcceptance || lifeStyle.acceptance !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.acceptance !== '' ? 1 : acceptanceInputAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.acceptance !== '' ? 0 : acceptanceInputAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="기숙사 합격여부를 선택해주세요"
                  value={lifeStyle.acceptance}
                  items={acceptanceItems}
                  handleValue={(e) => {
                    setLifeStyle({ acceptance: String(e) });
                  }}
                />
              </Animated.View>
            )}

            {(showRoommateInput || lifeStyle.numOfRoommate !== undefined) && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.numOfRoommate !== undefined ? 1 : roommateInputAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.numOfRoommate !== undefined
                          ? 0
                          : roommateInputAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="신청실의 인원을 선택해주세요"
                  value={lifeStyle.numOfRoommate}
                  items={numOfRoommateItems}
                  handleValue={(e) => {
                    setLifeStyle({ numOfRoommate: Number(e) });
                    setShowAcceptance(true);
                  }}
                />
              </Animated.View>
            )}

            {(showDormitoryName || lifeStyle.dormitoryName !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.dormitoryName !== '' ? 1 : dormitoryNameAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.dormitoryName !== '' ? 0 : dormitoryNameAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="신청한 기숙사를 선택해주세요"
                  value={lifeStyle.dormitoryName}
                  items={dormitoryItems}
                  handleValue={(e) => {
                    setLifeStyle({ dormitoryName: String(e) });
                    setShowRoommateInput(true);
                  }}
                />
              </Animated.View>
            )}

            <CustomTextInputComponent
              title="학번을 입력해주세요"
              value={lifeStyle.admissionYear}
              handleValue={(e) => {
                setLifeStyle({ admissionYear: String(e) });
                setShowDormitoryName(true);
              }}
              placeholder="ex. 23"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
