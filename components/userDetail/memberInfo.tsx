import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import Background from '@/assets/images/common/background.svg';
import { getPersona } from '@/constants/items/characterItem';
import { UserDetailComponentProps } from '@/type/member-stat';
import { useMemberStore } from '@/zustand/member/member';

interface MemberInfoComponentProps extends UserDetailComponentProps {
  id: number;
}

const MemberInfoComponent: React.FC<MemberInfoComponentProps> = ({ id, data }) => {
  const router = useRouter();
  const { memberState } = useMemberStore();

  return (
    <View className="px-[20px] gap-y-[20px]">
      <Background style={{ position: 'absolute' }} />

      <View className="flex flex-row items-center gap-x-[8px]">
        {getPersona(data.memberDetail.persona, 40, 40)}
        <View className="gap-y-[4px]">
          <Text className="Semibold16 text-emphasizedFont">{data.memberDetail.nickname}</Text>
          {id !== memberState.memberId && (
            <Text className="Medium14 text-basicFont">나와의 일치율 {data.equality ?? '??'}%</Text>
          )}
        </View>
      </View>

      {data.roomId !== 0 ? (
        <Pressable
          onPress={() => router.push(`/room/${data.roomId}`)}
          className="bg-subColor2 rounded-xl border border-mainColor py-[12px]"
        >
          <Text className="Semibold14 text-mainColor text-center">
            {data.memberDetail.nickname}님이 속한 방 바로 가기
          </Text>
        </Pressable>
      ) : (
        <View className="bg-colorBox rounded-xl border border-disabledFont py-[12px]">
          <Text className="Semibold14 text-disabledFont text-center">아직 속한 방이 없어요</Text>
        </View>
      )}
    </View>
  );
};
export default MemberInfoComponent;
