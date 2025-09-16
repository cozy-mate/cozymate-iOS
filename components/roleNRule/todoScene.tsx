import { ScrollView } from 'react-native';
import CustomCalendar from './todo/calendar';
import { useState } from 'react';
import moment from 'moment';
import { useGetTodoList } from '@/hooks/todo/todo';
import { useMemberStore } from '@/zustand/store';
import MyTodoComponent from './todo/myTodo';
import MateTodoComponent from './todo/mateTodo';

export default function TodoScene() {
  const { roomInfo } = useMemberStore();

  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  const { data, isFetching } = useGetTodoList(Number(roomInfo?.roomId ?? 0), timePoint);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 34,
        paddingHorizontal: 20,
        paddingBottom: 120,
        rowGap: 32,
        backgroundColor: '#F7FAFF',
      }}
    >
      <CustomCalendar
        canSelectPrev={true}
        selectedDate={timePoint}
        onDateTimeSelect={(value) => setTimePoint(value)}
      />

      <MyTodoComponent
        isFetching={isFetching}
        timePoint={timePoint}
        data={data?.result.myTodoList}
      />

      <MateTodoComponent isFetching={isFetching} data={data?.result.mateTodoList ?? {}} />
    </ScrollView>
  );
}
