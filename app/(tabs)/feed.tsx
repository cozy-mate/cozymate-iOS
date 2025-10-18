import { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Background from '@/assets/images/roleNRule/background.svg';

import DormitoryFeed from '@/components/feed/dormitoryFeed';
import MyRoomFeed from '@/components/feed/myRoomFeed';

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
    <SafeAreaView className="flex-1 bg-[#CADFFF] relative">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
        swipeEnabled={false}
        renderTabBar={(props) => (
          <View>
            <Background style={{ position: 'absolute' }} />

            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'transparent' }}
              style={{
                backgroundColor: 'transparent',
                marginTop: 29,
                marginHorizontal: 20,
                columnGap: 24,
              }}
              renderTabBarItem={(tabProps) => {
                const tabIndex = props.navigationState.routes.indexOf(tabProps.route);
                const isFocused = props.navigationState.index === tabIndex;

                return (
                  <Pressable
                    onPress={tabProps.onPress}
                    className={`w-[88px] pb-[8px] border-b-[4px] ${isFocused ? 'border-b-mainColor' : 'border-b-transparent'} ${tabIndex === 0 && 'mr-[24px]'}`}
                  >
                    <Text
                      className={`${isFocused ? 'text-[#68A4FF]' : 'text-[#ACADB4]'} Semibold16 text-center`}
                    >
                      {tabProps.route.title}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
