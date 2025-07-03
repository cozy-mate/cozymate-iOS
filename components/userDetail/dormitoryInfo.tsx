import { Text, View } from 'react-native';

import { UserDetailComponentProps } from '@/type/member-stat';

const DormitoryInfoComponent: React.FC<UserDetailComponentProps> = ({ data }) => {
  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">기숙사 정보</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">인실</Text>
          <Text className="Medium14 text-basicFont">
            {data.memberStatDetail.numOfRoommate !== '0'
              ? `${data.memberStatDetail.numOfRoommate}인 1실`
              : '미정'}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">합격여부</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.dormJoiningStatus}</Text>
        </View>
      </View>
    </View>
  );
};

export default DormitoryInfoComponent;
