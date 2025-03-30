import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

import { SignUp } from '@zustand/member/type';

import { useCheckNickname } from '@hooks/api/member';

interface BorderInputComponentProps {
  type: string;
  title: string;
  value: string;
  handleValue: (newSignUpState: Partial<SignUp>) => void;
  placeholder: string;
}

const BorderInputComponent: React.FC<BorderInputComponentProps> = ({
  type,
  title,
  value,
  handleValue,
  placeholder,
}) => {
  const [isFoucused, setIsFocused] = useState<boolean>(false);
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { mutateAsync: checkNickname } = useCheckNickname(setIsDuplicated);

  const validNickNameRegex = /^[가-힣a-zA-Z0-9]+$/;

  useEffect(() => {
    if (!validNickNameRegex.test(value)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [value]);

  return (
    <View>
      <View
        className={`flex flex-row items-center justify-between rounded-xl border p-5 ${
          isDuplicated ? 'border-warning' : isFoucused ? 'border-sub1' : 'border-disabled'
        }`}
      >
        <View className="space-y-1.5">
          <Text
            className={`text-xs font-semibold ${
              isDuplicated
                ? 'text-warning'
                : isFoucused || value !== ''
                ? 'text-main1'
                : 'text-colorFont'
            }`}
          >
            {title}
          </Text>
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={(text: string) => {
              setIsDuplicated(false);
              handleValue({ nickname: text });
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="text-sm font-medium leading-4 tracking-tight text-basicFont"
            maxLength={8}
          />
        </View>
        {type === 'NICKNAME' && (
          <Pressable onPress={() => checkNickname(value)}>
            <Text>중복 확인</Text>
          </Pressable>
        )}
      </View>

      {isDuplicated && (
        <Text className="ml-2 mt-2 text-xs font-medium text-warning">
          이미 사용중인 닉네임이에요!
        </Text>
      )}
    </View>
  );
};

export default BorderInputComponent;
