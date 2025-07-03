import BottomSheet from '@gorhom/bottom-sheet';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { Portal } from 'react-native-portalize';

import LoadingComponent from '@/components/common/loading';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useGetTodoList } from '@/hooks/todo/todo';

import CustomCalendar from './calendar';
import MateTodoComponent from './mateTodo';
import MyTodoComponent from './myTodo';

interface TodoSectionProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  timePoint: string;
  setTimePoint: Dispatch<SetStateAction<string>>;
}

const TodoSection: React.FC<TodoSectionProps> = ({ bottomSheetRef, timePoint, setTimePoint }) => {
  const { data: hasRoom } = useCheckHasRoom();

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  const { data: todoData, isFetching } = useGetTodoList(hasRoom.result.roomId, timePoint);

  if (isFetching) {
    return (
      <Portal>
        <LoadingComponent />
      </Portal>
    );
  }
  return (
    <View className="flex-1 pt-[34px] gap-y-[32px] pb-[112px]">
      <CustomCalendar
        canSelectPrev={true}
        selectedDate={timePoint}
        onDateTimeSelect={handleDateTimeSelect}
      />
      <MyTodoComponent
        timePoint={todoData?.result.timePoint as string}
        data={todoData?.result.myTodoList}
        bottomSheetRef={bottomSheetRef}
      />
      <MateTodoComponent data={todoData?.result.mateTodoList ?? {}} />
    </View>
  );
};

export default TodoSection;
