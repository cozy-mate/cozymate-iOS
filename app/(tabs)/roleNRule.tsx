import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Background from '@/assets/images/roleNRule/background.svg';

import AddButton from '@/assets/images/roleNRule/addButton.svg';
import TodoScene from '@/components/roleNRule/todoScene';
import RoleNRuleScene from '@/components/roleNRule/roleRuleScene';

const renderScene = SceneMap({
  TODO: TodoScene,
  ROLENRULE: RoleNRuleScene,
});

export default function RoleNRule() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'TODO', title: 'To - do', type: 'To-do' },
    { key: 'ROLENRULE', title: 'Role & Rule', type: 'Role' },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-[#CADFFF] relative">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
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

      <TouchableOpacity
        onPress={() => router.push(`/roleNRule/create?currentType=${routes[index].type}`)}
        className="absolute bottom-[126px] right-[20px]"
      >
        <AddButton />
      </TouchableOpacity>

      {/* 스크롤 최하단 배경색 지정 */}
      <View className="absolute bottom-0 w-full h-[400px] bg-[#F7FAFF] -z-10" />
    </SafeAreaView>
  );
}
