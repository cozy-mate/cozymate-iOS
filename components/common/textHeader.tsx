import React from "react";
import { View } from "react-native";



export const TextHeader = ({
    title,
    className
}: {
    title: React.ReactNode,
    className?: string
}) => {
    return (
        <View className={`flex flex-row justify-between items-center px-[20px] ${className}`}>
            <View className="flex items-center gap-y-[4px] ml-[4px]">
                {title}
            </View>
        </View>
    )
}