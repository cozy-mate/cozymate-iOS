import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { sendMail, verifyMail } from '@server/api/mail';
import { VerifyMailResponse } from '@server/responseTypes/mail';
import { SendMailRequest, VerifyMailRequest } from '@server/requestTypes/mail';

export const useSendMail = (): UseMutationResult<unknown, unknown, SendMailRequest, unknown> => {
  return useMutation({
    mutationKey: [`/members/mail`],
    mutationFn: (data: SendMailRequest) => sendMail(data),
  });
};

export const useVerifyMail = (): UseMutationResult<
  VerifyMailResponse,
  unknown,
  VerifyMailRequest,
  unknown
> => {
  return useMutation({
    mutationKey: [`/members/mail/verify`],
    mutationFn: (data: VerifyMailRequest) => verifyMail(data),
  });
};
