import React from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';

import { useGetChatRoomList } from '@hooks/api/chat-room';

import XButton from '@assets/xButton.svg';
import RightArrow from '@assets/chatting/grayRightArrow.svg';
import { ChatScreenProps } from '@type/param/stack';
import { getProfileImage } from '@utils/profileImage';

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
      <View className="flex flex-col flex-1 px-5">
        <View className="flex flex-row justify-end mt-2 mb-8">
          <Pressable onPress={toBack}>
            <XButton />
          </Pressable>
        </View>

        {chatroomlist.result.length > 0 ? (
          chatroomlist.result.map((room, index) => (
            <Pressable key={index} onPress={() => toChatRoom(room.chatRoomId)}>
              <View
                className={`flex flex-row items-center justify-between py-5 border-b-[1px] border-b-colorBox ${
                  index === 0 && 'pt-3'
                } ${index === chatroomlist.result.length - 1 && 'border-b-0'}`}
              >
                <View className="flex flex-col">
                  <View className="flex flex-row items-center mb-3">
                    {getProfileImage(room.persona, 24, 24)}
                    <Text className="text-sm font-medium text-colorFont ml-1.5">
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
          <View className="flex flex-col items-center justify-center flex-1">
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
