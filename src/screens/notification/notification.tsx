import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';

import { useGetNotificationList } from '@hooks/api/notification';

import { NotificationScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

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
        <View className="mb-7 mt-2 flex flex-row justify-start px-2">
          <Pressable onPress={toBack}>
            <BackButton />
          </Pressable>
        </View>

        <ScrollView className="flex-1">
          <View className="flex-1">
            {notificationlist.result.length > 0 ? (
              notificationlist.result.map((noti, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => toScreen(noti.category)}
                  underlayColor="#E5F0FF"
                >
                  <View
                    className={`p-5 ${
                      index !== notificationlist.result.length - 1
                        ? 'border-b border-b-disabled'
                        : 'border-b-0'
                    } `}
                  >
                    <View>
                      <Text className="flex flex-row flex-nowrap">
                        {noti.content.split(/{(.*?)}/).map((part, i) => (
                          <Text
                            key={i}
                            className={`text-sm font-medium ${
                              i % 2 === 1 ? 'font-semibold text-main1' : 'text-basicFont'
                            }`}
                          >
                            {part}
                          </Text>
                        ))}
                      </Text>
                      <Text className="mt-[2px] text-xs font-medium text-disabledFont">
                        {noti.createdAt}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              ))
            ) : (
              <View className="flex h-full flex-col items-center justify-center">
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
