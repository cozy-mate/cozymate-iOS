import React from 'react';
import { Text, View } from 'react-native';

import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import DoneTodoBoxIcon from '@assets/todoList/doneTodoBoxIcon.svg';
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
    <View className="p-4 pb-2 pl-1 pr-2 mb-4 bg-white shadow-custom rounded-xl">
      {mateTodoData.map((mate) => (
        <View key={mate.name}>
          <View className="flex flex-row items-center mb-1 ml-2">
            {getProfileImage(persona, 24, 24)}
            <Text className="ml-1.5 font-medium text-emphasizedFont">{mate.name}</Text>
          </View>
          {mate.todos && mate.todos.length > 0 ? (
            mate.todos.map((data) => (
              <View key={data.id} className={`flex flex-row items-center`}>
                <View>{data.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}</View>
                <Text
                  className={`${
                    data.completed ? 'text-disabledFont line-through' : 'text-basicFont'
                  }`}
                >
                  {data.content}
                </Text>
              </View>
            ))
          ) : (
            <Text className="ml-2 mb-1 text-sm font-medium text-disabledFont py-1.5">
              오늘 등록된 할 일이 없어요!
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default OthersTodoBox;
