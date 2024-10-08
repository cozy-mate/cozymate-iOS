import React from 'react';
import { Text, View, Pressable } from 'react-native';

interface SubmitButtonProps {
  pressFunc: () => void;
  canSubmit: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ pressFunc, canSubmit }) => {
  return (
    <Pressable onPress={pressFunc} disabled={!canSubmit}>
      <View className={`${canSubmit ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}>
        <Text className="text-center text-base font-semibold text-white">확인</Text>
      </View>
    </Pressable>
  );
};

export default SubmitButton;
