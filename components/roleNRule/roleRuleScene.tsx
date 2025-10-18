import { useCallback } from 'react';
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
  } = useGetRuleList({ roomId: roomInfo.roomId });
  const {
    data: roleData,
    isLoading: isRoleLoading,
    isFetching: isRoleFetching,
    refetch: roleRefetch,
  } = useGetRoleList({ roomId: roomInfo.roomId });

  const onRefresh = useCallback(async () => {
    // 시간 계산용
    const start = Date.now();
    console.log('[onRefresh] start');
    try {
      await Promise.all([ruleRefetch(), roleRefetch()]);
    } finally {
      const elapsed = Date.now() - start;
      const minDuration = 1000; // 최소 1초 동안은 표시
      const delay = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        console.log(`[onRefresh] done in ${Date.now() - start}ms`);
      }, delay);
    }
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
