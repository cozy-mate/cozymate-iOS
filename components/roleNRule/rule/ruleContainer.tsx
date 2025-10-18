import BottomSheet from '@gorhom/bottom-sheet';
import { Fragment, RefObject, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import SettingIcon from '@/assets/icons/setting.svg';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

import RoleNRuleBottomSheet from '../bottomSheet';

import RuleBox from './ruleSkeleton';

type RuleItem = {
  ruleId: number;
  content: string;
  memo: string;
};

interface RuleContainerProps {
  isFetching: boolean;
  data: RuleItem[] | undefined;
}

export default function RuleContainer({ isFetching, data }: RuleContainerProps) {
  const { roomInfo } = useMemberStore();

  const { data: roomData } = useGetMyRoomDetail(roomInfo.roomId);

  const { setSelectedItem } = useSelectedItemStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <Fragment>
      <View className="gap-y-[12px]">
        <Text className="Semibold18 text-basicFont">
          <Text className="text-mainColor">{roomData?.result.name ?? ''}</Text>의{'\n'}규칙에 대해
          알려드릴게요!
        </Text>

        {isFetching ? (
          <RuleBox />
        ) : data !== undefined && data.length !== 0 ? (
          <View className="p-[8px] pl-[16px] rounded-xl bg-white shadow-chipback">
            {data.map((rule, index) => (
              <View
                key={rule.ruleId}
                className="flex flex-row items-start justify-between gap-x-[6px]"
              >
                <View className="flex flex-row items-center gap-x-[8px] mt-[8px]">
                  <View className="w-[24px] h-[24px] rounded-full bg-colorBox flex items-center justify-center">
                    <Text className="Medium12 text-colorFont text-center">{index + 1}</Text>
                  </View>
                </View>

                <View className="flex-1 mt-[8px]">
                  <Text className="Medium14 text-basicFont my-[3.5px]">{rule.content}</Text>

                  {rule.memo !== '' && (
                    <Text className="Medium10 text-disabledFont mt-[2px]">{rule.memo}</Text>
                  )}
                </View>

                <Pressable
                  onPress={() => {
                    setSelectedItem((prev) => ({
                      ...prev,
                      id: rule.ruleId,
                      content: rule.content,
                      memo: rule.memo,
                    }));
                    bottomSheetRef.current?.expand();
                  }}
                  className="p-[8px]"
                >
                  <SettingIcon />
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View className="bg-white h-[144px] flex items-center justify-center rounded-xl shadow-chipback">
            <Text className="Medium14 text-disabledFont text-center">등록된 규칙이 없어요!</Text>
          </View>
        )}
      </View>

      <RoleNRuleBottomSheet
        type="rules"
        bottomSheetRef={bottomSheetRef as RefObject<BottomSheet>}
      />
    </Fragment>
  );
}
