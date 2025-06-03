import moment from 'moment';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import RoleFormComponent from '@/components/roleNRule/roleForm';
import RuleFormComponent from '@/components/roleNRule/ruleForm';
import TodoFormComponent from '@/components/roleNRule/todoForm';
import { useCreateRole } from '@/hooks/role/role';
import { useCreateRule } from '@/hooks/rule/rule';
import { useCreateTodo } from '@/hooks/todo/todo';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import { CreateRoleRequest } from '@/server/role/request';
import { CreateRuleRequest } from '@/server/rule/request';
import { CreateTodoRequest } from '@/server/todo/request';
import { useHasRoomStore } from '@/zustand/room/room';

export default function Create() {
  const [type, setType] = useState<string>('To-do');

  const { roomInfo } = useHasRoomStore();

  const { mutateAsync: createTodo } = useCreateTodo(roomInfo.roomId);
  const [todoForm, setTodoForm] = useState<CreateTodoRequest>({
    content: '',
    mateIdList: [],
    timePoint: moment().format('YYYY-MM-DD'),
  });

  const { mutateAsync: createRole } = useCreateRole(roomInfo.roomId);
  const [roleForm, setRoleForm] = useState<CreateRoleRequest>({
    content: '',
    mateIdNameList: [],
    repeatDayList: null,
  });

  const { mutateAsync: createRule } = useCreateRule(roomInfo.roomId);
  const [ruleForm, setRuleForm] = useState<CreateRuleRequest>({
    content: '',
    memo: '',
  });

  const handleCreate = () => {
    if (type === 'To-do') createTodo(todoForm);
    else if (type === 'Role') createRole(roleForm);
    else createRule(ruleForm);
  };

  useEffect(() => {
    setTodoForm({
      content: '',
      mateIdList: [],
      timePoint: moment().format('YYYY-MM-DD'),
    });

    setRoleForm({
      content: '',
      mateIdNameList: [],
      repeatDayList: null,
    });

    setRuleForm({
      content: '',
      memo: '',
    });
  }, [type]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 20, rowGap: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-row items-center gap-x-[12px]">
            {['To-do', 'Role', 'Rule'].map((item, index) => (
              <Pressable key={index} onPress={() => setType(item)} className="p-[8px] gap-y-[8px]">
                <Text
                  className={`text-18 font-600 leading-18 ${type === item ? 'text-mainColor' : 'text-disabledFont'}`}
                >
                  {item}
                </Text>

                <View
                  className={`h-[4px] rounded-full ${type === item ? 'bg-mainColor' : 'bg-white'}`}
                />
              </Pressable>
            ))}
          </View>

          {type === 'To-do' && <TodoFormComponent todoForm={todoForm} setTodoForm={setTodoForm} />}
          {type === 'Role' && <RoleFormComponent roleForm={roleForm} setRoleForm={setRoleForm} />}
          {type === 'Rule' && <RuleFormComponent ruleForm={ruleForm} setRuleForm={setRuleForm} />}
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonComponent
        buttonText="확인"
        onPress={handleCreate}
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
