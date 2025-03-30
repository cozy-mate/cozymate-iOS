import React, { useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import { genderItems } from 'src/mocks/gender';

import BottomButton from '@components/common/bottomButton';
import RadioInputComponent from '@components/onBoardComponent/radioInput';
import SelectInputComponent from '@components/onBoardComponent/selectInput';
import BorderInputComponent from '@components/onBoardComponent/borderInput';

import { useSignUpStore } from '@zustand/member/member';

import { PersonalInfoInputScreenProps } from '@type/param/rootStack';

const PersonalInfoInputScreen = ({ navigation }: PersonalInfoInputScreenProps) => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const [canUse, setCanUse] = useState<boolean>(true);

  const isComplete =
    canUse &&
    signUpState.nickname !== '' &&
    signUpState.gender !== '' &&
    signUpState.birthday !== '';

  const toNext = async (): Promise<void> => {
    if (!isComplete || !canUse) return;

    navigation.navigate('UniversityInputScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col px-5">
          {/* 상단 View */}
          <View className="mt-14 flex-1">
            {/* 설명 Text */}
            <View className="px-2">
              <Text className="text-xl font-semibold leading-[21px] tracking-tight text-emphasizedFont">
                원활한 서비스 이용을 위해{'\n'}개인정보를 입력해주세요!
              </Text>
            </View>

            <ScrollView contentContainerStyle={{ rowGap: 16, marginTop: 24 }}>
              {/* 닉네임 입력 Input */}
              <BorderInputComponent
                type="NICKNAME"
                title="닉네임"
                value={signUpState.nickname}
                handleValue={setSignUpState}
                placeholder="닉네임을 입력해주세요"
              />

              {/* 성별 입력 Input */}
              <RadioInputComponent
                title="성별"
                value={signUpState.gender}
                handleValue={setSignUpState}
                items={genderItems}
              />

              {/* 생년월일 입력 Input */}
              <SelectInputComponent
                type="DATE"
                title="생년월일"
                value={signUpState.birthday}
                handleValue={setSignUpState}
              />
            </ScrollView>
          </View>
        </View>

        <View className="fixed bottom-2 px-5">
          <BottomButton
            color={'bg-main1'}
            borderColor={'border-main1'}
            textColor={'text-white'}
            text={'다음'}
            disabled={!isComplete || !canUse}
            onPressFunc={toNext}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfoInputScreen;
