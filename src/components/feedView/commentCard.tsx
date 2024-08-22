import React, { useEffect, useState } from 'react';
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
import { deleteComment, updateComment } from '../../server/api/comment';
import { roomInfoState } from '../../recoil/recoil';
type CommentCardProps = {
  comment: CommentType;
  postId:number;
  updateComment : () => void;
};

const COMMENT_DELETE_SUCCESS = '댓글이 삭제되었습니다.';
const COMMENT_DELETE_ERROR = '댓글 삭제에 실패했습니다.';

const CommentCard = (props: CommentCardProps) => {
  const { comment,postId,updateComment } = props;

  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);
  const [oneButtonModalTitle, setOneButtonModalMessage] = useState('');

  const {
    PERSONA_IMAGE_URL,
  } = usePersonaImage(comment.writer.persona);
  const { isModalVisible, modalPosition, dotIconRef, onPressModalOpen, onPressModalClose } =
    useFeedModal();
  const {
    isButtonModalVisible: isTwoButtonModalVisible,
    handleButtonModalClose: handleTwoButtonModalClose,
    handleButtonModalOpen: handleTwoButtonModalOpen,
  } = useButtonModal();
  
  const {
    isButtonModalVisible: isOneButtonModalVisible,
    handleButtonModalClose: handleOneButtonModalClose,
    handleButtonModalOpen: handleOneButtonModalOpen,
  } = useButtonModal();

  const deleteCommentHandler = async () => {
    try {
      const response = await deleteComment(roomInfo.roomId, postId, comment.id);
      if(response){
        handleTwoButtonModalClose();
        setOneButtonModalMessage(COMMENT_DELETE_SUCCESS);
        
        handleOneButtonModalOpen();
        
      }
     
      
    } catch (e) {
      setOneButtonModalMessage(COMMENT_DELETE_ERROR);
      handleOneButtonModalOpen();
    }
  }

  const [profile, setProfile] = useRecoilState(profileState);


  return (
    <View className="w-full my-5">
      <View className="flex flex-row items-center justify-between w-full mb-2">
        <View className="flex flex-row items-center justify-start space-x-2">
          <Image
            className="w-8 h-8 rounded-full"
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
        {comment.writer.nickname === profile.nickname && (
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
        onSubmit={handleTwoButtonModalOpen}
        onEdit={() => {}}
      />
      <ButtonModal
        title="댓글을 삭제하시나요?"
        message="삭제하면 우리들의 추억을 복구할 수 없어요!"
        cancelText="취소"
        submitText="삭제"
        isVisible={isTwoButtonModalVisible}
        closeModal={handleTwoButtonModalClose}
        onSubmit={()=>deleteCommentHandler()}
        buttonCount={2}
      />
      <ButtonModal
        title={oneButtonModalTitle}
        submitText="확인"
        isVisible={isOneButtonModalVisible}
        closeModal={handleOneButtonModalClose}
        onSubmit={()=>{
          updateComment();
          handleOneButtonModalClose();
        }}
        buttonCount={1}
      />
    </View>
  );
};

export default CommentCard;
