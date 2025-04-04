import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import CustomTextareaComponent from '@/components/common/customTextAreaBox';
import CustomTextInputComponent from '@/components/common/customTextInput';
import CustomCalendar from '@/components/roleNRule/Calendar';
import DaySelectComponent from '@/components/roleNRule/daySelect';
import RoleMateSelectComponent from '@/components/roleNRule/roleMateSelect';
import TodoMateSelectComponent from '@/components/roleNRule/todoMateSelect';
import { useCreateRole, useGetRoleList } from '@/hooks/role/role';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useCreateRule, useGetRuleList } from '@/hooks/rule/rule';
import { useCreateTodo, useGetTodoList } from '@/hooks/todo/todo';
import { MateIdNameListItem } from '@/type/role';
import { useHasRoomStore } from '@/zustand/room/room';

export default function Create() {
  const [type, setType] = useState<string>('To-do');

  const { roomInfo } = useHasRoomStore();

  const { data: memberList } = useGetMyRoomDetail();

  const [todoContent, setTodoContent] = useState<string>('');
  const [mateIdList, setMateIdList] = useState<number[]>([]);
  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  const [mateIdNameList, setMateIdNameList] = useState<MateIdNameListItem[]>([]);
  const [roleContent, setRoleContent] = useState<string>('');
  const [repeatDayList, setRepeatDayList] = useState<string[] | null>(null);

  const [ruleContent, setRuleContent] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  const { refetch: refetchTodo } = useGetTodoList(roomInfo.roomId);
  const { mutateAsync: createTodo } = useCreateTodo(roomInfo.roomId, refetchTodo);

  const { refetch: refetchRole } = useGetRoleList(roomInfo.roomId);
  const { mutateAsync: createRole } = useCreateRole(roomInfo.roomId, refetchRole);

  const { refetch: refetchRule } = useGetRuleList(roomInfo.roomId);
  const { mutateAsync: createRule } = useCreateRule(roomInfo.roomId, refetchRule);

  const handleCreate = () => {
    if (type === 'To-do') {
      createTodo({ mateIdList, content: todoContent, timePoint });
    } else if (type === 'Role') {
      createRole({ mateIdNameList, content: roleContent, repeatDayList });
    } else {
      createRule({ content: ruleContent, memo });
    }
  };

  useEffect(() => {
    setTodoContent('');
    setMateIdList([]);
    setTimePoint(moment().format('YYYY-MM-DD'));

    setMateIdNameList([]);
    setRoleContent('');
    setRepeatDayList(null);

    setRuleContent('');
    setMemo('');
  }, [type]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-[20px] gap-y-[24px]">
            <View className="gap-y-[8px]">
              <BackHeaderComponent />

              <View className="flex flex-row items-center gap-x-[12px]">
                {['To-do', 'Role', 'Rule'].map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setType(item)}
                    className="p-[8px] gap-y-[8px]"
                  >
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
            </View>

            {type === 'To-do' && (
              <View className="gap-y-[48px]">
                <CustomTextInputComponent
                  title="할 일을 입력해주세요"
                  value={todoContent}
                  handleValue={(e: string) => setTodoContent(e)}
                  placeholder="할 일을 입력해주세요"
                />

                {memberList?.result.mateDetailList !== undefined && (
                  <TodoMateSelectComponent
                    title="담당자를 선택해주세요"
                    value={mateIdList}
                    items={memberList?.result.mateDetailList}
                    handleValue={setMateIdList}
                  />
                )}

                <View className="gap-y-[8px]">
                  <Text className="text-16 font-600 leading-16 text-basicFont mx-[4px]">
                    날짜를 선택해주세요
                  </Text>
                  <CustomCalendar canSelectPrev={false} onDateTimeSelect={handleDateTimeSelect} />
                </View>
              </View>
            )}

            {type === 'Role' && (
              <View className="gap-y-[48px]">
                <CustomTextInputComponent
                  title="역할을 입력해주세요"
                  value={roleContent}
                  handleValue={(e: string) => setRoleContent(e)}
                  placeholder="역할을 입력해주세요"
                />

                {memberList?.result.mateDetailList !== undefined && (
                  <RoleMateSelectComponent
                    title="담당자를 선택해주세요"
                    value={mateIdNameList}
                    items={memberList?.result.mateDetailList}
                    handleValue={setMateIdNameList}
                  />
                )}

                <DaySelectComponent
                  title="정해진 요일을 선택해주세요"
                  value={repeatDayList}
                  handleValue={setRepeatDayList}
                />
              </View>
            )}

            {type === 'Rule' && (
              <View className="gap-y-[48px]">
                <CustomTextInputComponent
                  title="규칙을 입력해주세요"
                  value={ruleContent}
                  handleValue={(e: string) => setRuleContent(e)}
                  placeholder="규칙을 입력해주세요"
                />

                <CustomTextareaComponent
                  title="메모를 추가해주세요!"
                  value={memo}
                  handleValue={(e: string) => setMemo(e)}
                  placeholder="내용을 입력해주세요"
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <View className="absolute bottom-0 pb-[42px] w-full px-[22px] bg-white">
        <BottomButton
          buttonText="확인"
          disabled={
            (type === 'To-do' &&
              (todoContent.trim() === '' || mateIdList.length === 0 || timePoint.trim() === '')) ||
            (type === 'Role' &&
              (mateIdNameList.length === 0 ||
                roleContent.trim() === '' ||
                repeatDayList === null)) ||
            (type === 'Rule' && ruleContent.trim() === '')
          }
          onPress={handleCreate}
        />
      </View>
    </SafeAreaView>
  );
}
