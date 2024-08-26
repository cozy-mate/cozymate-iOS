import React, { useState } from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useRecoilValue } from 'recoil';
import { roomInfoState } from '@recoil/recoil';

import CustomCheckInputBox from '@components/common/customCheckInputBox';
import CustomTextarea from '@components/common/customTextarea';
import CustomTextInputBox from '@components/common/customTextInputBox';
import CustomCalendar from '@components/todoList/customCalendar';
import DaySelect from '@components/todoList/daySelect';
import SubmitButton from '@components/todoList/submitButton';

import LoadingComponent from '@components/loading/loading';

import BackNav from 'src/layout/backNav';

import { CreateTodoScreenProps } from '@type/param/roomStack';
import { useAddMyTodo, useGetTodoData } from '@hooks/api/todo';
import { useAddRule, useGetRuleData } from '@hooks/api/rule';
import { useAddRole, useGetRoleData } from '@hooks/api/role';

const CreateTodoScreen = ({ navigation, route }: CreateTodoScreenProps) => {
  const roomInfo = useRecoilValue(roomInfoState);

  const [type, setType] = useState<string>(route.params.type);

  const toTodo = () => {
    navigation.navigate('MainScreen', { screen: 'TodoListScreen' });
  };

  // Todo
  const [todoContent, setTodoContent] = useState<string>('');
  const [timePoint, setTimePoint] = useState<string>('');

  const { refetch: refetchTodo } = useGetTodoData(roomInfo.roomId);
  const { mutateAsync: addTodoMutate, isPending: addTodoPending } = useAddMyTodo(
    roomInfo.roomId,
    refetchTodo,
  );

  // Rule
  const [ruleContent, setRuleContent] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const { refetch: refetchRule } = useGetRuleData(roomInfo.roomId);
  const { mutateAsync: addRuleMutate, isPending: addRulePending } = useAddRule(
    roomInfo.roomId,
    refetchRule,
  );

  // Role
  const [mateIdList, setMateIdList] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');
  const [repeatDayList, setRepeatDayList] = useState<string[]>([]);

  const { refetch: refetchRole } = useGetRoleData(roomInfo.roomId);
  const { mutateAsync: addRoleMutate, isPending: addRolePending } = useAddRole(
    roomInfo.roomId,
    refetchRole,
    refetchTodo,
  );

  const navBarItems = [
    { id: 1, name: 'To-do', value: 'todo' },
    { id: 2, name: 'Role', value: 'role' },
    { id: 3, name: 'Rule', value: 'rule' },
  ];

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  // 해당 데이터 지우기
  const resetState = () => {
    if (type === 'todo') {
      setTodoContent('');
      setTimePoint('');
    } else if (type === 'role') {
      setMateIdList([]);
      setTitle('');
      setRepeatDayList([]);
    } else if (type === 'rule') {
      setRuleContent('');
      setMemo('');
    }
  };

  // Navigation 클릭 시 해당 데이터 지우고 이동
  const handleNavBarItemPress = (navValue: string) => {
    setType(navValue);
    resetState();
  };

  // 생성 가능한 지 여부 확인
  const canSubmit = () => {
    if (type === 'todo') {
      return todoContent.trim() !== '' && !!timePoint;
    } else if (type === 'role') {
      return mateIdList.length > 0 && title.trim() !== '' && repeatDayList.length > 0;
    } else if (type === 'rule') {
      return ruleContent.trim() !== '';
    }
    return false;
  };

  // Todo / Role / Rule 생성하기
  const handleSubmit = async () => {
    if (type === 'todo') {
      if (todoContent.trim() === '' || !timePoint) {
        return;
      }
      try {
        await addTodoMutate({ content: todoContent, timePoint: timePoint });
        resetState();
        toTodo();
      } catch (error) {
        console.log(error);
      }
    } else if (type === 'role') {
      if (mateIdList.length === 0 || title.trim() === '' || repeatDayList.length === 0) {
        return;
      }
      try {
        await addRoleMutate({ mateIdList, title, repeatDayList });
        resetState();
        toTodo();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else if (type === 'rule') {
      if (ruleContent.trim() === '') {
        return;
      }
      try {
        await addRuleMutate({ content: ruleContent, memo });
        resetState();
        toTodo();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {addTodoPending && <LoadingComponent />}
      {addRulePending && <LoadingComponent />}
      {addRolePending && <LoadingComponent />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex flex-col justify-between flex-1 px-5 bg-white">
          <View className="flex">
            <BackNav leftPressFunc={toTodo} />
            <View className="px-5">
              <View className="flex flex-row mb-6 gap-x-3">
                {navBarItems.map((nav) => (
                  <Pressable
                    onPress={() => handleNavBarItemPress(nav.value)}
                    key={nav.id}
                    className="flex flex-col items-center"
                  >
                    <Text
                      className={`${
                        type === nav.value ? 'text-main1' : 'text-disabledFont'
                      } text-lg font-semibold`}
                    >
                      {nav.name}
                    </Text>
                    <View
                      className={`${
                        nav.value == type ? 'bg-main1' : 'bg-white'
                      } h-1 w-[66px] rounded-full mt-2`}
                    />
                  </Pressable>
                ))}
              </View>

              {type == 'todo' && (
                <>
                  <CustomTextInputBox
                    title="할 일을 입력해주세요"
                    value={todoContent}
                    setValue={setTodoContent}
                    placeholder="할 일을 입력해주세요"
                  />
                  <CustomCalendar onDateTimeSelect={handleDateTimeSelect} />
                </>
              )}

              {type == 'role' && (
                <>
                  <CustomCheckInputBox
                    title="담당자를 선택해주세요"
                    selectedValues={mateIdList}
                    setSelectedValues={setMateIdList}
                    items={roomInfo.mateList}
                  />

                  <CustomTextInputBox
                    title="역할을 입력해주세요"
                    value={title}
                    setValue={setTitle}
                    placeholder="역할을 입력해주세요"
                  />
                  <DaySelect repeatDayList={repeatDayList} setRepeatDayList={setRepeatDayList} />
                </>
              )}

              {type == 'rule' && (
                <>
                  <CustomTextInputBox
                    title="규칙을 입력해주세요"
                    value={ruleContent}
                    setValue={setRuleContent}
                    placeholder="규칙을 입력해주세요"
                  />
                  <CustomTextarea
                    title="메모를 추가해주세요 (선택)"
                    value={memo}
                    setValue={setMemo}
                    placeholder="내용을 입력해주세요"
                    height={258}
                  />
                </>
              )}
            </View>
          </View>

          <View className="flex px-5">
            <SubmitButton pressFunc={handleSubmit} canSubmit={canSubmit()} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreateTodoScreen;
