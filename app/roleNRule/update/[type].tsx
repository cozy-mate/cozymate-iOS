import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UpdateRoleRequest } from '@/server/role/request';
import { UpdateRuleRequest } from '@/server/rule/request';
import { UpdateTodoRequest } from '@/server/todo/request';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import RoleFormComponent from '@/components/roleNRule/roleForm';
import RuleFormComponent from '@/components/roleNRule/ruleForm';
import TodoFormComponent from '@/components/roleNRule/todoForm';
import { useUpdateRole } from '@/hooks/role/role';
import { useUpdateRule } from '@/hooks/rule/rule';
import { useUpdateTodo } from '@/hooks/todo/todo';
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
    if (type === 'To-do') updateTodo(todoForm);
    else if (type === 'Role') updateRole(roleForm);
    else updateRule(ruleForm);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-[20px] gap-y-[24px]">
            <View className="gap-y-[8px]">
              <BackHeaderComponent />

              <View className="flex flex-row items-center gap-x-[12px]">
                <View className="p-[8px] gap-y-[8px]">
                  <Text className="text-18 font-600 leading-18 text-mainColor">{type}</Text>

                  <View className="h-[4px] rounded-full bg-mainColor" />
                </View>
              </View>

              {type === 'To-do' && (
                <TodoFormComponent todoForm={todoForm} setTodoForm={setTodoForm} />
              )}
              {type === 'Role' && (
                <RoleFormComponent roleForm={roleForm} setRoleForm={setRoleForm} />
              )}
              {type === 'Rule' && (
                <RuleFormComponent ruleForm={ruleForm} setRuleForm={setRuleForm} />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <View className="absolute bottom-0 pb-[42px] w-full px-[22px] bg-white">
        <BottomButton
          buttonText="수정하기"
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
          onPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
}
