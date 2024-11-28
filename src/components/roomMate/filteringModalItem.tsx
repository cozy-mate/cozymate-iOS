import React from 'react';
import { Text, View, Pressable } from 'react-native';



interface Item {
  index: number;
  value: string | number;
  name: string;
  meridian?: string;
  select: boolean;
}

interface FilteringModalItemProps {
  item: Item;
  selectedFilter: string;
  selectFunc: (selectedFilter: string, item: Item) => void;
}

const FilteringModalItem: React.FC<FilteringModalItemProps> = ({
  item,
  selectedFilter,
  selectFunc,
}) => {
  const isGridStyle =
    selectedFilter === 'birthYear' ||
    selectedFilter === 'admissionYear' ||
    selectedFilter === 'MBTI' ||
    selectedFilter === 'wakeUpTime' ||
    selectedFilter === 'sleepingTime' ||
    selectedFilter === 'turnOffTime';

  return (
    
  );
};

export default FilteringModalItem;


