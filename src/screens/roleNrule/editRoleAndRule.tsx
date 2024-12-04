import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import DaySelect from '@components/roleNrule/daySelect';
import RoleNRuleNav from '@components/roleNrule/roleNruleNav';
import CustomTextarea from '@components/common/customTextarea';
import CustomCalendar from '@components/roleNrule/customCalendar';
import SelectMateComponent from '@components/roleNrule/selectMate';
import CustomTextInputBox from '@components/common/customTextInputBox';
import TwoButtonModal from '@components/commonComponents/twoButtonModal';
import RoleSelectMateComponent from '@components/roleNrule/roleSelectMate';

import { useRoomInfoStore } from '@zustand/room/room';
import { useTodoItemStore } from '@zustand/todo/todo';
import { useRuleItemStore } from '@zustand/rule/rule';
import { useRoleItemStore } from '@zustand/role/role';

import { useUpdateRole, useDeleteRole, useGetRoleData } from '@hooks/api/role';
import { useUpdateTodo, useDeleteTodo, useGetTodoData } from '@hooks/api/todo';
import { useUpdateRule, useDeleteRule, useGetRuleData } from '@hooks/api/rule';

import { EditRoleNRuleScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

interface RoleMateItem {
  mateId: number;
  nickname: string;
}

const EditRoleNRuleScreen = ({ navigation, route }: EditRoleNRuleScreenProps) => {
  const { roomInfo } = useRoomInfoStore();
  const { bottom } = useSafeAreaInsets();

  const { id } = route.params;

  const [type, setType] = useState<string>(route.params.type);

  const changeType = (newType: string) => {
    setType(newType);
  };

  const toBack = () => {
    navigation.goBack();
  };

  const { todoItem } = useTodoItemStore();

  // Todo
  const [todoContent, setTodoContent] = useState<string>(todoItem.content);
  const [todoMateIdList, setTodoMateIdList] = useState<number[]>(todoItem.mateIdList);
  const [timePoint, setTimePoint] = useState<string>(todoItem.timePoint);

  const { roleItem } = useRoleItemStore();

  // Role
  const [roleMateIdNameList, setRoleMateIdNameList] = useState<RoleMateItem[]>(roleItem.mateList);
  const [content, setContent] = useState<string>(roleItem.content);
  const [repeatDayList, setRepeatDayList] = useState<string[] | null>(roleItem.repeatDayList);

  const { ruleItem } = useRuleItemStore();

  // Rule
  const [ruleContent, setRuleContent] = useState<string>(ruleItem.content);
  const [memo, setMemo] = useState<string>(ruleItem.memo);

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  const { refetch: refetchTodo } = useGetTodoData(roomInfo.roomId);
  const { mutateAsync: updateTodoMutate } = useUpdateTodo(
    roomInfo.roomId,
    todoItem.todoId,
    refetchTodo,
  );
  const { mutateAsync: deleteTodoMutate } = useDeleteTodo(refetchTodo);

  const { refetch: refetchRule } = useGetRuleData(roomInfo.roomId);
  const { mutateAsync: updateRuleMutate } = useUpdateRule(roomInfo.roomId, id, refetchRule);
  const { mutateAsync: deleteRuleMutate } = useDeleteRule(refetchRule);

  const { refetch: refetchRole } = useGetRoleData(roomInfo.roomId);
  const { mutateAsync: updateRoleMutate } = useUpdateRole(
    roomInfo.roomId,
    roleItem.roleId,
    refetchRole,
  );
  const { mutateAsync: deleteRoleMutate } = useDeleteRole(refetchRole);

  // Todo / Role / Rule 수정하기
  const handleUpdate = async () => {
    if (type === 'todo') {
      try {
        await updateTodoMutate({
          mateIdList: todoMateIdList,
          content: todoContent,
          timePoint: timePoint,
        });
        toBack();
      } catch (error: any) {
        console.log(error.response.data);
      }
    } else if (type === 'role') {
      if (roleMateIdNameList.length === 0 || content.trim() === '' || repeatDayList === null) {
        return;
      }
      try {
        await updateRoleMutate({
          mateIdNameList: roleMateIdNameList,
          content: content,
          repeatDayList: repeatDayList,
        });
        toBack();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else if (type === 'rule') {
      try {
        await updateRuleMutate({ content: ruleContent, memo });
        toBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Todo / Role / Rule 삭제하기
  const handleDelete = async () => {
    if (type === 'todo') {
      try {
        await deleteTodoMutate({
          roomId: roomInfo.roomId,
          todoId: todoItem.todoId,
        });
        toBack();
      } catch (error: any) {
        console.log(error.response.data);
      }
    } else if (type === 'role') {
      try {
        await deleteRoleMutate({
          roomId: roomInfo.roomId,
          roleId: roleItem.roleId,
        });
        toBack();
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else if (type === 'rule') {
      try {
        await deleteRuleMutate({
          roomId: roomInfo.roomId,
          ruleId: ruleItem.ruleId,
        });
        toBack();
      } catch (error: any) {
        console.log(error.response);
      }
    }
  };

  // 생성 가능한 지 여부 확인
  const canSubmit = () => {
    if (type === 'todo') {
      return todoContent.trim() !== '' && todoMateIdList.length > 0 && !!timePoint;
    } else if (type === 'role') {
      return content.trim() !== '' && roleMateIdNameList.length > 0 && repeatDayList !== null;
    } else if (type === 'rule') {
      return ruleContent.trim() !== '';
    }
    return false;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false}>
        <View style={{ paddingBottom: bottom }}>
          <View className="mb-2 flex flex-row items-center justify-between px-5">
            <Pressable onPress={toBack}>
              <BackButton />
            </Pressable>

            <Pressable onPress={() => setIsDeleteModalOpen(true)} className="p-2">
              <Text className="text-base font-semibold text-warning">삭제</Text>
            </Pressable>
          </View>

          <RoleNRuleNav type={type} changeType={changeType} isEdit={true} />

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
        <Pressable onPress={handleUpdate} disabled={!canSubmit()}>
          <View className={`${canSubmit() ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}>
            <Text className="text-center text-base font-semibold text-white">확인</Text>
          </View>
        </Pressable>
      </View>

      <TwoButtonModal
        isVisible={isDeleteModalOpen}
        title={`해당 ${type === 'todo' ? '투두' : type === 'role' ? '롤' : '룰'}을 삭제하시겠어요?`}
        closeFunc={() => setIsDeleteModalOpen(false)}
        leftButtonText="취소"
        leftButtonFunc={() => setIsDeleteModalOpen(false)}
        rightButtonText="확인"
        rightButtonFunc={handleDelete}
      />
    </SafeAreaView>
  );
};

export default EditRoleNRuleScreen;
