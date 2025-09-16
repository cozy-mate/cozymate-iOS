import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import BlueRightArrowIcon from '@/assets/images/common/blueRightArrow.svg';
import DoneIcon from '@/assets/images/roleNRule/done.svg';
import NotDoneIcon from '@/assets/images/roleNRule/notDone.svg';
import { getPersona } from '@/constants/items/characterItem';
import { MemberTodo } from '@/type/todo';
import MateTodoSkeleton from './mateTodoSkeleton';

interface MateTodoComponentProps {
  isFetching: boolean;
  data: Record<string, MemberTodo>;
}

export default function MateTodoComponent({ isFetching, data }: MateTodoComponentProps) {
  const router = useRouter();

  return (
    <View className="gap-y-[12px]">
      <Text className="Semibold18 text-basicFont">
        다른 메이트들은{'\n'}오늘 어떤 일들을 할까요?
      </Text>

      <View className="gap-y-[16px]">
        {isFetching ? (
          <MateTodoSkeleton />
        ) : data !== undefined && Object.entries(data).length !== 0 ? (
          Object.entries(data).map(([key, mate]) => (
            <View key={key} className="p-[8px] rounded-xl bg-white shadow-chipback">
              <View className="flex flex-row items-center gap-x-[6px] p-[8px]">
                {getPersona(mate.memberDetail.persona, 24, 24)}
                <Text className="Medium14 text-emphasizedFont">{key}</Text>
              </View>

              {mate.todoList.length !== 0 ? (
                mate.todoList.map((todo) => (
                  <View key={todo.todoId} className="flex flex-row items-center">
                    <Pressable className="p-[9px]">
                      {todo.completed ? <DoneIcon /> : <NotDoneIcon />}
                    </Pressable>

                    <Text className="Medium14 text-basicFont">{todo.content}</Text>
                  </View>
                ))
              ) : (
                <Text className="Medium14 text-disabledFont py-[11.5px] px-[8px]">
                  오늘 등록된 할 일이 없어요!
                </Text>
              )}
            </View>
          ))
        ) : (
          <View className="bg-white h-[136px] flex items-center justify-center rounded-xl shadow-chipback">
            <Text className="Medium14 text-disabledFont text-center">
              직접 룸메이트를 찾으러 가볼까요?
            </Text>

            <Pressable
              onPress={() => router.push('/user/roomMate')}
              className="p-[8px] gap-x-[8px] flex flex-row items-center"
            >
              <Text className="Semibold16 text-mainColor text-center">룸메이트 찾으러 가기</Text>
              <BlueRightArrowIcon />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
