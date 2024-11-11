import React, { Fragment, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import ReportModal from '@components/report/reportComponent';

// import { useFeedModal } from '@hooks/useFeedModal';
import { useGetChatDetailData } from '@hooks/api/chat';

import { ChatRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';

const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const { chatRoomId } = route.params;

  const { data: chatlist } = useGetChatDetailData(chatRoomId);

  // const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
  //   useFeedModal();

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const handleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };
  const toSend = () => {
    navigation.navigate('SendChatScreen', {
      recipientId: chatlist.result.recipientId,
      chatRoomId: chatRoomId,
    });
  };

  const toBack = () => {
    navigation.goBack();
  };

  console.log(chatlist.result);

  return (
    <Fragment>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col">
          {/* 상단 헤더 */}
          <View className="mb-7 mt-2 flex flex-row justify-between px-2">
            <Pressable onPress={toBack}>
              <BackButton />
            </Pressable>

            <Pressable onPress={handleReportModal}>
              <SettingIcon />
            </Pressable>
          </View>

          <View style={{ marginBottom: bottom + 80 }}>
            {chatlist.result.chatContents.length !== 0 ? (
              <ScrollView className="px-5" bounces={false}>
                {chatlist.result.chatContents.reverse().map((chat, index) => (
                  <View
                    key={index}
                    className={`border-b border-b-[#F1F2F4] py-[18px] ${index === 0 && 'pt-0'} ${
                      index === chatlist.result.chatContents.length - 1 && 'border-b-0 pb-0'
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
                    <Text className="text-xs font-normal text-disabledFont">{chat.dateTime}</Text>
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

      {isReportModalOpen && (
        <ReportModal
          reportedMemberId={chatlist.result.recipientId}
          reportSource="CHAT"
          closeModal={handleReportModal}
        />
      )}
    </Fragment>
  );
};

export default ChatRoomScreen;
