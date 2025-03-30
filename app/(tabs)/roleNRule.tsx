import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Suspense, useRef, useState } from 'react';
import { Dimensions, Text, Pressable, ScrollView, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddButton from '@/assets/images/roleNRule/addButton.svg';
import Background from '@/assets/images/roleNRule/background.svg';
import CustomCalendar from '@/components/roleNRule/Calendar';
import MateTodoComponent from '@/components/roleNRule/MateTodo';
import MyTodoComponent from '@/components/roleNRule/MyTodo';
import RoleComponent from '@/components/roleNRule/Role';
import RuleComponent from '@/components/roleNRule/Rule';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';

export default function RoleNRule() {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const width = Dimensions.get('screen').width;

  const [type, setType] = useState<string>('todo');
  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  const handleDateTimeSelect = (dateTime: string) => {
    setTimePoint(dateTime);
  };

  const { selectedItem } = useSelectedItemStore();

  return (
    <Suspense>
      <SafeAreaView className="flex-1 bg-subColor1 relative">
        <Background style={{ position: 'absolute', width: width }} />

        <View className="flex flex-row gap-x-[24px] px-[20px] mt-7">
          <Pressable onPress={() => setType('todo')} className="w-[90px] gap-y-2">
            <Text
              className={`text-center text-16 font-600 leading-16 p-1 ${type === 'todo' ? 'text-mainColor' : 'text-disabledFont'}`}
            >
              To - do
            </Text>

            <View
              className={`h-1 rounded-[32px] ${type === 'todo' ? 'bg-mainColor' : 'bg-subColor1'}`}
            />
          </Pressable>

          <Pressable onPress={() => setType('role')} className="w-[90px] gap-y-2">
            <Text
              className={`text-center text-16 font-600 leading-16 p-1 ${type === 'role' ? 'text-mainColor' : 'text-disabledFont'}`}
            >
              Role & Rule
            </Text>

            <View
              className={`h-1 rounded-[32px] ${type === 'role' ? 'bg-mainColor' : 'bg-subColor1'}`}
            />
          </Pressable>
        </View>

        <ScrollView className="bg-[#F7FAFF] px-[20px] flex-1 rounded-tr-[48px]">
          {type === 'todo' && (
            <View className="pt-[34px] gap-y-8 flex-1 pb-28">
              <CustomCalendar canSelectPrev={true} onDateTimeSelect={handleDateTimeSelect} />
              <MyTodoComponent timePoint={timePoint} bottomSheetRef={bottomSheetRef} />
              <MateTodoComponent timePoint={timePoint} />
            </View>
          )}

          {type === 'role' && (
            <View className="pt-[34px] gap-y-8 flex-1 pb-28">
              <RuleComponent bottomSheetRef={bottomSheetRef} />
              <RoleComponent bottomSheetRef={bottomSheetRef} />
            </View>
          )}
        </ScrollView>

        <Pressable
          onPress={() => router.push('/roleNRule/create')}
          className="absolute bottom-[126px] right-[20px]"
        >
          <AddButton />
        </Pressable>

        <Portal>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[216]}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                opacity={0.7}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
              />
            )}
          >
            <BottomSheetView className="px-[20px] pt-[24px] pb-[50px] gap-y-[24px]">
              <Text className="text-18 font-700 leading-18 text-emphasizedFont text-center">
                ‘ {selectedItem.content} ‘
              </Text>

              <View>
                <Pressable className="py-[11.5px]">
                  <Text className="text-16 font-500 leading-16 text-basicFont mx-[4px]">
                    수정하기
                  </Text>
                </Pressable>

                <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />

                <Pressable className="py-[11.5px]">
                  <Text className="text-16 font-500 leading-16 text-basicFont mx-[4px]">
                    삭제하기
                  </Text>
                </Pressable>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </Portal>
      </SafeAreaView>
    </Suspense>
  );
}
