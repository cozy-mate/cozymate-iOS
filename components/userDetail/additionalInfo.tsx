import { Text, View } from 'react-native';

import { UserDetailComponentProps } from '@/type/member-stat';

const AdditionalInfoComponent: React.FC<UserDetailComponentProps> = ({ data }) => {
  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">하고싶은 말</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        <Text className="Medium14 text-basicFont">{data.memberStatDetail.selfIntroduction}</Text>
      </View>
    </View>
  );
};

export default AdditionalInfoComponent;
