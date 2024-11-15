import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';

import { InquiryScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const InquiryScreen = ({ navigation }: InquiryScreenProps) => {
  const [content, setContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isComplete = content !== '' && email !== '';

  const toMyPage = () => {
    navigation.goBack();
  };

  const send = () => {
    console.log('문의하기 성공');
    toMyPage();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 flex-col justify-between">
        <ScrollView bounces={false} className="flex-1">
          <View>
            <View className="mb-3 mt-2 flex flex-row justify-between px-3">
              <Pressable onPress={toMyPage}>
                <BackButton />
              </Pressable>
            </View>

            <View className="mb-10 flex flex-col space-y-3 px-5">
              <Text className="px-2 text-lg font-semibold text-emphasizedFont">
                도움이 필요하신가요?
              </Text>

              <TextInput
                value={content}
                onChangeText={setContent}
                multiline
                className="h-64 rounded-xl bg-colorBox p-4 text-basicFont"
                placeholder="내용을 입력해주세요"
                placeholderTextColor="#ACADB4"
              />
            </View>

            <View className="flex flex-col space-y-3 px-5">
              <Text className="px-2 text-lg font-semibold text-emphasizedFont">
                답변 내용을 받으실{'\n'}이메일을 입력해주세요
              </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                className="rounded-xl bg-colorBox p-4 text-basicFont"
                placeholder="이메일을 입력해주세요"
                placeholderTextColor="#ACADB4"
              />
            </View>
          </View>
        </ScrollView>

        <View className="px-5">
          <BottomButton
            color="bg-main1"
            borderColor="border-main1"
            textColor="text-white"
            text="등록"
            disabled={!isComplete}
            onPressFunc={send}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InquiryScreen;
