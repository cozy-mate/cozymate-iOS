import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Background from '@assets/background.svg';

import { TodoListScreenProps } from '@type/param/loginStack';
import NavBar from '@components/navBar';
import TodoList from '@components/todoList/todoList';
import RoleRule from '@components/todoList/roleRule';
import { dummyData } from './dummyData';

interface TodoItem {
  index: number;
  isDone: boolean;
  name: string;
}

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [isTodo, setIsTodo] = useState<boolean>(true);

  const [myTodoData, setMyTodoData] = useState<TodoItem[]>(dummyData.todoData);

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
      <ScrollView className="bg-[#F7FAFF] px-5 pt-[34px] rounded-tr-[48px]">
        {isTodo ? <TodoList todoData={myTodoData} setMyTodoData={setMyTodoData} /> : <RoleRule />}
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;
