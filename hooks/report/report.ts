import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReport } from '@/server/report/report';
import { CreateReportRequest } from '@/server/report/request';
import { showSuccessToast } from '@/utils/toast';
import { matchMultiQueries, queries } from '@/server';

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReportRequest) => createReport(data),
    onSuccess: (_data, variables) => {
      const memberId = variables.memberId;

      showSuccessToast('신고가 접수되었습니다!');
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.memberBlock.list._def,
          queries.memberBlock.status({ memberId }).queryKey,
          queries.memberStat.list._def,
        ]),
      });
    },
  });
};
