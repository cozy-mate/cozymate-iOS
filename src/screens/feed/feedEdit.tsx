import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { FeedEditScreenProps } from '@type/param/roomStack';
import { createFeed, getFeedData, updateFeed } from '@server/api/feed';
import { useRecoilState } from 'recoil';
import { feedRefreshState, hasRoomState, roomInfoState } from '@recoil/recoil';
import BackCleanHeader from 'src/layout/backCleanHeader';

const FeedEditScreen = (props: FeedEditScreenProps) => {
  // TODO : RecoilState RoomId 업데이트 되면 적용하기
  const { navigation } = props;
  const { mode } = props.route.params;
  const [feedName, setFeedName] = useState<string>('');
  const [feedDescription, setFeedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isComplete, setIsComplete] = useState<boolean>(false);

  const [roomInfo, setRoomInfo] = useRecoilState(hasRoomState);

  // 메인 화면으로 돌아갈 때 refresh를 여부 결정 state
  const [needsRefresh, setNeedsRefresh] = useRecoilState(feedRefreshState);

  // FeedInfo 불러오기
  const getFeedInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getFeedData(roomInfo.roomId);
      setFeedDescription(response.result.description);
      setFeedName(response.result.name);
      setIsComplete(response.result.name !== '' && response.result.description !== '');
    } catch (e: any) {
      console.log(e.response.data);
      Alert.alert('피드 정보를 불러오는데 실패했습니다.');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const postFeedInfo = async () => {
    if (mode === 'create') {
      try {
        await createFeed({
          roomId: roomInfo.roomId,
          name: feedName,
          description: feedDescription,
        });
        Alert.alert('피드가 등록되었습니다.');
        setNeedsRefresh(true);
        navigation.goBack();
      } catch (e: any) {
        console.log(e.response.data);
        Alert.alert('피드 등록에 실패했습니다.');
        navigation.goBack();
      }
    } else {
      try {
        await updateFeed({
          roomId: roomInfo.roomId,
          name: feedName,
          description: feedDescription,
        });
        setNeedsRefresh(true);
        Alert.alert('피드가 수정되었습니다.');
        navigation.goBack();
      } catch (e: any) {
        Alert.alert('피드 등록에 실패했습니다.');
        navigation.goBack();
      }
    }
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-col flex-1 w-full h-full pt-1 pl-8 pr-8 bg-white">
        <BackCleanHeader onPressBack={() => navigation.goBack()} />
        <View className="flex-col flex-1">
          <Text className="mb-2 font-semibold text-md text-emphasizedFont">
            피드 이름을 입력해주세요.
          </Text>
          <TextInput
            placeholder="내용를 입력해주세요"
            value={feedName}
            onChangeText={valueHandleNameChange}
            aria-disabled={isLoading}
            className="w-full p-4 pr-8 mb-12 bg-colorBox text-basicFont rounded-xl"
          />
          <Text className="mb-2 font-semibold text-md text-emphasizedFont">
            피드 설명을 입력해주세요.
          </Text>
          <TextInput
            placeholder="내용를 입력해주세요"
            value={feedDescription}
            aria-disabled={isLoading}
            onChangeText={valueHandleDescriptionChange}
            className="w-full p-4 pr-8 bg-colorBox text-basicFont rounded-xl"
          />
        </View>
        <View className="flex">
          <Pressable
            onPress={postFeedInfo}
            className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'}  p-4 rounded-xl`}
          >
            <Text className="text-base font-semibold text-center text-white">확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FeedEditScreen;
