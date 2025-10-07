import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image as ExpoImage } from 'expo-image';
import React, { memo, useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Text, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import ChatIcon from '@/assets/icons/feed/chat.svg';
import MoreDotIcon from '@/assets/icons/feed/more-dot.svg';
import { BottomSheetItem, BottomSheetTitle, useBottomSheet } from '@/components/common/bottomSheet';
import TwoButtonModal from '@/components/modal/twoButtonModal';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { useDeletePost } from '@/hooks/post/post';
import { useToggle } from '@/hooks/useToggle';
import { Post } from '@/server/post/post';
import { formatDate } from '@/utils/translateDate';
import { useMemberStore } from '@/zustand/store';

const PostDetailHeader = ({ persona, nickname, postId }: { persona: number, nickname: string, postId: number }) => {

    const { roomInfo } = useMemberStore();

    const { bottomSheetRef, BottomSheetComponent, open } = useBottomSheet({ snapPoints: [175] });

    const { open: openDeleteModal, close: closeDeleteModal, isOpen: isDeleteModalVisible } = useToggle();

    const { mutate: deletePost } = useDeletePost(
        {
            roomId: roomInfo?.roomId ?? 0,
            postId: postId,
            onSuccess: () => {
                closeDeleteModal();
            }
        });

    return (
        <>
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-x-[6px] items-center">
                    {getPersona(persona, 24, 24)}
                    <Text className="Semibold14 text-emphasizedFont">{nickname}</Text>
                </View>
                <OpacityPressable onPress={() => open()}>
                    <MoreDotIcon />
                </OpacityPressable>
            </View>
            <BottomSheetComponent>
                <BottomSheetView className="flex-1 pt-[12px] pb-[16px] px-[20px]">
                    <BottomSheetTitle title="게시물" />
                    <BottomSheetItem
                        text="수정하기"
                        onPress={() => {
                            bottomSheetRef.current?.close();
                        }}
                    />
                    <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />
                    <BottomSheetItem
                        text="삭제하기"
                        onPress={() => {
                            bottomSheetRef.current?.close();
                            openDeleteModal();
                        }}
                    />
                </BottomSheetView>
            </BottomSheetComponent>
            <TwoButtonModal
                isVisible={isDeleteModalVisible}
                title="게시물을 삭제하시나요?"
                subtitle="삭제하면 우리의 추억을 복구할 수 없어요!"
                closeFunc={closeDeleteModal}
                leftButtonText="취소"
                leftButtonFunc={closeDeleteModal}
                rightButtonText="삭제"
                rightButtonFunc={deletePost}
            />
        </>
    )
}

const PostListHeader = memo(({ persona, nickname, createdAt }: { persona: number, nickname: string, createdAt: string }) => {
    return (
        <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row gap-x-[6px] items-center">
                {getPersona(persona, 24, 24)}
                <Text className="Semibold14 text-emphasizedFont">{nickname}</Text>
            </View>
            <Text className="Regular12 text-disabledFont">{formatDate(createdAt)}</Text>
        </View>
    )
}, (prevProps, nextProps) => {
    return prevProps.persona === nextProps.persona && prevProps.nickname === nextProps.nickname && prevProps.createdAt === nextProps.createdAt;
})

PostListHeader.displayName = 'PostListHeader';

//@description : content와 imageList가 바뀌지 않았다면 useMemo로 고정
const PostContent = memo(({ content, imageList }: { content: string, imageList: string[] }) => {

    const { width } = useWindowDimensions();
    const cardHorizontalPadding = 32;
    const carouselWidth = width - cardHorizontalPadding * 2;
    const carouselHeight = carouselWidth;

    const [currentIndex, setCurrentIndex] = useState(0);

    const showSkeleton = false || imageList.length === 0;

    return (
        <View className="flex flex-col gap-y-3">
            <Text className="Medium14 text-basicFont">{content}</Text>
            {imageList.length > 0 && (
                <View className="flex flex-col items-center" key={imageList.join(',')}>
                    <Carousel<string>
                        width={carouselWidth}
                        height={carouselHeight}
                        data={imageList}
                        onSnapToItem={(index) => setCurrentIndex(index)}
                        renderItem={({ item }: { item: string; index: number }) => {
                            const key = item.split('/').pop()?.split('.')[0];
                            return (<ExpoImage
                                key={key}
                                cachePolicy="memory-disk"
                                recyclingKey={key}
                                transition={0}
                                source={{ uri: item, cacheKey: key }}
                                style={{ width: carouselWidth, height: carouselHeight, borderRadius: 16 }}
                                contentFit="cover"
                            />
                            )
                        }}
                    />
                    <View className="flex flex-row items-center justify-center mt-4" style={{ gap: 6 }}>
                        {imageList.map((image, i) => (
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
}, (prevProps, nextProps) => {
    return prevProps.content === nextProps.content && (
        prevProps.imageList.every((image, index) => {
            const key = image.split('/').pop()?.split('.')[0];
            return key === nextProps.imageList[index].split('/').pop()?.split('.')[0];
        })
    );
});

PostContent.displayName = 'PostContent';

const PostFooter = memo(({ commentCount }: { commentCount: number }) => {
    return (
        <View className="flex flex-row gap-x-[6px] items-center">
            <ChatIcon />
            <Text className="Medium12 text-disabledFont">{commentCount}</Text>
        </View>
    )
}, (prevProps, nextProps) => {
    return prevProps.commentCount === nextProps.commentCount;
})

PostFooter.displayName = 'PostFooter';

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
                <PostFooter commentCount={commentCount} />
            </View>
        </OpacityPressable>
    );
};

export const PostDetailCard = ({
    post
}: {
    post: Post & { commentCount: number };
}) => {

    const { persona, nickname, content, commentCount, createdAt, imageList, id: postId } = post;
    return (
        <View className="flex flex-col pt-4 rounded-2xl bg-[#FFFFFF] gap-y-2">
            <View className="flex flex-col rounded-2xl bg-[#FFFFFF] gap-y-2">
                <PostDetailHeader persona={persona} nickname={nickname} postId={postId} />
                <PostContent content={content} imageList={imageList} />
                <View className="flex flex-row gap-x-[6px] items-center justify-between">
                    <PostFooter commentCount={commentCount} />
                    <Text className="Regular12 text-disabledFont">{formatDate(createdAt)}</Text>
                </View>
            </View>
        </View>
    )
}