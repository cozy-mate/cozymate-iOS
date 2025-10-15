import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { FlatList, View } from "react-native";

import { DetailLayout } from "@/components/common/layout";
import LoadingComponent from "@/components/common/loading";
import { CommentCard } from "@/components/feed/cards/commentCard";
import { PostDetailCard } from "@/components/feed/cards/postCard";
import CommentInput from "@/components/feed/CommentInput";
import OneButtonModal from "@/components/modal/oneButtonModal";
import { useCreateComment, useGetCommentList } from "@/hooks/comment/comment";
import { useGetPostDetail } from "@/hooks/post/post";
import { useToggle } from "@/hooks/useToggle";
import { Post } from "@/server/post/post";
import { useMemberStore } from "@/zustand/store";

export default function PostDetail() {

    const { id } = useLocalSearchParams();
    const { roomInfo } = useMemberStore();

    const { data, isLoading } = useGetPostDetail(
        { roomId: roomInfo?.roomId ?? 0, postId: Number(id) });

    const { data: commentList, isLoading: isCommentListLoading } = useGetCommentList({
        roomId: roomInfo?.roomId ?? 0,
        postId: Number(id)
    });

    const { mutate, isPending } = useCreateComment({
        roomId: roomInfo?.roomId ?? 0,
        postId: Number(id)
    });

    const sortedComments = useMemo(
        () => commentList?.result.slice().sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        [commentList?.result]
    );


    const handleCommentSubmit = (content: string) => {
        mutate({
            postId: Number(id),
            roomId: roomInfo?.roomId ?? 0,
            content,
        });
    };

    const { open: openResultModal, close: closeResultModal, isOpen: isResultModalVisible } = useToggle();

    return (
        <DetailLayout>
            {isLoading || isCommentListLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <View className="px-5">
                                    <PostDetailCard post={{
                                        ...data?.result as Post,
                                        commentCount: commentList?.result.length ?? 0,
                                    }} />
                                </View>
                                {/* Divider */}
                                <View className="bg-[#F4F4F4] h-[2px] my-6" />
                            </>
                        }
                        data={sortedComments}
                        renderItem={({ item }) => <CommentCard
                            key={item.id} comment={{ ...item, postId: Number(id) }} openResultModal={openResultModal} />}
                        ItemSeparatorComponent={() => <View className="bg-[#F1F1F1] h-[1px] my-5 px-5" />}
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                        ListFooterComponent={() => <View className="h-[20px]" />}
                    />
                    <CommentInput
                        onSubmit={handleCommentSubmit}
                        placeholder="댓글을 입력해주세요"
                        maxLength={200}
                        isDisabled={isPending || isCommentListLoading}
                    />
                </>
            )}
            <OneButtonModal
                isVisible={isResultModalVisible}
                title="댓글이 삭제되었습니다"
                closeFunc={closeResultModal}
                buttonText="확인"
                buttonFunc={closeResultModal}
            />
        </DetailLayout>
    )
}