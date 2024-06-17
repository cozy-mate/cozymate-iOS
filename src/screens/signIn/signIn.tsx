import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>cozymate</Text>
        <View>
          <Pressable>
            <Text>카카오</Text>
          </Pressable>
        </View>
        <View>
          <Pressable>
            <Text>네이버</Text>
          </Pressable>
        </View>
        <View>
          <Pressable>
            <Text>애플</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
