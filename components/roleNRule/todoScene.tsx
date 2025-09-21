import moment from 'moment';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { useGetTodoList } from '@/hooks/todo/todo';
import { useMemberStore } from '@/zustand/store';

import CustomCalendar from './todo/calendar';
import MateTodoComponent from './todo/mateTodo';
import MyTodoComponent from './todo/myTodo';

export default function TodoScene() {
  const { roomInfo } = useMemberStore();

  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  const { data, isFetching, refetch } = useGetTodoList(Number(roomInfo?.roomId ?? 0), timePoint);

  // TimePoint가 변경되었을 경우에는 RefreshControl이 보이지 않도록 커스텀 상태 활용
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

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
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={'#68A4FF'} />
      }
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
