import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import BottomButton from '@components/common/bottomButton';

import { useGetInquiry, useSendInquiry } from '@hooks/api/inquiry';

import { getProfileImage } from '@utils/profileImage';

import { InquiryScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const InquiryScreen = ({ navigation, route }: InquiryScreenProps) => {
  const { hasInquiry } = route.params;

  const { data: inquiryList } = useGetInquiry();

  const [content, setContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isComplete = content !== '' && email !== '';

  const { mutateAsync: sendInquiry } = useSendInquiry();

  const toMyPage = () => {
    navigation.goBack();
  };

  const toInquiry = () => {
    navigation.navigate('InquiryScreen', { hasInquiry: false });
  };

  const handleSend = () => {
    sendInquiry({ content: content, email: email });
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {hasInquiry ? (
        <View className="flex-1 flex-col justify-between">
          <ScrollView bounces={false} className="flex-1">
            <View>
              <View className="mb-4 mt-2 flex flex-row justify-between px-5">
                <Pressable onPress={toMyPage}>
                  <BackButton />
                </Pressable>
              </View>

              <View className="mb-10 flex flex-col space-y-3 px-5">
                {inquiryList.result.map((inquiry) => (
                  <View key={inquiry.inquiryId} className="flex flex-col">
                    <View className="mb-4 mt-3 flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center space-x-2">
                        {getProfileImage(inquiry.persona, 24, 24)}
                        <Text className="text-sm font-medium text-emphasizedFont">
                          {inquiry.nickname}
                        </Text>
                      </View>

                      {/* 답변 대기 & 답변 완료 */}
                      {inquiry.status !== '답변 대기' ? (
                        <Text className="text-xs font-medium text-main1">답변완료</Text>
                      ) : (
                        <Text className="text-xs font-medium text-disabledFont">답변대기</Text>
                      )}
                    </View>

                    <Text className="mb-6 text-sm font-medium text-emphasizedFont">
                      {inquiry.content}
                    </Text>

                    <Text className="text-right text-xs font-medium text-disabledFont">
                      {inquiry.datetime}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="px-5">
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="문의하러 가기"
              disabled={false}
              onPressFunc={toInquiry}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 flex-col justify-between">
          <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView bounces={false} className="flex-1" keyboardShouldPersistTaps="handled">
              <View>
                <View className="mb-3 mt-2 flex flex-row justify-between px-5">
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
          </KeyboardAvoidingView>

          <View className="px-5">
            <BottomButton
              color="bg-main1"
              borderColor="border-main1"
              textColor="text-white"
              text="등록"
              disabled={!isComplete}
              onPressFunc={handleSend}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default InquiryScreen;
