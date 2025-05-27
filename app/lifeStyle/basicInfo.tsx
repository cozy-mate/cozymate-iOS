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
import CustomRadioComponent from '@/components/lifeStyle/customRadio';
import CustomTextInputComponent from '@/components/lifeStyle/customTextInput';
import { dormJoiningStatusItems, numOfRoommateItems } from '@/constants/items/lifeStyleItem';
import { useGetMyUniversityInfo } from '@/hooks/university/university';
import { useInputAnimation } from '@/hooks/useInputAnimation';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleBasicInfo() {
  const router = useRouter();

  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();

  const { data } = useGetMyUniversityInfo();

  const { trackButton } = useTracker();

  const dormitoryItems = data.result.dormitoryNames.map((item, index) => ({
    index,
    title: item,
    value: item,
  }));

  const [showDormName, setShowDormName] = useState<boolean>(false);
  const [showNumofRoommate, setShowNumofRoommate] = useState<boolean>(false);
  const [showDormJoiningStatus, setShowDormJoiningStatus] = useState<boolean>(false);

  const dormNameAnimation = useInputAnimation(showDormName, 400);
  const roommateInputAnimation = useInputAnimation(showNumofRoommate, 400);
  const dormJoiningStatusInputAnimation = useInputAnimation(showDormJoiningStatus, 400);

  const handleNext = (event: GestureResponderEvent) => {
    event.stopPropagation();
    trackButton(ButtonEvent.next_general, EventCategory.life_style);
    router.push('/lifeStyle/essentialInfo');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent title="기본정보">
          {lifeStyle.admissionYear !== '' &&
            lifeStyle.dormName !== '' &&
            lifeStyle.numOfRoommate !== '' &&
            lifeStyle.dormJoiningStatus !== '' && (
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
          <View className="px-[20px] mt-8 gap-y-14 flex-1">
            {(showDormJoiningStatus || lifeStyle.dormJoiningStatus !== '') && (
              <Animated.View
                style={{
                  opacity:
                    lifeStyle.dormJoiningStatus !== ''
                      ? 1
                      : dormJoiningStatusInputAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.dormJoiningStatus !== ''
                          ? 0
                          : dormJoiningStatusInputAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="기숙사 합격여부를 선택해주세요"
                  value={lifeStyle.dormJoiningStatus}
                  items={dormJoiningStatusItems}
                  handleValue={(e) => {
                    setLifeStyle({ dormJoiningStatus: String(e) });
                  }}
                />
              </Animated.View>
            )}

            {(showNumofRoommate || lifeStyle.numOfRoommate !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.numOfRoommate !== '' ? 1 : roommateInputAnimation.opacity,
                  transform: [
                    {
                      translateY:
                        lifeStyle.numOfRoommate !== '' ? 0 : roommateInputAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="신청실의 인원을 선택해주세요"
                  value={lifeStyle.numOfRoommate}
                  items={numOfRoommateItems}
                  handleValue={(e) => {
                    setLifeStyle({ numOfRoommate: String(e) });
                    setShowDormJoiningStatus(true);
                  }}
                />
              </Animated.View>
            )}

            {(showDormName || lifeStyle.dormName !== '') && (
              <Animated.View
                style={{
                  opacity: lifeStyle.dormName !== '' ? 1 : dormNameAnimation.opacity,
                  transform: [
                    {
                      translateY: lifeStyle.dormName !== '' ? 0 : dormNameAnimation.translateY,
                    },
                  ],
                }}
              >
                <CustomRadioComponent
                  title="신청한 기숙사를 선택해주세요"
                  value={lifeStyle.dormName}
                  items={dormitoryItems}
                  handleValue={(e) => {
                    setLifeStyle({ dormName: String(e) });
                    setShowNumofRoommate(true);
                  }}
                />
              </Animated.View>
            )}

            <CustomTextInputComponent
              title="학번을 입력해주세요"
              value={lifeStyle.admissionYear}
              handleValue={(e) => {
                setLifeStyle({ admissionYear: String(e) });
                setShowDormName(true);
              }}
              placeholder="ex. 23"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
