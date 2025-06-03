import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BorderDateBox from '@/components/common/borderDateBox';
import NicknameInputComponent from '@/components/onBoard/nicknameInput';
import { useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';
import BottomButtonComponent from '@/newComponents/common/bottomButton';

export default function UpdateInfo() {
  const { type } = useLocalSearchParams();

  const { data } = useGetMemberProfile();

  const [nickname, setNickname] = useState<string>(data.result.nickname);
  const [birthday, setBirthday] = useState<string>(data.result.birthday);

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);

  const handleNickname = (value: string) => {
    setNickname(value);
  };

  const handleNicknameChecked = (value: boolean) => {
    setNicknameChecked(value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-[20px] gap-y-[20px]">
          <BackHeaderComponent />

          {type === 'nickname' && (
            <NicknameInputComponent
              title="닉네임"
              value={nickname}
              handleValue={handleNickname}
              placeholder="닉네임을 입력해주세요"
              handleNicknameChecked={handleNicknameChecked}
            />
          )}

          {type === 'birthday' && (
            <BorderDateBox
              title="생년월일"
              value={birthday}
              handleValue={(e: string) => setBirthday(e)}
            />
          )}
        </View>

        <BottomButtonComponent
          buttonText="수정"
          onPress={() =>
            updateInfo({
              nickname: nickname,
              majorName: data.result.majorName,
              birthday: birthday,
              persona: data.result.persona,
            })
          }
          color={
            (type === 'nickname' && nickname.trim() === '') ||
            (type === 'birthday' && birthday.trim() === '')
              ? 'GRAY'
              : 'BLUE'
          }
          disabled={
            (type === 'nickname' && nickname.trim() === '') ||
            (type === 'birthday' && birthday.trim() === '')
          }
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
