import React from 'react';
import {
  Text,
  View,
  Keyboard,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import LifeStyleHeaderComponent from '@components/onBoardLifeStyle/header';

import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

import { useRegisterLifeStyle } from '@hooks/api/member-stat';

import { AdditionalLifyStyleScreenProps } from '@type/param/rootStack';
import { sendTimerEvent } from '@utils/ga/sendTimerEvent';
import { sendScreenEvent } from '@utils/ga/sendScreenEvent';

const AdditionalLifeStyle = ({ navigation }: AdditionalLifyStyleScreenProps) => {
  const width = Dimensions.get('screen').width;

  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const { mutateAsync: registerMyLifeStyle } = useRegisterLifeStyle();

  const addLifeStyle = async () => {
    try {
      await registerMyLifeStyle(lifeStyle);
      try {
        sendTimerEvent();
        sendScreenEvent('온보딩 완료');
      } catch (e) {
        console.error(e);
      }
      navigation.navigate('ChipSelectScreen');
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <LifeStyleHeaderComponent
          title="선택정보"
          toBack={toBack}
          isComplete={true}
          buttonText="완료"
          buttonFunc={addLifeStyle}
          width={width}
        />

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, rowGap: 56, paddingBottom: 34 }}
        >
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

          <View className="flex flex-col">
            <Text className="text-xs font-medium text-disabledFont">
              이런 내용을 적어주면 좋아요!
              {'\n'}
            </Text>
            <Text className="text-xs font-medium text-disabledFont">1{')'} 자기소개</Text>
            <Text className="text-xs font-medium text-disabledFont">
              2{')'} 학교에서 하고 있는 동아리
            </Text>
            <Text className="text-xs font-medium text-disabledFont">3{')'} 평소 관심사</Text>
            <Text className="text-xs font-medium text-disabledFont">
              4{')'} 원하는 룸메이트의 성향
            </Text>
            <Text className="text-xs font-medium text-disabledFont">
              5{')'} 같이 살면서 꼭 알아둬야할 점
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AdditionalLifeStyle;
