import { Text, View } from 'react-native';

import { useGetMemberDetail } from '@/hooks/member-stat/member-stat';

interface UserDetailComponentProps {
  id: number;
}

const AdditionalInfoComponent: React.FC<UserDetailComponentProps> = ({ id }) => {
  const { data } = useGetMemberDetail(Number(id));

  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="text-16 font-600 text-emphasizedFont ml-1">하고싶은 말</Text>

      <View className="p-4 rounded-xl border border-strokeColor">
        <Text className="text-14 font-500 text-basicFont">
          {data.result.memberStatDetail.selfIntroduction}
        </Text>
      </View>
    </View>
  );
};

export default AdditionalInfoComponent;
