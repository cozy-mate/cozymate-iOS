import React from 'react';
import Config from 'react-native-config';
import { Text, View, Image } from 'react-native';

import { getProfileImage } from '@utils/profileImage';

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
    <View className="mb-4 rounded-xl bg-white p-4 pr-2 shadow-custom">
      <View>
        <View className="mb-2 flex flex-row items-center">
          {getProfileImage(persona, 24, 24)}
          <Text className="ml-1.5 font-medium text-emphasizedFont">{nickname} (나)</Text>
        </View>
        {roleData.length > 0 ? (
          roleData.map((role, index) => (
            <View
              key={role.id}
              className={`mb-1 flex flex-row items-center py-1.5 ${
                index === roleData.length - 1 ? 'mb-0' : ''
              }`}
            >
              <View className="mr-1.5 rounded-sm bg-colorBox px-2 py-[2px]">
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
