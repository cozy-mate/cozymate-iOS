import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Background from '@assets/background.svg';

import { TodoListScreenProps } from '@type/param/loginStack';
import NavBar from '@components/navBar';
import RoleRule from '@components/todoList/roleRule';
import { dummyData } from './dummyData';
import OthersTodoBox from '@components/todoList/othersTodoBox';
import TodoBox from '@components/todoList/todoBox';

import SettingIcon from '@assets/todoList/settingIcon.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDayOfWeek } from '@utils/getDay';

import PlusButton from '@assets/plusButton.svg';

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
}

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [isTodo, setIsTodo] = useState<boolean>(true);

  const [myTodoData, setMyTodoData] = useState<TodoItem[]>(dummyData.myTodoList);

  const { bottom } = useSafeAreaInsets();

  const mateTodoData = Object.entries(dummyData.mateTodoList).map(([name, todos]) => ({
    name,
    todos,
  }));

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
      <ScrollView className={`bg-[#F7FAFF] px-5 pt-[34px] rounded-tr-[48px]`}>
        {isTodo ? (
          <View style={{ position: 'relative' }}>
            <View className="flex flex-col mb-14">
              <View className="flex flex-row justify-between mb-4">
                <Text className="px-1 text-lg font-semibold text-emphasizedFont">
                  {getDayOfWeek(dummyData.timePoint)}, <Text className="text-main1">델로</Text>
                  님이{'\n'}
                  해야할 일들을 알려드릴게요!
                </Text>
                <SettingIcon />
              </View>
              <TodoBox todoData={myTodoData} setMyTodoData={setMyTodoData} />
            </View>

            <View style={{ paddingBottom: bottom }}>
              <Text className="px-1 mb-4 text-lg font-semibold text-emphasizedFont">
                다른 메이트들은{'\n'}오늘 어떤 일들을 할까요?
              </Text>

              {mateTodoData.map((mate, index) => (
                <OthersTodoBox key={index} mateTodoData={[mate]} />
              ))}
            </View>

            <View className="z-30" style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <PlusButton />
            </View>
          </View>
        ) : (
          <View>
            <RoleRule />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;
