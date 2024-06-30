import React from 'react';
import { Text, View } from 'react-native';
import TodoBox from './todoBox';

interface TodoBoxProps {
  todoData: {
    index: number;
    isDone: boolean;
    name: string;
  }[];
}

const TodoList: React.FC<TodoBoxProps> = ({ todoData }) => {
  return (
    <View>
      <View className="mb-4">
        <Text className="text-base font-semibold text-emphasizedFont">
          오늘 <Text className="text-main">델로</Text>님이
        </Text>
        <Text className="text-base font-semibold text-emphasizedFont">
          해야할 일들을 알려드릴게요!
        </Text>
      </View>
      <TodoBox todoData={todoData} />
    </View>
  );
};

export default TodoList;
