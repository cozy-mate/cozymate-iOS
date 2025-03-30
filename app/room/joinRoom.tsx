import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import CustomTextInputComponent from '@/components/common/customTextInput';

export default function JoinRoom() {
  const [inviteCode, setInviteCode] = useState<string>('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-5">
        <BackHeaderComponent />
        <CustomTextInputComponent
          title="방장이 준 초대코드를 입력해주세요!"
          value={inviteCode}
          handleValue={(e: string) => setInviteCode(e)}
          placeholder="초대코드를 입력해주세요"
        />
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="확인"
          disabled={inviteCode.length === 0}
          onPress={() => console.log('클릭')}
        />
      </View>
    </SafeAreaView>
  );
}
