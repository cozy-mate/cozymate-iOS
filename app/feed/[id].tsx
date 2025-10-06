import { useLocalSearchParams } from "expo-router";
import { FlatList, Keyboard, RefreshControl, View } from "react-native";

import { EditLayout } from "@/components/common/layout";
import LoadingComponent from "@/components/common/loading";
import { CommentCard } from "@/components/feed/cards/commentCard";
import { PostDetailCard } from "@/components/feed/cards/postCard";
import CommentInput from "@/components/feed/CommentInput";
import { useCreateComment } from "@/hooks/comment/comment";
import { useGetPostDetail } from "@/hooks/post/post";
import { Post } from "@/server/post/post";
import { useMemberStore } from "@/zustand/store";


export default function PostDetail() {

    const { id } = useLocalSearchParams();
    const { roomInfo } = useMemberStore();

    const { data, isLoading, refetch, isFetching } = useGetPostDetail({ roomId: roomInfo?.roomId ?? 0, postId: Number(id) });
    const { mutate, isPending } = useCreateComment({
        roomId: roomInfo?.roomId ?? 0,
        postId: Number(id)
    });

    const { commentList } = data?.result ?? { commentList: [] };

    const handleCommentSubmit = (content: string) => {
        mutate({
            postId: Number(id),
            roomId: roomInfo?.roomId ?? 0,
            content,
        });
    };

    return (
        <EditLayout>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <FlatList
                        refreshControl={<RefreshControl refreshing={isFetching && !isLoading} onRefresh={refetch} />}
                        ListHeaderComponent={
                            <>
                                <View className="px-5">
                                    <PostDetailCard post={{
                                        ...data?.result as Post,
                                        commentCount: commentList?.length ?? 0,
                                    }} />
                                </View>
                                {/* Divider */}
                                <View className="bg-[#F4F4F4] h-[2px] my-6" />
                            </>
                        }
                        data={commentList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
                        renderItem={({ item }) => <CommentCard key={item.id} comment={item} />}
                        ItemSeparatorComponent={() => <View className="bg-[#F1F1F1] h-[1px] my-5 px-5" />}
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                    />
                    <CommentInput
                        onSubmit={handleCommentSubmit}
                        placeholder="댓글을 입력해주세요"
                        maxLength={200}
                        isDisabled={isPending}
                    />
                </>
            )}
        </EditLayout>
    )
}