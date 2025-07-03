import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import XButton from '@/assets/images/common/roundX.svg';
import { getPersona } from '@/constants/items/characterItem';
import { useSearchUser } from '@/hooks/member-stat/member-stat';
import { useDebounce } from '@/hooks/useDebounce';
import { useTracker } from '@/providers/TrackerProvider';
import { EventCategory, InputEvent } from '@/utils/ga/eventEnum';

export default function SearchUser() {
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data } = useSearchUser(debouncedKeyword);

  const { trackInput } = useTracker();

  useEffect(() => {
    if (debouncedKeyword.trim()) {
      trackInput(InputEvent.mate_search, EventCategory.content_mate, {
        keyword: debouncedKeyword,
      });
    }
  }, [debouncedKeyword]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mt-[16px]">
        <View className="flex flex-row items-center gap-x-[8px] mb-[24px] px-[20px]">
          <View className="flex-1 relative">
            <TextInput
              value={keyword}
              onChangeText={(e: string) => setKeyword(e)}
              placeholder="닉네임을 입력해주세요"
              className="bg-colorBox rounded-xl p-[16px] InputMedium14 text-basicFont pr-[40px]"
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
            <Text className="Medium14 text-emphasizedFont">취소</Text>
          </Pressable>
        </View>

        {data !== undefined && (
          <FlatList
            data={data?.result}
            renderItem={({ item }) => (
              <View key={item.memberDetail.memberId} className="px-[20px]">
                <Pressable
                  onPress={() => router.push(`/user/${item.memberDetail.memberId}`)}
                  className="flex flex-row justify-between items-center px-[8px] py-[10px]"
                >
                  <View className="flex flex-row items-center gap-x-[8px]">
                    {getPersona(item.memberDetail.persona, 28, 28)}
                    <Text className="Medium16 text-emphasizedFont">
                      {item.memberDetail.nickname}
                    </Text>
                  </View>

                  <Text
                    className={`Medium16 ${item.equality !== null ? 'text-mainColor' : 'text-colorFont'} `}
                  >
                    {item.equality ?? '?? '}%
                  </Text>
                </Pressable>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View className="h-[1px] bg-[#F6F6F6] my-[12px] mx-[20px]" />
            )}
            contentContainerStyle={data.result.length === 0 ? { flexGrow: 1 } : undefined}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center">
                <Text className="Medium14 text-disabledFont text-center mb-[75px]">
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
