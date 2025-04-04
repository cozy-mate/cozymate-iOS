import React, { useRef, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import LoadingComponent from '@/components/common/loading';
import { useVerifyMail } from '@/hooks/mail/mail';
import { useMailAuthenticationStore } from '@/zustand/mail/mail';

const CodeInputBox: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const { mailState, setMailState } = useMailAuthenticationStore();

  const { mutateAsync: verifyMail, isPending } = useVerifyMail();

  const handleVerifyMail = async () => {
    try {
      await verifyMail({
        code: mailState.code,
        universityId: mailState.universityId,
        majorName: mailState.majorName,
      });
    } catch (error: any) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <>
      <Modal visible={isPending} transparent={true}>
        <LoadingComponent />
      </Modal>

      <View className="gap-y-[8px]">
        <Pressable
          onPress={() => inputRef.current?.focus()}
          className={`border ${isError ? 'border-warningColor' : isFocused || mailState.code !== '' ? 'border-subColor1' : 'border-disabledColor'} rounded-xl p-5 h-[80px] flex flex-row justify-between items-center`}
        >
          <View className="gap-y-[6px]">
            <Text
              className={`text-12 font-600 leading-12 ${isError ? 'text-warningColor' : 'text-colorFont'}`}
            >
              인증번호 확인
            </Text>
            <TextInput
              ref={inputRef}
              value={mailState.code}
              onChangeText={(e: string) => setMailState({ code: e })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="인증 번호를 입력해주세요"
              placeholderTextColor={'#ACADB4'}
              className="text-14 font-500 text-basicFont"
              autoCapitalize="none"
            />
          </View>

          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              handleVerifyMail();
            }}
            disabled={mailState.code === ''}
            className={`px-[16px] py-[8px] rounded-[26px] ${mailState.code !== '' ? 'bg-colorBox' : 'bg-boxColor'} `}
          >
            <Text
              className={`text-12 font-600 leading-12 ${mailState.code !== '' ? 'text-mainColor' : 'text-disabledFont'}`}
            >
              인증번호 확인
            </Text>
          </Pressable>
        </Pressable>

        {isError && (
          <Text className="text-12 font-500 leading-12 text-warningColor mx-[8px]">
            인증번호를 다시 확인해주세요!
          </Text>
        )}
      </View>
    </>
  );
};

export default CodeInputBox;
