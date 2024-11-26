import React, { useState } from 'react';
import BackHeader from '@layout/backHeader';
import { Text, ScrollView, SafeAreaView } from 'react-native';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import CustomTextarea from '@components/common/customTextarea';

import { useLifeStyleStore, useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { registerMemberStat } from '@server/api/member-stat';

import { AdditionalLifeStyleScreenProps } from '@type/param/stack';

const AdditionalInformationComponent = ({ navigation, route }: AdditionalLifeStyleScreenProps) => {
  const { returnToUser, returnToRoom } = route.params ?? {};

  const { lifeStyle, setLifeStyle } = useLifeStyleStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();

  const [selfIntroduction, setSelfIntroduction] = useState<string>('');

  const toPrev = () => {
    navigation.navigate('EssentialLifeStyleScreen');
  };

  const toNext = async () => {
    setLifeStyle({
      memberStatDetail: {
        selfIntroduction: selfIntroduction,
      },
    });

    try {
      await registerMemberStat({
        admissionYear: lifeStyle.memberStatDetail.admissionYear,
        numOfRoommate: lifeStyle.memberStatDetail.numOfRoommate,
        dormitoryName: '123',
        acceptance: lifeStyle.memberStatDetail.acceptance,
        wakeUpMeridian: lifeStyle.memberStatDetail.wakeUpMeridian,
        wakeUpTime: lifeStyle.memberStatDetail.wakeUpTime,
        sleepingMeridian: lifeStyle.memberStatDetail.sleepingMeridian,
        sleepingTime: lifeStyle.memberStatDetail.sleepingTime,
        turnOffMeridian: lifeStyle.memberStatDetail.turnOffMeridian,
        turnOffTime: lifeStyle.memberStatDetail.turnOffTime,
        smoking: lifeStyle.memberStatDetail.smoking,
        sleepingHabit: lifeStyle.memberStatDetail.sleepingHabit,
        airConditioningIntensity: lifeStyle.memberStatDetail.airConditioningIntensity,
        heatingIntensity: lifeStyle.memberStatDetail.heatingIntensity,
        lifePattern: lifeStyle.memberStatDetail.lifePattern,
        intimacy: lifeStyle.memberStatDetail.intimacy,
        canShare: lifeStyle.memberStatDetail.canShare,
        isPlayGame: lifeStyle.memberStatDetail.isPlayGame,
        isPhoneCall: lifeStyle.memberStatDetail.isPhoneCall,
        studying: lifeStyle.memberStatDetail.studying,
        intake: lifeStyle.memberStatDetail.intake,
        cleanSensitivity: lifeStyle.memberStatDetail.cleanSensitivity,
        noiseSensitivity: lifeStyle.memberStatDetail.noiseSensitivity,
        cleaningFrequency: lifeStyle.memberStatDetail.cleaningFrequency,
        drinkingFrequency: lifeStyle.memberStatDetail.drinkingFrequency,
        personality: lifeStyle.memberStatDetail.personality,
        mbti: lifeStyle.memberStatDetail.mbti,
        selfIntroduction: selfIntroduction,
      });

      setHasLifeStyle(true);

      if (returnToUser) {
        navigation.navigate('UserDetailScreen', { memberId: returnToUser });
      } else if (returnToRoom) {
        navigation.navigate('RoomDetailScreen', { roomId: returnToRoom });
      } else {
        navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  console.log(lifeStyle);

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
