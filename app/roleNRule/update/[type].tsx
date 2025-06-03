import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import RoleFormComponent from '@/components/roleNRule/roleForm';
import RuleFormComponent from '@/components/roleNRule/ruleForm';
import TodoFormComponent from '@/components/roleNRule/todoForm';
import { useUpdateRole } from '@/hooks/role/role';
import { useUpdateRule } from '@/hooks/rule/rule';
import { useUpdateTodo } from '@/hooks/todo/todo';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import { UpdateRoleRequest } from '@/server/role/request';
import { UpdateRuleRequest } from '@/server/rule/request';
import { UpdateTodoRequest } from '@/server/todo/request';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useHasRoomStore } from '@/zustand/room/room';

export default function Update() {
  const { type } = useLocalSearchParams();

  const { roomInfo } = useHasRoomStore();

  const { selectedItem } = useSelectedItemStore();

  const { mutateAsync: updateTodo } = useUpdateTodo(roomInfo.roomId, selectedItem.id);
  const [todoForm, setTodoForm] = useState<UpdateTodoRequest | undefined>(selectedItem.todoItem);

  const { mutateAsync: updateRole } = useUpdateRole(roomInfo.roomId, selectedItem.id);
  const [roleForm, setRoleForm] = useState<UpdateRoleRequest | undefined>(selectedItem.roleItem);

  const { mutateAsync: updateRule } = useUpdateRule(roomInfo.roomId, selectedItem.id);
  const [ruleForm, setRuleForm] = useState<UpdateRuleRequest | undefined>(selectedItem.ruleItem);

  const handleUpdate = () => {
    if (type === 'To-do') updateTodo(todoForm as UpdateTodoRequest);
    else if (type === 'Role') updateRole(roleForm as UpdateRoleRequest);
    else updateRule(ruleForm as UpdateRuleRequest);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[8px] px-[20px]">
        <BackHeaderComponent />

        <View className="flex flex-row items-center gap-x-[12px]">
          <View className="p-[8px] gap-y-[8px]">
            <Text className="text-18 font-600 leading-18 text-mainColor">{type}</Text>

            <View className="h-[4px] rounded-full bg-mainColor" />
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 60,
            paddingHorizontal: 20,
            rowGap: 24,
            marginTop: 8,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {type === 'To-do' && (
            <TodoFormComponent todoForm={todoForm as UpdateTodoRequest} setTodoForm={setTodoForm} />
          )}
          {type === 'Role' && (
            <RoleFormComponent roleForm={roleForm as UpdateRoleRequest} setRoleForm={setRoleForm} />
          )}
          {type === 'Rule' && (
            <RuleFormComponent ruleForm={ruleForm as UpdateRuleRequest} setRuleForm={setRuleForm} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonComponent
        buttonText="수정하기"
        onPress={handleUpdate}
        disabled={
          (type === 'To-do' &&
            (todoForm.content.trim() === '' ||
              todoForm.mateIdList.length === 0 ||
              todoForm.timePoint.trim() === '')) ||
          (type === 'Role' &&
            (roleForm.mateIdNameList.length === 0 ||
              roleForm.content.trim() === '' ||
              roleForm.repeatDayList === null)) ||
          (type === 'Rule' && ruleForm.content.trim() === '')
        }
        color={
          (type === 'To-do' &&
            (todoForm.content.trim() === '' ||
              todoForm.mateIdList.length === 0 ||
              todoForm.timePoint.trim() === '')) ||
          (type === 'Role' &&
            (roleForm.mateIdNameList.length === 0 ||
              roleForm.content.trim() === '' ||
              roleForm.repeatDayList === null)) ||
          (type === 'Rule' && ruleForm.content.trim() === '')
            ? 'GRAY'
            : 'BLUE'
        }
      />
    </SafeAreaView>
  );
}
