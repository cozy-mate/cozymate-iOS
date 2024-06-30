import React from 'react';
import { Text, View } from 'react-native';

interface TodoBoxProps {
  todoData: {
    index: number;
    isDone: boolean;
    name: string;
  }[];
}

const TodoBox: React.FC<TodoBoxProps> = ({ todoData }) => {
  return (
    <View className="p-2 pl-4 bg-white shadow-chipback">
      {todoData ? (
        <>
          {todoData.map((data) => (
            <View key={data.index}>
              <Text>{data.name}</Text>
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
