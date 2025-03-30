import { useRouter } from 'expo-router';
import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import BackArrow from '@/assets/images/common/backArrow.svg';

interface BackHeaderComponentProps {
  title?: string;
  children?: ReactNode;
}

const BackHeaderComponent: React.FC<BackHeaderComponentProps> = ({ title, children }) => {
  const router = useRouter();

  return (
    <View className="mt-2 flex flex-row justify-between items-center">
      <Pressable onPress={() => router.back()} className="w-10 h-10 flex justify-center">
        <BackArrow />
      </Pressable>

      {title !== undefined && (
        <Text className="text-16 font-600 leading-16 text-basicFont absolute left-1/2 -translate-x-1/2 py-[6px]">
          {title}
        </Text>
      )}

      {children && <View>{children}</View>}
    </View>
  );
};

export default BackHeaderComponent;
