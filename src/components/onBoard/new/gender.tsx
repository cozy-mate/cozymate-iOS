import { Text } from 'react-native';
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import { useSignUpStore } from '@zustand/member/member';

import RadioButton from '@assets/onBoard/radioBox.svg';
import SelectedRadioButton from '@assets/onBoard/selectedRadioBox.svg';

const Gender: React.FC = () => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  console.log(signUpState);

  return (
    <Pressable
      onPress={() => setIsFocused(true)}
      className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5 ${
        isFocused ? 'border-sub1' : 'border-disabled'
      }`}
    >
      <View className="space-y-1.5">
        <Text
          className={`text-xs font-semibold leading-[15px] tracking-tight ${
            signUpState.gender !== '' ? 'text-main1' : 'text-colorFont'
          }`}
        >
          성별
        </Text>
        <View className="flex flex-row space-x-2">
          <Pressable
            className="flex flex-row items-center space-x-1"
            onPress={() => setSignUpState({ gender: 'MALE' })}
          >
            {signUpState.gender === 'MALE' ? <SelectedRadioButton /> : <RadioButton />}
            <Text
              className={`text-sm font-medium leading-4 tracking-tight ${
                signUpState.gender === 'MALE' ? 'text-basicFont' : 'text-disabledFont'
              } `}
            >
              남자
            </Text>
          </Pressable>

          <Pressable
            className="flex flex-row items-center space-x-1"
            onPress={() => setSignUpState({ gender: 'FEMALE' })}
          >
            {signUpState.gender === 'FEMALE' ? <SelectedRadioButton /> : <RadioButton />}
            <Text
              className={`text-sm font-medium leading-4 tracking-tight ${
                signUpState.gender === 'FEMALE' ? 'text-basicFont' : 'text-disabledFont'
              } `}
            >
              여자
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default Gender;
