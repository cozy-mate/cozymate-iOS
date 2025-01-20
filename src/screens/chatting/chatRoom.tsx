import React, { useState } from 'react';
import { Text, View, Modal, FlatList, Pressable, SafeAreaView } from 'react-native';

import ChatComponent from '@components/chatting/chat';
import ReportModal from '@components/report/reportComponent';
import OneButtonModal from '@components/commonComponents/oneButtonModal';
import TwoButtonModal from '@components/commonComponents/twoButtonModal';

import { useGetChatDetailData } from '@hooks/api/chat';
import { useDeleteChatRoom, useGetChatRoomList } from '@hooks/api/chat-room';

import { ChatRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import SettingIcon from '@assets/roleNrule/settingIcon.svg';

interface ControlItem {
  index: number;
  name: string;
  pressFunc: any;
}

const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
  const { chatRoomId } = route.params;

  const { refetch: refetchChatRoomList } = useGetChatRoomList();
  const { data: chatlist } = useGetChatDetailData(chatRoomId);

  const { mutateAsync: deleteChatRoom } = useDeleteChatRoom(chatRoomId, refetchChatRoomList);

  const [isControlModalOpen, setIsControlModalOpen] = useState<boolean>(false);

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const deleteRoom = async (): Promise<void> => {
    try {
      await deleteChatRoom(chatRoomId);
      setIsWarningModalOpen(false);
      setIsCompleteModalOpen(true);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const toSend = () => {
    navigation.navigate('SendChatScreen', {
      memberId: chatlist.result.memberId,
      chatRoomId: chatRoomId,
    });
  };

  const toBack = () => {
    navigation.goBack();
  };

  const controlItems: ControlItem[] = [
    {
      index: 1,
      name: '삭제하기',
      pressFunc: () => {
        setIsControlModalOpen(false);
        setIsWarningModalOpen(true);
      },
    },
    {
      index: 2,
      name: '신고하기',
      pressFunc: () => {
        setIsControlModalOpen(false);
        setIsReportModalOpen(true);
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="px-5"
        // 채팅 목록 데이터
        data={chatlist.result.content.slice().reverse()}
        // 각 item의 key 값 지정
        keyExtractor={(_, index) => index.toString()}
        // item들을 렌더링하는 메서드
        renderItem={({ item }) => <ChatComponent chatData={item} />}
        // Header Component를 sticky하도록 설정
        stickyHeaderIndices={[0]}
        // FlatList의 최하단에 렌더링되는 Header 아이템
        ListHeaderComponent={
          <View className="flex flex-row items-center justify-between bg-white pb-8 pt-2">
            <Pressable onPress={toBack}>
              <BackButton />
            </Pressable>

            <Pressable onPress={() => setIsControlModalOpen(true)}>
              <SettingIcon />
            </Pressable>
          </View>
        }
        // FlatList의 최하단에 렌더링되는 Footer 아이템
        ListFooterComponent={<View className="h-8" />}
        // 렌더링 되는 아이템들 사이의 간격
        ItemSeparatorComponent={() => <View className="my-[18px] h-[1px] bg-colorBox" />}
        ListEmptyComponent={
          <View className="mb-20 flex-1 items-center justify-center">
            <Text className="text-sm font-medium text-disabledFont">
              아직 주고 받은 쪽지가 없어요!
            </Text>
          </View>
        }
        bounces={false}
        contentContainerStyle={chatlist.result.content.length === 0 ? { flex: 1 } : {}}
      />

      <Pressable
        onPress={toSend}
        className="fixed bottom-7 self-center rounded-full bg-main1 px-[60px] py-3.5"
      >
        <Text className="text-center text-sm font-semibold text-white">쪽지쓰기</Text>
      </Pressable>

      <View className="relative">
        <Modal transparent={true} visible={isControlModalOpen} animationType="fade">
          <View onTouchEnd={() => setIsControlModalOpen(false)} className="h-full w-full">
            <View
              onTouchEnd={(e) => e.stopPropagation()}
              className="absolute right-3.5 top-28 flex flex-col items-center rounded-lg border border-[#EBEBEB] bg-white px-2 py-1"
            >
              {controlItems.map((item) => (
                <Pressable
                  key={item.index}
                  onPress={() => item.pressFunc()}
                  className={`border-b border-b-[#F6F6F6] ${
                    item.index === controlItems.length && 'border-0'
                  }`}
                >
                  <Text className="py-1.5 text-[10px] font-medium tracking-tight text-basicFont">
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      </View>

      <TwoButtonModal
        isVisible={isWarningModalOpen}
        title="쪽지를 삭제하시나요?"
        subtitle={'삭제하면 해당 사용자와 나눴던\n모든 쪽지 내용이 사라져요'}
        closeFunc={() => setIsWarningModalOpen(false)}
        leftButtonText="취소"
        leftButtonFunc={() => setIsWarningModalOpen(false)}
        rightButtonText="삭제"
        rightButtonFunc={deleteRoom}
      />

      <OneButtonModal
        isVisible={isCompleteModalOpen}
        title="삭제가 완료되었습니다."
        closeFunc={() => {
          setIsCompleteModalOpen(false);
          navigation.goBack();
        }}
        buttonText="확인"
        buttonFunc={() => {
          setIsCompleteModalOpen(false);
          navigation.goBack();
        }}
      />

      <ReportModal
        isVisible={isReportModalOpen}
        memberId={chatlist.result.memberId}
        source="CHAT"
        closeModal={() => setIsReportModalOpen(false)}
      />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
