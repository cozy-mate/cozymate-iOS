import React from 'react';
import { Pressable, Text, View } from 'react-native';

import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import DoneTodoBoxIcon from '@assets/todoList/doneTodoBoxIcon.svg';

interface TodoBoxProps {
  todoData: {
    index: number;
    isDone: boolean;
    name: string;
  }[];
}

const TodoBox: React.FC<TodoBoxProps> = ({ todoData }) => {
  return (
    <View className="p-2 pl-4 bg-white shadow-chipback rounded-xl">
      {todoData ? (
        <>
          {todoData.map((data) => (
            <View key={data.index} className="flex flex-row items-center justify-between mb-1">
              <Text
                className={`${data.isDone ? 'text-disabledFont line-through' : 'text-basicFont'}`}
              >
                {data.name}
              </Text>
              <Pressable className="p-[6px]">
                {data.isDone ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
              </Pressable>
            </View>
          ))}
        </>
      ) : (
        <Text>오늘 등록된 할 일이 없어요!</Text>
      )}
    </View>
  );
};

export default TodoBox;
