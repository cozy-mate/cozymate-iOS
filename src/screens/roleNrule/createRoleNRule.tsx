import moment from 'moment';
import BackNav from '@layout/backNav';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import DaySelect from '@components/todoList/daySelect';
import RoleNRuleNav from '@components/todoList/roleNruleNav';
import CustomTextarea from '@components/common/customTextarea';
import CustomCalendar from '@components/todoList/customCalendar';
import SelectMateComponent from '@components/todoList/selectMate';
import CustomTextInputBox from '@components/common/customTextInputBox';
import RoleSelectMateComponent from '@components/todoList/roleSelectMate';

import { useRoomInfoStore } from '@zustand/room/room';

import { useAddRole, useGetRoleData } from '@hooks/api/role';
import { useAddRule, useGetRuleData } from '@hooks/api/rule';
import { useAddMyTodo, useGetTodoData } from '@hooks/api/todo';

import { CreateRoleNRuleScreenProps } from '@type/param/stack';

interface RoleMateItem {
  mateId: number;
  nickname: string;
}

const CreateRoleNRuleScreen = ({ navigation, route }: CreateRoleNRuleScreenProps) => {
  const { roomInfo } = useRoomInfoStore();
  const { bottom } = useSafeAreaInsets();

  const [type, setType] = useState<string>(route.params.type);

  const changeType = (newType: string) => {
    setType(newType);
  };

  const toBack = () => {
    navigation.goBack();
  };

  const toRoleNRule = () => {
    navigation.navigate('MainScreen', { screen: 'RoleNRuleScreen' });
  };

  // Todo
  const [todoContent, setTodoContent] = useState<string>('');
  const [todoMateIdList, setTodoMateIdList] = useState<number[]>([]);
  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  const { refetch: refetchTodo } = useGetTodoData(roomInfo.roomId);
  const { mutateAsync: addTodoMutate } = useAddMyTodo(roomInfo.roomId, refetchTodo);

  // Role
  const [roleMateIdNameList, setRoleMateIdNameList] = useState<RoleMateItem[]>([]);
  const [content, setContent] = useState<string>('');
  const [repeatDayList, setRepeatDayList] = useState<string[]>([]);

  const { refetch: refetchRole } = useGetRoleData(roomInfo.roomId);
  const { mutateAsync: addRoleMutate } = useAddRole(roomInfo.roomId, refetchRole, refetchTodo);

  // Rule
  const [ruleContent, setRuleContent] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const { refetch: refetchRule } = useGetRuleData(roomInfo.roomId);
  const { mutateAsync: addRuleMutate } = useAddRule(roomInfo.roomId, refetchRule);

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  // 생성 가능한 지 여부 확인
  const canSubmit = () => {
    if (type === 'todo') {
      return todoContent.trim() !== '' && todoMateIdList.length > 0 && !!timePoint;
    } else if (type === 'role') {
      return roleMateIdNameList.length > 0 && content.trim() !== '' && repeatDayList.length > 0;
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
        await addTodoMutate({
          content: todoContent,
          mateIdList: todoMateIdList,
          timePoint: timePoint,
        });
        toRoleNRule();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else if (type === 'role') {
      if (roleMateIdNameList.length === 0 || content.trim() === '' || repeatDayList.length === 0) {
        return;
      }
      try {
        await addRoleMutate({
          mateIdNameList: roleMateIdNameList,
          content: content,
          repeatDayList: repeatDayList,
        });
        toRoleNRule();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else if (type === 'rule') {
      if (ruleContent.trim() === '') {
        return;
      }
      try {
        await addRuleMutate({ content: ruleContent, memo });
        toRoleNRule();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false}>
        <View style={{ paddingBottom: bottom }}>
          <BackNav leftPressFunc={toBack} />
          <RoleNRuleNav type={type} changeType={changeType} />

          {type == 'todo' && (
            <View className="px-5">
              <CustomTextInputBox
                title="할 일을 입력해주세요"
                value={todoContent}
                setValue={setTodoContent}
                placeholder="할 일을 입력해주세요"
              />

              <SelectMateComponent
                title="담당자를 선택해주세요"
                selectedValues={todoMateIdList}
                setSelectedValues={setTodoMateIdList}
                items={roomInfo.mateDetailList}
              />

              <Text className="mb-2 px-1 text-lg font-semibold text-basicFont">
                날짜를 선택해주세요
              </Text>
              <CustomCalendar canSelectPrev={false} onDateTimeSelect={handleDateTimeSelect} />
            </View>
          )}

          {type == 'role' && (
            <View className="px-5">
              <RoleSelectMateComponent
                title="담당자를 선택해주세요"
                selectedValues={roleMateIdNameList}
                setSelectedValues={setRoleMateIdNameList}
                items={roomInfo.mateDetailList}
              />

              <CustomTextInputBox
                title="역할을 입력해주세요"
                value={content}
                setValue={setContent}
                placeholder="역할을 입력해주세요"
              />
              <DaySelect repeatDayList={repeatDayList} setRepeatDayList={setRepeatDayList} />
            </View>
          )}

          {type === 'rule' && (
            <View className="px-5">
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
            </View>
          )}
        </View>
      </ScrollView>

      <View className="fixed bottom-0 w-full bg-transparent px-5">
        <Pressable onPress={handleSubmit} disabled={!canSubmit()}>
          <View className={`${canSubmit() ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}>
            <Text className="text-center text-base font-semibold text-white">확인</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateRoleNRuleScreen;
