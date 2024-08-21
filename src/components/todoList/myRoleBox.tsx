import React from 'react';
import { Image, Text, View } from 'react-native';
import Config from 'react-native-config';

interface RoleItem {
  id: number;
  content: string;
  repeatDayList: string[];
  allDays: boolean;
}

interface RoleBoxProps {
  persona: number;
  roleData: RoleItem[];
  nickname: string;
}

const MyRoleBox: React.FC<RoleBoxProps> = ({ persona, roleData, nickname }) => {
  return (
    <View className="p-4 pr-2 mb-4 bg-white shadow-chipback rounded-xl">
      <View>
        <View className="flex flex-row items-center mb-2">
          <Image
            source={{
              uri: `${Config.S3_IMAGE_URL}/persona/png/${persona}.png`,
            }}
            style={{ width: 24, height: 24 }}
            resizeMode="cover"
          />
          <Text className="ml-1.5 font-medium text-emphasizedFont">{nickname} (나)</Text>
        </View>
        {roleData.length > 0 ? (
          roleData.map((role, index) => (
            <View
              key={role.id}
              className={`flex flex-row items-center mb-1 py-1.5 ${
                index === roleData.length - 1 ? 'mb-0' : ''
              }`}
            >
              <View className="bg-colorBox px-2 py-[2px] rounded-sm mr-1.5">
                <Text className="text-xs font-medium text-colorFont">
                  {role.allDays ? '매일' : role.repeatDayList.join(', ')}
                </Text>
              </View>
              <Text className="text-basicFont">{role.content}</Text>
            </View>
          ))
        ) : (
          <Text className="py-1.5 text-sm font-medium text-disabledFont">
            등록된 역할이 없어요!
          </Text>
        )}
      </View>
    </View>
  );
};

export default MyRoleBox;
