import { useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomTextarea from '@/components/common/customInput/customTextarea';
import CustomTextInput from '@/components/common/customInput/customTextInput';
import OpacityPressable from '@/components/opacityPressable';
import { useUpdateRule } from '@/hooks/rule/rule';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useMemberStore } from '@/zustand/store';

export default function UpdateRuleScene() {
  const { roomInfo } = useMemberStore();

  const { selectedItem } = useSelectedItemStore();

  const { mutateAsync: updateRule } = useUpdateRule({
    roomId: roomInfo.roomId,
    ruleId: selectedItem.id,
  });

  const [content, setContent] = useState(selectedItem.content);
  const [memo, setMemo] = useState(selectedItem.memo);

  const isComplete = content !== '' && memo.trim().length <= 50;

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
        <CustomTextInput
          title="규칙을 입력해주세요"
          value={content}
          handleValue={setContent}
          placeholder="규칙을 입력해주세요"
          maxLength={20}
        />

        <CustomTextarea
          title="메모를 추가해주세요!"
          additionalTitle=" (선택)"
          value={memo}
          handleValue={setMemo}
          placeholder="내용을 입력해주세요"
          maxLength={50}
          height={'h-[120px]'}
        />
      </KeyboardAwareScrollView>

      <OpacityPressable
        onPress={() => updateRule({ content, memo })}
        disabled={!isComplete}
        className={`${
          isComplete ? 'bg-mainColor' : 'bg-[#C4C4C4]'
        } py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
      >
        <Text className="Semibold16 text-white text-center">확인</Text>
      </OpacityPressable>
    </View>
  );
}
