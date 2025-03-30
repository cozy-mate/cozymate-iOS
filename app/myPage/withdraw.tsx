import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WarningIcon from '@/assets/images/myPage/warning.svg';
import RadioIcon from '@/assets/images/room/radio.svg';
import SelectedIcon from '@/assets/images/room/selectedRadio.svg';
import BackHeaderComponent from '@/components/common/backHeader';
import BottomButton from '@/components/common/bottomButton';
import { useMemberStore } from '@/zustand/member/member';

export default function Withdraw() {
  const { memberState } = useMemberStore();

  const [withdrawReason, setWithdrawReason] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[19px]">
        <BackHeaderComponent />

        <View className="gap-y-[74px]">
          <View className="gap-y-[16px]">
            <View className="gap-y-[2px] mx-[4px]">
              <Text className="text-20 font-600 leading-20 text-emphasizedFont">
                {memberState.nickname}님,
              </Text>
              <Text className="text-20 font-600 leading-20 text-emphasizedFont">
                cozymate를 떠나시나요?
              </Text>
            </View>

            <View className="gap-y-[8px]">
              <View className="flex flex-row items-center gap-x-[8px] mx-[2px]">
                <WarningIcon />
                <Text className="text-12 font-500 leading-12 text-basicFont">
                  탈퇴하시면 모든 정보가 사라지며, 모든 데이터는 복구가 불가능해요
                </Text>
              </View>
              <View className="flex flex-row items-center gap-x-[8px] mx-[2px]">
                <WarningIcon />
                <Text className="text-12 font-500 leading-12 text-basicFont">
                  코지봇 데이터는 지워지지 않아요
                </Text>
              </View>
            </View>
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
              className="bg-colorBox rounded-xl h-[258px] p-[16px]"
              multiline
            />
          </View>
        </View>
      </View>

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
        <BottomButton buttonText="탈퇴하기" disabled={!isChecked} onPress={() => console.log('')} />
      </View>
    </SafeAreaView>
  );
}
