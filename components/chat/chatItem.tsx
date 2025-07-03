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
          className={`Semibold16 ${data.nickname === `${memberState.nickname} (나)` ? 'text-mainColor' : 'text-colorFont'} `}
        >
          {data.nickname}
        </Text>
        <Text className="Medium14 text-basicFont">{data.content}</Text>
      </View>
      <Text className="Regular12 text-disabledFont">{data.datetime}</Text>
    </View>
  );
};

export default ChatItemComponent;
