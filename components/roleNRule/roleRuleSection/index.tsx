import BottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import { useGetRoleList } from '@/hooks/role/role';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useGetRuleList } from '@/hooks/rule/rule';

import RoleContainer from './roleContainer';
import RuleContainer from './ruleContainer';

interface RoleRuleSectionProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const RoleRuleSection: React.FC<RoleRuleSectionProps> = ({ bottomSheetRef }) => {
  const { data: hasRoom } = useCheckHasRoom();

  const { data: ruleData } = useGetRuleList(hasRoom.result.roomId);
  const { data: roleData } = useGetRoleList(hasRoom.result.roomId);

  return (
    <View className="pt-[34px] gap-y-[32px] flex-1 pb-[112px]">
      <RuleContainer data={ruleData?.result} bottomSheetRef={bottomSheetRef} />
      <RoleContainer data={roleData?.result} bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

export default RoleRuleSection;
