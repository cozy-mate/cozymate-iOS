import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { sendMail, verifyMail } from '@/apis/mail/mail';
import { SendMailRequest, VerifyMailRequest } from '@/apis/mail/request';
import { VerifyMailResponse } from '@/apis/mail/response';
import { setAccessToken } from '@/utils/token';

export const useSendMail = () => {
  return useMutation({
    mutationFn: (data: SendMailRequest) => sendMail(data),
    onError: (error: any) => {
      console.log(error.config);
    },
  });
};

export const useVerifyMail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyMailRequest) => verifyMail(data),
    onSuccess: async (response: VerifyMailResponse) => {
      await setAccessToken(response.result.tokenResponseDTO.accessToken);

      console.log(response);

      router.replace('/(onBoard)/personalInfo');
    },
  });
};
