import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';

import { useGetNotificationList } from '@hooks/api/notification';

import { NotificationScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';
import NoNotificationCharacter from '@assets/notification/noNotification.svg';

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
  const { data: notificationlist } = useGetNotificationList();

  const toBack = () => {
    navigation.goBack();
  };

  const filteredNotifications = notificationlist?.result.filter((noti) =>
    ['공지사항', '방', '초대요청', '방 참여요청'].includes(noti.category),
  );

  const toScreen = (category: string, tragetId: number) => {
    if (category === '초대요청') {
      navigation.navigate('RoomDetailScreen', { roomId: tragetId });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mb-6 mt-2 flex flex-row justify-start px-5">
        <Pressable onPress={toBack}>
          <BackButton />
        </Pressable>
      </View>

      {filteredNotifications && filteredNotifications.length > 0 ? (
        <ScrollView bounces={false} className="flex-1">
          <View className="flex-1">
            {filteredNotifications.map((noti, index) => (
              <TouchableHighlight
                key={index}
                onPress={() => toScreen(noti.category, noti.targetId)}
                underlayColor="#E5F0FF"
              >
                <View
                  className={`p-5 ${
                    index !== filteredNotifications.length - 1
                      ? 'border-b border-b-disabled'
                      : 'border-b-0'
                  }`}
                >
                  <View className="space-y-1.5">
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-xs font-semibold text-main1">{noti.category}</Text>
                      <Text className="text-xs font-medium text-disabledFont">
                        {noti.createdAt}
                      </Text>
                    </View>

                    <Text className="text-sm font-medium text-emphasizedFont">{noti.content}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <NoNotificationCharacter />
          <Text className="flex items-center justify-center text-sm font-medium text-disabledFont">
            받은 알림이 존재하지 않아요!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
