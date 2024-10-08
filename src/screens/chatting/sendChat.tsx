import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import { useSendChat, useGetChatDetailData } from '@hooks/api/chat';

import { SendChatScreenProps } from '@type/param/stack';

import XButton from '@assets/xButton.svg';

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-1 flex-col justify-between px-5">
          <View>
            {/* 상단 닫기 버튼 */}
            <View className="mb-8 mt-2 flex flex-row justify-end">
              <Pressable onPress={toBack}>
                <XButton />
              </Pressable>
            </View>

            {/* 쪽지 내용 작성 */}
            <TextInput
              multiline
              className="rounded-xl bg-colorBox p-5"
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력해주세요"
              placeholderTextColor="#ACADB4"
              style={{ height: 338 }}
            />
          </View>

          {/* 쪽지 보내기 버튼 */}
          <Pressable onPress={SendChat} className="flex">
            <View className={`${content ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}>
              <Text className="text-center text-base font-semibold text-white">쪽지 보내기</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SendChatScreen;
