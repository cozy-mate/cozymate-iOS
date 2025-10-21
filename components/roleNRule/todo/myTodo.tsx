import BottomSheet from '@gorhom/bottom-sheet';
import { Fragment, RefObject, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import DoneIcon from '@/assets/images/roleNRule/done.svg';
import NotDoneIcon from '@/assets/images/roleNRule/notDone.svg';
import SettingIcon from '@/assets/images/roleNRule/setting.svg';
import { useToggleTodoDone } from '@/hooks/todo/todo';
import { MemberTodo } from '@/type/todo';
import { formatDateToKorean } from '@/utils/translateDate';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

import RoleNRuleBottomSheet from '../bottomSheet';

import MyTodoSkeleton from './myTodoSkeleton';

interface MyTodoComponentProps {
  isFetching: boolean;
  timePoint: string;
  data: MemberTodo | undefined;
}

export default function MyTodoComponent({ isFetching, timePoint, data }: MyTodoComponentProps) {
  const { memberInfo, roomInfo } = useMemberStore();

  const { mutate: toggleTodo } = useToggleTodoDone({ roomId: roomInfo.roomId, timePoint });

  const { setSelectedItem } = useSelectedItemStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleTodoType = (todoType: string) => {
    switch (todoType) {
      case 'other':
        return 'bg-subColor';

      case 'group':
        return 'bg-mainColor';

      default:
        return 'bg-white';
    }
  };

  return (
    <Fragment>
      <View className="gap-y-[12px]">
        <Text className="Semibold18 text-basicFont mx-[4px]">
          <Text className="text-mainColor">{formatDateToKorean(timePoint)}, </Text>
          {`${memberInfo?.nickname ?? ''}`}님이{'\n'}해야할 일들을 알려드릴게요!
        </Text>

        {isFetching && !data ? (
          <MyTodoSkeleton />
        ) : data !== undefined && data.todoList.length !== 0 ? (
          <View className="p-[8px] rounded-xl bg-white shadow-chipback">
            {data.todoList.map((todo) => (
              <View key={todo.todoId} className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Pressable
                    onPress={() => toggleTodo({ todoId: todo.todoId, completed: !todo.completed })}
                    className="p-[9px]"
                  >
                    {todo.completed ? <DoneIcon /> : <NotDoneIcon />}
                  </Pressable>
                  <View className="flex flex-row items-center gap-x-[6px]">
                    <Text className="Medium14 text-basicFont">{todo.content}</Text>
                    <View
                      className={`w-[6px] h-[6px] rounded-full ${handleTodoType(todo.todoType)}`}
                    />
                  </View>
                </View>

                <Pressable
                  onPress={() => {
                    setSelectedItem((prev) => ({
                      ...prev,
                      id: todo.todoId,
                      mateIdList: todo.mateIdList,
                      content: todo.content,
                      timePoint: timePoint,
                    }));
                    bottomSheetRef.current?.expand();
                  }}
                  className="p-[8px]"
                >
                  <SettingIcon />
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View className="bg-white h-[136px] flex items-center justify-center rounded-xl shadow-chipback">
            <Text className="Medium14 text-disabledFont text-center">
              오늘 등록된 할 일이 없어요!
            </Text>
          </View>
        )}
      </View>

      <RoleNRuleBottomSheet
        type="todos"
        bottomSheetRef={bottomSheetRef as RefObject<BottomSheet>}
      />
    </Fragment>
  );
}
