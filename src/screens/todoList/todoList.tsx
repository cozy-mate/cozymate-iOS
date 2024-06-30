import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import Background from '@assets/background.svg';

import { TodoListScreenProps } from '@type/param/stack';

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  return (
    <View className="flex-1 bg-[#CADFFF]">
      <Background />
      <View className="flex-1 mx-6"></View>
    </View>
  );
};

export default TodoListScreen;
