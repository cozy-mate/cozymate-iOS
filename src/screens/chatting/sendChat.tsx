import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

import XButton from '@assets/xButton.svg';
import { SendChatScreenProps } from '@type/param/stack';
import { useGetChatDetailData, useSendChat } from '@hooks/api/chat';

const SendChatScreen = ({ route, navigation }: SendChatScreenProps) => {
  const [content, setContent] = useState<string>('');

  //   const { refetch: refetchChats } = useGetChatDetailData();

  const { mutateAsync: sendChatMutate, isPending: sendChatPending } = useSendChat(
    route.params.recipientId,
    // refetchChats,
  );

  const SendChat = async () => {
    try {
      const response = await sendChatMutate({ content: content });
      //   const chatRoomId = response.result.chatRoomId;

      //   refetchChats(chatRoomId);

      navigation.goBack();
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        <View>
          {/* 상단 닫기 버튼 */}
          <View className="flex flex-row justify-end mt-2 mb-8">
            <Pressable onPress={toBack}>
              <XButton />
            </Pressable>
          </View>

          {/* 쪽지 내용 작성 */}
          <TextInput
            multiline
            className="p-5 bg-colorBox rounded-xl"
            value={content}
            onChangeText={setContent}
            placeholder="내용을 입력해주세요"
            placeholderTextColor="#ACADB4"
            style={{ height: 338 }}
          />
        </View>

        {/* 쪽지 보내기 버튼 */}
        <Pressable onPress={SendChat} className="flex">
          <View className={`${content ? 'bg-main1' : 'bg-[#C4C4C4]'} p-4 rounded-xl`}>
            <Text className="text-base font-semibold text-center text-white">쪽지 보내기</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SendChatScreen;
