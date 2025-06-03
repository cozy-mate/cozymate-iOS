import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { checkHasInquiry, createInquiry, getInquiryList } from '@/server/inquiry/inquiry';
import { CreateInquiryRequest } from '@/server/inquiry/request';
import { showRejectToast } from '@/utils/toast';

export const useGetInquiryList = () => {
  return useSuspenseQuery({
    queryKey: [`/inquiries`],
    queryFn: () => getInquiryList(),
  });
};

export const useCheckHasInquiry = () => {
  return useSuspenseQuery({
    queryKey: [`/inquiries/exist`],
    queryFn: () => checkHasInquiry(),
  });
};

export const useCreateInquiry = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInquiryRequest) => createInquiry(data),
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: [`/inquiries`] });
      queryClient.invalidateQueries({ queryKey: [`/inquiries/exist`] });
    },
    onError: (error: any) => {
      showRejectToast(error.response?.data?.message);
      console.log(error.response?.data?.message);
      // router.push('/myPage/inquiry/failed');
    },
  });
};
