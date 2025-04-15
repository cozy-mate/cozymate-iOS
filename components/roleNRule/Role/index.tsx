import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import SettingIcon from '@/assets/images/roleNRule/setting.svg';
import { useGetRoleList } from '@/hooks/role/role';
import { useGetMyRoomDetail } from '@/hooks/room/room';
import { useMemberStore } from '@/zustand/member/member';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useHasRoomStore } from '@/zustand/room/room';

interface RoleComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const RoleComponent: React.FC<RoleComponentProps> = ({ bottomSheetRef }) => {
  const { roomInfo } = useHasRoomStore();
  const { data: roomData } = useGetMyRoomDetail();

  const { memberState } = useMemberStore();

  const { data } = useGetRoleList(roomInfo.roomId);

  const { setSelectedItem } = useSelectedItemStore();

  return (
    <View className="gap-y-[12px]">
      <View className="gap-y-0.5 mx-1">
        <Text className="text-18 font-600 leading-18 text-basicFont">
          <Text className="text-mainColor">{roomData?.result.name}</Text>의
        </Text>
        <Text className="text-18 font-600 leading-18 text-basicFont">
          역할에 대해 알려드릴게요!
        </Text>
      </View>

      {data !== undefined && data.result.length !== 0 ? (
        <View className="gap-y-[16px]">
          {data.result.map((role) => (
            <View
              key={role.roleId}
              className="p-[16px] pr-[8px] rounded-xl bg-white shadow-chipback"
            >
              <View className="flex flex-row items-start justify-between">
                <View className="gap-y-2">
                  <View className="gap-y-1.5">
                    <View className="bg-colorBox px-2 py-0.5 rounded-sm self-start">
                      <Text className="text-12 font-500 leading-12 text-colorFont text-center">
                        {role.isAllDays
                          ? '매일'
                          : role.repeatDayList.length !== 0
                            ? role.repeatDayList.join(', ')
                            : '미정'}
                      </Text>
                    </View>

                    <Text className="text-14 font-600 leading-14 text-emphasizedFont">
                      {role.content}
                    </Text>
                  </View>

                  <Text className="text-14 font-500 leading-14 text-basicFont">
                    {role.mateList.map((mate) => mate.nickname).join(', ')}
                  </Text>
                </View>

                {role.mateList.some((mate) => mate.nickname === memberState.nickname) && (
                  <Pressable
                    onPress={() => {
                      setSelectedItem({
                        id: role.roleId,
                        type: 'Role',
                        content: role.content,
                        roleItem: {
                          ...role,
                          mateIdNameList: role.mateList,
                        },
                      });
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
        <View className="py-2 rounded-xl bg-white flex items-center justify-center h-36 shadow-chipback">
          <Text className="text-14 font-500 leading-14 text-disabledFont  text-center">
            등록된 역할이 없어요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default RoleComponent;
