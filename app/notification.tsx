import { Suspense } from 'react';
import { Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import LoadingComponent from '@/components/common/loading';
import NotificationListComponent from '@/components/notification/notificationList';
import { useGetNotificationLog } from '@/hooks/notification/notification';

function NotificationComponent() {
  const { data } = useGetNotificationLog();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] mb-[24px]">
        <BackHeaderComponent />
      </View>

      {data?.pages?.flatMap((page) => page.result.result).length !== 0 ? (
        <NotificationListComponent />
      ) : (
        <View className="flex-1">
          <View className="w-full h-full flex items-center justify-center">
            <View className="gap-y-[20px] pb-[50px]">
              <Text className="Medium14 text-disabledFont text-center">
                아직 도착한 알림이 없어요!
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default function Notification() {
  return (
    <Suspense
      fallback={
        <Portal>
          <LoadingComponent />
        </Portal>
      }
    >
      <NotificationComponent />
    </Suspense>
  );
}
