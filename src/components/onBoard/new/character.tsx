import React from 'react';
import { NumberProp } from 'react-native-svg';
import { View, FlatList, Pressable } from 'react-native';

import { useSignUpStore } from '@zustand/member/member';

import First from '@assets/characterItem/1.svg';
import Third from '@assets/characterItem/3.svg';
import Fifth from '@assets/characterItem/5.svg';
import Sixth from '@assets/characterItem/6.svg';
import Ninth from '@assets/characterItem/9.svg';
import Second from '@assets/characterItem/2.svg';
import Fourth from '@assets/characterItem/4.svg';
import Eighth from '@assets/characterItem/8.svg';
import Tenth from '@assets/characterItem/10.svg';
import Seventh from '@assets/characterItem/7.svg';
import Twelfth from '@assets/characterItem/12.svg';
import Eleventh from '@assets/characterItem/11.svg';
import Check from '@assets/characterItem/check.svg';
import Fifteenth from '@assets/characterItem/15.svg';
import Sixteenth from '@assets/characterItem/16.svg';
import Thirteenth from '@assets/characterItem/13.svg';
import Fourteenth from '@assets/characterItem/14.svg';

type IconProps = {
  width?: NumberProp;
  height?: NumberProp;
};

type Item = {
  index: number;
  value: number;
  icon: React.FC<IconProps>;
};

const CharacterSelect: React.FC = () => {
  const { signUpState, setSignUpState } = useSignUpStore();

  const characterItems: Item[] = [
    { index: 1, value: 1, icon: First },
    { index: 2, value: 2, icon: Second },
    { index: 3, value: 3, icon: Third },
    { index: 4, value: 4, icon: Fourth },
    { index: 5, value: 5, icon: Fifth },
    { index: 6, value: 6, icon: Sixth },
    { index: 7, value: 7, icon: Seventh },
    { index: 8, value: 8, icon: Eighth },
    { index: 9, value: 9, icon: Ninth },
    { index: 10, value: 10, icon: Tenth },
    { index: 11, value: 11, icon: Eleventh },
    { index: 12, value: 12, icon: Twelfth },
    { index: 13, value: 13, icon: Thirteenth },
    { index: 14, value: 14, icon: Fourteenth },
    { index: 15, value: 15, icon: Fifteenth },
    { index: 16, value: 16, icon: Sixteenth },
  ];

  return (
    <FlatList
      data={characterItems}
      renderItem={({ item }) => (
        <Pressable onPress={() => setSignUpState({ persona: item.value })}>
          <View className="relative h-[70px] w-[70px]">
            <item.icon width={70} height={70} />
            {signUpState.persona === item.value && (
              <View className="absolute">
                <Check />
              </View>
            )}
          </View>
        </Pressable>
      )}
      numColumns={4}
      contentContainerStyle={{ rowGap: 32 }}
      columnWrapperStyle={{ columnGap: 16 }}
      bounces={false}
    />
  );
};

export default CharacterSelect;
