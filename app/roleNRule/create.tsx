import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import RoleFormComponent from '@/components/roleNRule/form/roleForm';
import RuleFormComponent from '@/components/roleNRule/form/ruleForm';
import TodoFormComponent from '@/components/roleNRule/form/todoForm';
import { useCreateRole } from '@/hooks/role/role';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useCreateRule } from '@/hooks/rule/rule';
import { useCreateTodo } from '@/hooks/todo/todo';
import BottomButtonComponent from '@/components/common/bottomButton';
import { CreateRoleRequest } from '@/server/role/request';
import { CreateRuleRequest } from '@/server/rule/request';
import { CreateTodoRequest } from '@/server/todo/request';

export default function Create() {
  const { currentType } = useLocalSearchParams<{ currentType?: string }>();

  const [type, setType] = useState<string>(currentType ?? 'To-do');

  const { data: hasRoom } = useCheckHasRoom();

  const { mutateAsync: createTodo } = useCreateTodo(hasRoom.result.roomId);
  const [todoForm, setTodoForm] = useState<CreateTodoRequest>({
    content: '',
    mateIdList: [],
    timePoint: moment().format('YYYY-MM-DD'),
  });
  const getInitialTodoForm = (): CreateTodoRequest => ({
    content: '',
    mateIdList: [],
    timePoint: moment().format('YYYY-MM-DD'),
  });

  const { mutateAsync: createRole } = useCreateRole(hasRoom.result.roomId);
  const [roleForm, setRoleForm] = useState<CreateRoleRequest>({
    content: '',
    mateIdNameList: [],
    repeatDayList: null,
  });
  const getInitialRoleForm = (): CreateRoleRequest => ({
    content: '',
    mateIdNameList: [],
    repeatDayList: null,
  });

  const { mutateAsync: createRule } = useCreateRule(hasRoom.result.roomId);
  const [ruleForm, setRuleForm] = useState<CreateRuleRequest>({
    content: '',
    memo: '',
  });

  const getInitialRuleForm = (): CreateRuleRequest => ({
    content: '',
    memo: '',
  });

  const handleCreate = () => {
    if (type === 'To-do') createTodo(todoForm);
    else if (type === 'Role') createRole(roleForm);
    else createRule(ruleForm);
  };

  useEffect(() => {
    setTodoForm(getInitialTodoForm());
    setRoleForm(getInitialRoleForm());
    setRuleForm(getInitialRuleForm());
  }, [type]);

  const isFormValid = (): boolean => {
    if (type === 'To-do') {
      return (
        todoForm.content.trim() !== '' &&
        todoForm.content.trim().length <= 20 &&
        todoForm.mateIdList.length > 0 &&
        todoForm.timePoint.trim() !== ''
      );
    }

    if (type === 'Role') {
      return (
        roleForm.content.trim() !== '' &&
        roleForm.content.trim().length <= 20 &&
        roleForm.mateIdNameList.length > 0 &&
        roleForm.repeatDayList !== null
      );
    }

    if (type === 'Rule') {
      const contentValid = ruleForm.content.trim() !== '' && ruleForm.content.trim().length <= 20;
      const memoValid = ruleForm.memo.trim() === '' || ruleForm.memo.trim().length <= 50;

      return contentValid && memoValid;
    }

    return false;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px] gap-y-[8px]">
          <BackHeaderComponent />

          <View className="flex flex-row items-center gap-x-[12px]">
            {['To-do', 'Role', 'Rule'].map((item, index) => (
              <Pressable key={index} onPress={() => setType(item)} className="p-[8px] gap-y-[8px]">
                <Text
                  className={`Semibold18 ${type === item ? 'text-mainColor' : 'text-disabledFont'}`}
                >
                  {item}
                </Text>

                <View
                  className={`h-[4px] rounded-full ${type === item ? 'bg-mainColor' : 'bg-white'}`}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
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
        buttonText="확인"
        onPress={handleCreate}
        disabled={!isFormValid()}
        color={isFormValid() ? 'BLUE' : 'GRAY'}
      />
    </SafeAreaView>
  );
}
