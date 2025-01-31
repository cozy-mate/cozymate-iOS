import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';
import CharacterSelect from '@components/onBoard/new/character';
import LoadingComponent from '@components/commonComponents/loading';

import { useSignUpStore } from '@zustand/member/member';

import { useSignUp } from '@hooks/api/member';

import { CharacterInputScreenProps } from '@type/param/rootStack';

const CharacterInputScreen = ({ navigation }: CharacterInputScreenProps) => {
  const { signUpState } = useSignUpStore();

  const isComplete = signUpState.persona !== 0;

  const { mutateAsync: signUp, isPending } = useSignUp(navigation);

  const toNext = async () => {
    if (!isComplete) return;

    await signUp(signUpState);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isPending && <LoadingComponent />}
      <View className="flex flex-1 flex-col justify-between px-5">
        {/* 상단 View */}
        <View className="mt-14 flex">
          {/* 설명 Text */}
          <View className="mb-6 leading-loose">
            <Text className="text-lg font-semibold tracking-tight text-[#46464B]">
              cozymate와 함께할{'\n'}캐릭터를 선택해주세요!
            </Text>
          </View>

          {/* 캐릭터 선택 Input */}
          <CharacterSelect />
        </View>
      </View>
      <View className="fixed bottom-0 px-5">
        <BottomButton
          color={'bg-main1'}
          borderColor={'border-main1'}
          textColor={'text-white'}
          text={'다음'}
          disabled={!isComplete}
          onPressFunc={toNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default CharacterInputScreen;
