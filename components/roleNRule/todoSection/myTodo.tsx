import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import DoneIcon from '@/assets/images/roleNRule/done.svg';
import NotDoneIcon from '@/assets/images/roleNRule/notDone.svg';
import SettingIcon from '@/assets/images/roleNRule/setting.svg';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useToggleTodoDone } from '@/hooks/todo/todo';
import { MemberTodo } from '@/type/todo';
import { showRejectToast } from '@/utils/toast';
import { formatDateToKorean } from '@/utils/translateDate';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

interface MyTodoComponentProps {
  timePoint: string;
  data: MemberTodo | undefined;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const MyTodoComponent: React.FC<MyTodoComponentProps> = ({ timePoint, data, bottomSheetRef }) => {
  const { memberInfo } = useMemberStore();

  const { data: hasRoom } = useCheckHasRoom();

  const { mutateAsync: toggleTodo } = useToggleTodoDone(hasRoom.result.roomId, timePoint);

  const { setSelectedItem } = useSelectedItemStore();

  const handleTodoType = (todoType: string) => {
    switch (todoType) {
      case 'other':
        return 'bg-subColor';

      case 'group':
        return 'bg-mainColor';

      case 'role':
        return 'bg-[#ACE246]';

      default:
        return 'bg-white';
    }
  };

  const handleToggle = (todoId: number, completed: boolean) => {
    if (todoId < 0) {
      showRejectToast('미래의 롤 투두는 완료할 수 없어요');
    } else {
      toggleTodo({ todoId: todoId, completed: completed });
    }
  };

  return (
    <View className="gap-y-[12px]">
      <Text className="Semibold18 text-basicFont mx-[4px]">
        <Text className="text-mainColor">{formatDateToKorean(timePoint)}, </Text>
        {` ${memberInfo?.nickname}`}님이{'\n'}해야할 일들을 알려드릴게요!
      </Text>

      {data !== undefined && data.todoList.length !== 0 ? (
        <View className="p-[8px] rounded-xl bg-white shadow-chipback">
          {data.todoList.map((todo) => (
            <View key={todo.todoId} className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Pressable
                  onPress={() => handleToggle(todo.todoId, !todo.completed)}
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
                    type: 'To-do',
                    content: todo.content,
                    todoItem: { ...todo, timePoint },
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
        <View className="bg-white h-[144px] flex items-center justify-center rounded-xl shadow-chipback">
          <Text className="Medium14 text-disabledFont text-center">
            오늘 등록된 할 일이 없어요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyTodoComponent;
