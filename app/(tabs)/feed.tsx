import DormitoryFeed from '@/components/feed/dormitoryFeed';
import MyRoomFeed from '@/components/feed/myRoomFeed';
import { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  DORMITORY: DormitoryFeed,
  MYROOM: MyRoomFeed,
});

export default function Feed() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'DORMITORY', title: '기숙사' },
    { key: 'MYROOM', title: '우리방' },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
      />
    </SafeAreaView>
  );
}
