import React from 'react';
import { Text, TextInput, View } from 'react-native';

const JoinRoomScreen = () => {
  return (
    <View>
      <Text>방장이 준 초대코드를 입력해주세요!</Text>
      <TextInput placeholder="초대코드를 입력해주세요" />
    </View>
  );
};

export default JoinRoomScreen;
