import { Text, View } from 'react-native';

import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';

interface UserDetailComponentProps {
  id: number;
}

const BasicInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const { data } = useGetMemberDetail(Number(id));

  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="text-16 font-600 text-emphasizedFont ml-1">기본 정보</Text>

      <View className="p-4 rounded-xl border border-strokeColor">
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">닉네임</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberDetail.nickname}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">출생년도</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberDetail.birthday.slice(0, 4)}년
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">학교</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberDetail.universityName}
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">학번</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberStatDetail.admissionYear}학번
          </Text>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="text-14 font-500 text-colorFont">학과</Text>
          <Text className="text-14 font-500 text-basicFont">
            {data.result.memberDetail.majorName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BasicInfoComponent;
