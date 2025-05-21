import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BorderDateBox from '@/components/common/borderDateBox';
import BorderTextButtonBox from '@/components/common/borderTextButtonBox';
import { useCheckNickname, useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';
import BottomButtonComponent from '@/newComponents/common/bottomButton';

export default function UpdateInfo() {
  const { type } = useLocalSearchParams();

  const { data } = useGetMemberProfile();

  const { mutateAsync: checkNickname } = useCheckNickname();

  const [nickname, setNickname] = useState<string>(data.result.nickname);
  const [birthday, setBirthday] = useState<string>(data.result.birthday);

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[20px]">
        <BackHeaderComponent />

        {type === 'nickname' && (
          <BorderTextButtonBox
            title="닉네임"
            value={nickname}
            handleValue={(e: string) => setNickname(e)}
            placeholder="닉네임을 입력해주세요"
            buttonText="중복 확인"
            buttonPress={() => checkNickname(nickname)}
            canPress={nickname !== ''}
            errorMessage="다른 사용자가 이미 사용 중인 닉네임이에요!"
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
  );
}
