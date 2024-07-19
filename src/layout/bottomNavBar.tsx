import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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
  return (
    <Tab.Navigator>
      <Tab.Screen name="코지홈" component={CozyHome} />
      <Tab.Screen name="롤앤룰" component={RoleNRule} />
      <Tab.Screen name="피드" component={Feed} />
      <Tab.Screen name="룸메" component={RoomMate} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
};

export default BottomNavBar;
