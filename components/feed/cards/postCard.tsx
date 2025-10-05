import { Text, View } from 'react-native';

import { Post } from '@/server/post/post';

export const PostListCard = ({
    post,
}: {
    post: Post & { commentCount: number };
}) => {
    return (
        <View className="flex flex-row gap-x-2">
            <Text>{post.content}</Text>
        </View>
    );
};