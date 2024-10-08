import React from 'react';
import { Text, View, Pressable } from 'react-native';

import ControlModal from '@components/feedView/controlModal';

import { useFeedModal } from '@hooks/useFeedModal';

import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';
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
  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();

  const toCreate = () => {
    // navigation.navigate('CreateTodoScreen', { type: isTodo ? 'todo' : 'role' });
  };

  return (
    <View className="flex flex-col">
      {todoData.length !== 0 ? (
        <View className="rounded-xl bg-white px-1 py-2 shadow-custom">
          {todoData.map((data) => (
            <View key={data.id} className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Pressable onPress={() => changeTodo(data)}>
                  {data.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
                </Pressable>
                <Text
                  className={`${
                    data.completed ? 'text-disabledFont line-through' : 'text-basicFont'
                  }`}
                >
                  {data.content}
                </Text>
              </View>

              <ControlModal
                isModalVisible={isModalVisible}
                modalPosition={modalPosition}
                onSubmit={onPressModalClose}
                onEdit={toCreate}
                onPressModalClose={onPressModalClose}
              />

              <Pressable onPress={onPressModalOpen} ref={dotIconRef}>
                <SettingIcon />
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View className="flex h-36 items-center justify-center rounded-xl bg-white px-1 py-2 shadow-chipback">
          <Text className="text-sm font-medium text-disabledFont">오늘 등록된 할 일이 없어요!</Text>
        </View>
      )}
    </View>
  );
};

export default TodoBox;
