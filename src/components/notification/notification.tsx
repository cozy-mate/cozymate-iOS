import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { TouchableHighlight } from 'react-native';

import { NotificationScreenProps } from '@type/param/stack';

interface NotificationComponentProps {
  notificationData: {
    content: string;
    createdAt: string;
    category: string;
    targetId: number;
  };
  navigation: NotificationScreenProps['navigation'];
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notificationData,
  navigation,
}) => {
  const toScreen = () => {
    if (notificationData.category === '초대요청') {
      navigation.navigate('RoomDetailScreen', { roomId: notificationData.targetId });
    } else if (notificationData.category === '방 참여요청') {
      navigation.navigate('UserDetailScreen', { memberId: notificationData.targetId });
    } else if (notificationData.category === '방') {
      navigation.navigate('MainScreen', { screen: 'RoomMainScreen' });
    }
  };

  return (
    <TouchableHighlight onPress={toScreen} underlayColor="#E5F0FF">
      <View className="space-y-1.5 p-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs font-semibold text-main1">{notificationData.category}</Text>
          <Text className="text-xs font-medium text-disabledFont">
            {notificationData.createdAt}
          </Text>
        </View>

        <Text className="text-sm font-medium text-emphasizedFont">{notificationData.content}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default NotificationComponent;
