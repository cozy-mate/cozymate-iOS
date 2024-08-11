import { JoinRoomScreenProps } from '@type/param/loginStack';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const JoinRoomScreen = ({ navigation }: JoinRoomScreenProps) => {
  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <View>
      <Pressable onPress={toMain}>
        <Text>돌아가기</Text>
      </Pressable>
      <Text>방장이 준 초대코드를 입력해주세요!</Text>
      <TextInput placeholder="초대코드를 입력해주세요" />
    </View>
  );
};

export default JoinRoomScreen;
