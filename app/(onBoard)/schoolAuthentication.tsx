import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import CodeInputBox from '@/components/onBoard/codeInput';
import EmailInputBox from '@/components/onBoard/emailInput';
import MajorSelectBoxComponent from '@/components/onBoard/majorSelect';
import SchoolSelectBoxComponent from '@/components/onBoard/schoolSelect';

export default function SchoolAuthentication() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ rowGap: 24, paddingHorizontal: 20, paddingTop: 56 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View className="gap-y-[4px] mx-[8px]">
          <Text className="text-20 font-700 leading-20 text-emphasizedFont">
            룸메이트를 구하려면,
          </Text>
          <Text className="text-20 font-700 leading-20 text-emphasizedFont">
            <Text className="text-mainColor">학교 인증</Text>이 필요해요!
          </Text>
        </View>

        <View className="gap-y-[16px]">
          {/* 학교 입력 */}
          <SchoolSelectBoxComponent />

          {/* 학과 입력 */}
          <MajorSelectBoxComponent />

          {/* 학교 이메일 입력 */}
          <EmailInputBox />

          {/* 인증번호 입력 */}
          <CodeInputBox />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
