import {
  useMutation,
  useSuspenseQuery,
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import {
  addPreferenceList,
  getPreferenceList,
  updatePreferenceList,
} from '@server/api/member-stat-preference';
import {
  AddPreferenceListRequest,
  UpdatePreferenceListRequest,
} from '@server/requestTypes/member-stat-preference';
import {
  AddPreferenceListResponse,
  GetPreferenceListResponse,
  UpdatePreferenceListResponse,
} from '@server/responseTypes/member-stat-preference';

// 멤버 선호 항목 조회
export const useGetPreferenceList = (): UseSuspenseQueryResult<GetPreferenceListResponse> => {
  return useSuspenseQuery({
    queryKey: [`/members/stat/preference`],
    queryFn: () => getPreferenceList(),
  });
};

// 멤버 선호 항목 생성
export const useAddPreferenceList = (): UseMutationResult<
  AddPreferenceListResponse,
  void,
  AddPreferenceListRequest,
  unknown
> => {
  return useMutation({
    mutationFn: (data: AddPreferenceListRequest) => addPreferenceList(data),
  });
};

// 멤버 선호 항목 업데이트
export const useUpdatePreferenceList = (): UseMutationResult<
  UpdatePreferenceListResponse,
  void,
  UpdatePreferenceListRequest,
  unknown
> => {
  return useMutation({
    mutationFn: (data: UpdatePreferenceListRequest) => updatePreferenceList(data),
  });
};
