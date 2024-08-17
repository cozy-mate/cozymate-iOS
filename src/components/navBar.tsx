import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface NavBarProps {
  isTodo: boolean;
  handleTodo: () => void;
  handleRoleRule: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isTodo, handleTodo, handleRoleRule }) => {
  return (
    <View className="flex flex-row">
      <View className="flex flex-col items-center mr-6">
        <Pressable onPress={handleTodo}>
          <Text
            className={`${
              isTodo ? 'text-main1' : 'text-disabledFont'
            } px-[17.5px] pt-1 text-base font-semibold`}
          >
            To - do
          </Text>
          <View className={`${isTodo ? 'bg-main1' : 'bg-sub1'} h-1 w-[88px] rounded-full mt-2`} />
        </Pressable>
      </View>

      <View className="flex flex-col items-center">
        <Pressable onPress={handleRoleRule}>
          <Text
            className={`${
              !isTodo ? 'text-main1' : 'text-disabledFont'
            } pt-1 text-base font-semibold tracking-[-0.02em]`}
          >
            Role & Rule
          </Text>
          <View className={`${!isTodo ? 'bg-main1' : 'bg-sub1'} h-1 w-[88px] rounded-full mt-2`} />
        </Pressable>
      </View>
    </View>
  );
};

export default NavBar;
