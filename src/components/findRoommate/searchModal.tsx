import React, { useState } from 'react';
import { Text, View, FlatList, Pressable, TextInput, SafeAreaView } from 'react-native';

import XButton from '@assets/findRoommate/XButton.svg';

interface SearchModalProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleOpen: () => void;
}

const schools = ['인하대학교', '인하공업전문대학교'];

const SearchModal: React.FC<SearchModalProps> = ({ value, setValue, handleOpen }) => {
  const [keyword, setKeyword] = useState<string>('');

  const filteredSchools = keyword === '인하' ? schools : [];

  const handleSelectSchool = (school: string) => {
    setValue(school);
    handleOpen();
  };

  const highlightMatch = (text: string, keyword: string) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <Text key={index} className="font-semibold text-main1">
              {part}
            </Text>
          ) : (
            <Text key={index} className="font-semibold text-basicFont">
              {part}
            </Text>
          ),
        )}
      </Text>
    );
  };

  return (
    <SafeAreaView className="absolute top-[63px] h-screen w-screen bg-white">
      <View className="flex w-full flex-row items-center justify-between px-5">
        <View className="relative flex-1">
          <TextInput
            placeholder="학교를 입력해주세요"
            value={keyword}
            onChangeText={setKeyword}
            className="w-full rounded-xl bg-colorBox p-4 pr-8 text-basicFont"
          />
          {keyword.length > 0 && (
            <Pressable
              onPress={() => setKeyword('')}
              className="absolute right-4 top-7"
              style={{
                transform: [{ translateY: -12 }],
              }}
            >
              <XButton width={16} height={16} />
            </Pressable>
          )}
        </View>

        <Pressable onPress={handleOpen}>
          <Text className="ml-2 p-2 text-emphasizedFont">취소</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleSelectSchool(item)}
            className={`p-4 ${
              index !== filteredSchools.length - 1 ? 'border-b border-b-colorBox' : ''
            }`}
          >
            {highlightMatch(item, keyword)}
          </Pressable>
        )}
        className="mt-4 px-4"
      />
    </SafeAreaView>
  );
};

export default SearchModal;
