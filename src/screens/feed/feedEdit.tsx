import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Keyboard, TextInput, Pressable, TouchableWithoutFeedback } from 'react-native';

import BackCleanHeader from 'src/layout/backCleanHeader';

import ButtonModal from '@components/common/buttonModal';

import { hasRoomState, roomInfoState, feedRefreshState } from '@recoil/recoil';

import { createFeed, updateFeed, getFeedData } from '@server/api/feed';

import { useButtonModal } from '@hooks/useButtonModal';

import { FeedEditScreenProps } from '@type/param/stack';

const FEED_CREATE_SUCCESS = '피드가 생성되었습니다.';
const FEED_UPDATE_SUCCESS = '피드가 수정되었습니다.';
const FEED_LOAD_ERROR = '피드 불러오기에 실패했습니다.';
const FEED_CREATE_ERROR = '피드 생성에 실패했습니다.';
const FEED_UPDATE_ERROR = '피드 수정에 실패했습니다.';

const FeedEditScreen = (props: FeedEditScreenProps) => {
  const { navigation } = props;
  const { mode } = props.route.params;

  const [feedName, setFeedName] = useState<string>('');
  const [feedDescription, setFeedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const [roomInfo, setRoomInfo] = useRecoilState(hasRoomState);
  // 메인 화면으로 돌아갈 때 refresh를 여부 결정 state
  const [needsRefresh, setNeedsRefresh] = useRecoilState(feedRefreshState);

  const [modalTitle, setModalTitle] = useState<string>(FEED_CREATE_SUCCESS);

  // FeedInfo 불러오기
  const getFeedInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getFeedData(roomInfo.roomId);
      setFeedDescription(response.result.description);
      setFeedName(response.result.name);
      setIsComplete(response.result.name !== '' && response.result.description !== '');
    } catch (e: any) {
      setModalTitle(FEED_LOAD_ERROR);
      handleButtonModalOpen();
    } finally {
      setIsLoading(false);
    }
  };

  const postFeedInfo = async () => {
    try {
      await updateFeed({
        roomId: roomInfo.roomId,
        name: feedName,
        description: feedDescription,
      });
      setNeedsRefresh(true);
      setModalTitle(FEED_UPDATE_SUCCESS);
      handleButtonModalOpen();
    } catch (e: any) {
      setModalTitle(FEED_UPDATE_ERROR);
      handleButtonModalOpen();
    }
  };

  const handleModalOK = () => {
    handleButtonModalClose();
    navigation.goBack();
  };

  useEffect(() => {
    if (mode === 'edit') {
      getFeedInfo();
    }
  }, []);

  const valueHandleNameChange = (text: string) => {
    setFeedName(text);
  };
  const valueHandleDescriptionChange = (text: string) => {
    setFeedDescription(text);
  };

  const { isButtonModalVisible, handleButtonModalClose, handleButtonModalOpen } = useButtonModal();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="h-full w-full flex-1 flex-col bg-white px-8 pt-1">
        <BackCleanHeader onPressBack={() => navigation.goBack()} />
        <View className="flex-1 flex-col">
          <Text className="text-md mb-2 ml-1 font-semibold text-emphasizedFont">
            피드 이름을 입력해주세요.
          </Text>
          <TextInput
            placeholder="내용를 입력해주세요"
            value={feedName}
            onChangeText={valueHandleNameChange}
            aria-disabled={isLoading}
            className="mb-12 w-full rounded-xl bg-colorBox p-4 pr-8 text-basicFont"
          />
          <Text className="text-md mb-2 ml-1 font-semibold text-emphasizedFont">
            피드 설명을 입력해주세요.
          </Text>
          <TextInput
            placeholder="내용를 입력해주세요"
            value={feedDescription}
            aria-disabled={isLoading}
            onChangeText={valueHandleDescriptionChange}
            className="w-full rounded-xl bg-colorBox p-4 pr-8 text-basicFont"
          />
        </View>
        <View className="flex">
          <Pressable
            onPress={postFeedInfo}
            className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}  rounded-xl p-4`}
          >
            <Text className="text-center text-base font-semibold text-white">확인</Text>
          </Pressable>
        </View>
        <ButtonModal
          isVisible={isButtonModalVisible}
          closeModal={() => {
            handleModalOK();
          }}
          title={modalTitle}
          submitText="확인"
          buttonCount={1}
          onSubmit={() => {
            handleModalOK();
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FeedEditScreen;
