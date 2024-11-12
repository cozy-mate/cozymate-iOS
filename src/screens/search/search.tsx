import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';

import SearchInputBox from '@components/common/searchInputBox';

import { SearchScreenProps } from '@type/param/stack';

const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
  const { type } = route.params;

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView bounces={false}>
        <View className="flex-1">
          <SearchInputBox
            type="search"
            placeholder={`${type === 'member' ? '닉네임을 입력해주세요' : '방이름을 입력해주세요'}`}
            pressFunc={toBack}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
