import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { useCreateMemberDetail } from '@/hooks/member-stat/member-stat';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleAdditionalInfo() {
  const { lifeStyle } = useRegisterLifeStyleStore();

  const { mutateAsync: createLifeStyle } = useCreateMemberDetail();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent title="선택정보">
          <Pressable
            onPress={(event) => {
              createLifeStyle(lifeStyle);
              event.stopPropagation();
            }}
            className="bg-subColor1 rounded-md px-[20px] py-[10px]"
          >
            <Text className="text-14 font-600 leading-14 text-mainColor">완료</Text>
          </Pressable>
        </BackHeaderComponent>
      </View>
    </SafeAreaView>
  );
}
