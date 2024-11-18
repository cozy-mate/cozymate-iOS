import { Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, ScrollView, SafeAreaView } from 'react-native';

import { useSearchMemberByKeyword } from '@hooks/api/member-stat';

import { getProfileImage } from '@utils/profileImage';

import { SearchScreenProps } from '@type/param/stack';

import XButton from '@assets/search/xButton.svg';

const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
  const { type } = route.params;

  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');

  const { data: userList } = useSearchMemberByKeyword(debouncedKeyword);

  const handleKeywordChange = (text: string) => {
    setKeyword(text);
  };

  const deleteKeyword = () => {
    setKeyword('');
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  const toBack = () => {
    navigation.goBack();
  };

  const toUserDetail = (memberId: number) => {
    navigation.navigate('UserDetailScreen', { memberId: memberId });
  };

  console.log(userList);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView bounces={false}>
        <View className="flex-1">
          <View className="mb-6 mt-4 flex flex-row items-center justify-between space-x-2 px-5">
            <View className="flex flex-1 flex-row justify-between rounded-xl bg-colorBox p-4">
              <View className="flex flex-row">
                <TextInput
                  className="flex-1 text-sm font-medium leading-4 text-basicFont"
                  placeholder="닉네임을 입력해주세요"
                  placeholderTextColor={'#ACADB4'}
                  value={keyword}
                  onChangeText={handleKeywordChange}
                />
                <Pressable className="flex flex-row" onPress={deleteKeyword}>
                  <XButton />
                </Pressable>
              </View>
            </View>
            <Pressable onPress={toBack} className="p-2">
              <Text className="text-sm font-medium text-emphasizedFont">취소</Text>
            </Pressable>
          </View>

          <View className="px-5">
            {keyword !== '' ? (
              userList?.result && userList?.result?.length > 0 ? (
                userList.result.map((user, index) => (
                  <Pressable
                    key={user.memberDetail.memberId}
                    onPress={() => toUserDetail(user.memberDetail.memberId)}
                    className={`flex flex-row items-center justify-between border-b border-b-[#f6f6f6] px-1 py-[22px] ${
                      index === 0 && 'pt-2.5'
                    } ${index === userList.result.length - 1 && 'border-0 pb-2.5'}`}
                  >
                    <View className="flex flex-row items-center space-x-2">
                      {getProfileImage(user.memberDetail.persona, 28, 28)}
                      <Text className="text-base font-semibold text-emphasizedFont">
                        {user.memberDetail.nickname}
                      </Text>
                    </View>

                    <Text
                      className={`flex flex-row items-center text-base font-medium ${
                        user.equality > 50 ? 'text-main1' : 'text-colorFont'
                      }`}
                    >
                      {user.equality}%
                    </Text>
                  </Pressable>
                ))
              ) : (
                <View className="flex flex-1 items-center justify-center">
                  <Text>검색결과가 없어요</Text>
                </View>
              )
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
