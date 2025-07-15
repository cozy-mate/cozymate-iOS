import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import LoadingComponent from '@/components/common/loading';
import { useGetBlockedMemberList } from '@/hooks/member-block/member-block';

function BlockMemberComponent() {
  const router = useRouter();

  const { data } = useGetBlockedMemberList();

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px]">
      <BackHeaderComponent />

      <FlatList
        contentContainerStyle={{ paddingTop: 32, flexGrow: 1 }}
        data={data.result}
        renderItem={({ item }) => (
          <Pressable
            key={item.memberId}
            onPress={() => router.push(`/user/${item.memberId}`)}
            className="py-[14.5px]"
          >
            <Text className="Medium16 text-emphasizedFont">{item.nickname}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="pb-[64px] Medium14 text-disabledFont">
              차단한 유저가 존재하지 않아요
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="bg-[#F6F6F6] h-[1px] my-[8px]" />}
      />
    </SafeAreaView>
  );
}

export default function BlockMember() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <BlockMemberComponent />
    </Suspense>
  );
}
