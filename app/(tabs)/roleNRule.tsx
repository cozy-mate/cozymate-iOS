import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddButton from '@/assets/images/roleNRule/addButton.svg';
import Background from '@/assets/images/roleNRule/background.svg';
import BottomSheetComponent from '@/components/common/bottomSheet';
import RoleNRuleHeader from '@/components/roleNRule/header';
import RoleNRuleBottomSheetComponent from '@/components/roleNRule/roleNruleBottomSheet';
import RoleRuleSection from '@/components/roleNRule/roleRuleSection';
import TodoSection from '@/components/roleNRule/todoSection';
import { useGetRoleList } from '@/hooks/role/role';
import { useCheckHasRoom } from '@/hooks/room/room';
import { useGetRuleList } from '@/hooks/rule/rule';
import { useGetTodoList } from '@/hooks/todo/todo';

export default function RoleNRule() {
  const router = useRouter();
  const width = Dimensions.get('screen').width;
  const [currentType, setCurrentType] = useState<'To-do' | 'Role'>('To-do');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: hasRoom } = useCheckHasRoom();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [timePoint, setTimePoint] = useState<string>(moment().format('YYYY-MM-DD'));

  const { refetch: todoRefetch } = useGetTodoList(hasRoom.result.roomId, timePoint);
  const { refetch: ruleRefetch } = useGetRuleList(hasRoom.result.roomId);
  const { refetch: roleRefetch } = useGetRoleList(hasRoom.result.roomId);

  const refetchFuncs = [todoRefetch(), ruleRefetch(), roleRefetch()];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all(refetchFuncs).finally(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-subColor1 relative">
      <Background style={{ position: 'absolute', width: width }} />

      <RoleNRuleHeader
        currentType={currentType}
        handleType={(e: 'To-do' | 'Role') => setCurrentType(e)}
      />

      <ScrollView
        className="bg-[#F7FAFF] px-[20px] flex-1 rounded-tr-[48px]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#68A4FF'} />
        }
      >
        {currentType === 'To-do' ? (
          <TodoSection
            bottomSheetRef={bottomSheetRef}
            timePoint={timePoint}
            setTimePoint={setTimePoint}
          />
        ) : (
          <RoleRuleSection bottomSheetRef={bottomSheetRef} />
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push(`/roleNRule/create?currentType=${currentType}`)}
        className="absolute bottom-[126px] right-[20px]"
      >
        <AddButton />
      </TouchableOpacity>

      <BottomSheetComponent bottomSheetRef={bottomSheetRef} snapPoints={[216]}>
        <RoleNRuleBottomSheetComponent bottomSheetRef={bottomSheetRef} />
      </BottomSheetComponent>
    </SafeAreaView>
  );
}
