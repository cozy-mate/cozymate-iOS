
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

import EditIcon from '@/assets/icons/feed/edit.svg';
import OpacityPressable from '@/components/opacityPressable';
import { useGetMyRoomFeed } from '@/hooks/feed/feed';

export const FeedEditButton = ({
    className,
}: {
    className?: string;
}) => {
    const router = useRouter();

    const { data, isLoading } = useGetMyRoomFeed();
    return (
        <OpacityPressable className={className} onPress={() => router.push('/feed/edit')} disabled={isLoading}>
            <View className="flex flex-row items-center gap-x-1">
                <Text className="Semibold20 text-disabledFont">{data?.result.name && data?.result.name !== '' ? data?.result.name : '피드 이름을 설정해주세요'}</Text>
                <EditIcon />
            </View>
            <Text className="Semibold16 text-disabledFont">{data?.result.description && data?.result.description !== '' ? data?.result.description : '피드 설명을 입력해주세요'}</Text>
        </OpacityPressable>
    );
};