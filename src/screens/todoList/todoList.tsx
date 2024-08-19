import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavBar from '@components/navBar';

import { TodoListScreenProps } from '@type/param/roomStack';

import Background from '@assets/background.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';

import PlusButton from '@assets/plusButton.svg';

import TodoBox from '@components/todoList/todoBox';
import OthersTodoBox from '@components/todoList/othersTodoBox';
import RuleBox from '@components/todoList/ruleBox';
import RoleBox from '@components/todoList/roleBox';

import { getDayOfWeek } from '@utils/getDay';

import { dummyData, roleDummyData, ruleDummyData } from './dummyData';
import MyRoleBox from '@components/todoList/myRoleBox';
import ControlModal from '@components/feedView/controlModal';
import { useFeedModal } from '@hooks/useFeedModal';

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
}

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [isTodo, setIsTodo] = useState<boolean>(true);

  const [myTodoData, setMyTodoData] = useState<TodoItem[]>(dummyData.myTodoList);

  const { bottom } = useSafeAreaInsets();

  const mateTodoData = Object.entries(dummyData.mateTodoList).map(([name, todos]) => ({
    name,
    todos,
  }));

  const mateRoleData = Object.entries(roleDummyData.otherRoleList).map(([name, roles]) => ({
    name,
    roles,
  }));

  const handleTodo = () => {
    setIsTodo(true);
  };

  const handleRoleRule = () => {
    setIsTodo(false);
  };

  const toCreate = () => {
    navigation.navigate('CreateTodoScreen');
  };

  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();

  return (
    <View className="flex-1 bg-[#CADFFF]" onTouchEnd={onPressModalClose}>
      <Background style={{ position: 'absolute' }} />
      <View className="mt-[76px] mx-5">
        <NavBar isTodo={isTodo} handleTodo={handleTodo} handleRoleRule={handleRoleRule} />
      </View>
      <ScrollView className="bg-[#F7FAFF] px-5 pt-[34px] rounded-tr-[48px]">
        <View>
          {isTodo ? (
            <>
              {/* 나의 투두리스트 목록 */}
              <View className="mb-14">
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    <Text className="text-main1">델로</Text>님이{'\n'}해야할 일들을 알려드릴게요!
                  </Text>
                  <Pressable onPress={onPressModalOpen} ref={dotIconRef}>
                    <SettingIcon />
                  </Pressable>

                  <ControlModal
                    isModalVisible={isModalVisible}
                    modalPosition={modalPosition}
                    onSubmit={onPressModalClose}
                    onEdit={toCreate}
                    onPressModalClose={onPressModalClose}
                  />
                </View>
                <TodoBox todoData={myTodoData} setMyTodoData={setMyTodoData} />
              </View>

              {/* 다른 메이트들의 투두리스트 목록 */}
              <View style={{ paddingBottom: bottom }}>
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    다른 메이트들은{'\n'}오늘 어떤 일들을 할까요?
                  </Text>
                </View>
                {mateTodoData.map((mate, index) => (
                  <OthersTodoBox key={index} mateTodoData={[mate]} />
                ))}
              </View>
            </>
          ) : (
            <>
              {/* 코지홈의 Rule */}
              <View className="mb-14">
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    <Text className="text-main1">피그말리온</Text>의{'\n'}규칙에 대해 알려드릴게요!
                  </Text>
                  <SettingIcon />
                </View>
                <RuleBox ruleData={ruleDummyData} />
              </View>

              {/* 코지홈의 Role */}
              <View style={{ paddingBottom: bottom }}>
                <View className="flex flex-row justify-between px-1 mb-4">
                  <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                    <Text className="text-main1">피그말리온</Text>의{'\n'}역할에 대해 알려드릴게요!
                  </Text>
                  <SettingIcon />
                </View>

                <MyRoleBox roleData={roleDummyData.myRoleList} nickname="델로" />

                {mateRoleData.map((mate, index) => (
                  <RoleBox key={index} roleData={[mate]} />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className="absolute z-20 bottom-8 right-5 w-fit">
        <Pressable onPress={toCreate} className="w-fit">
          <PlusButton />
        </Pressable>
      </View>
    </View>
  );
};

export default TodoListScreen;
