import React from 'react';
import { View, SafeAreaView, Text, Pressable, ScrollView } from 'react-native';

import { useGetNotificationList } from '@hooks/api/notification';

import BackButton from '@assets/backButton.svg';

import { NotificationScreenProps } from '@type/param/stack';

const NotificationScreen = ({ navigation }: NotificationScreenProps) => {
  const { data: notificationlist, refetch: refetchNotification } = useGetNotificationList();

  const toBack = () => {
    navigation.goBack();
  };

  const toScreen = (category: string) => {
    if (category === 'COZY_ROLE') {
      navigation.navigate('MainScreen', { screen: 'TodoListScreen' });
    } else {
      navigation.navigate('MainScreen');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="flex flex-row justify-start px-2 mt-2 mb-7">
          <Pressable onPress={toBack}>
            <BackButton />
          </Pressable>
        </View>

        <ScrollView className="flex-1">
          <View className="flex-1">
            {notificationlist.result.length > 0 ? (
              notificationlist.result.map((noti, index) => (
                <Pressable key={index} onPress={() => toScreen(noti.category)}>
                  <View
                    className={`p-5 ${
                      index !== notificationlist.result.length - 1
                        ? 'border-b-disabled border-b-[1px]'
                        : 'border-b-0'
                    } `}
                  >
                    <View>
                      <Text className="flex flex-row flex-nowrap">
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
                      </Text>
                      <Text className="text-xs font-medium text-disabledFont mt-[2px]">
                        {noti.createdAt}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <View className="flex flex-col items-center justify-center h-full">
                <Text className="text-sm font-medium text-disabledFont">
                  받은 알림이 존재하지 않아요!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
