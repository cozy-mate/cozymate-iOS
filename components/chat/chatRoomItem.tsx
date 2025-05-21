import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import RightArrow from '@/assets/images/common/grayArrow.svg';
import { getPersona } from '@/constants/items/characterItem';
import { ChatRoomData } from '@/type/chat';

interface ChatRoomItemComponentProps {
  data: ChatRoomData;
}

const ChatRoomItemComponent: React.FC<ChatRoomItemComponentProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(`/chat/${data.chatRoomId}?nickname=${encodeURIComponent(data.nickname)}`)
      }
      className="py-3 flex flex-row justify-between items-center"
    >
      <View className="gap-y-[12px]">
        <View className="flex flex-row items-center gap-x-1.5">
          {getPersona(data.persona, 24, 24)}
          <Text className="text-14 font-500 text-colorFont">{data.nickname}</Text>
        </View>

        <Text className="text-14 font-500 text-basicFont">{data.lastContent}</Text>
      </View>

      <View className="w-[40px] h-[40px] flex items-center justify-center">
        <RightArrow />
      </View>
    </Pressable>
  );
};

export default ChatRoomItemComponent;
