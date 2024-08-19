import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { CommentType } from '@type/feed';
import DotIcon from '@assets/feedView/dotIcon.svg';
import { postTimeUtil } from '@utils/time/timeUtil';

import ControlModal from '@components/feedView/controlModal';
import ButtonModal from '@components/common/buttonModal';

import { useFeedModal } from '@hooks/useFeedModal';
import { usePersonaImage } from '@hooks/usePersonaImage';
import { useButtonModal } from '@hooks/useButtonModal';
import { useRecoilState } from 'recoil';
import { profileState } from '@recoil/recoil';
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

  const { isButtonModalVisible, handleButtonModalClose, handleButtonModalOpen } = useButtonModal();

  const [profile, setProfile] = useRecoilState(profileState);

  return (
    <View className="w-full my-5">
      <View className="flex flex-row items-center justify-between w-full mb-2">
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
          <View className="flex flex-row items-center justify-start">
            <Text className="text-sm font-semibold text-emphasizedFont mr-[2px]">
              {`${comment.writer.nickname}`}
            </Text>
            <Text className="text-sm font-semibold text-disabledFont">
              {comment.writer.nickname === profile.nickname ? '(나)' : ''}
            </Text>
          </View>
        </View>
        {isMyComment && (
          <View ref={dotIconRef} onTouchEnd={onPressModalOpen}>
            <DotIcon />
          </View>
        )}
      </View>
      <View className="flex flex-col justify-start">
        <Text className="mb-1 text-sm font-medium text-basicFont">{comment.content}</Text>
        <Text className="text-sm font-medium text-disabledFont">
          {postTimeUtil(comment.createdAt)}
        </Text>
      </View>
      <ControlModal
        isModalVisible={isModalVisible}
        modalPosition={modalPosition}
        onPressModalClose={onPressModalClose}
        onSubmit={handleButtonModalOpen}
        onEdit={() => {}}
      />
      <ButtonModal
        title="게시물 삭제하시나요?"
        message="삭제하면 우리들의 추억을 복구할 수 없어요!"
        cancelText="취소"
        submitText="삭제"
        isVisible={isButtonModalVisible}
        closeModal={handleButtonModalClose}
        onSubmit={() => {}}
        buttonCount={2}
      />
    </View>
  );
};

export default CommentCard;
