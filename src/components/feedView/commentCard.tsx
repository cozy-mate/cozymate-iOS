import React, { Fragment } from 'react'
import { View , Image, Text,Pressable} from 'react-native';
import { CommentType } from '@type/feed';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { usePersonaImage } from '@hooks/usePersonaImage';
import DotIcon from '@assets/feedView/dotIcon.svg';
import { postTimeUtil } from '@utils/time/timeUtil';
type CommentCardProps = {
    comment: CommentType;
}

const CommentCard = (props: CommentCardProps) => {

    const {comment} = props;

    const {
        PERSONA_IMAGE_URL,
        loadingProfile,
        handleProfileImageLoadStart,
        handleProfileImageLoadEnd,
      } = usePersonaImage(comment.writer.persona);

    return (
      <View className='w-full my-5'>
        <View className="flex flex-row w-full items-center justify-between mb-2">
            <View className="flex flex-row items-center justify-start space-x-2">
              {loadingProfile && (
                <SkeletonPlaceholder>
                  <View style={{ width: 32, height: 32, borderRadius: 16 }} />
                </SkeletonPlaceholder>
              )}
              <Image
                className="w-8 h-8 rounded-full"
                onLoadStart={handleProfileImageLoadStart}
                onLoadEnd={handleProfileImageLoadEnd}
                source={{ uri: PERSONA_IMAGE_URL }}
              />
              <Text className="text-emphasizedFont font-semibold text-sm">{comment.writer.nickname}</Text>
            </View>
            <View>
                <Pressable>
                    <DotIcon/>
                </Pressable>
            </View>
        </View>
        <View className='flex flex-col justify-start'>
            <Text className="text-basicFont font-medium text-sm mb-1">{comment.content}</Text>
            <Text className="text-disabledFont font-medium text-sm">{postTimeUtil(comment.createdAt)}</Text>
        </View>
      </View>
    )
}

export default CommentCard