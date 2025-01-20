import React from 'react';
import { Text, View } from 'react-native';

interface ChatComponentProps {
  chatData: {
    nickname: string;
    content: string;
    datetime: string;
  };
}

const ChatComponent: React.FC<ChatComponentProps> = ({ chatData }) => {
  return (
    <View className="space-y-1">
      <View className="space-y-1.5">
        <Text
          className={`${
            chatData.nickname.includes('(나)') ? 'text-main1' : 'text-colorFont'
          } text-base font-semibold`}
        >
          {chatData.nickname}
        </Text>
        <Text className="text-sm font-medium text-basicFont">{chatData.content}</Text>
      </View>
      <Text className="text-xs font-normal text-disabledFont">{chatData.datetime}</Text>
    </View>
  );
};

export default ChatComponent;
