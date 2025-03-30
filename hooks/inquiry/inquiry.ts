import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { checkHasInquiry, createInquiry, getInquiryList } from '@/apis/inquiry/inquiry';
import { CreateInquiryRequest } from '@/apis/inquiry/request';

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

  return useMutation({
    mutationFn: (data: CreateInquiryRequest) => createInquiry(data),
    onSuccess: () => {
      router.back();
    },
  });
};
