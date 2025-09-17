import BottomSheet from '@gorhom/bottom-sheet';
import { RefObject, useCallback, useRef } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { useGetRoleList } from '@/hooks/role/role';
import { useGetRuleList } from '@/hooks/rule/rule';
import { useMemberStore } from '@/zustand/store';

import RoleContainer from './role/roleContainer';
import RuleContainer from './rule/ruleContainer';

export default function RoleNRuleScene() {
  const { roomInfo } = useMemberStore();

  const {
    data: ruleData,
    isLoading: isRuleLoading,
    isFetching: isRuleFetching,
    refetch: ruleRefetch,
  } = useGetRuleList(roomInfo?.roomId ?? 0);
  const {
    data: roleData,
    isLoading: isRoleLoading,
    isFetching: isRoleFetching,
    refetch: roleRefetch,
  } = useGetRoleList(roomInfo?.roomId ?? 0);

  const onRefresh = useCallback(async () => {
    await Promise.all([ruleRefetch(), roleRefetch()]);
  }, [ruleRefetch, roleRefetch]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 34,
        paddingHorizontal: 20,
        paddingBottom: 120,
        rowGap: 56,
        backgroundColor: '#F7FAFF',
      }}
      refreshControl={
        <RefreshControl
          // 초기 상태에서는 나타나지 않도록 적용
          refreshing={!isRuleLoading && !isRoleLoading && (isRuleFetching || isRoleFetching)}
          onRefresh={onRefresh}
          tintColor={'#68A4FF'}
        />
      }
    >
      <RuleContainer isFetching={isRuleFetching} data={ruleData?.result} />

      <RoleContainer isFetching={isRoleFetching} data={roleData?.result} />
    </ScrollView>
  );
}
