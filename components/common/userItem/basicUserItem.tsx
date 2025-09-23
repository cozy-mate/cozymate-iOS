import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import OpacityPressable from '@/components/opacityPressable';
import { MemberItem } from '@/type/member';
import { getLifeStyleIcon, getLifeStyleLabel, getLifeStyleValue } from '@/utils/lifeStyle';

interface BasicUserItemProps {
  userData: MemberItem;
  onPress?: () => void;
}

export default function BasicUserItem({ userData, onPress = () => {} }: BasicUserItemProps) {
  const router = useRouter();

  const handlePress = () => {
    onPress();
    router.push(`/user/${userData.memberDetail.memberId}`);
  };

  return (
    <OpacityPressable onPress={handlePress}>
      <View className="border border-disabledColor px-[16px] pt-[20px] pb-[18px] rounded-xl mx-[20px]">
        <View className="flex flex-row items-center justify-between">
          <Text className="Semibold16 text-basicFont mx-[8px]">
            {userData.memberDetail.nickname}
          </Text>
          <Text
            className={`Medium16 ${userData.equality !== null && userData.equality > 50 ? 'text-mainColor' : 'text-colorFont'}`}
          >
            {userData.equality ?? '?? '}%
          </Text>
        </View>

        <View className="h-[1px] bg-[#F6F6F6] my-[16px]" />

        <View className="gap-y-[20px]">
          <View className="flex flex-row justify-between">
            {userData.preferenceStats.map((chip, index) => (
              <View
                key={index}
                className="flex flex-col items-center mx-[8px] gap-y-[6px] w-[54px]"
              >
                {getLifeStyleIcon(chip.stat, chip.color as 'blue' | 'white' | 'red')}
                <View>
                  <Text className="Medium12 text-disabledFont text-center">
                    {getLifeStyleLabel(chip.stat)}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="Semibold12 text-basicFont text-center"
                  >
                    {getLifeStyleValue(chip.stat, chip.value)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </OpacityPressable>
  );
}
