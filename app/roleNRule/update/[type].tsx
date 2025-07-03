import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import RoleFormComponent from '@/components/roleNRule/form/roleForm';
import RuleFormComponent from '@/components/roleNRule/form/ruleForm';
import TodoFormComponent from '@/components/roleNRule/form/todoForm';
import { useUpdateRole } from '@/hooks/role/role';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useUpdateRule } from '@/hooks/rule/rule';
import { useUpdateTodo } from '@/hooks/todo/todo';
import BottomButtonComponent from '@/components/common/bottomButton';
import { UpdateRoleRequest } from '@/server/role/request';
import { UpdateRuleRequest } from '@/server/rule/request';
import { UpdateTodoRequest } from '@/server/todo/request';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';

export default function Update() {
  const { type } = useLocalSearchParams();

  const { data: hasRoom } = useCheckHasRoom();

  const { selectedItem } = useSelectedItemStore();

  const { mutateAsync: updateTodo } = useUpdateTodo(hasRoom.result.roomId, selectedItem.id);
  const [todoForm, setTodoForm] = useState<UpdateTodoRequest>(selectedItem.todoItem);

  const { mutateAsync: updateRole } = useUpdateRole(hasRoom.result.roomId, selectedItem.id);
  const [roleForm, setRoleForm] = useState<UpdateRoleRequest>(selectedItem.roleItem);

  const { mutateAsync: updateRule } = useUpdateRule(hasRoom.result.roomId, selectedItem.id);
  const [ruleForm, setRuleForm] = useState<UpdateRuleRequest>(selectedItem.ruleItem);

  const handleUpdate = () => {
    if (type === 'To-do') updateTodo(todoForm as UpdateTodoRequest);
    else if (type === 'Role') updateRole(roleForm as UpdateRoleRequest);
    else updateRule(ruleForm as UpdateRuleRequest);
  };

  const isFormValid = (): boolean => {
    if (type === 'To-do') {
      return (
        todoForm.content.trim() !== '' &&
        todoForm.mateIdList.length > 0 &&
        todoForm.timePoint.trim() !== ''
      );
    }

    if (type === 'Role') {
      return (
        roleForm.content.trim() !== '' &&
        roleForm.mateIdNameList.length > 0 &&
        roleForm.repeatDayList !== null
      );
    }

    if (type === 'Rule') {
      return ruleForm.content.trim() !== '';
    }

    return false;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[8px] px-[20px]">
        <BackHeaderComponent />

        <View className="flex flex-row items-center gap-x-[12px]">
          <View className="py-[8px] gap-y-[8px]">
            <Text className="Semibold18 text-mainColor px-[8px]">{type}</Text>

            <View className="h-[4px] rounded-full bg-mainColor" />
          </View>
        </View>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          rowGap: 24,
          paddingTop: 24,
          paddingBottom: 120,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        {type === 'To-do' && <TodoFormComponent todoForm={todoForm} setTodoForm={setTodoForm} />}
        {type === 'Role' && <RoleFormComponent roleForm={roleForm} setRoleForm={setRoleForm} />}
        {type === 'Rule' && <RuleFormComponent ruleForm={ruleForm} setRuleForm={setRuleForm} />}
      </KeyboardAwareScrollView>

      <BottomButtonComponent
        buttonText="수정하기"
        onPress={handleUpdate}
        disabled={!isFormValid()}
        color={isFormValid() ? 'BLUE' : 'GRAY'}
      />
    </SafeAreaView>
  );
}
