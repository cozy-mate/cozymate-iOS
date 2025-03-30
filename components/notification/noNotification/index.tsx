import { Text, View } from 'react-native';

import NoNotificationIcon from '@/assets/images/notification/noNotification.svg';

const NoNotificationComponent: React.FC = () => {
  return (
    <View className="w-full h-full flex items-center justify-center">
      <View className="gap-y-[20px] pb-[50px]">
        <NoNotificationIcon />
        <Text className="text-14 font-500 leading-14 text-disabledFont text-center">
          아직 도착한 알림이 없어요!
        </Text>
      </View>
    </View>
  );
};

export default NoNotificationComponent;
