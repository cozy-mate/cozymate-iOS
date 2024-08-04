import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigatorParamList } from '@type/param/stack';

const CozyHome: React.FC = () => {
  return (
    <View>
      <Text>코지홈</Text>
    </View>
  );
};

const RoleNRule: React.FC = () => {
  return (
    <View>
      <Text>롤앤룰</Text>
    </View>
  );
};

const Feed: React.FC = () => {
  return (
    <View>
      <Text>피드</Text>
    </View>
  );
};

const RoomMate: React.FC = () => {
  return (
    <View>
      <Text>룸메</Text>
    </View>
  );
};

const MyPage: React.FC = () => {
  return (
    <View>
      <Text>마이페이지</Text>
    </View>
  );
};

const BottomNavBar: React.FC = () => {
  const Tab = createBottomTabNavigator<TabNavigatorParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen name="CozyHomeScreen" component={CozyHome} />
      <Tab.Screen name="TodoListScreen" component={RoleNRule} />
      <Tab.Screen name="FeedScreen" component={Feed} />
      <Tab.Screen name="RoomMateScreen" component={RoomMate} />
      <Tab.Screen name="MyPageScreen" component={MyPage} />
    </Tab.Navigator>
  );
};

export default BottomNavBar;
