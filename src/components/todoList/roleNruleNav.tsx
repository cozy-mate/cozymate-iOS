import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface RoleNRuleNavProps {
  type: string;
  changeType: (type: string) => void;
  isEdit?: boolean;
}

const RoleNRuleNav: React.FC<RoleNRuleNavProps> = ({ type, changeType, isEdit }) => {
  const navBarItems = [
    { id: 1, name: 'To-do', value: 'todo' },
    { id: 2, name: 'Role', value: 'role' },
    { id: 3, name: 'Rule', value: 'rule' },
  ];

  return (
    <View className="px-5">
      <View className="mb-6 flex flex-row gap-x-3">
        {navBarItems
          .filter((nav) => !isEdit || nav.value === type)
          .map((nav) => (
            <Pressable
              onPress={() => changeType(nav.value)}
              key={nav.id}
              className="flex flex-col items-center"
            >
              <Text
                className={`${
                  type === nav.value ? 'text-main1' : 'text-disabledFont'
                } text-lg font-semibold`}
              >
                {nav.name}
              </Text>
              <View
                className={`${
                  nav.value === type ? 'bg-main1' : 'bg-white'
                } mt-2 h-1 w-[66px] rounded-full`}
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

export default RoleNRuleNav;
