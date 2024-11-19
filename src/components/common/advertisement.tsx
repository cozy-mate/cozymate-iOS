import { Text, View, Dimensions } from 'react-native';
import React, { useState, ReactNode, useEffect } from 'react';

import Advertisement1 from '@assets/roomMate/ad1.svg';
import Advertisement2 from '@assets/roomMate/ad2.svg';

interface ADItem {
  index: number;
  element: ReactNode;
}

const Advertisement: React.FC = () => {
  const width = Dimensions.get('screen').width;

  const adArray: ADItem[] = [
    { index: 1, element: <Advertisement1 width={width} /> },
    { index: 2, element: <Advertisement2 width={width} /> },
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const adDisplayInterval = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adArray.length);
    }, adDisplayInterval);

    return () => clearInterval(interval);
  }, [adArray.length]);

  return (
    <View className="relative">
      {adArray[currentAdIndex].element}
      <Text className="absolute bottom-2 right-8 text-xs font-medium text-[#A2A2A2]">
        <Text className="text-white">{currentAdIndex + 1}</Text> / {adArray.length}
      </Text>
    </View>
  );
};

export default Advertisement;
