import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import XButton from '@/assets/images/common/roundX.svg';
import { useSearchRoom } from '@/hooks/room/room';
import { useDebounce } from '@/hooks/useDebounce';
import { useTracker } from '@/providers/TrackerProvider';
import { EventCategory, InputEvent } from '@/utils/ga/eventEnum';

export default function SearchRoom() {
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data } = useSearchRoom(debouncedKeyword);

  const { trackInput } = useTracker();

  useEffect(() => {
    if (debouncedKeyword.trim()) {
      trackInput(InputEvent.room_search, EventCategory.content_room, {
        keyword: debouncedKeyword,
      });
    }
  }, [debouncedKeyword]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[20px] mt-[16px]">
        <View className="flex flex-row items-center gap-x-[8px] mb-[24px]">
          <View className="flex-1 relative">
            <TextInput
              value={keyword}
              onChangeText={(e: string) => setKeyword(e)}
              placeholder="방 이름을 입력해주세요"
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
              <Pressable
                key={item.roomId}
                onPress={() => router.push(`/room/${item.roomId}`)}
                className="flex flex-row justify-between items-center px-[8px] py-[10px]"
              >
                <View>
                  <Text className="Semibold16 text-emphasizedFont">{item.name}</Text>
                  <Text className="Medium12 text-disabledFont">
                    <Text className="text-mainColor">{item.arrivalMateNum}명</Text>의 룸메이트가
                    있어요
                  </Text>
                </View>

                <Text className="Medium16 text-mainColor">{item.equality}%</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View className="h-[1px] bg-[#F6F6F6] my-[12px]" />}
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
