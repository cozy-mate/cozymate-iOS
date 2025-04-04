import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import DoneIcon from '@/assets/images/roleNRule/done.svg';
import NotDoneIcon from '@/assets/images/roleNRule/notDone.svg';
import SettingIcon from '@/assets/images/roleNRule/setting.svg';
import { useGetTodoList, useToggleTodoDone } from '@/hooks/todo/todo';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useHasRoomStore } from '@/zustand/room/room';

interface MyTodoComponentProps {
  timePoint: string;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const MyTodoComponent: React.FC<MyTodoComponentProps> = ({ timePoint, bottomSheetRef }) => {
  const { roomInfo } = useHasRoomStore();

  const { data, refetch } = useGetTodoList(roomInfo.roomId, timePoint);

  const { setSelectedItem } = useSelectedItemStore();

  const { mutateAsync: toggleTodo } = useToggleTodoDone(roomInfo.roomId, refetch);

  const formatDateToKorean = (dateString: string): string => {
    const date = new Date(dateString);

    // 대한민국(서울) 시간대로 변환
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      weekday: 'short',
      timeZone: 'Asia/Seoul',
    });
    const weekday = formatter.format(date);

    return `${date.getMonth() + 1}/${date.getDate()}(${weekday})`;
  };

  return (
    <View className="gap-y-[12px]">
      <View className="gap-y-0.5 mx-1">
        <Text className="text-18 font-600 text-basicFont">
          <Text className="text-mainColor">
            {data !== undefined && formatDateToKorean(data.result.timePoint)},
          </Text>{' '}
          눈꽃님이
        </Text>
        <Text className="text-18 font-600 leading-18 text-basicFont">
          해야할 일들을 알려드릴게요!
        </Text>
      </View>

      {data !== undefined && data.result.myTodoList.todoList.length !== 0 ? (
        <View className="p-[8px] rounded-xl bg-white shadow-chipback">
          {data.result.myTodoList.todoList.map((todo) => (
            <View key={todo.todoId} className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <Pressable
                  onPress={() => toggleTodo({ todoId: todo.todoId, completed: !todo.completed })}
                  className="p-[9px]"
                >
                  {todo.completed ? <DoneIcon /> : <NotDoneIcon />}
                </Pressable>
                <Text className="text-14 font-500 leading-14 text-basicFont">{todo.content}</Text>
              </View>

              <Pressable
                onPress={() => {
                  setSelectedItem({ id: todo.todoId, type: 'todo', content: todo.content });
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
        <View className="py-2 rounded-xl bg-white flex items-center justify-center h-36 shadow-chipback">
          <Text className="text-14 font-500 leading-14 text-disabledFont text-center">
            오늘 등록된 할 일이 없어요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyTodoComponent;
