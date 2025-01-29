import React, { useState } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import ChipSelectComponent from '@components/onBoard/new/chipSelect';

import { usePreferencesStore } from '@zustand/member-stat/member-stat';

import { addPreferenceList } from '@server/api/member-stat-preference';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

import { ChipSelectScreenProps } from '@type/param/rootStack';

const ChipSelectScreen = ({ navigation }: ChipSelectScreenProps) => {
  const { setPreferenceList } = usePreferencesStore();
  const [preferences, setPreferences] = useState<LifestyleOptionKey[]>([]);

  const isComplete = preferences.length === 4;

  const handlePreference = (value: LifestyleOptionKey) => {
    setPreferences((prevPreferences) =>
      prevPreferences.includes(value)
        ? prevPreferences.filter((preference) => preference !== value)
        : [...prevPreferences, value],
    );
  };

  const registerPreference = async () => {
    try {
      const response = await addPreferenceList({ preferenceList: preferences });
      console.log(response.result);
      setPreferenceList(preferences);

      navigation.navigate('CompleteScreen');
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col justify-between">
        {/* 상단 View */}
        <View className="mt-14 flex">
          {/* 설명 Text */}
          <View className="mb-6 px-5 leading-loose">
            <Text className="text-xl font-semibold tracking-tight text-emphasizedFont">
              룸메이트를 선택할 때,{'\n'}가장 중요한 요소 <Text className="text-main1">4가지</Text>
              를 선택해주세요
            </Text>
          </View>

          <ChipSelectComponent preference={preferences} handlePreference={handlePreference} />
        </View>

        {/* 하단 View */}
        <View className="flex px-5">
          <Pressable onPress={registerPreference} disabled={preferences.length !== 4}>
            <View className={`rounded-xl p-4 ${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}`}>
              <Text className="text-center text-base font-semibold text-white">확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChipSelectScreen;
