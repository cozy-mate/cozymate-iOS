import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { FlatList, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import LoadingComponent from '@/components/common/loading';
import InquiryItemComponent from '@/components/myPage/inquiryItem';
import { useGetInquiryList } from '@/hooks/inquiry/inquiry';

function InquiryListComponent() {
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
        renderItem={({ item }) => <InquiryItemComponent key={item.inquiryId} data={item} />}
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

export default function InquiryList() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <InquiryListComponent />
    </Suspense>
  );
}
