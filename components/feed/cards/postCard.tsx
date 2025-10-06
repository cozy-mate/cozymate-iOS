import { Image as ExpoImage } from 'expo-image';
import React, { useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import ChatIcon from '@/assets/icons/feed/chat.svg';
import MoreDotIcon from '@/assets/icons/feed/more-dot.svg';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { Post } from '@/server/post/post';
import { formatDate } from '@/utils/translateDate';

const PostDetailHeader = ({ persona, nickname }: { persona: number, nickname: string }) => {
    return (
        <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row gap-x-[6px] items-center">
                {getPersona(persona, 24, 24)}
                <Text className="Semibold14 text-emphasizedFont">{nickname}</Text>
            </View>
            <OpacityPressable>
                <MoreDotIcon />
            </OpacityPressable>
        </View>
    )
}

const PostListHeader = ({ persona, nickname, createdAt }: { persona: number, nickname: string, createdAt: string }) => {
    return (
        <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row gap-x-[6px] items-center">
                {getPersona(persona, 24, 24)}
                <Text className="Semibold14 text-emphasizedFont">{nickname}</Text>
            </View>
            <Text className="Regular12 text-disabledFont">{formatDate(createdAt)}</Text>
        </View>
    )
}

const PostContent = ({ content, imageList }: { content: string, imageList: string[] }) => {

    const { width } = useWindowDimensions();
    const cardHorizontalPadding = 32;
    const carouselWidth = width - cardHorizontalPadding * 2;
    const carouselHeight = carouselWidth;

    const [currentIndex, setCurrentIndex] = useState(0);

    const imageUrls = imageList;
    const showSkeleton = false || imageUrls.length === 0;

    return (
        <View className="flex flex-col gap-y-3">
            <Text className="Medium14 text-basicFont">{content}</Text>

            {imageList.length > 0 && (
                <View className="flex flex-col items-center" key={imageList.join(',')}>
                    {showSkeleton ? (
                        <View className="w-full bg-[#E6E6E6] rounded-2xl" style={{ width: carouselWidth, height: carouselHeight }} />
                    ) : (
                        <Carousel<string>
                            width={carouselWidth}
                            height={carouselHeight}
                            data={imageUrls}
                            onSnapToItem={(index) => setCurrentIndex(index)}

                            renderItem={({ item, index }: { item: string; index: number }) => (
                                <ExpoImage
                                    key={index}
                                    source={{ uri: item }}
                                    style={{ width: carouselWidth, height: carouselHeight, borderRadius: 16 }}
                                    contentFit="cover"
                                />
                            )}
                        />
                    )}

                    <View className="flex flex-row items-center justify-center mt-4" style={{ gap: 6 }}>
                        {((showSkeleton ? imageList : imageUrls) as string[]).map((image, i) => (
                            <View
                                key={`dot-${image}`}
                                className="rounded-full"
                                style={{ width: 6, height: 6, backgroundColor: showSkeleton ? '#D1D1D1' : (i === currentIndex ? '#656B7A' : '#E6E6E6') }}
                            />
                        ))}
                    </View>
                </View>
            )}
        </View>
    )
}

export const PostListCard = ({
    post,
    onPress
}: {
    post: Post & { commentCount: number };
    onPress?: () => void;
}) => {

    const { persona, nickname, content, commentCount, createdAt, imageList } = post;

    return (
        <OpacityPressable onPress={onPress}>
            <View className="flex flex-col p-4 rounded-2xl bg-[#FFFFFF] gap-y-2">
                <PostListHeader persona={persona} nickname={nickname} createdAt={createdAt} />
                <PostContent content={content} imageList={imageList} />
                <View className="flex flex-row gap-x-[6px] items-center">
                    <ChatIcon />
                    <Text className="Medium12 text-disabledFont">{commentCount}</Text>
                </View>
            </View>
        </OpacityPressable>
    );
};

export const PostDetailCard = ({
    post
}: {
    post: Post & { commentCount: number };
}) => {

    const { persona, nickname, content, commentCount, createdAt, imageList } = post;

    return (
        <View className="flex flex-col pt-4 rounded-2xl bg-[#FFFFFF] gap-y-2">
            <View className="flex flex-col rounded-2xl bg-[#FFFFFF] gap-y-2">
                <PostDetailHeader persona={persona} nickname={nickname} />
                <PostContent content={content} imageList={imageList} />
                <View className="flex flex-row gap-x-[6px] items-center justify-between">
                    <View className="flex flex-row gap-x-[6px] items-center">
                        <ChatIcon />
                        <Text className="Medium12 text-disabledFont">{commentCount}</Text>
                    </View>
                    <Text className="Regular12 text-disabledFont">{formatDate(createdAt)}</Text>
                </View>
            </View>
        </View>
    )
}