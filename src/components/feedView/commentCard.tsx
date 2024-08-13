import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { CommentType } from '@type/feed';
import DotIcon from '@assets/feedView/dotIcon.svg';
import { postTimeUtil } from '@utils/time/timeUtil';

import ControlModal from '@components/feedView/controlModal';
import TwoButtonModal from '@components/common/twoButtonModal';

import { useFeedModal } from '@hooks/useFeedModal';
import { usePersonaImage } from '@hooks/usePersonaImage';
import { useTwoButtonModal } from '@hooks/useTwoButtonModal';
type CommentCardProps = {
  comment: CommentType;
};

const CommentCard = (props: CommentCardProps) => {
  const { comment } = props;

  const [isMyComment, setIsMyComment] = useState<boolean>(true);

  const {
    PERSONA_IMAGE_URL,
    loadingProfile,
    handleProfileImageLoadStart,
    handleProfileImageLoadEnd,
  } = usePersonaImage(comment.writer.persona);

  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();

  const { isTwoButtonModalVisible, handleTwoButtonModalClose, handleTwoButtonModalOpen } =
    useTwoButtonModal();

  return (
    <View className="w-full my-5">
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
          <Text className="text-emphasizedFont font-semibold text-sm">
            {comment.writer.nickname}
          </Text>
        </View>
        {isMyComment && (
          <View ref={dotIconRef} onTouchEnd={onPressModalOpen}>
            <DotIcon />
          </View>
        )}
      </View>
      <View className="flex flex-col justify-start">
        <Text className="text-basicFont font-medium text-sm mb-1">{comment.content}</Text>
        <Text className="text-disabledFont font-medium text-sm">
          {postTimeUtil(comment.createdAt)}
        </Text>
      </View>
      <ControlModal
        isModalVisible={isModalVisible}
        modalPosition={modalPosition}
        onPressModalClose={onPressModalClose}
        onSubmit={handleTwoButtonModalOpen}
      />
      <TwoButtonModal
        title="게시물 삭제하시나요?"
        message="삭제하면 우리들의 추억을 복구할 수 없어요!"
        cancelText="취소"
        submitText="삭제"
        isVisible={isTwoButtonModalVisible}
        closeModal={handleTwoButtonModalClose}
        onSubmit={() => {}}
      />
    </View>
  );
};

export default CommentCard;
