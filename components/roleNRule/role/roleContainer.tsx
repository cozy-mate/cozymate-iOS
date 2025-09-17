import BottomSheet from '@gorhom/bottom-sheet';
import { Fragment, RefObject, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import SettingIcon from '@/assets/images/roleNRule/setting.svg';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

import RoleNRuleBottomSheet from '../bottomSheet';

import RoleBox from './roleSkeleton';

interface RoleContainerProps {
  isFetching: boolean;
  data:
    | {
        roleId: number;
        mateList: {
          mateId: number;
          nickname: string;
        }[];
        content: string;
        repeatDayList: string[];
        isAllDays: boolean;
      }[]
    | undefined;
}

export default function RoleContainer({ isFetching, data }: RoleContainerProps) {
  const { memberInfo, roomInfo } = useMemberStore();

  const { data: roomData } = useGetMyRoomDetail(roomInfo?.roomId || 0);

  const { setSelectedItem } = useSelectedItemStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <Fragment>
      <View className="gap-y-[12px]">
        <Text className="Semibold18 text-basicFont">
          <Text className="text-mainColor">{roomData?.result.name}</Text>의{'\n'}역할에 대해
          알려드릴게요!
        </Text>

        {isFetching ? (
          <RoleBox />
        ) : data !== undefined && data.length !== 0 ? (
          <View className="gap-y-[16px]">
            {data.map((role) => (
              <View
                key={role.roleId}
                className="p-[16px] pr-[8px] rounded-xl bg-white shadow-chipback"
              >
                <View className="flex flex-row items-start justify-between">
                  <View className="gap-y-[8px]">
                    <View className="gap-y-[6px]">
                      <View className="bg-colorBox px-[8px] py-[2px] rounded-sm self-start">
                        <Text className="Medium12 text-colorFont text-center">
                          {role.isAllDays
                            ? '매일'
                            : role.repeatDayList.length !== 0
                              ? role.repeatDayList.join(', ')
                              : '미정'}
                        </Text>
                      </View>

                      <Text className="Medium14 text-emphasizedFont">{role.content}</Text>
                    </View>

                    <Text className="Medium14 text-basicFont">
                      {role.mateList.map((mate) => mate.nickname).join(', ')}
                    </Text>
                  </View>

                  {role.mateList.some((mate) => mate.nickname === (memberInfo?.nickname ?? '')) && (
                    <Pressable
                      onPress={() => {
                        setSelectedItem((prev) => ({
                          ...prev,
                          id: role.roleId,
                          content: role.content,
                          mateIdNameList: role.mateList,
                          repeatDayList: role.repeatDayList,
                        }));
                        bottomSheetRef.current?.expand();
                      }}
                      className="px-[8px] pb-[16px]"
                    >
                      <SettingIcon />
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="bg-white h-[144px] flex items-center justify-center rounded-xl shadow-chipback">
            <Text className="Medium14 text-disabledFont text-center">등록된 역할이 없어요!</Text>
          </View>
        )}
      </View>

      <RoleNRuleBottomSheet
        type="roles"
        bottomSheetRef={bottomSheetRef as RefObject<BottomSheet>}
      />
    </Fragment>
  );
}
