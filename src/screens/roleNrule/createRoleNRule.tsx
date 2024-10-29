import moment from 'moment';
import BackNav from '@layout/backNav';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';

import DaySelect from '@components/todoList/daySelect';
import RoleNRuleNav from '@components/todoList/roleNruleNav';
import CustomTextarea from '@components/common/customTextarea';
import CustomCalendar from '@components/todoList/customCalendar';
import SelectMateComponent from '@components/todoList/selectMate';
import CustomTextInputBox from '@components/common/customTextInputBox';

import { useRoomInfoStore } from '@zustand/room/room';

import { CreateRoleNRuleScreenProps } from '@type/param/stack';

const CreateRoleNRuleScreen = ({ navigation, route }: CreateRoleNRuleScreenProps) => {
  const { roomInfo } = useRoomInfoStore();
  const { bottom } = useSafeAreaInsets();

  const [type, setType] = useState<string>(route.params.type);

  const changeType = (newType: string) => {
    setType(newType);
  };

  const toBack = () => {
    navigation.goBack();
  };

  const [todoContent, setTodoContent] = useState<string>('');
  const [todoMateIdList, setTodoMateIdList] = useState<number[]>([]);
  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  // Role
  const [roleMateIdList, setRoleMateIdList] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');
  const [repeatDayList, setRepeatDayList] = useState<string[]>([]);

  // Rule
  const [ruleContent, setRuleContent] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  // 생성 가능한 지 여부 확인
  const canSubmit = () => {
    if (type === 'todo') {
      return todoContent.trim() !== '' && todoMateIdList.length > 0 && !!timePoint;
    } else if (type === 'role') {
      return roleMateIdList.length > 0 && title.trim() !== '' && repeatDayList.length > 0;
    } else if (type === 'rule') {
      return ruleContent.trim() !== '';
    }
    return false;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false}>
        <View style={{ paddingBottom: bottom }}>
          <BackNav leftPressFunc={toBack} />
          <RoleNRuleNav type={type} changeType={changeType} />

          {type == 'todo' && (
            <View className="px-5">
              <CustomTextInputBox
                title="할 일을 입력해주세요"
                value={todoContent}
                setValue={setTodoContent}
                placeholder="할 일을 입력해주세요"
              />

              <SelectMateComponent
                title="담당자를 선택해주세요"
                selectedValues={todoMateIdList}
                setSelectedValues={setTodoMateIdList}
                items={roomInfo.mateList}
              />

              <Text className="mb-2 px-1 text-lg font-semibold text-basicFont">
                날짜를 선택해주세요
              </Text>
              <CustomCalendar canSelectPrev={false} onDateTimeSelect={handleDateTimeSelect} />
            </View>
          )}

          {type == 'role' && (
            <View className="px-5">
              <SelectMateComponent
                title="담당자를 선택해주세요"
                selectedValues={roleMateIdList}
                setSelectedValues={setRoleMateIdList}
                items={roomInfo.mateList}
              />

              <CustomTextInputBox
                title="역할을 입력해주세요"
                value={title}
                setValue={setTitle}
                placeholder="역할을 입력해주세요"
              />
              <DaySelect repeatDayList={repeatDayList} setRepeatDayList={setRepeatDayList} />
            </View>
          )}

          {type === 'rule' && (
            <View className="px-5">
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
                height={120}
                maxLength={50}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View className="fixed bottom-0 w-full bg-transparent px-5">
        <Pressable disabled={!canSubmit()}>
          <View className={`${canSubmit() ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}>
            <Text className="text-center text-base font-semibold text-white">확인</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateRoleNRuleScreen;
