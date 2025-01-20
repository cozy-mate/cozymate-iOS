import React from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';

import NotificationComponent from '@components/notification/notification';

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={filteredNotifications}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <NotificationComponent notificationData={item} navigation={navigation} />
        )}
        // Header Component를 sticky하도록 설정
        stickyHeaderIndices={[0]}
        // FlatList의 최하단에 렌더링되는 Header 아이템
        ListHeaderComponent={
          <View className="bg-white">
            <Pressable onPress={toBack} className="mb-8 ml-5 mt-2 flex flex-row self-start">
              <BackButton />
            </Pressable>
          </View>
        }
        // FlatList의 최하단에 렌더링되는 Footer 아이템
        ListFooterComponent={<View className="h-8" />}
        // 렌더링 되는 아이템들 사이의 간격
        ItemSeparatorComponent={() => <View className="h-[1px] bg-[#F6F6F6]" />}
        ListEmptyComponent={
          <View className="mb-20 flex-1 items-center justify-center">
            <Text className="text-sm font-medium text-disabledFont">
              받은 알림이 존재하지 않아요!
            </Text>
          </View>
        }
        bounces={false}
        contentContainerStyle={filteredNotifications.length === 0 ? { flex: 1 } : {}}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
