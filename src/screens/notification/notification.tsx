import React from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';

import { useGetNotificationList } from '@hooks/api/notification';

import BackButton from '@assets/backButton.svg';

import { NotificationScreenProps } from '@type/param/roomStack';

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
  const { data: notificationlist, refetch: refetchNotification } = useGetNotificationList();

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col px-5">
        <View className="flex flex-row justify-start mt-2 mb-7">
          <Pressable onPress={toBack}>
            <BackButton />
          </Pressable>
        </View>

        <View>
          {notificationlist.result.length > 0 ? (
            notificationlist.result.map((noti, index) => (
              <View key={index} className="">
                <View>
                  {noti.content.split(/{(.*?)}/).map((part, i) => (
                    <Text
                      key={i}
                      className={`text-sm font-medium ${
                        i % 2 === 1 ? 'text-main1 font-semibold' : 'text-basicFont'
                      }`}
                    >
                      {part}
                    </Text>
                  ))}
                  <Text className="text-xs font-medium text-disabledFont mt-[2px]">
                    {noti.createdAt}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View className="flex flex-col items-center justify-center">
              <Text className="text-sm font-medium text-disabledFont">
                아직 주고 받은 쪽지가 없어요!
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
