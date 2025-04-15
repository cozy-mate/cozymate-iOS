import { Text, View } from 'react-native';

import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';

interface UserDetailComponentProps {
  id: number;
}

const DormitoryInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const { data } = useGetMemberDetail(Number(id));

  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="text-16 font-600 text-emphasizedFont ml-1">기숙사 정보</Text>

      <View className="p-4 rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">인실</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.numOfRoommate}인 1실
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">합격여부</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.dormJoiningStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DormitoryInfoComponent;
