import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Suspense, useRef, useState } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingIcon from '@/assets/images/common/setting.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import LoadingComponent from '@/components/common/loading';
import ChatItemComponent from '@/components/message/messageItem';
import ReportModalComponent from '@/components/modal/reportModal';
import TwoButtonModal from '@/components/modal/twoButtonModal';
import { useGetMessageRoomDetail } from '@/hooks/message/message';
import { useExitMessageRoom } from '@/hooks/message-room/message-room';

function ChatRoomComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  const { id, nickname } = useLocalSearchParams();

  const { mutateAsync: exitMessageRoom } = useExitMessageRoom(Number(id));

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage } = useGetMessageRoomDetail(Number(id));

  const loadMoreList = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const snapPoints = data?.pages[0]?.result.result.memberId !== null ? [175] : [120];

  return (
    <SafeAreaView className="flex-1 bg-white relative">
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
        className="px-[20px] mt-[32px]"
        data={data?.pages?.flatMap((page) => page.result.result.content)}
        renderItem={({ item }) => <ChatItemComponent data={item} />}
        ItemSeparatorComponent={() => <View className="bg-[#F1F2F4] h-[1px] my-[18px]" />}
        onEndReached={loadMoreList}
        onEndReachedThreshold={0.5}
      />

      {data?.pages[0]?.result.result.memberId !== null && (
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/message/send/${data?.pages[0]?.result.result.memberId}?messageRoomId=${Number(id)}&nickname=${encodeURIComponent(nickname as string)}`,
            )
          }
          className="bg-mainColor rounded-full px-[60px] py-[14px] absolute bottom-[62px] left-1/2 -translate-x-1/2"
        >
          <Text className="Semibold14 text-white text-center">쪽지쓰기</Text>
        </TouchableOpacity>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
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
            <Text className="Medium16 text-basicFont mx-[4px]">삭제하기</Text>
          </Pressable>

          {data?.pages[0]?.result.result.memberId !== null && (
            <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />
          )}

          {data?.pages[0]?.result.result.memberId !== null && (
            <Pressable
              onPress={() => {
                bottomSheetRef.current?.close();
                setIsReportModalVisible(true);
              }}
              className="py-[11.5px]"
            >
              <Text className="Medium16 text-basicFont mx-[4px]">신고하기</Text>
            </Pressable>
          )}
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
          exitMessageRoom();
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

export default function ChatRoom() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <ChatRoomComponent />
    </Suspense>
  );
}
