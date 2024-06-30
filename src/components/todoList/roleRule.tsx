import React from 'react';
import { Text, View } from 'react-native';

const RoleRule: React.FC = () => {
  return (
    <View>
      <Text className="text-base font-semibold text-emphasizedFont">
        <Text className="text-main">피그말리온</Text>의
      </Text>
      <Text className="text-base font-semibold text-emphasizedFont">규칙에 대해 알려드릴게요!</Text>
    </View>
  );
};

export default RoleRule;
