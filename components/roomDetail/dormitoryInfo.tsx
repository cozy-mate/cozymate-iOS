import { Text, View } from 'react-native';

import { RoomDetailItem } from '@/type/room';

interface DormitoryInfoComponentProps {
  data: RoomDetailItem;
}

export default function DormitoryInfoComponent({ data }: DormitoryInfoComponentProps) {
  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont">기숙사 정보</Text>

      <View className="p-4 rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">분류</Text>
          <Text className="Medium14 text-basicFont">{data.dormitoryName}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">인실</Text>
          <Text className="Medium14 text-basicFont">{data.maxMateNum}인실</Text>
        </View>
      </View>
    </View>
  );
}
