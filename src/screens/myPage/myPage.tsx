import { MyPageScreenProps } from '@type/param/loginStack';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <SafeAreaView>
      <Pressable onPress={toMain}>
        <Text>돌아가기</Text>
      </Pressable>
      <Text>마이페이지입니다.</Text>
    </SafeAreaView>
  );
};

export default MyPageScreen;
