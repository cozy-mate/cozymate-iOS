import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import Background from '@assets/background.svg';

import { TodoListScreenProps } from '@type/param/stack';
import NavBar from '@components/navBar';

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [isTodo, setIsTodo] = useState<boolean>(true);

  const handleTodo = () => {
    setIsTodo(true);
  };

  const handleRoleRule = () => {
    setIsTodo(false);
  };

  return (
    <View className="flex-1 bg-[#CADFFF]">
      <Background style={{ position: 'absolute' }} />
      <View className="mt-[76px] mx-6">
        <NavBar isTodo={isTodo} handleTodo={handleTodo} handleRoleRule={handleRoleRule} />
      </View>
    </View>
  );
};

export default TodoListScreen;
