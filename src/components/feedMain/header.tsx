import React from 'react'
import { View, Text, Pressable } from 'react-native';
import FeedLampDisabled from '@assets/feedMain/feedLampDisabled.svg';
import FeedLampEnabled from '@assets/feedMain/feedLampEnabled.svg';
import FeedEdit from '@assets/feedMain/feedEdit.svg';

type Props = {
    feedInfo: any
    navigation: any
}

const Header = (props: Props) => {
    const {feedInfo, navigation } = props;
    const toFeedEdit = () => {
        navigation.navigate('FeedEditScreen', { mode: feedInfo?.isEnabled ? 'edit' : 'create' });
    };
    return (
        <View className="flex-col justify-start w-screen px-5 mb-5">
        {feedInfo?.isEnabled ? (
            <FeedLampEnabled className="mb-2" />
        ) : (
            <FeedLampDisabled className="mb-2" />
        )}
        <View className="flex-row items-center">
            {feedInfo?.isEnabled ? (
            <Text className="text-lg font-semibold text-basicFont">{feedInfo.name}</Text>
            ) : (
            <Text className="text-lg font-semibold text-disabledFont">
                피드의 이름을 설정해주세요
            </Text>
            )}
            <Pressable onPress={toFeedEdit}>
            <FeedEdit />
            </Pressable>
        </View>
        {feedInfo?.isEnabled ? (
            <Text className="text-xs font-normal text-basicFont">{feedInfo.description}</Text>
        ) : (
            <Text className="text-xs font-normal text-disabledFont">피드 설명을 입력해주세요</Text>
        )}
        </View>
    )
}

export default Header