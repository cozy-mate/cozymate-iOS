import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, ScrollView, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';

import { useProfileStore, useLoggedInStore } from '@zustand/member/member';

import { deleteMember } from '@server/api/member';

import { deleteToken } from '@utils/token';
import { deleteFcmToken } from '@utils/fcm/fcmTokenUtil';

import { WithdrawScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import CheckedIcon from '@assets/myPage/checked.svg';
import WarningIcon from '@assets/myPage/warning.svg';
import NotCheckedIcon from '@assets/myPage/notChecked.svg';

const WithdrawScreen = ({ navigation }: WithdrawScreenProps) => {
  const { profile } = useProfileStore();
  const { setLoggedIn } = useLoggedInStore();

  const [content, setContent] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isComplete = content !== '' && isChecked !== false;

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const toMyPage = () => {
    navigation.goBack();
  };

  const withdraw = async (): Promise<void> => {
    try {
      await deleteMember();
      await deleteToken();
      await deleteFcmToken();
      setLoggedIn(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 flex-col justify-between">
        <ScrollView bounces={false} className="flex-1">
          <View>
            <View className="mb-3 mt-2 flex flex-row justify-between px-3">
              <Pressable onPress={toMyPage}>
                <BackButton />
              </Pressable>
            </View>

            <View className="mb-10 flex flex-col space-y-3 px-5">
              <Text className="px-2 text-lg font-semibold text-emphasizedFont">
                {profile.nickname}님,{'\n'}cozymate를 떠나시나요?
              </Text>

              <View className="flex flex-row items-center space-x-2 px-0.5">
                <WarningIcon />
                <Text className="text-xs font-medium tracking-tight text-basicFont">
                  탈퇴하시면 모든 정보가 사라지며, 모든 데이터는 복구가 불가능해요
                </Text>
              </View>

              <View className="flex flex-row items-center space-x-2 px-0.5">
                <WarningIcon />
                <Text className="text-xs font-medium tracking-tight text-basicFont">
                  코지봇 데이터는 지워지지 않아요
                </Text>
              </View>
            </View>

            <View className="flex flex-col space-y-3 px-5">
              <Text className="px-2 text-lg font-semibold text-emphasizedFont">
                {profile.nickname}님,{'\n'}떠나시는 이유를 알려주세요
              </Text>

              <TextInput
                value={content}
                onChangeText={setContent}
                multiline
                className="h-64 rounded-xl bg-colorBox p-4 text-basicFont"
                placeholder={`서비스 탈퇴 이유를 알려주신다면,\ncozymate가 더 나은 서비스가 되는 데에,\n큰 도움이 될 거에요.`}
                placeholderTextColor="#ACADB4"
              />
            </View>
          </View>
        </ScrollView>

        <View className="px-5">
          <View className="mb-3 flex flex-row items-center">
            <Pressable onPress={handleCheck}>
              {isChecked ? <CheckedIcon /> : <NotCheckedIcon />}
            </Pressable>
            <Text
              className={`text-xs font-medium ${isChecked ? 'text-main1' : 'text-disabledFont'}`}
            >
              회원 탈퇴 유의사항을 확인하였으며, 이에 동의합니다.
            </Text>
          </View>

          <BottomButton
            color="bg-main1"
            borderColor="border-main1"
            textColor="text-white"
            text="탈퇴하기"
            disabled={!isComplete}
            onPressFunc={withdraw}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
