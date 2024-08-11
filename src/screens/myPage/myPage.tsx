import { MyPageScreenProps } from '@type/param/loginStack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>마이페이지입니다.</Text>
    </SafeAreaView>
  );
};

export default MyPageScreen;
