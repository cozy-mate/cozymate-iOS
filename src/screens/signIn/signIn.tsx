import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

const SignInScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>cozymate</Text>

        <View>
          <Pressable className="flex-row items-center rounded-[33px] bg-kakaoyellow">
            <Text>카카오톡으로 계속하기</Text>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <Text>네이버</Text>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <Text>Apple로 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
