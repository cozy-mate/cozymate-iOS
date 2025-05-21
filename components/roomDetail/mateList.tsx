import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import GrayArrowIcon from '@/assets/images/common/smaillGrayArrow.svg';
import { getPersona } from '@/constants/items/characterItem';
import { RoomItem } from '@/type/room';
import { useMemberStore } from '@/zustand/member/member';

interface MateListComponentProps {
  data: RoomItem;
}

const MateListComponent: React.FC<MateListComponentProps> = ({ data }) => {
  const router = useRouter();

  const { memberState } = useMemberStore();

  return (
    <View className="px-[20px] gap-y-[12px]">
      <View className="flex flex-row justify-between">
        <Text className="text-16 font-600 text-emphasizedFont">방 정보</Text>
        <Text className="text-12 font-500 text-disabledFont">
          <Text className="font-600 text-mainColor">{data.arrivalMateNum}</Text> / {data.maxMateNum}
        </Text>
      </View>

      <View className="px-4 py-1 rounded-xl border border-strokeColor">
        {data.mateDetailList.map((mate, index) => (
          <Pressable
            key={mate.mateId}
            onPress={() => router.push(`/user/${mate.memberId}`)}
            className={`flex flex-row justify-between items-center py-3 ${index !== data.mateDetailList.length - 1 && 'border-b border-b-[#F1F2F4]'}`}
          >
            <View className="flex flex-row items-center gap-x-[8px]">
              {getPersona(mate.persona, 24, 24)}
              <Text className="text-14 font-500 text-emphasizedFont">{mate.nickname}</Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              {memberState.memberId !== mate.memberId && (
                <Text className="text-14 font-500 text-colorFont">
                  {mate.mateEquality ?? '?? '}%
                </Text>
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
