
import { useRouter } from 'expo-router';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, Text } from 'react-native';

import EditIcon from '@/assets/icons/feed/edit.svg';
import OpacityPressable from '@/components/opacityPressable';
import { useGetMyRoomFeed } from '@/hooks/feed/feed';

const FeedEditButtonSkeleton = ({ className }: { className?: string }) => {
    return (
        <OpacityPressable className={className} disabled>
            <View className="flex flex-row items-center gap-x-1">
                <ContentLoader speed={3} width={200} height={24} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                    <Rect x="0" y="4" rx="4" ry="4" width="160" height="16" />
                </ContentLoader>
                <ContentLoader speed={3} width={20} height={20} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                    <Rect x="0" y="0" rx="4" ry="4" width="20" height="20" />
                </ContentLoader>
            </View>
            <ContentLoader speed={3} width={240} height={16} backgroundColor="#d1d1d1" foregroundColor="#E6E6E6">
                <Rect x="0" y="0" rx="4" ry="4" width="200" height="14" />
            </ContentLoader>
        </OpacityPressable>
    );
};

export const FeedEditButton = ({
    className,
}: {
    className?: string;
}) => {
    const router = useRouter();

    const { data, isLoading } = useGetMyRoomFeed();

    const name = data?.result.name ?? '';
    const description = data?.result.description ?? '';

    const hasName = name.trim().length > 0;
    const hasDescription = description.trim().length > 0;

    const nameColorClass = hasName ? 'text-basicFont' : 'text-disabledFont';
    const descColorClass = hasDescription ? 'text-basicFont' : 'text-disabledFont';

    const nameText = hasName ? name : '피드 이름을 설정해주세요';
    const descText = hasDescription ? description : '피드 설명을 입력해주세요';

    if (isLoading) {
        return (
            <FeedEditButtonSkeleton className={className} />
        );
    }

    return (
        <OpacityPressable className={className} onPress={() => router.push('/feed/edit')} disabled={isLoading}>
            <View className="flex flex-row items-center gap-x-1">
                <Text className={`Semibold20 ${nameColorClass}`}>{nameText}</Text>
                <EditIcon />
            </View>
            <Text className={`Semibold16 ${descColorClass}`}>{descText}</Text>
        </OpacityPressable>
    );
};