import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import DoneIcon from '@/assets/images/roleNRule/done.svg';
import NotDoneIcon from '@/assets/images/roleNRule/notDone.svg';
import { getPersona } from '@/constants/items/characterItem';
import { useGetTodoList } from '@/hooks/todo/todo';
import { useHasRoomStore } from '@/zustand/room/room';

interface MateTodoComponentProps {
  timePoint: string;
}

const MateTodoComponent: React.FC<MateTodoComponentProps> = ({ timePoint }) => {
  const { roomInfo } = useHasRoomStore();

  const router = useRouter();

  const { data } = useGetTodoList(roomInfo.roomId, timePoint);

  return (
    <View className="gap-y-[12px]">
      <View className="gap-y-0.5 mx-1">
        <Text className="text-18 font-600 leading-18 text-basicFont">다른 메이트들은</Text>
        <Text className="text-18 font-600 leading-18 text-basicFont">오늘 어떤 일들을 할까요?</Text>
      </View>

      <View className="gap-y-[16px]">
        {data !== undefined && Object.entries(data.result.mateTodoList).length !== 0 ? (
          Object.entries(data.result.mateTodoList).map(([key, mate]) => (
            <View key={key} className="p-2 rounded-xl bg-white shadow-chipback">
              <View className="flex flex-row items-center gap-x-1.5 p-2">
                {getPersona(mate.memberDetail.persona, 24, 24)}
                <Text className="text-14 font-500 leading-14 text-emphasizedFont">{key}</Text>
              </View>

              {mate.todoList.length !== 0 ? (
                mate.todoList.map((todo) => (
                  <View key={todo.todoId} className="flex flex-row items-center">
                    <Pressable className="p-[9px]">
                      {todo.completed ? <DoneIcon /> : <NotDoneIcon />}
                    </Pressable>

                    <Text className="text-14 font-500 leading-14 text-basicFont">
                      {todo.content}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-14 font-500 leading-14 text-disabledFont py-[11.5px] px-2">
                  오늘 등록된 할 일이 없어요!
                </Text>
              )}
            </View>
          ))
        ) : (
          <View className="rounded-xl flex items-center justify-center h-36 bg-white shadow-chipback">
            <Text className="text-14 font-500 text-disabledFont text-center pt-[8px]">
              직접 룸메이트를 찾으러 가볼까요?
            </Text>
            <Pressable
              onPress={() => router.push('/user/roomMate')}
              className="p-[8px] gap-x-[8px] flex flex-row justify-center items-center"
            >
              <Text className="text-16 font-600 text-mainColor text-center">
                룸메이트 찾으러 가기
              </Text>
              <BlueRightArrowIcon />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default MateTodoComponent;
