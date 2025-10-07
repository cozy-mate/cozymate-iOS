import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';

import MoreDotIcon from '@/assets/icons/feed/more-dot.svg';
import { BottomSheetTitle, useBottomSheet, BottomSheetItem } from '@/components/common/bottomSheet';
import TwoButtonModal from '@/components/modal/twoButtonModal';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { useDeleteComment } from '@/hooks/comment/comment';
import { useToggle } from '@/hooks/useToggle';
import { Comment } from '@/server/comment/comment';
import { formatDate } from '@/utils/translateDate';
import { useMemberStore } from '@/zustand/store';


const CommentHeader = (
    { persona, nickname, postId, commentId }: { persona: number, nickname: string, postId: number, commentId: number }) => {

    const { roomInfo } = useMemberStore();

    const { bottomSheetRef, BottomSheetComponent, open } = useBottomSheet({ snapPoints: [120] });

    const { open: openDeleteModal, close: closeDeleteModal, isOpen: isDeleteModalVisible } = useToggle();

    const { mutate: deleteComment } = useDeleteComment({
        roomId: roomInfo?.roomId ?? 0,
        postId: postId,
        commentId: commentId,
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
                    <BottomSheetTitle title="댓글" />
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
                title="댓글을 삭제하시겠어요?"
                subtitle="삭제하면 우리의 추억을 복구할 수 없어요!"
                closeFunc={closeDeleteModal}
                leftButtonText="최소"
                leftButtonFunc={closeDeleteModal}
                rightButtonText="삭제"
                rightButtonFunc={deleteComment}
            />
        </>
    )
}

const CommentContent = ({ content }: { content: string }) => {
    return (
        <Text className="Medium14 text-basicFont">{content}</Text>
    )
}

const CommentFooter = ({ createdAt }: { createdAt: string }) => {
    return (
        <Text className="Regular12 text-disabledFont">{formatDate(createdAt)}</Text>
    )
}

export const CommentCard = ({ comment }: { comment: Comment & { postId: number } }) => {
    const { persona, nickname, content, createdAt, id: commentId, postId } = comment;
    return (
        <View className="flex flex-col px-5 rounded-2xl bg-[#FFFFFF] gap-y-2">
            <CommentHeader persona={persona} nickname={nickname} postId={postId} commentId={commentId} />
            <CommentContent content={content} />
            <CommentFooter createdAt={createdAt} />
        </View>
    )
}