import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';

import BackHeaderComponent from '@/components/common/backHeader';
import UpdateRoleScene from '@/components/roleNRule/role/updateRole';
import UpdateRuleScene from '@/components/roleNRule/rule/updateRule';
import UpdateTodoScene from '@/components/roleNRule/todo/updateTodo';

const renderScene = SceneMap({
  TODO: UpdateTodoScene,
  ROLE: UpdateRoleScene,
  RULE: UpdateRuleScene,
});

export default function Update() {
  const { type } = useLocalSearchParams();

  const [index, setIndex] = useState(Number(type));

  const [routes] = useState([
    { key: 'TODO', title: 'To-do', type: 0 },
    { key: 'ROLE', title: 'Role', type: 1 },
    { key: 'RULE', title: 'Rule', type: 2 },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px]">
        <BackHeaderComponent />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
        swipeEnabled={false}
        renderTabBar={(props) => {
          const currentRoute = props.navigationState.routes[props.navigationState.index];

          return (
            <View className="w-[65px] mx-[28px] mt-[16px] mb-[8px] pb-[8px] border-b-[4px] border-b-mainColor">
              <Text className="Semibold18 text-center text-[#68A4FF]">{currentRoute.title}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
