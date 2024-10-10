import React from 'react';
import { Text, View } from 'react-native';

interface RuleBoxProps {
  ruleData: {
    id: number;
    content: string;
    memo: string;
  }[];
}

const RuleBox: React.FC<RuleBoxProps> = ({ ruleData }) => {
  return (
    <View className="flex flex-col">
      {ruleData.length > 0 ? (
        <View className="rounded-xl bg-white p-2 pl-4 shadow-custom">
          {ruleData.map((rule, index) => (
            <View key={rule.id} className="flex flex-row items-center py-1.5">
              <View className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-colorBox">
                <Text className="text-xs font-medium text-colorFont">{index + 1}</Text>
              </View>
              <View>
                <Text className="text-sm font-medium text-basicFont">{rule.content}</Text>
                {rule.memo.trim() !== '' ? (
                  <Text className="mt-0.5 text-xs font-medium text-disabledFont">{rule.memo}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="flex h-36 items-center justify-center rounded-xl bg-white p-2 pl-4 shadow-chipback">
          <Text className="text-sm font-medium text-disabledFont">아직 등록된 규칙이 없어요!</Text>
        </View>
      )}
    </View>
  );
};

export default RuleBox;
