import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/myPage/bottomButton';
import InquiryItemComponent from '@/components/myPage/inquiryItem';
import { useGetInquiryList } from '@/hooks/inquiry/inquiry';

export default function InquiryList() {
  const router = useRouter();

  const { data } = useGetInquiryList();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-[20px] mt-[16px]"
        data={data.result}
        renderItem={({ item }) => <InquiryItemComponent data={item} />}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-strokeColor my-[12px]" />}
      />

      <BottomButtonComponent
        buttonText="문의하러 가기"
        onPress={() => router.push('/myPage/inquiry/register')}
        disabled={false}
        color="BLUE"
      />
    </SafeAreaView>
  );
}
