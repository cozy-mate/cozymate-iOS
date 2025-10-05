import { View, Text } from 'react-native';

import { useGetMyRoomFeed } from '@/hooks/feed/feed';

export const EditFeed = () => {
  const { data, isLoading } = useGetMyRoomFeed();

  return (
    <View>
      <Text>EditFeed</Text>
    </View>
  );
};
