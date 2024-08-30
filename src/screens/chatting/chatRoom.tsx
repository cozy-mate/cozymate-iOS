import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { useGetChatDetailData } from '@hooks/api/chat';
import { ChatRoomScreenProps } from '@type/param/stack';

import SettingIcon from '@assets/todoList/settingIcon.svg';
import BackButton from '@assets/backButton.svg';

import { useFeedModal } from '@hooks/useFeedModal';

const ChatRoomScreen = ({ route, navigation }: ChatRoomScreenProps) => {
  const { data: chatlist, refetch: fetchChat } = useGetChatDetailData(route.params.chatRoomId);

  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();

  const toSend = (chatRoomId: number) => {
    navigation.navigate('SendChatScreen', {
      recipientId: chatlist.result.recipientId,
      //   chatRoomId: chatRoomId,
    });
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col flex-1">
        {/* 상단 헤더 */}
        <View className="flex flex-row justify-between px-2 mt-2 mb-7">
          <Pressable onPress={toBack}>
            <BackButton />
          </Pressable>

          <Pressable onPress={onPressModalOpen} ref={dotIconRef}>
            <SettingIcon />
          </Pressable>
        </View>

        <ScrollView className="px-5">
          {chatlist.result.chatContents.map((chat, index) => (
            <View
              key={index}
              className={`py-[18px] border-b-[1px] border-b-[#F1F2F4] ${index === 0 && 'pt-0'} ${
                index === chatlist.result.chatContents.length - 1 && 'pb-0 border-b-0'
              }`}
            >
              <Text
                className={`${
                  chat.nickname.includes('(나)') ? 'text-main1' : 'text-colorFont'
                } text-base font-semibold mb-1.5`}
              >
                {chat.nickname}
              </Text>
              <Text className="mb-1 text-sm font-medium text-basicFont">{chat.content}</Text>
              <Text className="text-xs font-normal text-disabledFont">{chat.dateTime}</Text>
            </View>
          ))}
        </ScrollView>

        <Pressable
          onPress={() => toSend(route.params.chatRoomId)}
          className="flex items-center justify-center"
        >
          <View className="px-[60px] py-[14px] rounded-[39px] bg-main1">
            <Text className="text-sm font-semibold text-white">쪽지쓰기</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
