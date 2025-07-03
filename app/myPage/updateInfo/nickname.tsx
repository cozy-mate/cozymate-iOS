import { useEffect, useState } from 'react';
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BorderButtonBox from '@/components/common/borderComponent/borderButtonBox';
import { useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';
import BottomButtonComponent from '@/components/common/bottomButton';
import { checkNickname } from '@/server/member/member';

export default function NicknameUpdate() {
  const { data } = useGetMemberProfile();

  const [nickname, setNickname] = useState<string>(data.result.nickname);
  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);

  const [isNicknameError, setIsNicknameError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [successText, setSuccessText] = useState<string>('');

  const handleNickname = (value: string) => {
    setNickname(value);
  };

  const handleNicknameChecked = (value: boolean) => {
    setNicknameChecked(value);
  };

  const handleError = async () => {
    const response = await checkNickname(nickname);

    if (response.result) {
      setIsNicknameError(false);
      setErrorText('');
      setSuccessText('사용가능한 닉네임이에요!');
      handleNicknameChecked(true);
    } else {
      setIsNicknameError(true);
      setErrorText('이미 사용중인 닉네임이에요!');
      handleNicknameChecked(false);
    }
  };

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  useEffect(() => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    if (nickname.trim().length !== 0) {
      if (nickname.trim().length < 2 || nickname.trim().length > 8) {
        setIsNicknameError(true);
        setErrorText('닉네임은 2 ~ 8글자만 가능해요!');
        handleNicknameChecked(false);
      } else if (!nicknameRegex.test(nickname)) {
        setIsNicknameError(true);
        setErrorText('닉네임은 한글, 영어, 숫자만 사용할 수 있어요!');
        handleNicknameChecked(false);
      } else {
        setIsNicknameError(false);
        setErrorText('');
        handleNicknameChecked(false);
        setSuccessText('');
      }
    } else {
      setIsNicknameError(false);
      setErrorText('');
      handleNicknameChecked(false);
    }
  }, [nickname]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[20px]">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 gap-y-[20px]">
            <BackHeaderComponent />

            <BorderButtonBox
              title="닉네임"
              value={nickname}
              placeholder="닉네임을 입력해주세요"
              onChangeText={handleNickname}
              buttonText="중복 확인"
              onButtonPress={handleError}
              buttonDisabled={
                isNicknameError || nickname.trim().length === 0 || nickname === data.result.nickname
              }
              isError={isNicknameError}
              errorText={errorText}
              successText={successText}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <BottomButtonComponent
        buttonText="수정"
        onPress={() => updateInfo({ ...data.result, nickname: nickname })}
        color={
          nickname === data.result.nickname || !nicknameChecked || nickname === '' ? 'GRAY' : 'BLUE'
        }
        disabled={nickname === ''}
      />
    </SafeAreaView>
  );
}
