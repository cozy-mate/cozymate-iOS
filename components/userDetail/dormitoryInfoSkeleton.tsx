import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Text } from 'react-native';

export default function DormitoryInfoSkeleton() {
  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">기숙사 정보</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        {/* 인실 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">인실</Text>
          <ContentLoader
            speed={1}
            width={80}
            height={16}
            viewBox="0 0 80 16"
            backgroundColor="#E0E0E0"
            foregroundColor="#F5F5F5"
          >
            <Rect x="0" y="0" rx="4" ry="4" width="80" height="16" />
          </ContentLoader>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        {/* 합격여부 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">합격여부</Text>
          <ContentLoader
            speed={1}
            width={100}
            height={16}
            viewBox="0 0 100 16"
            backgroundColor="#E0E0E0"
            foregroundColor="#F5F5F5"
          >
            <Rect x="0" y="0" rx="4" ry="4" width="100" height="16" />
          </ContentLoader>
        </View>
      </View>
    </View>
  );
}
