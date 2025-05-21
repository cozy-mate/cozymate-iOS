import { Text, View } from 'react-native';

import { getPersona } from '@/constants/items/characterItem';
import { InquiryData } from '@/type/inquiry';

interface InquiryItemComponentProps {
  data: InquiryData;
}

const InquiryItemComponent: React.FC<InquiryItemComponentProps> = ({ data }) => {
  return (
    <View className="pt-[12px]">
      <View className="flex flex-row justify-between items-center mb-[12px]">
        <View className="flex flex-row items-center gap-x-[8px]">
          {getPersona(data.persona, 24, 24)}
          <Text className="text-14 font-500 leading-14 text-emphasizedFont">{data.nickname}</Text>
        </View>

        <Text className="text-12 font-500 leading-12 text-disabledFont">{data.status}</Text>
      </View>

      <Text className="text-14 font-500 leading-14 text-emphasizedFont mb-[24px]">
        {data.content}
      </Text>

      <Text className="text-12 font-500 leading-12 text-disabledFont self-end">
        {data.datetime}
      </Text>
    </View>
  );
};

export default InquiryItemComponent;
