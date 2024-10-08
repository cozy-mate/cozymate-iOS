import React from 'react';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';

import { useFeedModal } from '@hooks/useFeedModal';
import { useGetChatDetailData } from '@hooks/api/chat';

import { ChatRoomScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import SettingIcon from '@assets/todoList/settingIcon.svg';

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
      <View className="flex flex-1 flex-col">
        {/* 상단 헤더 */}
        <View className="mb-7 mt-2 flex flex-row justify-between px-2">
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

        <Pressable
          onPress={() => toSend(route.params.chatRoomId)}
          className="flex items-center justify-center"
        >
          <View className="rounded-[39px] bg-main1 px-[60px] py-[14px]">
            <Text className="text-sm font-semibold text-white">쪽지쓰기</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
