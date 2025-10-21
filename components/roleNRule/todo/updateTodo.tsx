import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CheckBoxIcon from '@/assets/images/roleNRule/check.svg';
import NotCheckBoxIcon from '@/assets/images/roleNRule/notCheck.svg';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import OpacityPressable from '@/components/opacityPressable';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useUpdateTodo } from '@/hooks/todo/todo';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

import CustomCalendar from './calendar';

export default function UpdateTodoScene() {
  const { roomInfo } = useMemberStore();

  const { selectedItem } = useSelectedItemStore();

  const { mutateAsync: updateTodo } = useUpdateTodo({
    roomId: roomInfo.roomId,
    todoId: selectedItem.id,
  });

  const [content, setContent] = useState<string>(selectedItem.content);
  const [mateIdList, setMateIdList] = useState<number[]>(selectedItem.mateIdList);
  const [timePoint, setTimePoint] = useState(selectedItem.timePoint);

  const { data: memberList, isLoading } = useGetMyRoomDetail(roomInfo.roomId);

  const toggleSelection = (itemValue: number) => {
    const updatedValue = mateIdList.includes(itemValue)
      ? mateIdList.filter((v) => v !== itemValue)
      : [...mateIdList, itemValue];
    setMateIdList(updatedValue);
  };

  const toggleAll = () => {
    if (mateIdList.length === memberList?.result.mateDetailList.length) {
      setMateIdList([]);
    } else {
      setMateIdList(memberList?.result.mateDetailList?.map((item) => item.mateId) ?? []);
    }
  };

  const isReady = !isLoading && memberList !== undefined;

  // 할 일, 담당자, 날짜가 모두 입력된 경우
  const isComplete = content !== '' && mateIdList.length > 0 && timePoint !== '';

  return (
    <View className="flex-1">
      {!isReady ? (
        <View className="flex-grow justify-center items-center">
          <LottieView
            source={require('@/assets/lotties/cozymateLoading.json')}
            style={{ width: 76, height: 94.24 }}
            loop={true}
          />
        </View>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 24,
            paddingHorizontal: 20,
            paddingBottom: 80,
            rowGap: 48,
          }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <CustomTextInput
            title="할 일을 입력해주세요"
            value={content}
            handleValue={setContent}
            placeholder="할 일을 입력해주세요"
            maxLength={20}
          />

          <View className="gap-y-[12px]">
            <Text className="Semibold16 text-emphasizedFont mx-[4px]">담당자를 선택해주세요</Text>
            <View className="gap-y-[8px]">
              <View className="flex flex-row flex-wrap gap-[8px]">
                {memberList.result.mateDetailList.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => toggleSelection(item.mateId)}
                    className={`px-[20px] py-[10px] rounded-md ${mateIdList.includes(item.mateId) ? 'bg-subColor1' : 'bg-colorBox'}`}
                  >
                    <Text
                      className={`${mateIdList.includes(item.mateId) ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
                    >
                      {item.nickname}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View className="flex flex-row items-center">
                <Pressable onPress={toggleAll} className="p-[8px]">
                  {mateIdList.length === memberList.result.mateDetailList.length ? (
                    <CheckBoxIcon />
                  ) : (
                    <NotCheckBoxIcon />
                  )}
                </Pressable>

                <Text className="Medium14 text-disabledFont">모두</Text>
              </View>
            </View>
          </View>

          <View className="gap-y-[12px]">
            <Text className="Semibold16 text-emphasizedFont mx-[4px]">날짜를 선택해주세요</Text>
            <CustomCalendar
              selectedDate={timePoint}
              canSelectPrev={false}
              onDateTimeSelect={(dateTime) => setTimePoint(dateTime)}
            />
          </View>
        </KeyboardAwareScrollView>
      )}

      <OpacityPressable
        onPress={() => updateTodo({ content, mateIdList, timePoint })}
        disabled={!isComplete}
        className={`${
          isComplete ? 'bg-mainColor' : 'bg-[#C4C4C4]'
        } py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
      >
        <Text className="Semibold16 text-white text-center">확인</Text>
      </OpacityPressable>
    </View>
  );
}
