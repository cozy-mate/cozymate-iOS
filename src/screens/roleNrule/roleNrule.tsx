import moment from 'moment';
import { ErrorBoundary } from 'react-error-boundary';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { Fragment, useState, Suspense, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, Dimensions } from 'react-native';

import NavBar from '@components/navBar';
import LoadingComponent from '@components/loading/loading';
import CustomCalendar from '@components/roleNrule/customCalendar';

import { RuleItem } from '@zustand/rule/type';
import { useRoomInfoStore } from '@zustand/room/room';
import { useTodoItemStore } from '@zustand/todo/todo';
import { useRuleItemStore } from '@zustand/rule/rule';
import { useRoleItemStore } from '@zustand/role/role';
import { useProfileStore } from '@zustand/member/member';

import { useGetRuleData } from '@hooks/api/rule';
import { useGetRoleData } from '@hooks/api/role';
import { useChangeTodo, useGetTodoData } from '@hooks/api/todo';

import { formatDate } from '@utils/getDay';
import { getProfileImage } from '@utils/profileImage';

import { RoleNRuleScreenProps } from '@type/param/stack';

import SettingIcon from '@assets/roleNrule/setting.svg';
import Background from '@assets/roleNrule/background.svg';
import PlusButton from '@assets/roleNrule/plusButton.svg';
import TodoBoxIcon from '@assets/roleNrule/todoBoxIcon.svg';
import DoneTodoBoxIcon from '@assets/roleNrule/doneTodoBoxIcon.svg';

interface TodoItem {
  todoId: number;
  content: string;
  completed: boolean;
  todoType: string;
  mateIdList: number[];
}

interface RoleItem {
  roleId: number;
  mateList: { mateId: number; nickname: string }[];
  content: string;
  repeatDayList: string[];
  isAllDays: boolean;
}

const RoleNRule = ({ navigation }: RoleNRuleScreenProps) => {
  const width = Dimensions.get('screen').width;
  const { bottom } = useSafeAreaInsets();

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

  const { data: tododata, refetch: refetchTodoData } = useGetTodoData(roomInfo.roomId, timePoint);

  const { mutateAsync: changeTodoMutate } = useChangeTodo(roomInfo.roomId, refetchTodoData);

  const changeTodo = async (todo: TodoItem): Promise<void> => {
    changeTodoMutate({ todoId: todo.todoId, completed: !todo.completed });
  };

  const { setTodoItem } = useTodoItemStore();

  const handleTodoItem = (todo: TodoItem) => {
    setTodoItem({
      todoId: todo.todoId,
      content: todo.content,
      type: todo.todoType,
      timePoint: timePoint === '' ? moment().format('YYYY-MM-DD') : timePoint,
      mateIdList: todo.mateIdList,
    });
  };

  const { data: ruledata, refetch: refetchRuleData } = useGetRuleData(roomInfo.roomId);

  const { setRuleItem } = useRuleItemStore();

  const handleRuleItem = (rule: RuleItem) => {
    setRuleItem(rule);
  };

  const { data: roledata, refetch: refetchRoleData } = useGetRoleData(roomInfo.roomId);

  const { setRoleItem } = useRoleItemStore();

  const handleRoleItem = (role: RoleItem) => {
    setRoleItem({
      roleId: role.roleId,
      mateList: role.mateList,
      content: role.content,
      repeatDayList: role.repeatDayList,
      isAllDays: role.isAllDays,
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetchTodoData();
      refetchRuleData();
      refetchRoleData();
    }, []),
  );

  return (
    <View className="flex-1 bg-sub1">
      <View className="px-5 pt-[76px]" style={{ position: 'relative' }}>
        <Background width={width} style={{ position: 'absolute', top: 0 }} />
        <NavBar type={type} handleNav={handleNav} />
      </View>
      <ScrollView className="rounded-tr-[48px] bg-[#F7FAFF] px-5 pt-[34px]">
        {type === 'todo' && (
          <View>
            {/* 달력 */}
            <View className="mb-8">
              <CustomCalendar canSelectPrev={true} onDateTimeSelect={handleDateTimeSelect} />
            </View>

            <View className="mb-12 space-y-4">
              {/* 나의 Todo */}
              <View className="flex flex-row justify-between px-1">
                <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                  <Text className="text-main1">{formatDate(tododata.result.timePoint)}, </Text>
                  {profile.nickname}님이
                  {'\n'}해야할 일들을 알려드릴게요!
                </Text>
              </View>

              {/* 나의 Todo */}
              <View className="rounded-xl border border-[#F1F1F1] bg-white p-2">
                {tododata.result.myTodoList.todoList.length !== 0 ? (
                  tododata.result.myTodoList.todoList.map((todo, index) => (
                    <View
                      key={todo.todoId}
                      className={`mb-1 flex flex-row items-center justify-between ${
                        index == tododata.result.myTodoList.todoList.length - 1 && 'mb-0'
                      }`}
                    >
                      <View className="flex flex-row items-center">
                        <Pressable onPress={() => changeTodo(todo)}>
                          {todo.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
                        </Pressable>
                        <Text className="text-sm font-medium text-basicFont">{todo.content}</Text>
                        <View
                          className={`ml-1.5 h-1.5 w-1.5 rounded-full ${
                            todo.todoType === 'group' && 'bg-main1'
                          } ${todo.todoType === 'other' && 'bg-main2'} ${
                            todo.todoType === 'role' && 'bg-[#ACE246]'
                          }`}
                        />
                      </View>

                      {todo.todoType !== 'role' && (
                        <Pressable
                          onPress={() => {
                            toEdit('todo', todo.todoId);
                            handleTodoItem(todo);
                          }}
                          className="px-2.5 py-[18px]"
                        >
                          <SettingIcon />
                        </Pressable>
                      )}
                    </View>
                  ))
                ) : (
                  <View className="flex h-36 items-center justify-center">
                    <Text className="text-sm font-medium text-disabledFont">
                      오늘 등록된 할 일이 없어요!
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={{ paddingBottom: bottom + 60 }} className="space-y-4">
              <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                다른 메이트들은{'\n'}오늘 어떤 일들을 할까요?
              </Text>
              {Object.entries(tododata.result.mateTodoList).map(([key, value]) => (
                <View
                  key={key}
                  className="flex flex-col rounded-xl border border-[#F1F1F1] bg-white pb-2 pt-4"
                >
                  <View className="mb-2 flex flex-row items-center space-x-1.5 px-4">
                    <View>{getProfileImage(value.memberDetail.persona, 24, 24)}</View>
                    <Text className="text-sm font-semibold text-emphasizedFont">{key}</Text>
                  </View>
                  <View className="flex flex-col">
                    {value.todoList.length !== 0 ? (
                      value.todoList.map((todo) => (
                        <View className="flex flex-row items-center px-2" key={todo.todoId}>
                          {todo.completed ? <DoneTodoBoxIcon /> : <TodoBoxIcon />}
                          <Text className="text-sm font-medium text-basicFont">{todo.content}</Text>
                        </View>
                      ))
                    ) : (
                      <View className="flex h-10 flex-row items-center px-4">
                        <Text className="text-sm font-medium text-disabledFont">
                          오늘 등록된 할 일이 없어요!
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {type === 'rolerule' && (
          <Fragment>
            <View className="mb-14">
              <Text className="mb-4 px-1 text-lg font-semibold leading-5 text-basicFont">
                <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}규칙에 대해 알려드릴게요!
              </Text>

              {ruledata.result.length !== 0 ? (
                <View className="space-y-1 rounded-xl border border-[#F1F1F1] bg-white p-2 pl-4">
                  {ruledata.result.map((rule, index) => (
                    <View key={rule.ruleId} className="flex flex-row items-center justify-between">
                      <View className="flex flex-1 flex-row items-center">
                        <View className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-colorBox">
                          <Text className="text-center text-xs font-medium text-colorFont">
                            {index + 1}
                          </Text>
                        </View>
                        <View className="flex flex-1 flex-col justify-center space-y-0.5">
                          <Text className="text-sm font-medium text-basicFont">{rule.content}</Text>
                          {rule.memo !== '' && (
                            <Text className="text-[10px] font-medium text-disabledFont">
                              {rule.memo}
                            </Text>
                          )}
                        </View>
                      </View>

                      <Pressable
                        onPress={() => {
                          toEdit('rule', rule.ruleId);
                          handleRuleItem(rule);
                        }}
                        className="px-2.5 py-[18px]"
                      >
                        <SettingIcon />
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="flex h-36 items-center justify-center rounded-xl border border-[#F1F1F1] bg-white">
                  <Text className="text-sm font-medium text-disabledFont">
                    등록된 규칙이 없어요!
                  </Text>
                </View>
              )}
            </View>

            <View style={{ paddingBottom: bottom + 60 }} className="space-y-4">
              <Text className="px-1 text-lg font-semibold leading-5 text-basicFont">
                <Text className="text-main1">{roomInfo.name}</Text>의{'\n'}역할에 대해 알려드릴게요!
              </Text>
              {roledata.result.length !== 0 ? (
                roledata.result.map((role) => (
                  <View
                    key={role.roleId}
                    className="flex flex-row justify-between rounded-xl border border-[#F1F1F1] bg-white p-4 pr-2"
                  >
                    <View className="flex flex-col items-start">
                      <View className="mb-1.5 rounded-sm bg-colorBox px-2 py-0.5">
                        {role.repeatDayList.length === 7 ? (
                          <Text className="text-xs font-medium text-colorFont">매일</Text>
                        ) : role.repeatDayList.length === 0 ? (
                          <Text className="text-xs font-medium text-colorFont">미정</Text>
                        ) : (
                          <Text className="text-xs font-medium text-colorFont">
                            {role.repeatDayList.join(', ')}
                          </Text>
                        )}
                      </View>
                      <Text className="mb-2 text-sm font-semibold text-emphasizedFont">
                        {role.content}
                      </Text>
                      <Text className="text-sm font-medium text-basicFont">
                        {role.mateList.map((mate) => mate.nickname).join(', ')}
                      </Text>
                    </View>

                    {role.mateList.some((mate) => mate.nickname === profile.nickname) && (
                      <Pressable
                        onPress={() => {
                          toEdit('role', role.roleId);
                          handleRoleItem(role);
                        }}
                        className="p-2.5 pb-[26px]"
                      >
                        <SettingIcon />
                      </Pressable>
                    )}
                  </View>
                ))
              ) : (
                <View className="flex h-36 items-center justify-center rounded-xl border border-[#F1F1F1] bg-white">
                  <Text className="text-sm font-medium text-disabledFont">
                    등록된 역할이 없어요!
                  </Text>
                </View>
              )}
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

const RoleNRuleScreen = ({ navigation, route }: RoleNRuleScreenProps) => {
  return (
    <ErrorBoundary
      fallback={
        <View className="h-full w-full flex-1 items-center justify-center">
          <Text>Error loading RoleNRule</Text>
        </View>
      }
    >
      <Suspense fallback={<LoadingComponent />}>
        <RoleNRule navigation={navigation} route={route} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RoleNRuleScreen;
