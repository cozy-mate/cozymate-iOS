import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';

import { useGetChatRoomList } from '@hooks/api/chat-room';

import { getProfileImage } from '@utils/profileImage';

import { ChatScreenProps } from '@type/param/stack';

import XButton from '@assets/xButton.svg';
import RightArrow from '@assets/chatting/grayRightArrow.svg';

const ChatScreen = ({ navigation }: ChatScreenProps) => {
  const { data: chatroomlist, refetch: refetchChatRoom } = useGetChatRoomList();

  const toBack = () => {
    navigation.goBack();
  };

  const toChatRoom = (chatRoomId: number) => {
    navigation.navigate('ChatRoomScreen', { chatRoomId: chatRoomId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col px-5">
        <View className="mb-8 mt-2 flex flex-row justify-end">
          <Pressable onPress={toBack}>
            <XButton />
          </Pressable>
        </View>

        {chatroomlist.result.length > 0 ? (
          chatroomlist.result.map((room, index) => (
            <Pressable key={index} onPress={() => toChatRoom(room.chatRoomId)}>
              <View
                className={`flex flex-row items-center justify-between border-b border-b-colorBox py-5 ${
                  index === 0 && 'pt-3'
                } ${index === chatroomlist.result.length - 1 && 'border-b-0'}`}
              >
                <View className="flex flex-col">
                  <View className="mb-3 flex flex-row items-center">
                    {getProfileImage(room.persona, 24, 24)}
                    <Text className="ml-1.5 text-sm font-medium text-colorFont">
                      {room.nickName}
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-basicFont">{room.lastContent}</Text>
                </View>
                <RightArrow />
              </View>
            </Pressable>
          ))
        ) : (
          <View className="flex flex-1 flex-col items-center justify-center">
            <Text className="text-sm font-medium text-disabledFont">
              아직 주고 받은 쪽지가 없어요!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
