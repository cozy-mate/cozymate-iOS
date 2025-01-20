import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

import { ChatScreenProps } from '@type/param/stack';

import RightArrow from '@assets/chatting/grayRightArrow.svg';

interface ChatRoomComponentProps {
  chatRoomData: {
    persona: number;
    nickname: string;
    lastContent: string;
    chatRoomId: number;
    memberId: number;
  };
  navigation: ChatScreenProps['navigation'];
}

const ChatRoomComponent: React.FC<ChatRoomComponentProps> = ({ chatRoomData, navigation }) => {
  const toChatRoom = () => {
    navigation.navigate('ChatRoomScreen', { chatRoomId: chatRoomData.chatRoomId });
  };

  return (
    <Pressable onPress={toChatRoom} className="flex flex-row justify-between py-3">
      <View className="flex flex-col space-y-3">
        {/* 사용자 프로필 사진 및 닉네임 */}
        <View className="flex flex-row items-center space-x-1.5">
          {getProfileImage(chatRoomData.persona, 24, 24)}
          <Text className="text-sm font-medium text-colorFont">{chatRoomData.nickname}</Text>
        </View>

        {/* 마지막 대화 내용 */}
        <Text className="text-sm font-medium text-basicFont">{chatRoomData.lastContent}</Text>
      </View>

      <RightArrow />
    </Pressable>
  );
};

export default ChatRoomComponent;
