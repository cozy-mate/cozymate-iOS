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
      <View>
        <Pressable onPress={handleTodo}>
          <Text
            className={`${
              isTodo ? 'text-main border-main border-b-4' : 'text-disabledFont'
            } p-1 pb-3 text-base font-semibold mr-6`}
          >
            To - do
          </Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={handleRoleRule}>
          <Text
            className={`${
              !isTodo ? 'text-main border-main border-b-4' : 'text-disabledFont'
            } p-1 pb-3 text-base font-semibold `}
          >
            Role & Rule
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NavBar;
