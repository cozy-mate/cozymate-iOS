import { TextInput } from 'react-native-gesture-handler';
import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Keyboard, Pressable } from 'react-native';

import { useSignUpStore } from '@zustand/member/member';

import { checkNickname } from '@server/api/member';

interface NickNameInputProps {
  setCanUse: React.Dispatch<React.SetStateAction<boolean>>;
}

const NickNameInput: React.FC<NickNameInputProps> = ({ setCanUse }) => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const [checkDuplicate, setCheckDuplicate] = useState<boolean>(true);
  const [checkLength, setCheckLength] = useState<boolean>(true);

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const checkNicknameLength = async (nickname: string) => {
    const trimmedNickname = nickname.trim();

    if (trimmedNickname.length == 0) {
      return;
    } else if (trimmedNickname.length < 2 || trimmedNickname.length > 8) {
      setCheckLength(false);
      setCanUse(false);
      return;
    }
    setCheckLength(true);
  };

  const checkUserNickname = async (nickname: string) => {
    if (nickname.trim() !== '') {
      try {
        const response = await checkNickname(nickname);

        setCheckDuplicate(response.result);
        return;
      } catch (error: any) {
        const errorCode = error?.response?.data?.code;

        if (errorCode === 'MEMBER404') {
          setCheckDuplicate(false);
        }
      }
    }
  };

  useEffect(() => {
    checkNicknameLength(signUpState.nickname);
    checkUserNickname(signUpState.nickname);

    if (checkDuplicate) {
      setCanUse(true);
    }
  }, [signUpState.nickname]);

  return (
    <View>
      <Pressable
        onPress={handleFocus}
        className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5
                ${
                  (!checkDuplicate || !checkLength) && signUpState.nickname.trim() !== ''
                    ? 'border-warning'
                    : isFocused
                    ? 'border-sub1'
                    : 'border-disabled'
                }`}
      >
        <View className="flex flex-col justify-center space-y-1.5">
          <Text
            className={`text-xs font-semibold leading-4 tracking-tight
                    ${
                      (!checkDuplicate || !checkLength) && signUpState.nickname.trim() !== ''
                        ? 'text-warning'
                        : isFocused || signUpState.nickname
                        ? 'text-main1'
                        : 'text-colorFont'
                    }`}
          >
            닉네임
          </Text>
          <TextInput
            ref={inputRef}
            value={signUpState.nickname}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(text: string) => setSignUpState({ nickname: text })}
            placeholder="닉네임을 입력해주세요"
            placeholderTextColor="#ACADB4"
            className="text-sm font-medium leading-4 tracking-tight text-basicFont"
          />
        </View>
      </Pressable>

      {!checkLength && signUpState.nickname.trim() !== '' && (
        <Text className="mt-2 px-2 text-xs font-medium text-warning">
          닉네임은 2~8자인 한글, 영어, 숫자만 가능해요!
        </Text>
      )}

      {!checkDuplicate && checkLength && signUpState.nickname.trim() !== '' && (
        <Text className="mt-2 px-2 text-xs font-medium text-warning">
          다른 사람이 사용중인 닉네임이에요!
        </Text>
      )}
    </View>
  );
};

export default NickNameInput;
