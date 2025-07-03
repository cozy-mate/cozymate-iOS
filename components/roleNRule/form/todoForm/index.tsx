import { View, Text } from 'react-native';

import CustomTextInput from '@/components/common/customInput/customTextInput';
import { useCheckHasRoom, useGetMyRoomDetail } from '@/hooks/room/room';
import { CreateTodoRequest } from '@/server/todo/request';

import CustomCalendar from '../../todoSection/calendar';

import TodoMateSelectComponent from './todoMateSelect';

interface TodoFormComponentProps {
  todoForm: CreateTodoRequest;
  setTodoForm: React.Dispatch<React.SetStateAction<CreateTodoRequest>>;
}

const TodoFormComponent: React.FC<TodoFormComponentProps> = ({ todoForm, setTodoForm }) => {
  const { data: hasRoom } = useCheckHasRoom();

  const { data: memberList } = useGetMyRoomDetail(hasRoom.result.roomId);

  return (
    <View className="gap-y-[48px]">
      <CustomTextInput
        title="할 일을 입력해주세요"
        value={todoForm.content}
        handleValue={(e: string) => setTodoForm((prev) => ({ ...prev, content: e }))}
        placeholder="할 일을 입력해주세요"
        maxLength={20}
      />

      {memberList?.result.mateDetailList !== undefined && (
        <TodoMateSelectComponent
          title="담당자를 선택해주세요"
          value={todoForm.mateIdList}
          items={memberList?.result.mateDetailList}
          handleValue={(ids) => setTodoForm((prev) => ({ ...prev, mateIdList: ids }))}
        />
      )}

      <View className="gap-y-[8px]">
        <Text className="Semibold18 text-basicFont mx-[4px]">날짜를 선택해주세요</Text>
        <CustomCalendar
          canSelectPrev={false}
          onDateTimeSelect={(dateTime) => setTodoForm((prev) => ({ ...prev, timePoint: dateTime }))}
        />
      </View>
    </View>
  );
};

export default TodoFormComponent;
