import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Text } from 'react-native';

export default function BasicInfoSkeleton() {
  return (
    <View className="px-[20px] gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont ml-[4px]">기본 정보</Text>

      <View className="p-[16px] rounded-xl border border-strokeColor">
        {/* 닉네임 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">닉네임</Text>
          <ContentLoader
            speed={1}
            width={40}
            height={16}
            backgroundColor="#E0E0E0"
            foregroundColor="#F5F5F5"
          >
            <Rect x="0" y="0" rx="4" ry="4" width="40" height="16" />
          </ContentLoader>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        {/* 출생년도 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">출생년도</Text>
          <ContentLoader
            speed={1}
            width={60}
            height={16}
            backgroundColor="#E0E0E0"
            foregroundColor="#F5F5F5"
          >
            <Rect x="0" y="0" rx="4" ry="4" width="60" height="16" />
          </ContentLoader>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        {/* 학교 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">학교</Text>
          <ContentLoader
            speed={1}
            width={120}
            height={16}
            backgroundColor="#E0E0E0"
            foregroundColor="#F5F5F5"
          >
            <Rect x="0" y="0" rx="4" ry="4" width="120" height="16" />
          </ContentLoader>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        {/* 학번 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">학번</Text>
          <ContentLoader
            speed={1}
            width={50}
            height={16}
            backgroundColor="#E0E0E0"
            foregroundColor="#F5F5F5"
          >
            <Rect x="0" y="0" rx="4" ry="4" width="50" height="16" />
          </ContentLoader>
        </View>

        <View className="bg-[#F1F2F4] h-[1px] my-[12px]" />

        {/* 학과 */}
        <View className="flex flex-row items-center gap-x-[12px]">
          <Text className="Medium14 text-colorFont">학과</Text>
          <ContentLoader
            speed={1}
            width={100}
            height={16}
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
