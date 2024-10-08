import React from 'react';
import Config from 'react-native-config';
import { Text, View, Image } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

import EmptyCharacter from '@assets/waitingRoom/emptyCharacter.svg';

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
      } mb-9 flex min-w-[159px] flex-col items-center rounded-xl p-5 pt-4`}
    >
      {profileImage == 0 ? <EmptyCharacter /> : <>{getProfileImage(profileImage, 100, 100)}</>}

      <Text
        className={`${
          name != '???' ? 'text-main1' : 'text-disabledFont'
        } mb-[2px] mt-3 text-sm font-semibold  `}
      >
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
