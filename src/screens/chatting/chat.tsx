import React from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';

import ChatRoomComponent from '@components/chatting/chatRoom';

import { useGetChatRoomList } from '@hooks/api/chat-room';

import { ChatScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const ChatScreen = ({ navigation }: ChatScreenProps) => {
  const { data: chatroomlist } = useGetChatRoomList();

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="px-5"
        // 채팅 목록 데이터
        data={chatroomlist.result}
        // 각 item의 key 값 지정
        keyExtractor={(item) => item.chatRoomId.toString()}
        // item들을 렌더링하는 메서드
        renderItem={({ item }) => <ChatRoomComponent chatRoomData={item} navigation={navigation} />}
        // Header Component를 sticky하도록 설정
        stickyHeaderIndices={[0]}
        // FlatList의 최하단에 렌더링되는 Header 아이템
        ListHeaderComponent={
          <View className="bg-white">
            <Pressable onPress={toBack} className="mb-8 mt-2 flex flex-row self-start">
              <BackButton />
            </Pressable>
          </View>
        }
        // FlatList의 최하단에 렌더링되는 Footer 아이템
        ListFooterComponent={<View className="h-8" />}
        // 렌더링 되는 아이템들 사이의 간격
        ItemSeparatorComponent={() => <View className="my-2 h-[1px] bg-colorBox" />}
        ListEmptyComponent={
          <View className="mb-20 flex-1 items-center justify-center">
            <Text className="text-sm font-medium text-disabledFont">
              아직 주고 받은 쪽지가 없어요!
            </Text>
          </View>
        }
        bounces={false}
        contentContainerStyle={chatroomlist.result.length === 0 ? { flex: 1 } : {}}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
