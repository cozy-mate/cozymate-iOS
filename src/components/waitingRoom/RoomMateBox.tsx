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
    <View
      className={`${
        state === '도착완료' ? 'bg-[#e4efff]' : 'bg-box'
      } flex flex-col items-center p-5 pt-4 rounded-xl`}
    >
      <Image
        source={{
          uri: `https://staging-cozymate-s3.s3.ap-northeast-2.amazonaws.com/persona/png/${profileImage}.png`,
        }}
        style={{ width: 100, height: 100 }}
        resizeMode="cover"
      />
      <Text className="mt-3 mb-[2px] text-sm font-semibold text-main1">
        {name}
        {isAdmin ? '(방장)' : ''}
      </Text>
      <Text className="text-xs font-medium text-basicFont">
        {state}
        {state == '도착완료' ? '!' : '..'}
      </Text>
    </View>
  );
};

export default RoomMateBox;
