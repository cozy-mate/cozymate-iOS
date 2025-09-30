import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  getPreferenceList,
  updatePreferenceList,
} from '@/server/member-stat-preference/member-stat-preference';
import { UpdatePreferenceListRequest } from '@/server/member-stat-preference/request';
import { matchMultiQueries, queries } from '@/server';

export const useGetPreferenceList = () => {
  return useSuspenseQuery(queries.memberStatPreference.list());
};

export const useUpdatePreferenceList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePreferenceListRequest) => updatePreferenceList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.memberStatPreference._def,
          queries.memberStat.randomList._def,
          queries.memberStat.filterHome._def,
          ['/rooms/list/home'],
        ]),
      });
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert('선호 라이프스타일 수정에 실패했습니다!');
    },
  });
};
