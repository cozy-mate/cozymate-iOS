import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useCreateRule } from '@/hooks/rule/rule';
import { useMemberStore } from '@/zustand/store';

export default function CreateRuleScene() {
  const { roomInfo } = useMemberStore();

  const { mutateAsync: createRule } = useCreateRule({ roomId: roomInfo.roomId });

  const [content, setContent] = useState('');
  const [memo, setMemo] = useState('');

  const isComplete = content !== '';

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 24,
          paddingHorizontal: 20,
          paddingBottom: 80,
          rowGap: 48,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View className="gap-y-[12px]">
          <Text className="Semibold16 text-emphasizedFont mx-[4px]">규칙을 입력해주세요</Text>
          <TextInput
            value={content}
            onChangeText={(e) => setContent(e)}
            placeholder="규칙을 입력해주세요"
            placeholderTextColor={'#ACADB4'}
            className={`px-[16px] py-[15px] rounded-xl InputMedium14 text-basicFont h-[49px] border`}
          />
        </View>

        <View className="gap-y-[12px]">
          <Text className="Semibold16 text-emphasizedFont mx-[4px]">
            메모를 추가해주세요! <Text className="text-disabledFont">(선택)</Text>
          </Text>
          <TextInput
            value={memo}
            onChangeText={(e) => setMemo(e)}
            placeholder="내용을 입력해주세요"
            placeholderTextColor={'#ACADB4'}
            className={`h-[120px] p-[16px] rounded-xl InputMedium14 text-basicFont border`}
            autoCapitalize="none"
            multiline={true}
            // onFocus={onFocus}
            // onBlur={onBlur}
          />
        </View>
      </KeyboardAwareScrollView>

      <Pressable
        onPress={() => createRule({ content, memo })}
        disabled={!isComplete}
        className={`${
          isComplete ? 'bg-mainColor' : 'bg-[#C4C4C4]'
        } py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
      >
        <Text className="Semibold16 text-white text-center">확인</Text>
      </Pressable>
    </View>
  );
}
