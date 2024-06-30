import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import { TodoListScreenProps } from '@type/param/stack';

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6"></View>
    </SafeAreaView>
  );
};

export default TodoListScreen;
