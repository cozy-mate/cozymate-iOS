import React, { useState } from 'react';
import BackHeader from '@layout/backHeader';
import { Text, ScrollView, SafeAreaView } from 'react-native';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import CustomTextarea from '@components/common/customTextarea';

import { useLifeStyleStore } from '@zustand/member-stat/member-stat';

import { registerUserData } from '@server/api/member-stat';

import { AdditionalLifeStyleScreenProps } from '@type/param/stack';

const AdditionalInformationComponent = ({ navigation }: AdditionalLifeStyleScreenProps) => {
  const { lifeStyle, setLifeStyle } = useLifeStyleStore();

  const [selfIntroduction, setSelfIntroduction] = useState<string>('');

  const toPrev = () => {
    navigation.navigate('EssentialLifeStyleScreen');
  };

  const toNext = async () => {
    setLifeStyle({
      selfIntroduction: selfIntroduction,
    });

    try {
      await registerUserData({
        universityId: 1,
        admissionYear: lifeStyle.admissionYear,
        numOfRoommate: lifeStyle.numOfRoommate,
        acceptance: lifeStyle.acceptance,
        wakeUpMeridian: lifeStyle.wakeUpMeridian,
        wakeUpTime: lifeStyle.wakeUpTime,
        sleepingMeridian: lifeStyle.sleepingMeridian,
        sleepingTime: lifeStyle.sleepingTime,
        turnOffMeridian: lifeStyle.turnOffMeridian,
        turnOffTime: lifeStyle.turnOffTime,
        smokingState: lifeStyle.smokingState,
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

      navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-1 flex-col bg-white">
        <BackHeader
          title="선택정보"
          buttonString="완료"
          leftPressFunc={toPrev}
          rightPressFunc={toNext}
          canNext={true}
          width={400}
        />
        <ScrollView className="px-5">
          <View className="mb-5">
            <CustomTextarea
              title="하고싶은 말을 적어주세요 (선택)"
              value={selfIntroduction}
              setValue={setSelfIntroduction}
              placeholder="내용을 입력해주세요"
              height={270}
              maxLength={200}
            />
          </View>

          <Text className="text-xs font-medium text-disabledFont">
            <Text>
              이런 내용을 적어주면 좋아요!{'\n'}
              {'\n'}
            </Text>
            <Text>
              1{')'} 자기소개{'\n'}
            </Text>
            <Text>
              2{')'} 학교에서 하고 있는 동아리{'\n'}
            </Text>
            <Text>
              3{')'} 평소 관심사{'\n'}
            </Text>
            <Text>
              4{')'} 원하는 룸메이트의 성향{'\n'}
            </Text>
            <Text>
              5{')'} 같이 살면서 꼭 알아둬야할 점{'\n'}
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AdditionalInformationComponent;
