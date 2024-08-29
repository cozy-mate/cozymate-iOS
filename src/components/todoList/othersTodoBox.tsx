import React from 'react';
import { Image, Text, View } from 'react-native';

import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import DoneTodoBoxIcon from '@assets/todoList/doneTodoBoxIcon.svg';
import Config from 'react-native-config';
import { getProfileImage } from '@utils/profileImage';

interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
}

interface MateTodo {
  name: string;
  todos: TodoItem[];
}

interface OthersTodoBoxProps {
  persona: number;

  mateTodoData: MateTodo[];
}

const OthersTodoBox: React.FC<OthersTodoBoxProps> = ({ persona, mateTodoData }) => {
  return (
    <View className="p-4 pb-2 pr-2 mb-4 bg-white shadow-chipback rounded-xl">
      {mateTodoData.map((mate) => (
        <View key={mate.name}>
          <View className="flex flex-row items-center mb-1">
            {getProfileImage(persona, 24, 24)}
            <Text className="ml-1.5 font-medium text-emphasizedFont">{mate.name}</Text>
          </View>
          {mate.todos && mate.todos.length > 0 ? (
            mate.todos.map((data) => (
              <View
                key={data.id}
                className={`flex flex-row items-center justify-between mb-1 ${
                  data.id === mate.todos.length && 'mb-0'
                }`}
              >
                <Text
                  className={`${
                    data.completed ? 'text-disabledFont line-through' : 'text-basicFont'
                  }`}
                >
                  {data.content}
                </Text>
                <View className="p-1.5">
                  {data.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
                </View>
              </View>
            ))
          ) : (
            <Text className="mb-1 text-sm font-medium text-disabledFont py-1.5">
              오늘 등록된 할 일이 없어요!
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default OthersTodoBox;
