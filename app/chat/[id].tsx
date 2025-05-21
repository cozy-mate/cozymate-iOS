import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingIcon from '@/assets/images/common/setting.svg';
import ChatItemComponent from '@/components/chat/chatItem';
import BackHeaderComponent from '@/components/common/backHeader';
import ReportModalComponent from '@/components/common/reportModal';
import TwoButtonModal from '@/components/common/twoButtonModal';
import { useGetChatRoomDetail } from '@/hooks/chat/chat';
import { useExitChatRoom } from '@/hooks/chat-room/chat-room';

export default function ChatRoom() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  const { id, nickname } = useLocalSearchParams();

  const { mutateAsync: exitChatRoom } = useExitChatRoom(Number(id));

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage } = useGetChatRoomDetail(Number(id));

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-[8px] relative">
      <View className="px-[20px]">
        <BackHeaderComponent>
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="flex w-[40px] h-[40px] items-center justify-center"
          >
            <SettingIcon />
          </Pressable>
        </BackHeaderComponent>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        className="px-[20px] mt-[16px]"
        data={data?.pages?.flatMap((page) => page.result.result.content)}
        renderItem={({ item }) => <ChatItemComponent data={item} />}
        ItemSeparatorComponent={() => <View className="bg-[#F1F2F4] h-[1px] my-[18px]" />}
        onEndReached={loadMoreList}
        onEndReachedThreshold={0.5}
      />

      <Pressable
        onPress={() =>
          router.push(
            `/chat/send/${data?.pages[0]?.result.result.memberId}?chatRoomId=${Number(id)}&nickname=${encodeURIComponent(nickname as string)}`,
          )
        }
        className="bg-mainColor rounded-full px-[60px] py-[14px] absolute bottom-[62px] left-1/2 -translate-x-1/2"
      >
        <Text className="text-14 font-600 leading-14 text-white text-center">쪽지쓰기</Text>
      </Pressable>

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
          <Pressable
            onPress={() => {
              bottomSheetRef.current?.close();
              setIsDeleteModalVisible(true);
            }}
            className="py-[11.5px]"
          >
            <Text className="text-16 font-500 leading-16 text-basicFont mx-[4px]">삭제하기</Text>
          </Pressable>

          <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />

          <Pressable
            onPress={() => {
              bottomSheetRef.current?.close();
              setIsReportModalVisible(true);
            }}
            className="py-[11.5px]"
          >
            <Text className="text-16 font-500 leading-16 text-basicFont mx-[4px]">신고하기</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>

      <TwoButtonModal
        isVisible={isDeleteModalVisible}
        title="쪽지방을 삭제하시겠어요?"
        closeFunc={() => setIsDeleteModalVisible(false)}
        leftButtonText="아니오"
        leftButtonFunc={() => setIsDeleteModalVisible(false)}
        rightButtonText="예"
        rightButtonFunc={() => {
          setIsDeleteModalVisible(false);
          exitChatRoom();
        }}
      />

      <ReportModalComponent
        isVisible={isReportModalVisible}
        memberId={Number(id)}
        source="CHAT"
        closeModal={() => setIsReportModalVisible(false)}
      />
    </SafeAreaView>
  );
}
