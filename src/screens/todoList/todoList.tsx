import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TodoListScreenProps } from '@type/param/stack';

import { useRecoilState } from 'recoil';
import { profileState, roomInfoState } from '@recoil/recoil';

import Background from '@assets/todoList/background.svg';
import PlusButton from '@assets/todoList/plusButton.svg';

import LoadingComponent from '@components/loading/loading';

import NavBar from '@components/navBar';

import TodoBox from '@components/todoList/todoBox';
import OthersTodoBox from '@components/todoList/othersTodoBox';

import RuleBox from '@components/todoList/ruleBox';

import MyRoleBox from '@components/todoList/myRoleBox';
import RoleBox from '@components/todoList/roleBox';

import { useChangeTodo, useGetTodoData } from '@hooks/api/todo';
import { useGetRoleData } from '@hooks/api/role';
import { useGetRuleData } from '@hooks/api/rule';

import { getDayOfWeek } from '@utils/getDay';
import { useIsOldiPhone } from '@hooks/device';
import CustomCalendar from '@components/todoList/customCalendar';

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
}

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const { bottom } = useSafeAreaInsets();
  const isOldiPhone = useIsOldiPhone();

  const [timePoint, setTimePoint] = useState<string>('');

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  const [myProfile, setMyProfile] = useRecoilState(profileState);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  const [isTodo, setIsTodo] = useState<boolean>(true);

  const handleNav = () => {
    setIsTodo(!isTodo);
  };

  const toCreate = () => {
    navigation.navigate('CreateTodoScreen', { type: isTodo ? 'todo' : 'role' });
  };

  const { data: tododata, refetch: refetchTodo } = useGetTodoData(roomInfo.roomId, timePoint);

  const { mutateAsync: changeTodoMutate, isPending: changeTodoPending } =
    useChangeTodo(refetchTodo);

  const { data: roledata, refetch: refetchRole } = useGetRoleData(roomInfo.roomId);

  const { data: ruledata, refetch: refetchRule } = useGetRuleData(roomInfo.roomId);

  const changeTodo = async (todo: TodoItem): Promise<void> => {
    changeTodoMutate({ todoId: todo.id, completed: !todo.completed });
  };

  return (
    <>
      {changeTodoPending && <LoadingComponent />}
      <View className="flex-1 bg-[#CADFFF]">
        <Background style={{ position: 'absolute' }} />
        <View className="mt-[76px] mx-5">
          <NavBar isTodo={isTodo} handleNav={handleNav} />
        </View>
        <ScrollView className="bg-[#F7FAFF] px-5 pt-[34px] rounded-tr-[48px]">
          <View style={{ paddingBottom: bottom }}>
            {isTodo ? (
              <>
                {/* 나의 투두리스트 목록 */}
                <View className="mb-14">
                  <View className="flex flex-row justify-between px-1 mb-4">
                    <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                      <Text className="text-main1">
                        {getDayOfWeek(tododata.result.timePoint)},{' '}
                      </Text>
                      {myProfile.nickname}님이
                      {'\n'}해야할 일들을 알려드릴게요!
                    </Text>
                  </View>

                  <View className="mb-3">
                    <CustomCalendar canSelectPrev={true} onDateTimeSelect={handleDateTimeSelect} />
                  </View>

                  <TodoBox
                    todoData={tododata.result.myTodoList.mateTodoList}
                    changeTodo={changeTodo}
                  />
                </View>

                {/* 다른 메이트들의 투두리스트 목록 */}
                <View style={{ paddingBottom: isOldiPhone ? 60 : bottom + 40 }}>
                  <View className="flex flex-row justify-between px-1 mb-4">
                    <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                      다른 메이트들은{'\n'}오늘 어떤 일들을 할까요?
                    </Text>
                  </View>
                  {Object.entries(tododata.result.mateTodoList).map(([name, mate]) => (
                    <OthersTodoBox
                      key={name}
                      persona={mate.persona}
                      mateTodoData={[{ name, todos: mate.mateTodoList }]}
                    />
                  ))}
                </View>
              </>
            ) : (
              <>
                {/* 코지홈의 Rule */}
                <View className="mb-14">
                  <View className="flex flex-row justify-between px-1 mb-4">
                    <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                      <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}규칙에 대해
                      알려드릴게요!
                    </Text>
                  </View>
                  <RuleBox ruleData={ruledata.result} />
                </View>

                {/* 코지홈의 Role */}
                <View style={{ paddingBottom: isOldiPhone ? 60 : bottom + 40 }}>
                  <View className="flex flex-row justify-between px-1 mb-4">
                    <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                      <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}역할에 대해
                      알려드릴게요!
                    </Text>
                  </View>

                  <MyRoleBox
                    persona={roledata.result.myRoleList.persona}
                    roleData={roledata.result.myRoleList.mateRoleList}
                    nickname={myProfile.nickname}
                  />

                  {Object.entries(roledata.result.otherRoleList).map(([name, mate], index) => (
                    <RoleBox
                      key={index}
                      persona={mate.persona}
                      roleData={[
                        {
                          name: name,
                          roles: mate.mateRoleList,
                        },
                      ]}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>

        <Pressable onPress={toCreate} className="fixed z-20 flex items-end w-fit bottom-28 right-5">
          <PlusButton />
        </Pressable>
      </View>
    </>
  );
};

export default TodoListScreen;
