import React from 'react';
import { Pressable, View } from 'react-native';

import One from '@/assets/images/character/1.svg';
import Ten from '@/assets/images/character/10.svg';
import Eleven from '@/assets/images/character/11.svg';
import Twelve from '@/assets/images/character/12.svg';
import Thirteen from '@/assets/images/character/13.svg';
import Fourteen from '@/assets/images/character/14.svg';
import Fifteen from '@/assets/images/character/15.svg';
import Sixteen from '@/assets/images/character/16.svg';
import Two from '@/assets/images/character/2.svg';
import Three from '@/assets/images/character/3.svg';
import Four from '@/assets/images/character/4.svg';
import Five from '@/assets/images/character/5.svg';
import Six from '@/assets/images/character/6.svg';
import Seven from '@/assets/images/character/7.svg';
import Eight from '@/assets/images/character/8.svg';
import Nine from '@/assets/images/character/9.svg';
import Selected from '@/assets/images/character/check.svg';

interface CharacterListProps {
  value: number;
  handleValue: (num: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ value, handleValue }) => {
  const CharacterItem = [
    { value: 1, icon: <One width={70} height={70} /> },
    { value: 2, icon: <Two width={70} height={70} /> },
    { value: 3, icon: <Three width={70} height={70} /> },
    { value: 4, icon: <Four width={70} height={70} /> },
    { value: 5, icon: <Five width={70} height={70} /> },
    { value: 6, icon: <Six width={70} height={70} /> },
    { value: 7, icon: <Seven width={70} height={70} /> },
    { value: 8, icon: <Eight width={70} height={70} /> },
    { value: 9, icon: <Nine width={70} height={70} /> },
    { value: 10, icon: <Ten width={70} height={70} /> },
    { value: 11, icon: <Eleven width={70} height={70} /> },
    { value: 12, icon: <Twelve width={70} height={70} /> },
    { value: 13, icon: <Thirteen width={70} height={70} /> },
    { value: 14, icon: <Fourteen width={70} height={70} /> },
    { value: 15, icon: <Fifteen width={70} height={70} /> },
    { value: 16, icon: <Sixteen width={70} height={70} /> },
  ];

  return (
    <View className="flex flex-row flex-wrap gap-x-[16px] gap-y-8 mx-[3.5px]">
      {CharacterItem.map((character, index) => (
        <Pressable key={index} onPress={() => handleValue(character.value)} className="relative">
          {character.icon}

          {value === character.value && (
            <View className="absolute">
              <Selected />
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default CharacterList;
