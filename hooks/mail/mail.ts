import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import { sendMail, verifyMail } from '@/server/mail/mail';
import { SendMailRequest, VerifyMailRequest } from '@/server/mail/request';
import { VerifyMailResponse } from '@/server/mail/response';
import { setAccessToken } from '@/utils/token';

export const useSendMail = (
  handleError: Dispatch<SetStateAction<boolean>>,
  handleErrorText: Dispatch<SetStateAction<string>>,
) => {
  return useMutation({
    mutationFn: (data: SendMailRequest) => sendMail(data),
    onSuccess: () => {
      Alert.alert('메일이 전송되었어요!');
    },
    onError: (error: any) => {
      const errorCode = error.response?.data?.code;

      handleError(true);
      if (errorCode === 'MAIL401') handleErrorText('이미 사용된 이메일입니다!');
    },
  });
};

export const useVerifyMail = (
  handleError: Dispatch<SetStateAction<boolean>>,
  handleErrorText: Dispatch<SetStateAction<string>>,
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyMailRequest) => verifyMail(data),
    onSuccess: async (response: VerifyMailResponse) => {
      await setAccessToken(response.result.tokenResponseDTO.accessToken);

      router.replace('/(onBoard)/personalInfo');
    },
    onError: (error: any) => {
      const errorCode = error.response?.data?.code;

      handleError(true);
      if (errorCode === 'MAIL402') handleErrorText('인증번호를 다시 확인해주세요!');
    },
  });
};
