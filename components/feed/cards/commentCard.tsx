import React from 'react';
import { Text, View } from 'react-native';

import MoreDotIcon from '@/assets/icons/feed/more-dot.svg';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { Comment } from '@/server/comment/comment';
import { formatDate } from '@/utils/translateDate';


const CommentHeader = ({ persona, nickname }: { persona: number, nickname: string }) => {
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

export const CommentCard = ({ comment }: { comment: Comment }) => {
    const { persona, nickname, content, createdAt } = comment;
    return (
        <View className="flex flex-col px-5 rounded-2xl bg-[#FFFFFF] gap-y-2">
            <CommentHeader persona={persona} nickname={nickname} />
            <CommentContent content={content} />
            <CommentFooter createdAt={createdAt} />
        </View>
    )
}