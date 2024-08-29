import React from 'react';
import { Pressable, Text, View } from 'react-native';

import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import DoneTodoBoxIcon from '@assets/todoList/doneTodoBoxIcon.svg';

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
}

interface TodoBoxProps {
  todoData: TodoItem[];
  changeTodo: (todo: TodoItem) => void;
}

const TodoBox: React.FC<TodoBoxProps> = ({ todoData, changeTodo }) => {
  return (
    <View className="flex flex-col">
      {todoData.length !== 0 ? (
        <View className="p-2 pl-4 bg-white shadow-custom rounded-xl">
          {todoData.map((data) => (
            <View key={data.id} className="flex flex-row items-center justify-between gap-y-1">
              <Text
                className={`${
                  data.completed ? 'text-disabledFont line-through' : 'text-basicFont'
                }`}
              >
                {data.content}
              </Text>
              <Pressable onPress={() => changeTodo(data)} className="p-1.5">
                {data.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View className="flex items-center justify-center p-2 pl-4 bg-white shadow-chipback rounded-xl h-36">
          <Text className="text-sm font-medium text-disabledFont">오늘 등록된 할 일이 없어요!</Text>
        </View>
      )}
    </View>
  );
};

export default TodoBox;
