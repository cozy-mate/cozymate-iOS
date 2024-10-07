import React, { ReactNode, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import Advertisement1 from '@assets/roomMate/ad1.svg';
import Advertisement2 from '@assets/roomMate/ad2.svg';

interface ADItem {
  index: number;
  element: ReactNode;
}

const Advertisement: React.FC = () => {
  const [adArray, setAdArray] = useState<ADItem[]>([
    { index: 1, element: <Advertisement1 /> },
    { index: 2, element: <Advertisement2 /> },
  ]);

  const [currentAdIndex, setCurrentAdIndex] = useState(0); // 현재 광고 인덱스 관리
  const adDisplayInterval = 5000; // 광고가 변경되는 시간 간격 (밀리초)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adArray.length);
    }, adDisplayInterval);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [adArray.length]);

  return (
    <View className="relative">
      {adArray[currentAdIndex].element}
      <Text className="absolute text-xs font-medium bottom-2 right-4 text-[#A2A2A2]">
        <Text className="text-white">{currentAdIndex + 1}</Text> / {adArray.length}
      </Text>
    </View>
  );
};

export default Advertisement;
