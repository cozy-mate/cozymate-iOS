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
    <View className="p-2 pl-4 bg-white rounded-xl shadow-chipback">
      {ruleData.map((rule) => (
        <View key={rule.id} className="flex flex-row items-center py-1.5">
          <View className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-colorBox">
            <Text className="text-xs font-medium text-colorFont">{rule.id}</Text>
          </View>
          <View>
            <Text className="text-sm font-medium text-basicFont">{rule.content}</Text>
            {rule.memo.trim() !== '' ? (
              <Text className="text-xs font-medium text-disabledFont mt-0.5">{rule.memo}</Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
};

export default RuleBox;
