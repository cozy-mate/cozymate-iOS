import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import NoNotificationComponent from '@/components/notification/noNotification';
import NotificationListComponent from '@/components/notification/NotificationList';
import { useGetNotificationLog } from '@/hooks/notification/notification';

export default function Notification() {
  const { data } = useGetNotificationLog();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] mb-6">
        <BackHeaderComponent />
      </View>

      {data?.pages?.flatMap((page) => page.result.result).length !== 0 ? (
        <NotificationListComponent />
      ) : (
        <View className="flex-1">
          <NoNotificationComponent />
        </View>
      )}
    </SafeAreaView>
  );
}
