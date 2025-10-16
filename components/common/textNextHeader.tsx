import React from "react";
import { View, Text } from "react-native";

import GrayArrowIcon from "@/assets/images/common/grayArrow.svg";

import OpacityPressable from "../opacityPressable";


export const TextNextHeader = ({
    title,
    handleMore,
    className
}: {
    title: React.ReactNode,
    handleMore: () => void,
    className?: string
}) => {
    return (
        <View className={`flex flex-row justify-between items-center px-[20px] ${className}`}>
            <View className="flex items-center gap-y-[4px] ml-[4px]">
                {title}
            </View>
            <OpacityPressable onPress={handleMore}>
                <View className="flex flex-row items-center gap-x-[4px]">
                    <Text className="Semibold12 text-disabledFont">더보기</Text>
                    <GrayArrowIcon />
                </View>
            </OpacityPressable>
        </View>
    )
}