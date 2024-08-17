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
  setMyTodoData: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoBox: React.FC<TodoBoxProps> = ({ todoData, setMyTodoData }) => {
  const toggleTodo = (id: number) => {
    setMyTodoData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  return (
    <View className="flex flex-col">
      <View className="p-2 pl-4 bg-white shadow-chipback rounded-xl">
        {todoData ? (
          <>
            {todoData.map((data) => (
              <View
                key={data.id}
                className={`flex flex-row items-center justify-between mb-1 ${
                  data.id === todoData.length && 'mb-0'
                }`}
              >
                <Text
                  className={`${
                    data.completed ? 'text-disabledFont line-through' : 'text-basicFont'
                  }`}
                >
                  {data.content}
                </Text>
                <Pressable onPress={() => toggleTodo(data.id)} className="p-1.5">
                  {data.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
                </Pressable>
              </View>
            ))}
          </>
        ) : (
          <Text className="text-sm font-medium text-disabledFont">오늘 등록된 할 일이 없어요!</Text>
        )}
      </View>
    </View>
  );
};

export default TodoBox;
