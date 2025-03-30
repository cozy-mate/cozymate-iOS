import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  createPreferenceList,
  getPreferenceList,
  updatePreferenceList,
} from '@/apis/member-stat-preference/member-stat-preference';
import {
  CreatePreferenceListRequest,
  UpdatePreferenceListRequest,
} from '@/apis/member-stat-preference/request';

export const useGetPreferenceList = () => {
  return useSuspenseQuery({
    queryKey: [`/members/stat/preference`],
    queryFn: () => getPreferenceList(),
  });
};

export const useCreatePreferenceList = () => {
  return useMutation({
    mutationFn: (data: CreatePreferenceListRequest) => createPreferenceList(data),
  });
};

export const useUpdatePreferenceList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePreferenceListRequest) => updatePreferenceList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/list/home`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/random`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/filter/home`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/preference`] });
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert('선호 라이프스타일 수정에 실패했습니다!');
    },
  });
};
