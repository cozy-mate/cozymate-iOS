import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingIcon from '@/assets/images/common/setting.svg';
import ChatComponent from '@/components/chat/ChatComponent';
import BackHeaderComponent from '@/components/common/backHeader';
import { useGetChatRoomDetail } from '@/hooks/chat/chat';
import { useExitChatRoom, useGetChatRoomList } from '@/hooks/chat-room/chat-room';

export default function ChatRoom() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const { data } = useGetChatRoomDetail(Number(id));

  const { refetch } = useGetChatRoomList();
  const { mutateAsync: exitChatRoom } = useExitChatRoom(Number(id), refetch);

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px] pt-[8px]">
      <View className="gap-y-[49px]">
        <BackHeaderComponent>
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="flex w-[40px] h-[40px] items-center justify-center"
          >
            <SettingIcon />
          </Pressable>
        </BackHeaderComponent>
        <ChatComponent id={Number(id)} />
      </View>

      <View className="absolute bottom-[62px] left-1/2 -translate-x-1/2">
        <Pressable
          onPress={() => router.push(`/chat/send/${data?.pages[0]?.result.result.memberId}`)}
          className="bg-mainColor rounded-full px-[60px] py-[14px]"
        >
          <Text className="text-14 font-600 leading-14 text-white">쪽지쓰기</Text>
        </Pressable>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[175]}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.7} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <BottomSheetView className="px-[20px] pt-[24px] pb-[50px]">
          <Pressable onPress={() => exitChatRoom()} className="py-[11.5px]">
            <Text className="text-16 font-500 leading-16 text-basicFont mx-[4px]">삭제하기</Text>
          </Pressable>

          <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />

          <Pressable className="py-[11.5px]">
            <Text className="text-16 font-500 leading-16 text-basicFont mx-[4px]">신고하기</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
