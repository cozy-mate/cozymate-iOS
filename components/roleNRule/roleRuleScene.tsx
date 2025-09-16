import { ScrollView } from 'react-native';
import RuleContainer from './rule/ruleContainer';
import RoleContainer from './role/roleContainer';
import { useGetRuleList } from '@/hooks/rule/rule';
import { useGetRoleList } from '@/hooks/role/role';
import { useMemberStore } from '@/zustand/store';
import BottomSheet from '@gorhom/bottom-sheet';
import { RefObject, useRef } from 'react';

export default function RoleNRuleScene() {
  const { roomInfo } = useMemberStore();

  const { data: ruleData, isFetching: isRuleFetching } = useGetRuleList(roomInfo?.roomId ?? 0);
  const { data: roleData, isFetching: isRoleFetching } = useGetRoleList(roomInfo?.roomId ?? 0);

  const bottomSheetRef = useRef<BottomSheet>(null);

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
    >
      <RuleContainer
        isFetching={isRuleFetching}
        data={ruleData?.result}
        bottomSheetRef={bottomSheetRef as RefObject<BottomSheet>}
      />

      <RoleContainer
        isFetching={isRoleFetching}
        data={roleData?.result}
        bottomSheetRef={bottomSheetRef as RefObject<BottomSheet>}
      />
    </ScrollView>
  );
}
