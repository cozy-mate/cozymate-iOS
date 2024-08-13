import React from 'react';
import { Pressable, Text, View } from 'react-native';

import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import DoneTodoBoxIcon from '@assets/todoList/doneTodoBoxIcon.svg';

interface TodoItem {
  index: number;
  isDone: boolean;
  name: string;
}

interface TodoBoxProps {
  todoData: TodoItem[];
  setMyTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoBox: React.FC<TodoBoxProps> = ({ todoData, setMyTodoData }) => {
  const toggleTodo = (index: number) => {
    setMyTodoData((prevData) =>
      prevData.map((item) => (item.index === index ? { ...item, isDone: !item.isDone } : item)),
    );
  };

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
              <Pressable onPress={() => toggleTodo(data.index)} className="p-1.5">
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
