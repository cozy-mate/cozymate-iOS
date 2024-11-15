import React, { Fragment, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import ReportModal from '@components/report/reportComponent';
import ControlModal from '@components/chatting/controlModal';
import WarningModal from '@components/chatting/warningModal';
import CompleteModal from '@components/chatting/completeModal';

import { deleteChatRoom } from '@server/api/chat-room';

import { useGetChatDetailData } from '@hooks/api/chat';
import { useGetChatRoomList } from '@hooks/api/chat-room';

import { ChatRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';

interface ControlItem {
  index: number;
  title: string;
  pressFunc: () => void;
}

const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const { chatRoomId } = route.params;

  const { refetch } = useGetChatRoomList();
  const { data: chatlist } = useGetChatDetailData(chatRoomId);

  const [isControlModalOpen, setIsControlModalOpen] = useState<boolean>(false);

  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const handleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  const controlItems: ControlItem[] = [
    { index: 1, title: '삭제하기', pressFunc: () => setIsWarningModalOpen(true) },
    { index: 2, title: '신고하기', pressFunc: () => setIsReportModalOpen(true) },
  ];

  const deleteRoom = async (): Promise<void> => {
    await deleteChatRoom(chatRoomId);
    refetch();
    setIsWarningModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  const close = () => {
    setIsCompleteModalOpen(false);
    navigation.goBack();
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

  return (
    <Fragment>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col">
          {/* 상단 헤더 */}
          <View className="mb-7 mt-2 flex flex-row justify-between px-4">
            <Pressable onPress={toBack}>
              <BackButton />
            </Pressable>

            <Pressable
              onPress={() => setIsControlModalOpen(!isControlModalOpen)}
              className="relative"
            >
              <SettingIcon />

              {isControlModalOpen && (
                <View className="relative">
                  <ControlModal items={controlItems} />
                </View>
              )}
            </Pressable>
          </View>

          <View style={{ marginBottom: bottom + 80 }}>
            {chatlist.result.content.length !== 0 ? (
              <ScrollView className="px-5" bounces={false}>
                {chatlist.result.content.reverse().map((chat, index) => (
                  <View
                    key={index}
                    className={`border-b border-b-[#F1F2F4] py-[18px] ${index === 0 && 'pt-0'} ${
                      index === chatlist.result.content.length - 1 && 'border-b-0 pb-0'
                    }`}
                  >
                    <Text
                      className={`${
                        chat.nickname.includes('(나)') ? 'text-main1' : 'text-colorFont'
                      } mb-1.5 text-base font-semibold`}
                    >
                      {chat.nickname}
                    </Text>
                    <Text className="mb-1 text-sm font-medium text-basicFont">{chat.content}</Text>
                    <Text className="text-xs font-normal text-disabledFont">{chat.datetime}</Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View className="flex items-center justify-center">
                <Text className="text-center text-sm font-medium text-disabledFont">
                  아직 주고 받은 쪽지가 없어요!
                </Text>
              </View>
            )}
          </View>
        </View>

        <Pressable
          onPress={toSend}
          className="fixed bottom-7 self-center rounded-full bg-main1 px-[60px] py-3.5"
        >
          <Text className="text-center text-sm font-semibold text-white">쪽지쓰기</Text>
        </Pressable>
      </SafeAreaView>

      {isWarningModalOpen && (
        <WarningModal
          closeModal={() => setIsWarningModalOpen(false)}
          cancelFunc={() => setIsWarningModalOpen(false)}
          submitFunc={deleteRoom}
        />
      )}

      {isCompleteModalOpen && <CompleteModal closeModal={close} submitFunc={close} />}

      {isReportModalOpen && (
        <ReportModal
          memberId={chatlist.result.memberId}
          source="CHAT"
          closeModal={handleReportModal}
        />
      )}
    </Fragment>
  );
};

export default ChatRoomScreen;
