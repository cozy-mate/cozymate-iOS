import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import CustomTextarea from '@/components/common/customInput/customTextarea';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import { useCreateInquiry } from '@/hooks/inquiry/inquiry';

export default function Inquiry() {
  const [content, setContent] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { mutateAsync: createInquiry } = useCreateInquiry();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>
      </TouchableWithoutFeedback>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          rowGap: 40,
          paddingTop: 8,
          paddingHorizontal: 20,
          marginTop: 16,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <CustomTextarea
          title="문의 내용을 입력해주세요"
          value={content}
          handleValue={(e: string) => setContent(e)}
          placeholder="내용을 입력해주세요"
          height="h-[258px]"
        />

        <CustomTextInput
          title={'답변 내용을 받으실\n이메일을 입력해주세요'}
          value={email}
          handleValue={(e: string) => setEmail(e)}
          placeholder="이메일을 입력해주세요"
        />
      </KeyboardAwareScrollView>

      <BottomButtonComponent
        buttonText="등록"
        onPress={() => createInquiry({ content, email })}
        disabled={content === '' || content.length > 200 || email === ''}
        color={content === '' || content.length > 200 || email === '' ? 'GRAY' : 'BLUE'}
      />
    </SafeAreaView>
  );
}
