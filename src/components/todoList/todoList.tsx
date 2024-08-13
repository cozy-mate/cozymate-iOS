import React from 'react';
import { Text, View } from 'react-native';
import TodoBox from './todoBox';

import SettingIcon from '@assets/todoList/settingIcon.svg';

interface TodoItem {
  index: number;
  isDone: boolean;
  name: string;
}

interface TodoListProps {
  todoData: TodoItem[];
  setMyTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todoData, setMyTodoData }) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-base font-semibold text-emphasizedFont">
            6/30 (일), <Text className="text-main1">델로</Text>님이
          </Text>
          <Text className="text-base font-semibold text-emphasizedFont">
            해야할 일들을 알려드릴게요!
          </Text>
        </View>
        <SettingIcon />
      </View>
      <TodoBox todoData={todoData} setMyTodoData={setMyTodoData} />
    </View>
  );
};

export default TodoList;
