import React from 'react';
import { Image, Text, View } from 'react-native';

interface RoomMateBoxProps {
  name: string;
  profileImage: number;
  state: string;
  isAdmin: boolean;
}

const RoomMateBox: React.FC<RoomMateBoxProps> = ({ name, profileImage, state, isAdmin }) => {
  return (
    <View className={`${state === '도착완료' ? 'bg-[#e4efff]' : 'bg-box'} flex flex-col`}>
      <Image
        source={{
          uri: `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${profileImage}.png`,
        }}
        style={{ width: 100, height: 100 }}
        resizeMode="cover"
      />
      <Text>
        {name}
        {isAdmin ? '(방장)' : ''}
      </Text>
      <Text>{state}</Text>
    </View>
  );
};

export default RoomMateBox;
