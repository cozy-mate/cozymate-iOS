import React, { useRef, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import LoadingComponent from '@/components/common/loading';
import { useSendMail } from '@/hooks/mail/mail';
import { useGetUniversityInfo } from '@/hooks/university/university';
import { useMailAuthenticationStore } from '@/zustand/mail/mail';

const EmailInputBox: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const [isSended, setIsSended] = useState<boolean>(false);

  const { mailState, setMailState } = useMailAuthenticationStore();

  const { data } = useGetUniversityInfo(mailState.universityId);

  const getDomain = (value: string) => {
    const atIndex = value.indexOf('@');
    return atIndex !== -1 ? value.slice(atIndex + 1) : '';
  };

  const { mutateAsync: sendMail, isPending } = useSendMail();

  const handleSendMail = async () => {
    try {
      await sendMail({
        mailAddress: mailState.mailAddress,
        universityId: mailState.universityId,
      });

      setIsSended(true);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setIsSended(false);
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
          className={`border ${isError ? 'border-warningColor' : isFocused || mailState.mailAddress !== '' ? 'border-subColor1' : 'border-disabledColor'} rounded-xl p-5 h-[80px] flex flex-row justify-between items-center`}
        >
          <View className="gap-y-[6px]">
            <Text
              className={`text-12 font-600 leading-12 ${isError ? 'text-warningColor' : 'text-colorFont'}`}
            >
              학교 이메일
            </Text>
            <TextInput
              ref={inputRef}
              value={mailState.mailAddress}
              onChangeText={(e: string) => setMailState({ mailAddress: e })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="학교 이메일을 입력해주세요"
              placeholderTextColor={'#ACADB4'}
              className="text-14 font-500 text-basicFont"
              autoCapitalize="none"
            />
          </View>

          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              handleSendMail();
            }}
            disabled={
              data === undefined || getDomain(mailState.mailAddress) !== data?.result.mailPattern
            }
            className={`px-[16px] py-[8px] rounded-[26px] ${data !== undefined && getDomain(mailState.mailAddress) === data?.result.mailPattern ? 'bg-colorBox' : 'bg-boxColor'} `}
          >
            <Text
              className={`text-12 font-600 leading-12 ${data !== undefined && getDomain(mailState.mailAddress) === data?.result.mailPattern ? 'text-mainColor' : 'text-disabledFont'}`}
            >
              {isSended ? '인증번호 재전송' : '인증번호 전송'}
            </Text>
          </Pressable>
        </Pressable>

        {isError && (
          <Text className="text-12 font-500 leading-12 text-warningColor mx-[8px]">
            이메일을 다시 확인해주세요!
          </Text>
        )}
      </View>
    </>
  );
};

export default EmailInputBox;
