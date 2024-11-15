import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, SafeAreaView } from 'react-native';

import BottomButton from '@components/common/bottomButton';

import { useProfileStore } from '@zustand/member/member';

import { getProfileImage } from '@utils/profileImage';

import { InquiryScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

interface InquiryItem {
  id: number;
  content: string;
  isAnswered: boolean;
  createdAt: string;
}

const InquiryScreen = ({ navigation, route }: InquiryScreenProps) => {
  const { hasInquiry } = route.params;
  const { profile } = useProfileStore();

  const inquiryData: InquiryItem[] = [
    {
      id: 1,
      content:
        '방장이 잠수를 타서 룸메이트 수락을 못해요 ㅜㅜㅜ 그래서 지금 방 활성화가 안 되고 있는 상황이에요....',
      isAnswered: false,
      createdAt: '2024. 10. 09',
    },
    {
      id: 2,
      content:
        '방장이 잠수를 타서 룸메이트 수락을 못해요 ㅜㅜㅜ 그래서 지금 방 활성화가 안 되고 있는 상황이에요....',
      isAnswered: false,
      createdAt: '2024. 10. 10',
    },
    {
      id: 3,
      content:
        '아휴우ㅜ우우우웅우우우ㅁㅇㄹㅁㅇㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㄴㅁㄹ어ㅏ링머ㅣ라;넝말니어ㅏㄴ아ㅓ앙ㄴㅇㅁㄴㄹㅇㅁㅇㄴㄴㅇㅁㄴㅇㄹ',
      isAnswered: true,
      createdAt: '2024. 09.28',
    },
  ];

  const [content, setContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isComplete = content !== '' && email !== '';

  const toMyPage = () => {
    navigation.goBack();
  };

  const toInquiry = () => {
    navigation.navigate('InquiryScreen', { hasInquiry: false });
  };

  const send = () => {
    console.log('문의하기 성공');
    toMyPage();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {hasInquiry ? (
        <View className="flex-1 flex-col justify-between">
          <ScrollView bounces={false} className="flex-1">
            <View>
              <View className="mb-4 mt-2 flex flex-row justify-between px-3">
                <Pressable onPress={toMyPage}>
                  <BackButton />
                </Pressable>
              </View>

              <View className="mb-10 flex flex-col space-y-3 px-5">
                {inquiryData.map((inquiry) => (
                  <View key={inquiry.id} className="flex flex-col">
                    <View className="mb-4 mt-3 flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center space-x-2">
                        {getProfileImage(profile.persona, 24, 24)}
                        <Text className="text-sm font-medium text-emphasizedFont">
                          {profile.nickname}
                        </Text>
                      </View>

                      {inquiry.isAnswered ? (
                        <Text className="text-xs font-medium text-main1">답변완료</Text>
                      ) : (
                        <Text className="text-xs font-medium text-disabledFont">답변대기</Text>
                      )}
                    </View>

                    <Text className="mb-6 text-sm font-medium text-emphasizedFont">
                      {inquiry.content}
                    </Text>

                    <Text className="text-right text-xs font-medium text-disabledFont">
                      {inquiry.createdAt}
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
      )}
    </SafeAreaView>
  );
};

export default InquiryScreen;
