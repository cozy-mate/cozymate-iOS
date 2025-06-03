import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedIcon from '@/assets/images/room/selectedRadio.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import LoadingComponent from '@/components/common/loading';
import { useWithdraw } from '@/hooks/member/member';
import { useMemberStore } from '@/zustand/member/member';

export default function Withdraw() {
  const { memberState } = useMemberStore();

  const [withdrawReason, setWithdrawReason] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { mutateAsync: withdraw, isPending } = useWithdraw();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isPending && <LoadingComponent />}
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-y-[117px] mt-[20px]">
            <View className="gap-y-[4px]">
              <View className="gap-y-[2px] mx-[4px]">
                <Text className="text-20 font-600 leading-20 text-emphasizedFont">
                  {memberState.nickname}님,
                </Text>
                <Text className="text-20 font-600 leading-20 text-emphasizedFont">
                  cozymate를 떠나시나요?
                </Text>
              </View>

              <Text className="text-12 font-500 leading-12 text-basicFont">
                * 탈퇴하시면 모든 정보가 사라지며, 모든 데이터는 복구가 불가능해요
              </Text>
            </View>

            <View className="gap-y-[16px]">
              <View className="gap-y-[2px] mx-[4px]">
                <Text className="text-20 font-600 leading-20 text-emphasizedFont">
                  {memberState.nickname}님,
                </Text>
                <Text className="text-20 font-600 leading-20 text-emphasizedFont">
                  떠나시는 이유를 알려주세요
                </Text>
              </View>

              <TextInput
                value={withdrawReason}
                onChangeText={(e: string) => setWithdrawReason(e)}
                placeholder={`서비스 탈퇴 이유를 알려주신다면,\ncozymate가 더 나은 서비스가 되는 데에,\n큰 도움이 될 거에요.`}
                placeholderTextColor={'#ACADB4'}
                className="bg-colorBox rounded-xl h-[258px] p-[16px] text-14 font-medium leading-14 text-basicFont"
                multiline
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="absolute bottom-[42px] w-full px-[22px] gap-y-[11px]">
        <View className="flex flex-row items-center">
          <Pressable onPress={() => setIsChecked(!isChecked)} className="p-[8px]">
            {isChecked ? <SelectedIcon /> : <RadioIcon />}
          </Pressable>
          <Text
            className={`text-12 font-500 ${isChecked ? 'text-mainColor' : 'text-disabledFont'}`}
          >
            회원 탈퇴 유의사항을 확인하였으며, 이에 동의합니다.
          </Text>
        </View>
        <BottomButton
          buttonText="탈퇴하기"
          disabled={!isChecked}
          onPress={() => withdraw({ withdrawReason })}
        />
      </View>
    </SafeAreaView>
  );
}
