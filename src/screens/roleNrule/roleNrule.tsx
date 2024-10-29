import React, { Fragment, useState } from 'react';
import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';

import NavBar from '@components/navBar';
import RoleBox from '@components/todoList/roleBox';
import CustomCalendar from '@components/todoList/customCalendar';

import { RuleItem } from '@zustand/rule/type';
import { useRoomInfoStore } from '@zustand/room/room';
import { useTodoItemStore } from '@zustand/todo/todo';
import { useRuleItemStore } from '@zustand/rule/rule';
import { useRoleItemStore } from '@zustand/role/role';
import { useProfileStore } from '@zustand/member/member';

import { useGetRuleData } from '@hooks/api/rule';
import { useGetRoleData } from '@hooks/api/role';
import { useChangeTodo, useGetTodoData } from '@hooks/api/todo';

import { getDayOfWeek } from '@utils/getDay';
import { getProfileImage } from '@utils/profileImage';

import { RoleNRuleScreenProps } from '@type/param/stack';

import Background from '@assets/todoList/background.svg';
import PlusButton from '@assets/todoList/plusButton.svg';
import TodoBoxIcon from '@assets/todoList/todoBoxIcon.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';
import DoneTodoBoxIcon from '@assets/todoList/doneTodoBoxIcon.svg';

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
}

interface RoleItem {
  id: number;
  content: string;
  repeatDayList: string[];
  allDays: boolean;
}

const RoleNRuleScreen = ({ navigation }: RoleNRuleScreenProps) => {
  const width = Dimensions.get('screen').width;

  const [type, setType] = useState<string>('todo');

  const [timePoint, setTimePoint] = useState<string>('');

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  const handleNav = (type: string) => {
    setType(type);
  };

  const toCreate = (type: string) => {
    const newType = type === 'rolerule' ? 'role' : type;
    navigation.navigate('CreateRoleNRuleScreen', { type: newType });
  };

  const toEdit = (type: string, id: number) => {
    navigation.navigate('EditRoleNRuleScreen', { type: type, id: id });
  };

  const { profile } = useProfileStore();
  const { roomInfo } = useRoomInfoStore();

  const { setTodoItem } = useTodoItemStore();

  const handleTodoItem = (todo: TodoItem) => {
    setTodoItem({ todoId: todo.id, content: todo.content, timePoint: timePoint });
  };

  const { setRuleItem } = useRuleItemStore();

  const handleRuleItem = (rule: RuleItem) => {
    setRuleItem(rule);
  };

  const { setRoleItem } = useRoleItemStore();

  const handleRoleItem = (role: RoleItem) => {
    setRoleItem({ title: role.content, repeatDayList: role.repeatDayList });
  };

  const { data: tododata, refetch: refetchTodo } = useGetTodoData(roomInfo.roomId, timePoint);

  const { mutateAsync: changeTodoMutate } = useChangeTodo(refetchTodo);

  const changeTodo = async (todo: TodoItem): Promise<void> => {
    changeTodoMutate({ todoId: todo.id, completed: !todo.completed });
  };

  const { data: ruledata } = useGetRuleData(roomInfo.roomId);

  const { data: roledata } = useGetRoleData(roomInfo.roomId);

  return (
    <View className="flex-1 bg-sub1">
      <View className="px-5 pt-[76px]" style={{ position: 'relative' }}>
        <Background width={width} style={{ position: 'absolute', top: 0 }} />
        <NavBar type={type} handleNav={handleNav} />
      </View>
      <ScrollView className="rounded-tr-[48px] bg-[#F7FAFF] px-5 pt-[34px]">
        {type === 'todo' && (
          <Fragment>
            <View className="mb-14">
              <View className="mb-4 flex flex-row justify-between px-1">
                <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                  <Text className="text-main1">{getDayOfWeek(tododata.result.timePoint)}, </Text>
                  {profile.nickname}님이
                  {'\n'}해야할 일들을 알려드릴게요!
                </Text>
              </View>

              <View className="mb-3">
                <CustomCalendar canSelectPrev={true} onDateTimeSelect={handleDateTimeSelect} />
              </View>

              <View className="rounded-xl border border-[#F1F1F1] bg-white p-2">
                {tododata.result.myTodoList.mateTodoList.map((todo, index) => (
                  <View
                    key={todo.id}
                    className={`mb-1 flex flex-row items-center justify-between ${
                      index == tododata.result.myTodoList.mateTodoList.length - 1 && 'mb-0'
                    }`}
                  >
                    <View className="flex flex-row items-center">
                      <Pressable onPress={() => changeTodo(todo)}>
                        {todo.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
                      </Pressable>
                      <Text>{todo.content}</Text>
                    </View>

                    <Pressable
                      onPress={() => {
                        toEdit('todo', todo.id);
                        handleTodoItem(todo);
                      }}
                    >
                      <SettingIcon />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </Fragment>
        )}

        {type === 'rolerule' && (
          <Fragment>
            <View className="mb-14">
              <Text className="mb-4 text-lg font-semibold leading-5 text-basicFont">
                <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}규칙에 대해 알려드릴게요!
              </Text>
              <View className="rounded-xl border border-[#F1F1F1] bg-white p-2 pl-4">
                {ruledata.result.map((rule, index) => (
                  <View
                    key={rule.id}
                    className={`mb-1 flex flex-row items-center justify-between ${
                      index == ruledata.result.length - 1 && 'mb-0'
                    }`}
                  >
                    <View className="flex flex-row items-center">
                      <View className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-colorBox">
                        <Text className="text-center text-xs font-medium text-colorFont">
                          {index + 1}
                        </Text>
                      </View>
                      <View className="flex flex-col justify-center">
                        <Text className="text-sm font-medium text-basicFont">{rule.content}</Text>
                        {rule.memo !== '' && (
                          <Text className="mt-0.5 text-[10px] font-medium text-disabledFont">
                            {rule.memo}
                          </Text>
                        )}
                      </View>
                    </View>

                    <Pressable
                      onPress={() => {
                        toEdit('rule', rule.id);
                        handleRuleItem(rule);
                      }}
                    >
                      <SettingIcon />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <View className="mb-4 flex flex-row justify-between px-1">
                <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                  <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}역할에 대해
                  알려드릴게요!
                </Text>
              </View>

              <View className="rounded-xl border border-[#F1F1F1] bg-white p-4 pr-2">
                <View className="mb-2 flex flex-row items-center">
                  {getProfileImage(roledata.result.myRoleList.persona, 24, 24)}
                  <Text className="ml-1.5 text-sm font-medium text-emphasizedFont">
                    {profile.nickname} <Text className="text-disabledFont">(나)</Text>
                  </Text>
                </View>
                {roledata.result.myRoleList.mateRoleList.map((role, index) => (
                  <View
                    key={role.id}
                    className={`mb-1 flex flex-row items-center justify-between ${
                      index == roledata.result.myRoleList.mateRoleList.length - 1 && 'mb-0'
                    }`}
                  >
                    <View className="flex flex-row items-center">
                      <View className="mr-1.5 rounded-sm bg-colorBox px-2 py-[2px]">
                        <Text className="text-xs font-medium text-colorFont">
                          {role.allDays ? '매일' : role.repeatDayList.join(', ')}
                        </Text>
                      </View>
                      <Text>{role.content}</Text>
                    </View>

                    <Pressable
                      onPress={() => {
                        toEdit('role', role.id);
                        handleRoleItem(role);
                      }}
                    >
                      <SettingIcon />
                    </Pressable>
                  </View>
                ))}
              </View>

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
          </Fragment>
        )}
      </ScrollView>

      <View className="fixed bottom-28 right-5 z-20 flex w-fit items-end">
        <Pressable onPress={() => toCreate(type)}>
          <PlusButton />
        </Pressable>
      </View>
    </View>
  );
};

export default RoleNRuleScreen;
