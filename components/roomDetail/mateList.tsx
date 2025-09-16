import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrowIcon from '@/assets/images/common/smaillGrayArrow.svg';
import { getPersona } from '@/constants/items/characterItem';
import { useTracker } from '@/providers/TrackerProvider';
import { RoomItem } from '@/type/room';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useMemberStore } from '@/zustand/store';

interface MateListComponentProps {
  data: RoomItem;
}

const MateListComponent: React.FC<MateListComponentProps> = ({ data }) => {
  const router = useRouter();

  const { memberInfo } = useMemberStore();

  const { trackButton } = useTracker();

  const onPressMate = (memberId: number) => {
    trackButton(ButtonEvent.mate_component, EventCategory.content_room, {
      roomId: data.roomId,
      memberId,
    });
    router.push(`/user/${memberId}`);
  };

  return (
    <View className="px-[20px] gap-y-[12px]">
      <View className="flex flex-row justify-between">
        <Text className="Semibold16 text-emphasizedFont">방 정보</Text>
        <Text className="Medium12 text-disabledFont">
          <Text className="font-600 text-mainColor">{data.arrivalMateNum}</Text> / {data.maxMateNum}
        </Text>
      </View>

      <View className="px-4 py-1 rounded-xl border border-strokeColor">
        {data.mateDetailList.map((mate, index) => (
          <Pressable
            key={mate.mateId}
            onPress={() => onPressMate(mate.memberId)}
            className={`flex flex-row justify-between items-center py-3 ${index !== data.mateDetailList.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
          >
            <View className="flex flex-row items-center gap-x-[8px]">
              {getPersona(mate.persona, 24, 24)}
              <Text className="Medium14 text-emphasizedFont">
                {mate.nickname}
                <Text className="text-colorFont">
                  {' '}
                  {data.managerMemberId === mate.memberId && '(방장)'}
                </Text>
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              {Number(memberInfo?.memberId ?? 0) !== Number(mate.memberId) && (
                <Text className="Medium14 text-colorFont">{mate.mateEquality ?? '?? '}%</Text>
              )}
              <GrayArrowIcon />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MateListComponent;
