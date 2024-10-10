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

interface RoleData {
  name: string;
  roles: RoleItem[];
}

interface RoleBoxProps {
  persona: number;
  roleData: RoleData[];
}

const RoleBox: React.FC<RoleBoxProps> = ({ persona, roleData }) => {
  return (
    <View className="mb-4 rounded-xl bg-white p-4 pr-2 shadow-custom">
      {roleData.map((role) => (
        <View key={role.name}>
          <View className="mb-2 flex flex-row items-center">
            {getProfileImage(persona, 24, 24)}
            <Text className="ml-1.5 font-medium text-emphasizedFont">{role.name}</Text>
          </View>
          {role.roles && role.roles.length > 0 ? (
            role.roles.map((data) => (
              <View
                key={data.id}
                className={`mb-1 flex flex-row items-center py-1.5 ${
                  data.id === role.roles[role.roles.length - 1].id ? 'mb-0' : ''
                }`}
              >
                <View className="mr-1.5 rounded-sm bg-colorBox px-2 py-[2px]">
                  <Text className="text-xs font-medium text-colorFont">
                    {data.allDays ? '매일' : data.repeatDayList.join(', ')}
                  </Text>
                </View>
                <Text className="text-basicFont">{data.content}</Text>
              </View>
            ))
          ) : (
            <Text className="py-1.5 text-sm font-medium text-disabledFont">
              등록된 역할이 없어요!
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default RoleBox;
