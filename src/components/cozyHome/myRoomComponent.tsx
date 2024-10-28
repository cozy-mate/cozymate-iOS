import React from 'react';
import { Text, View, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MatelistItem {
  memberId: number;
  mateId: number;
  nickname: string;
}

interface MyRoomComponentProps {
  toRoom: () => void;
  roomData: {
    roomId: number;
    name: string;
    inviteCode: string;
    profileImage: number;
    mateList: MatelistItem[];
    roomType: string;
    hashtags: string[];
  };
}

const MyRoomComponent: React.FC<MyRoomComponentProps> = ({ toRoom, roomData }) => {
  return (
    <Pressable className="rounded-xl border border-main1" onPress={toRoom}>
      <LinearGradient
        colors={['rgba(249, 251, 255, 0.8)', 'rgba(223, 236, 255, 0.8)']}
        start={{ x: 0.008, y: 0 }}
        end={{ x: 1.044, y: 1 }}
        className="rounded-xl p-4"
      >
        <View className="flex flex-row">
          {roomData.hashtags.length !== 0 ? (
            roomData.hashtags.map((hash, index) => (
              <View key={index} className="mr-1.5 rounded bg-white px-2 py-[2px]">
                <Text className="text-xs font-medium text-colorFont">#{hash}</Text>
              </View>
            ))
          ) : (
            <View className="mr-1.5 rounded py-[2px]">
              <Text className="text-xs font-medium text-colorFont">비공개방이에요</Text>
            </View>
          )}
        </View>

        <View className="my-2">
          <Text className="text-base font-semibold text-emphasizedFont">{roomData.name}</Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs font-medium text-disabledFont">
            <Text className="text-main1">
              {roomData.mateList.length !== 0 ? roomData.mateList.length : 0}명
            </Text>
            의 룸메이트가 있어요
          </Text>

          <Text className="text-base font-medium text-colorFont">
            95
            {/* {roomData.equality} */}%
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default MyRoomComponent;
