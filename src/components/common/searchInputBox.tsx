import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import MagnifierIcon from '@assets/magnifier.svg';

interface SearchInputBoxProps {
  type: 'touch' | 'search';
  placeholder: string;
  pressFunc?: () => void;
}

const SearchInputBox: React.FC<SearchInputBoxProps> = ({ type, placeholder, pressFunc }) => {
  return (
    <>
      {type === 'touch' && (
        <Pressable className="flex flex-row rounded-xl bg-colorBox px-1 py-2" onPress={pressFunc}>
          <MagnifierIcon />
          <TextInput
            className="text-sm font-medium text-basicFont"
            placeholder={placeholder}
            placeholderTextColor={'#ACADB4'}
          />
        </Pressable>
      )}

      {type === 'search' && (
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row rounded-xl bg-colorBox px-1 py-2">
            <MagnifierIcon />
            <TextInput
              className="text-sm font-medium text-basicFont"
              placeholder={placeholder}
              placeholderTextColor={'#ACADB4'}
            />
          </View>
          <Pressable onPress={pressFunc}>
            <Text>취소</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default SearchInputBox;
