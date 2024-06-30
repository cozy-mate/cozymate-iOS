import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

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
      <View className="mt-[76px] mx-5">
        <NavBar isTodo={isTodo} handleTodo={handleTodo} handleRoleRule={handleRoleRule} />
      </View>
      <ScrollView className="bg-[#F7FAFF] px-5 pt-[34px]">
        <Text className="text-base font-semibold text-emphasizedFont">
          오늘 <Text className="text-main">델로</Text>님이
        </Text>
        <Text className="text-base font-semibold text-emphasizedFont">
          해야할 일들을 알려드릴게요!
        </Text>
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;
