import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';

import BackHeaderComponent from '@/components/common/backHeader';
import CreateRoleScene from '@/components/roleNRule/role/createRole';
import CreateRuleScene from '@/components/roleNRule/rule/createRule';
import CreateTodoScene from '@/components/roleNRule/todo/createTodo';

export default function Create() {
  const { type } = useLocalSearchParams();

  const [index, setIndex] = useState(Number(type));

  const [routes] = useState([
    { key: 'TODO', title: 'To-do', type: 'To-do' },
    { key: 'ROLE', title: 'Role', type: 'Role' },
    { key: 'RULE', title: 'Rule', type: 'Role' },
  ]);

  const renderScene = ({ route }: { route: Route } & SceneRendererProps) => {
    switch (route.key) {
      case 'TODO':
        return <CreateTodoScene key={route.key + index} />;

      case 'ROLE':
        return <CreateRoleScene key={route.key + index} />;

      case 'RULE':
        return <CreateRuleScene key={route.key + index} />;

      default:
        return null;
    }
  };

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
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'transparent' }}
            style={{
              backgroundColor: 'transparent',
              marginTop: 8,
              marginHorizontal: 20,
            }}
            renderTabBarItem={(tabProps) => {
              const tabIndex = props.navigationState.routes.indexOf(tabProps.route);
              const isFocused = props.navigationState.index === tabIndex;

              return (
                <Pressable
                  onPress={tabProps.onPress}
                  className={`w-[65px] m-[8px] pb-[8px] border-b-[4px] ${isFocused ? 'border-b-mainColor' : 'border-b-transparent'} ${tabIndex !== 2 && 'mr-[12px]'}`}
                >
                  <Text
                    className={`${isFocused ? 'text-[#68A4FF]' : 'text-[#ACADB4]'} Semibold18 text-center`}
                  >
                    {tabProps.route.title}
                  </Text>
                </Pressable>
              );
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
