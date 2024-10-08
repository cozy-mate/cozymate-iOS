import React from 'react';
import { Text, View, Pressable } from 'react-native';

interface NavBarProps {
  isTodo: boolean;
  handleNav: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isTodo, handleNav }) => {
  return (
    <View className="flex flex-row">
      <View className="mr-6 flex flex-col items-center">
        <Pressable onPress={handleNav}>
          <Text
            className={`${
              isTodo ? 'text-main1' : 'text-disabledFont'
            } px-[17.5px] pt-1 text-center text-base font-semibold`}
          >
            To - do
          </Text>
          <View className={`${isTodo ? 'bg-main1' : 'bg-sub1'} mt-2 h-1 w-[88px] rounded-full`} />
        </Pressable>
      </View>

      <View className="flex flex-col items-center">
        <Pressable onPress={handleNav}>
          <Text
            className={`${
              !isTodo ? 'text-main1' : 'text-disabledFont'
            } pt-1 text-center text-base font-semibold tracking-tight`}
          >
            Role & Rule
          </Text>
          <View className={`${!isTodo ? 'bg-main1' : 'bg-sub1'} mt-2 h-1 w-[88px] rounded-full`} />
        </Pressable>
      </View>
    </View>
  );
};

export default NavBar;
