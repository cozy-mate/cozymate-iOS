import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';

import MoreDotIcon from '@/assets/icons/feed/more-dot.svg';
import { BottomSheetItem, BottomSheetTitle, useBottomSheet } from '@/components/common/bottomSheet';
import ReportModalComponent from '@/components/modal/reportModal';
import TwoButtonModal from '@/components/modal/twoButtonModal';
import OpacityPressable from '@/components/opacityPressable';
import { getPersona } from '@/constants/items/characterItem';
import { useDeleteComment } from '@/hooks/comment/comment';
import { useToggle } from '@/hooks/useToggle';
import { Comment } from '@/server/comment/comment';
import { formatDate } from '@/utils/translateDate';
import { useMemberStore } from '@/zustand/store';

const CommentHeader = ({
  comment,
  openResultModal,
}: {
  comment: Comment & { postId: number };
  openResultModal: () => void;
}) => {
  const { persona, nickname, postId, id: commentId } = comment;
  const { roomInfo, memberInfo } = useMemberStore();

  const { bottomSheetRef, BottomSheetComponent, open } = useBottomSheet({ snapPoints: [120] });

  const {
    open: openDeleteModal,
    close: closeDeleteModal,
    isOpen: isDeleteModalVisible,
  } = useToggle();

  const {
    open: openReportModal,
    close: closeReportModal,
    isOpen: isReportModalVisible,
  } = useToggle();

  const { mutate: deleteComment } = useDeleteComment({
    roomId: roomInfo.roomId,
    postId,
    commentId,
    onSuccess: () => {
      openResultModal();
      closeDeleteModal();
    },
  });

  const isWriter = nickname === memberInfo?.nickname;

  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-x-[6px] items-center">
          {getPersona(persona, 24, 24)}
          <Text className="Semibold14 text-emphasizedFont">{nickname}</Text>
        </View>
        <OpacityPressable onPress={() => open()}>
          <MoreDotIcon />
        </OpacityPressable>
      </View>
      <TwoButtonModal
        isVisible={isDeleteModalVisible}
        title="댓글을 삭제하시나요?"
        subtitle="삭제하면 우리의 추억을 복구할 수 없어요!"
        closeFunc={closeDeleteModal}
        leftButtonText="취소"
        leftButtonFunc={closeDeleteModal}
        rightButtonText="삭제"
        rightButtonFunc={deleteComment}
      />
      <ReportModalComponent
        isVisible={isReportModalVisible}
        memberId={memberInfo?.memberId ?? 0}
        source="COMMENT"
        isFake={true}
        closeModal={() => closeReportModal()}
      />
      <BottomSheetComponent>
        <BottomSheetView className="flex-1 pt-[12px] pb-[16px] px-[20px]">
          <BottomSheetTitle title="댓글" />
          {isWriter && (
            <>
              <BottomSheetItem
                text="삭제하기"
                onPress={() => {
                  bottomSheetRef.current?.close();
                  openDeleteModal();
                }}
              />
              <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />
            </>
          )}
          <BottomSheetItem
            text="신고하기"
            onPress={() => {
              bottomSheetRef.current?.close();
              openReportModal();
            }}
          />
        </BottomSheetView>
      </BottomSheetComponent>
    </>
  );
};

const CommentContent = ({ content }: { content: string }) => {
  return <Text className="Medium14 text-basicFont">{content}</Text>;
};

const CommentFooter = ({ createdAt }: { createdAt: string }) => {
  return <Text className="Regular12 text-disabledFont">{formatDate(createdAt)}</Text>;
};

export const CommentCard = ({
  comment,
  openResultModal,
}: {
  comment: Comment & { postId: number };
  openResultModal: () => void;
}) => {
  const { content, createdAt } = comment;
  return (
    <View className="flex flex-col px-5 rounded-2xl bg-[#FFFFFF] gap-y-2">
      <CommentHeader comment={comment} openResultModal={openResultModal} />
      <CommentContent content={content} />
      <CommentFooter createdAt={createdAt} />
    </View>
  );
};
