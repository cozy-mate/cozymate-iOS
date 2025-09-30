import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { checkHasInquiry, createInquiry, getInquiryList } from '@/server/inquiry/inquiry';
import { CreateInquiryRequest } from '@/server/inquiry/request';
import { showRejectToast } from '@/utils/toast';
import { queries } from '@/server';

export const useGetInquiryList = () => {
  return useSuspenseQuery(queries.inquiry.list());
};

export const useCheckHasInquiry = () => {
  return useSuspenseQuery(queries.inquiry.exist());
};

export const useCreateInquiry = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInquiryRequest) => createInquiry(data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({
        queryKey: queries.inquiry._def,
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;
      showRejectToast(errorMessage);
    },
  });
};
