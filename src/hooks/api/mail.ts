import { Alert } from 'react-native';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { sendMail, verifyMail } from '@server/api/mail';
import { VerifyMailResponse } from '@server/responseTypes/mail';

export const useSendMail = (
  mailAddress: string,
  universityId: number,
): UseMutationResult<unknown> => {
  return useMutation({
    mutationKey: [`/members/mail`],
    mutationFn: () => sendMail({ mailAddress, universityId }),
    onSuccess: () => Alert.alert('메일이 전송되었어요!'),
  });
};

export const useVerifyMail = (
  code: string,
  universityId: number,
  majorName: string,
): UseMutationResult<VerifyMailResponse> => {
  return useMutation({
    mutationKey: [`/members/mail/verify`],
    mutationFn: () => verifyMail({ code, universityId, majorName }),
    onSuccess: () => Alert.alert('인증이 완료되었어요!'),
  });
};
