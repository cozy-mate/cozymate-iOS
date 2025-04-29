import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { useCheckNickname } from '@/hooks/member/member';

interface NicknameInputComponentProps {
  title: string;
  value: string;
  handleValue: (value: string) => void;
  placeholder: string;
  handleNicknameChecked: (value: boolean) => void;
}

const NicknameInputComponent: React.FC<NicknameInputComponentProps> = ({
  title,
  value,
  handleValue,
  placeholder,
  handleNicknameChecked,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [successText, setSuccessText] = useState<string>('');

  const { mutateAsync: checkNickname } = useCheckNickname();

  const handleError = async () => {
    const response = await checkNickname(value);

    if (response.result) {
      setIsError(false);
      setErrorText('');
      setSuccessText('사용가능한 닉네임이에요!');
      handleNicknameChecked(true);
    } else {
      setIsError(true);
      setErrorText('이미 사용중인 닉네임이에요!');
      handleNicknameChecked(false);
    }
  };

  useEffect(() => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    if (value.trim().length !== 0) {
      if (value.trim().length < 2 || value.trim().length > 8) {
        setIsError(true);
        setErrorText('닉네임은 2 ~ 8글자만 가능해요!');
        handleNicknameChecked(false);
      } else if (!nicknameRegex.test(value)) {
        setIsError(true);
        setErrorText('닉네임은 한글, 영어, 숫자만 사용할 수 있어요!');
        handleNicknameChecked(false);
      } else {
        setIsError(false);
        setErrorText('');
        handleNicknameChecked(false);
        setSuccessText('');
      }
    } else {
      setIsError(false);
      setErrorText('');
      handleNicknameChecked(false);
    }
  }, [value]);

  return (
    <View className="gap-y-[8px]">
      <Pressable
        onPress={() => inputRef.current?.focus()}
        className={`border ${isError ? 'border-warningColor' : isFocused || value !== '' ? 'border-subColor1' : 'border-disabledColor'} rounded-xl p-5 h-[80px] flex flex-row justify-between items-center`}
      >
        <View className="gap-y-1.5">
          <Text
            className={`text-12 font-600 leading-12 ${isError ? 'text-warningColor' : 'text-colorFont'}`}
          >
            {title}
          </Text>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            placeholderTextColor={'#ACADB4'}
            className="text-14 font-500 text-basicFont"
          />
        </View>

        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            handleError();
          }}
          disabled={isError}
          className={`px-[16px] py-[8px] rounded-[26px] ${!isError && value.trim().length !== 0 ? 'bg-colorBox' : 'bg-boxColor'} `}
        >
          <Text
            className={`text-12 font-600 leading-12 ${!isError && value.trim().length !== 0 ? 'text-mainColor' : 'text-disabledFont'}`}
          >
            중복 확인
          </Text>
        </Pressable>
      </Pressable>

      {isError && errorText !== '' && (
        <Text className="text-12 font-500 leading-12 text-warningColor mx-[8px]">{errorText}</Text>
      )}

      {!isError && successText !== '' && (
        <Text className="text-12 font-500 leading-12 text-mainColor mx-[8px]">{successText}</Text>
      )}
    </View>
  );
};

export default NicknameInputComponent;
