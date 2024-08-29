import React from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';

import { useGetChatRoomList } from '@hooks/api/chat-room';

import XButton from '@assets/xButton.svg';
import RightArrow from '@assets/chatting/grayRightArrow.svg';
// import { ChatScreenProps } from '@type/param/loginStack';
import { ChatScreenProps } from '@type/param/roomStack';

const ChatScreen = ({ navigation }: ChatScreenProps) => {
  const { data: chatroomlist, refetch: refetchChatRoom } = useGetChatRoomList();

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col flex-1 px-5">
        <View className="flex flex-row justify-end mt-2">
          <Pressable onPress={toBack}>
            <XButton />
          </Pressable>
        </View>

        {chatroomlist.result.length > 0 ? (
          chatroomlist.result.map((room, index) => (
            <View key={index} className="">
              <View>
                <Text className="text-sm font-medium text-colorFont">{room.nickname}</Text>
                <Text className="text-sm font-medium text-basicFont">{room.lastContent}</Text>
              </View>
              <Pressable>
                <RightArrow />
              </Pressable>
            </View>
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
