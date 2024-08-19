import CustomCheckInputBox from '@components/common/customCheckInputBox';
import CustomTextarea from '@components/common/customTextarea';
import CustomTextInputBox from '@components/common/customTextInputBox';
import CustomCalendar from '@components/todoList/customCalendar';
import DaySelect from '@components/todoList/daySelect';
import SubmitButton from '@components/todoList/submitButton';
import { roomInfoState } from '@recoil/recoil';
import { addMyTodo } from '@server/api/todo';
import { CreateTodoScreenProps } from '@type/param/roomStack';
import React, { useState } from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import BackNav from 'src/layout/backNav';

const CreateTodoScreen = ({ navigation }: CreateTodoScreenProps) => {
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  const [type, setType] = useState<string>('todo');

  const toTodo = () => {
    navigation.navigate('MainScreen', { screen: 'TodoListScreen' });
  };

  // Todo 생성 데이터
  const [todoContent, setTodoContent] = useState<string>('');
  const [timePoint, setTimePoint] = useState<string>('');

  // Role 생성 데이터
  const [mateIdList, setMateIdList] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');
  const [repeatDayList, setRepeatDayList] = useState<string[]>([]);

  // Rule 생성 데이터
  const [ruleContent, setRuleContent] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const navBarItems = [
    { id: 1, name: 'To-do', value: 'todo' },
    { id: 2, name: 'Role', value: 'role' },
    { id: 3, name: 'Rule', value: 'rule' },
  ];

  const [dummyItems, setDummyItems] = useState([
    { id: 1, name: '너진', value: '너진', select: false },
    { id: 2, name: '제이', value: '제이', select: false },
    { id: 3, name: '더기', value: '더기', select: false },
    { id: 4, name: '델로', value: '델로', select: false },
  ]);

  const handleDateTimeSelect = (dateTime: string) => {
    console.log('Selected dateTime: ', dateTime); // Debugging line
    setTimePoint(dateTime);
  };

  const handleSubmit = async () => {
    console.log('Submit called with:', { todoContent, timePoint });
    switch (type) {
      case 'todo':
        if (todoContent.trim() === '' || !timePoint) {
          return;
        }
        await addMyTodo(roomInfo.roomId, { content: todoContent, timePoint });
        navigation.navigate('TodoListScreen');
        break;
      // case 'role':
      //   if (mateIdList.length === 0 || title.trim() === '' || repeatDayList.length === 0) return;
      //   await addRole({ mateIdList, title, repeatDayList });
      //   break;
      // case 'rule':
      //   if (ruleContent.trim() === '') return;
      //   await addRule({ content: ruleContent, memo });
      //   break;
      default:
        break;
    }
  };

  const canSubmit = () => {
    switch (type) {
      case 'todo':
        return todoContent.trim() !== '' && !!timePoint;
      case 'role':
        return mateIdList.length > 0 && title.trim() !== '' && repeatDayList.length > 0;
      case 'rule':
        return ruleContent.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-col justify-between flex-1 px-5 bg-white">
        <View className="flex">
          <BackNav leftPressFunc={toTodo} />
          <View className="px-5">
            <View className="flex flex-row mb-6 gap-x-3">
              {navBarItems.map((nav) => (
                <Pressable
                  onPress={() => setType(nav.value)}
                  key={nav.id}
                  className="flex flex-col items-center"
                >
                  <Text
                    className={`${
                      type === nav.value ? 'text-main1' : 'text-disabledFont'
                    } text-lg font-semibold`}
                  >
                    {nav.name}
                  </Text>
                  <View
                    className={`${
                      nav.value == type ? 'bg-main1' : 'bg-white'
                    } h-1 w-[66px] rounded-full mt-2`}
                  />
                </Pressable>
              ))}
            </View>

            {type == 'todo' && (
              <>
                <CustomTextInputBox
                  title="할 일을 입력해주세요"
                  value={todoContent}
                  setValue={setTodoContent}
                  placeholder="할 일을 입력해주세요"
                />
                <CustomCalendar onDateTimeSelect={handleDateTimeSelect} />
              </>
            )}

            {type == 'role' && (
              <>
                <CustomCheckInputBox
                  title="담당자를 선택해주세요"
                  selectedValues={mateIdList}
                  setSelectedValues={setMateIdList}
                  items={dummyItems}
                />

                <CustomTextInputBox
                  title="역할을 입력해주세요"
                  value={title}
                  setValue={setTitle}
                  placeholder="역할을 입력해주세요"
                />
                <DaySelect repeatDayList={repeatDayList} setRepeatDayList={setRepeatDayList} />
              </>
            )}

            {type == 'rule' && (
              <>
                <CustomTextInputBox
                  title="규칙을 입력해주세요"
                  value={ruleContent}
                  setValue={setRuleContent}
                  placeholder="규칙을 입력해주세요"
                />
                <CustomTextarea
                  title="메모를 추가해주세요 (선택)"
                  value={memo}
                  setValue={setMemo}
                  placeholder="내용을 입력해주세요"
                  height={258}
                />
              </>
            )}
          </View>
        </View>

        <View className="flex px-5">
          <SubmitButton pressFunc={handleSubmit} canSubmit={canSubmit()} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateTodoScreen;
