import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import Background from '@/assets/images/common/background.svg';
import { getPersona } from '@/constants/items/characterItem';
import { UserDetailComponentProps } from '@/type/member-stat';
import { useMemberStore } from '@/zustand/store';

import OpacityPressable from '../opacityPressable';

interface MemberInfoComponentProps extends UserDetailComponentProps {
  id: number;
}

export default function MemberInfoComponent({ id, data }: MemberInfoComponentProps) {
  const router = useRouter();
  const { memberInfo } = useMemberStore();

  return (
    <View className="px-[20px] gap-y-[20px]">
      <Background style={{ position: 'absolute' }} />

      <View className="flex flex-row items-center gap-x-[8px]">
        {getPersona(data.memberDetail.persona, 40, 40)}
        <View className="gap-y-[4px]">
          <Text className="Semibold16 text-emphasizedFont">{data.memberDetail.nickname}</Text>
          {id !== Number(memberInfo?.memberId ?? 0) && (
            <Text className="Medium14 text-basicFont">나와의 일치율 {data.equality ?? '??'}%</Text>
          )}
        </View>
      </View>

      {data.roomId !== 0 ? (
        <OpacityPressable onPress={() => router.push(`/room/${data.roomId}`)}>
          <View className="bg-subColor2 rounded-xl border border-mainColor py-[12px]">
            <Text className="Semibold14 text-mainColor text-center">
              {data.memberDetail.nickname}님이 속한 방 바로 가기
            </Text>
          </View>
        </OpacityPressable>
      ) : (
        <View className="bg-colorBox rounded-xl border border-disabledFont py-[12px]">
          <Text className="Semibold14 text-disabledFont text-center">아직 속한 방이 없어요</Text>
        </View>
      )}
    </View>
  );
}
