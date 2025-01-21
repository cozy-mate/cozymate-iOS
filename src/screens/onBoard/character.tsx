import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';
import CharacterSelect from '@components/onBoard/new/character';

import { useHasRoomStore } from '@zustand/room/room';
import { useSignUpStore, useProfileStore } from '@zustand/member/member';

import { signUp, getMyProfile } from '@server/api/member';

import { setAccessToken, setRefreshToken } from '@utils/token';

import { CharacterInputScreenProps } from '@type/param/rootStack';

const CharacterInputScreen = ({ navigation }: CharacterInputScreenProps) => {
  const { signUpState } = useSignUpStore();
  const { setProfile } = useProfileStore();
  const { setMyRoom } = useHasRoomStore();

  const isComplete = signUpState.persona !== 0;

  const toNext = async () => {
    if (!isComplete) return;

    try {
      const response = await signUp(signUpState);

      await setAccessToken(response.result.tokenResponseDTO.accessToken);
      await setRefreshToken(response.result.tokenResponseDTO.refreshToken);

      const getProfileResponse = await getMyProfile();
      setProfile(getProfileResponse.result);

      setMyRoom({ roomId: 0, hasRoom: false });

      navigation.navigate('BasicLifeStyleScreen');
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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

        {/* 하단 View */}
        <View className="flex">
          <BottomButton
            color={'bg-main1'}
            borderColor={'border-main1'}
            textColor={'text-white'}
            text={'다음'}
            disabled={!isComplete}
            onPressFunc={toNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CharacterInputScreen;
