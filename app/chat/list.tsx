import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatListComponent from '@/components/chat/ChatListComponent';
import BackHeaderComponent from '@/components/common/backHeader';

export default function ChatList() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[32px]">
        <BackHeaderComponent />
        <ChatListComponent />
      </View>
    </SafeAreaView>
  );
}
