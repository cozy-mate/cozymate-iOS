import LottieView from 'lottie-react-native';
import moment from 'moment';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CheckBoxIcon from '@/assets/images/roleNRule/check.svg';
import NotCheckBoxIcon from '@/assets/images/roleNRule/notCheck.svg';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useCreateTodo } from '@/hooks/todo/todo';
import { useMemberStore } from '@/zustand/store';

import CustomCalendar from '../todo/calendar';

export default function CreateTodoScene() {
  const { roomInfo } = useMemberStore();

  const { mutateAsync: createTodo } = useCreateTodo(roomInfo?.roomId ?? 0);

  const [content, setContent] = useState<string>('');
  const [mateIdList, setMateIdList] = useState<number[]>([]);
  const [timePoint, setTimePoint] = useState(moment().format('YYYY-MM-DD'));

  const { data: memberList, isLoading } = useGetMyRoomDetail(roomInfo?.roomId ?? 0);

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
          <View className="gap-y-[12px]">
            <Text className="Semibold16 text-emphasizedFont mx-[4px]">할 일을 입력해주세요</Text>
            <TextInput
              value={content}
              onChangeText={(e) => setContent(e)}
              placeholder="할 일을 입력해주세요"
              placeholderTextColor={'#ACADB4'}
              className={`px-[16px] py-[15px] rounded-xl InputMedium14 text-basicFont h-[49px] border`}
            />
          </View>

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

      <Pressable
        onPress={() => createTodo({ content, mateIdList, timePoint })}
        disabled={!(content !== '' && mateIdList.length > 0 && timePoint !== '')}
        className={`${
          content !== '' && mateIdList.length > 0 && timePoint !== ''
            ? 'bg-mainColor'
            : 'bg-[#C4C4C4]'
        }  py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
      >
        <Text className="Semibold16 text-white text-center">확인</Text>
      </Pressable>
    </View>
  );
}
