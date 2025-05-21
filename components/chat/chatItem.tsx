import { Text, View } from 'react-native';

import { ChatData } from '@/type/chat';
import { useMemberStore } from '@/zustand/member/member';

interface ChatItemComponentProps {
  data: ChatData;
}

const ChatItemComponent: React.FC<ChatItemComponentProps> = ({ data }) => {
  const { memberState } = useMemberStore();

  return (
    <View className="gap-y-[4px]">
      <View className="gap-y-[6px]">
        <Text
          className={`text-16 font-600 leading-16 ${data.nickname !== memberState.nickname ? 'text-mainColor' : 'text-colorFont'} `}
        >
          {data.nickname}
        </Text>
        <Text className="text-14 font-500 leading-14 text-basicFont">{data.content}</Text>
      </View>
      <Text className="text-12 font-400 leading-12 text-disabledFont">{data.datetime}</Text>
    </View>
  );
};

export default ChatItemComponent;
