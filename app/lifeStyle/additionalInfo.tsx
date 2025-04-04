import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import { useCreateMemberDetail } from '@/hooks/member-stat/member-stat';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';

export default function LifeStyleAdditionalInfo() {
  const { lifeStyle, setLifeStyle } = useRegisterLifeStyleStore();

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

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="gap-y-[20px] mt-[40px]">
            <View className="gap-y-[12px]">
              <Text className="text-16 font-600 leading-16 text-emphasizedFont mx-[4px]">
                하고싶은 말을 적어주세요 (선택)
              </Text>
              <TextInput
                value={lifeStyle.selfIntroduction}
                onChangeText={(e: string) => setLifeStyle({ selfIntroduction: e })}
                className="bg-colorBox h-[270px] rounded-xl p-[16px]"
                placeholder="내용을 입력해주세요"
                placeholderTextColor={'#ACADB4'}
                multiline
              />
            </View>

            <View className="mx-[4px] gap-y-[16px]">
              <Text className="text-12 font-500 leading-12 text-disabledFont">
                이런 내용을 적어주면 좋아요!
              </Text>
              <View className="gap-y-[4px]">
                <Text className="text-12 font-500 leading-12 text-disabledFont">
                  1{')'} 자기소개
                </Text>
                <Text className="text-12 font-500 leading-12 text-disabledFont">
                  2{')'} 학교에서 하고 있는 동아리
                </Text>
                <Text className="text-12 font-500 leading-12 text-disabledFont">
                  3{')'} 평소 관심사
                </Text>
                <Text className="text-12 font-500 leading-12 text-disabledFont">
                  4{')'} 원하는 룸메이트의 성향
                </Text>
                <Text className="text-12 font-500 leading-12 text-disabledFont">
                  5{')'} 같이 살면서 꼭 알아둬야할 점
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
