import React, { useState } from 'react';
import { NumberProp } from 'react-native-svg';
import { View, FlatList, Pressable } from 'react-native';

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
  select: boolean;
  icon: React.FC<IconProps>;
};

interface CharacterSelectProps {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ setValue }) => {
  const [items, setItems] = useState<Item[]>([
    { index: 1, value: 1, select: false, icon: First },
    { index: 2, value: 2, select: false, icon: Second },
    { index: 3, value: 3, select: false, icon: Third },
    { index: 4, value: 4, select: false, icon: Fourth },
    { index: 5, value: 5, select: false, icon: Fifth },
    { index: 6, value: 6, select: false, icon: Sixth },
    { index: 7, value: 7, select: false, icon: Seventh },
    { index: 8, value: 8, select: false, icon: Eighth },
    { index: 9, value: 9, select: false, icon: Ninth },
    { index: 10, value: 10, select: false, icon: Tenth },
    { index: 11, value: 11, select: false, icon: Eleventh },
    { index: 12, value: 12, select: false, icon: Twelfth },
    { index: 13, value: 13, select: false, icon: Thirteenth },
    { index: 14, value: 14, select: false, icon: Fourteenth },
    { index: 15, value: 15, select: false, icon: Fifteenth },
    { index: 16, value: 16, select: false, icon: Sixteenth },
  ]);

  const select = (item: Item) => {
    const updatedItems = items.map((i) => ({
      ...i,
      select: i.index === item.index ? true : false,
    }));

    setItems(updatedItems);
    setValue(item.value);
  };

  const renderItem = (item: Item) => {
    return (
      <Pressable onPress={() => select(item)}>
        <View className="relative h-[70px] w-[70px]">
          <item.icon width={70} height={70} />
          {item.select && (
            <View className="absolute">
              <Check />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => renderItem(item)}
      horizontal={false}
      numColumns={4}
      contentContainerStyle={{ rowGap: 32 }}
      columnWrapperStyle={{ columnGap: 16 }}
    />
  );
};

export default CharacterSelect;
