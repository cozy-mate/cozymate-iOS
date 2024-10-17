import moment from 'moment';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import BackNav from 'src/layout/backNav';

import DaySelect from '@components/todoList/daySelect';
import LoadingComponent from '@components/loading/loading';
import SubmitButton from '@components/todoList/submitButton';
import CustomTextarea from '@components/common/customTextarea';
import CustomCalendar from '@components/todoList/customCalendar';
import CustomTextInputBox from '@components/common/customTextInputBox';
import CustomCheckInputBox from '@components/common/customCheckInputBox';

import { roomInfoState } from '@recoil/recoil';

import { useAddRule, useGetRuleData } from '@hooks/api/rule';
import { useAddRole, useGetRoleData } from '@hooks/api/role';
import { useAddMyTodo, useGetTodoData } from '@hooks/api/todo';

import { CreateTodoScreenProps } from '@type/param/stack';

const CreateTodoScreen = ({ navigation, route }: CreateTodoScreenProps) => {
  const roomInfo = useRecoilValue(roomInfoState);
  const { bottom } = useSafeAreaInsets();

  const [type, setType] = useState<string>(route.params.type);

  const toTodo = () => {
    navigation.navigate('MainScreen', { screen: 'TodoListScreen' });
  };

  // Todo
  const [todoContent, setTodoContent] = useState<string>('');
  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

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
      setTimePoint(moment().format('YYYY-MM-DD'));
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
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView className="flex-1">
            <View className="flex" style={{ paddingBottom: bottom }}>
              <BackNav leftPressFunc={toTodo} />
              <View className="px-5">
                <View className="mb-6 flex flex-row gap-x-3">
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
                        } mt-2 h-1 w-[66px] rounded-full`}
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

                    <CustomCheckInputBox
                      title="담당자를 선택해주세요"
                      selectedValues={mateIdList}
                      setSelectedValues={setMateIdList}
                      items={roomInfo.mateList}
                    />

                    <CustomCalendar canSelectPrev={false} onDateTimeSelect={handleDateTimeSelect} />
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
                      height={120}
                      maxLength={50}
                    />
                  </>
                )}
              </View>
            </View>
          </ScrollView>

          <View className="fixed bottom-0 w-full bg-transparent px-5">
            <SubmitButton pressFunc={handleSubmit} canSubmit={canSubmit()} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreateTodoScreen;
