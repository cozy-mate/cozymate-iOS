import { Pressable, Text, View } from 'react-native';

interface RoleNRuleHeaderProps {
  currentType: 'To-do' | 'Role';
  handleType: (e: 'To-do' | 'Role') => void;
}

const RoleNRuleHeader: React.FC<RoleNRuleHeaderProps> = ({ currentType, handleType }) => {
  return (
    <View className="flex flex-row gap-x-[24px] px-[20px] mt-[28px]">
      <Pressable onPress={() => handleType('To-do')} className="w-[92px] gap-y-[8px]">
        <Text
          className={`text-center Semibold16 p-[4px] ${currentType === 'To-do' ? 'text-mainColor' : 'text-disabledFont'}`}
        >
          To - do
        </Text>

        <View
          className={`h-[4px] rounded-[32px] ${currentType === 'To-do' ? 'bg-mainColor' : 'bg-subColor1'}`}
        />
      </Pressable>

      <Pressable onPress={() => handleType('Role')} className="w-[92px] gap-y-2">
        <Text
          className={`text-center Semibold16 p-[4px] ${currentType === 'Role' ? 'text-mainColor' : 'text-disabledFont'}`}
        >
          Role & Rule
        </Text>

        <View
          className={`h-[4px] rounded-[32px] ${currentType === 'Role' ? 'bg-mainColor' : 'bg-subColor1'}`}
        />
      </Pressable>
    </View>
  );
};

export default RoleNRuleHeader;
