import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import { useCreateInquiry } from '@/hooks/inquiry/inquiry';

export default function Inquiry() {
  const [content, setContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { mutateAsync: createInquiry } = useCreateInquiry();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[8px]">
        <BackHeaderComponent />

        <View className="gap-y-[40px]">
          <View className="gap-y-[4px]">
            <Text className="text-18 font-600 leading-18 text-emphasizedFont p-[8px]">
              도움이 필요하신가요?
            </Text>

            <TextInput
              value={content}
              onChangeText={(e: string) => setContent(e)}
              placeholder="내용을 입력해주세요"
              className="rounded-xl bg-colorBox p-4"
            />
          </View>

          <View className="gap-y-[4px]">
            <View className="p-[8px] gap-y-[4px]">
              <Text className="text-18 font-600 leading-18 text-emphasizedFont">
                답변 내용을 받으실
              </Text>
              <Text className="text-18 font-600 leading-18 text-emphasizedFont">
                이메일을 입력해주세요
              </Text>
            </View>

            <TextInput
              value={email}
              onChangeText={(e: string) => setEmail(e)}
              placeholder="이메일을 입력해주세요"
              className="rounded-xl bg-colorBox p-4"
            />
          </View>
        </View>
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="등록"
          disabled={content === '' || email === ''}
          onPress={() => createInquiry({ content, email })}
        />
      </View>
    </SafeAreaView>
  );
}
