import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import XButton from '@/assets/images/common/roundX.svg';
import { getPersona } from '@/constants/items/characterItem';
import { useSearchUser } from '@/hooks/member-stat/member-stat';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchUser() {
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data } = useSearchUser(debouncedKeyword);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[20px] mt-[16px]">
        <View className="flex flex-row items-center gap-x-[8px] mb-[24px]">
          <View className="flex-1 relative">
            <TextInput
              value={keyword}
              onChangeText={(e: string) => setKeyword(e)}
              placeholder="닉네임을 입력해주세요"
              className="bg-colorBox rounded-xl p-[16px] text-14 font-500 text-basicFont pr-[40px]"
            />
            {keyword !== '' && (
              <Pressable
                onPress={() => setKeyword('')}
                className="absolute top-[17px] right-[16px]"
              >
                <XButton />
              </Pressable>
            )}
          </View>

          <Pressable onPress={() => router.back()} className="px-[8px] py-[11.5px]">
            <Text className="text-14 font-500 leading-14 text-emphasizedFont">취소</Text>
          </Pressable>
        </View>

        {data !== undefined && (
          <FlatList
            data={data?.result}
            renderItem={({ item }) => (
              <Pressable
                key={item.memberDetail.memberId}
                onPress={() => router.push(`/user/${item.memberDetail.memberId}`)}
                className="flex flex-row justify-between items-center px-[8px] py-[10px]"
              >
                <View className="flex flex-row items-center gap-x-[8px]">
                  {getPersona(item.memberDetail.persona, 28, 28)}
                  <Text className="text-16 font-500 leading-16 text-emphasizedFont">
                    {item.memberDetail.nickname}
                  </Text>
                </View>

                <Text
                  className={`text-16 font-500 leading-16 ${item.equality !== null ? 'text-mainColor' : 'text-colorFont'} `}
                >
                  {item.equality ?? '?? '}%
                </Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View className="h-[1px] bg-[#F6F6F6] my-[12px]" />}
            contentContainerStyle={data.result.length === 0 ? { flexGrow: 1 } : undefined}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center">
                <Text className="text-14 font-500 leading-14 text-disabledFont text-center mb-[75px]">
                  검색결과가 없어요
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
