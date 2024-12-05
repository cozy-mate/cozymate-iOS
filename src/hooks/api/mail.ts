import React from 'react';
import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { sendMail, verifyMail, checkVerified } from '@server/api/mail';
import { SendMailRequest, VerifyMailRequest } from '@server/requestTypes/mail';
import { VerifyMailResponse, CheckVerifiedResponse } from '@server/responseTypes/mail';

export const useCheckVerified = (): { data: CheckVerifiedResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: [`/members/mail/verify`],
    queryFn: () => checkVerified(),
    select: (response: CheckVerifiedResponse) => {
      return response;
    },
  });

  return { data, refetch };
};

export const useSendMail = (): UseMutationResult<unknown, unknown, SendMailRequest, unknown> => {
  return useMutation({
    mutationKey: [`/members/mail`],
    mutationFn: (data: SendMailRequest) => sendMail(data),
  });
};

export const useVerifyMail = (
  refetch: () => void,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
): UseMutationResult<VerifyMailResponse, unknown, VerifyMailRequest, unknown> => {
  return useMutation({
    mutationKey: [`/members/mail/verify`],
    mutationFn: (data: VerifyMailRequest) => verifyMail(data),
    onSuccess: () => refetch(),
    onError: () => setIsError(true),
  });
};
