import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { createReport } from '@/server/report/report';
import { CreateReportRequest } from '@/server/report/request';
import { showSuccessToast } from '@/utils/toast';

export const useCreateReport = (closeModal: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateReportRequest) => createReport(data),
    onSuccess: () => {
      showSuccessToast('신고가 접수되었습니다!');
      closeModal();
      router.back();
    },
  });
};
