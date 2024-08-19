import React from 'react';
import { Image, Text, View } from 'react-native';
import Config from 'react-native-config';

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
  roleData: RoleData[];
}

const RoleBox: React.FC<RoleBoxProps> = ({ roleData }) => {
  return (
    <View className="p-4 pr-2 mb-4 bg-white shadow-chipback rounded-xl">
      {roleData.map((role) => (
        <View key={role.name}>
          <View className="flex flex-row items-center mb-2">
            <Image
              source={{
                uri: `${Config.S3_IMAGE_URL}/persona/png/1.png`,
              }}
              style={{ width: 24, height: 24 }}
              resizeMode="cover"
            />
            <Text className="ml-1.5 font-medium text-emphasizedFont">{role.name}</Text>
          </View>
          {role.roles && role.roles.length > 0 ? (
            role.roles.map((data) => (
              <View
                key={data.id}
                className={`flex flex-row items-center mb-1 py-1.5 ${
                  data.id === role.roles[role.roles.length - 1].id ? 'mb-0' : ''
                }`}
              >
                <View className="bg-colorBox px-2 py-[2px] rounded-sm mr-1.5">
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