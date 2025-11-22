import { Text, View } from 'react-native';

import { UserDetailComponentProps } from '@/type/member-stat';

export default function BasicInfoComponent({ data }: UserDetailComponentProps) {
  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">기본 정보</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">닉네임</Text>
          <Text className="Medium14 text-basicFont">{data.memberDetail.nickname}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">출생년도</Text>
          <Text className="Medium14 text-basicFont">
            {data.memberDetail.birthday.slice(0, 4)}년
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">학교</Text>
          <Text className="Medium14 text-basicFont">{data.memberDetail.universityName}</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">학번</Text>
          <Text className="Medium14 text-basicFont">{data.memberStatDetail.admissionYear}학번</Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">학과</Text>
          <Text className="Medium14 text-basicFont">{data.memberDetail.majorName}</Text>
        </View>
      </View>
    </View>
  );
}
