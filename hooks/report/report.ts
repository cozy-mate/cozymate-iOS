import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { createReport } from '@/apis/report/report';
import { CreateReportRequest } from '@/apis/report/request';

export const useCreateReport = (closeModal: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateReportRequest) => createReport(data),
    onSuccess: () => {
      closeModal();
      router.back();
    },
  });
};
