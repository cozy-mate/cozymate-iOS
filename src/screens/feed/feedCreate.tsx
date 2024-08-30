import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Animated,
  LogBox,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

import PostImage from '@assets/feedCreate/postImage.svg';
import ImageDeleteIcon from '@assets/feedCreate/imageDeleteIcon.svg';

import { FeedCreateScreenProps } from '@type/param/stack';
import { createPost, getDetailPost, updatePost } from '../../server/api/post';
import { uploadAssetImageToS3 } from '../../server/api/image';
import { useRecoilState } from 'recoil';
import { feedRefreshState, hasRoomState, postDetailRefreshState } from '@recoil/recoil';
import BackCleanHeader from 'src/layout/backCleanHeader';
import ButtonModal from '@components/common/buttonModal';
import { useButtonModal } from '@hooks/useButtonModal';

const IMAGE_UPLOAD_ERROR = '이미지 업로드에 실패했습니다.';
const POST_CREATE_ERROR = '게시글 생성에 실패했습니다.';
const POST_SUCCESS = '게시글이 작성되었습니다.';
const POST_UPDATE_SUCCESS = '게시글이 수정되었습니다.';

const FeedCreateScreen = (props: FeedCreateScreenProps) => {
  // TODO : 복잡하게 섞인 코드 정리하기

  const MAX_IMAGE_COUNT = 10;
  const [postDescription, setPostDescription] = React.useState<string>('');
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Asset[]>([]);

  const { mode, postId } = props.route.params;

  const [roomState, setRoomState] = useRecoilState(hasRoomState);
  const [needRefresh, setNeedRefresh] = useRecoilState(feedRefreshState);
  const [needsPostRefresh, setNeedsPostRefresh] = useRecoilState(postDetailRefreshState);

  const [modalTitle, setModalTitle] = useState<string>('작성 완료');
  const [isGoingBack, setIsGoingBack] = useState<boolean>(false);
  const { navigation } = props;

  useEffect(() => {
    // 외부 라이브러리인 DraggleFlatList에서 나오는 경고로,
    // 위치를 옮길 때 마다 경고가 떠 우선 무시하도록 설정했습니다.
    // Github에서 해결되지 않은 이슈로, 라이브러리 업데이트가 되면 지우겠습니다.
    LogBox.ignoreAllLogs();
    if (mode === 'edit') {
      getMyPost(postId!);
    }
  }, []);

  useEffect(() => {
    setIsComplete(postDescription !== '');
  }, [postDescription]);

  const getMyPost = async (postId: number) => {
    try {
      const response = await getDetailPost(roomState.roomId, postId);
      const imageList = response.result.imageList.map((url: string) => ({ uri: url } as Asset));
      setImages(imageList);
      setPostDescription(response.result.content);
    } catch (e: any) {
      setModalTitle(POST_CREATE_ERROR);
      handleButtonModalOpen();
    }
  };

  const { isButtonModalVisible, handleButtonModalClose, handleButtonModalOpen } = useButtonModal();

  const valueHandleDescriptionChange = (text: string) => {
    setPostDescription(text);
  };

  const pickImages = async () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: MAX_IMAGE_COUNT - images.length },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (images.length + response.assets!.length > MAX_IMAGE_COUNT) {
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImages((prevImages) => [...prevImages, ...response.assets!]);
        }
      },
    );
  };

  const deleteImage = (index: any) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const createMyPost = async () => {
    let imageResponse = { imgUrlList: [] };
    try {
      if (images.length > 0) {
        imageResponse = await uploadAssetImageToS3(images);
      }
    } catch (e) {
      console.log(e);
      setModalTitle(IMAGE_UPLOAD_ERROR);
      setIsGoingBack(false);
      handleButtonModalOpen();
      return;
    }

    try {
      await createPost({
        roomId: roomState.roomId,
        content: postDescription,
        imageList: imageResponse.imgUrlList,
      });

      setNeedRefresh(true);
      setIsGoingBack(true);
      setModalTitle(POST_SUCCESS);
      handleButtonModalOpen();
    } catch (e: any) {
      console.log(e.response.data);
      setIsGoingBack(false);
      setModalTitle(POST_CREATE_ERROR);
      handleButtonModalOpen();
    }
  };

  const updateMyPost = async () => {
    let imageResponse = { imgUrlList: [] };
    try {
      if (images.length > 0) {
        imageResponse = await uploadAssetImageToS3(images);
      }
    } catch (e) {
      console.log(e);
      setModalTitle(IMAGE_UPLOAD_ERROR);
      setIsGoingBack(false);
      handleButtonModalOpen();
    }

    try {
      await updatePost({
        postId: postId!,
        roomId: roomState.roomId,
        content: postDescription,
        imageList: imageResponse.imgUrlList,
      });
      setNeedRefresh(true);
      setNeedsPostRefresh(true);
      setIsGoingBack(true);
      setModalTitle(POST_UPDATE_SUCCESS);
      handleButtonModalOpen();
    } catch (e: any) {
      setModalTitle(IMAGE_UPLOAD_ERROR);
      setIsGoingBack(false);
      handleButtonModalOpen();
    }
  };

  const handleSubmit = () => {
    if (mode === 'create') {
      createMyPost();
    } else {
      updateMyPost();
    }
  };
  const closeModal = () => {
    handleButtonModalClose();
    if (isGoingBack) {
      navigation.goBack();
    }
  };

  const renderItem = useCallback(({ item, getIndex, drag }: RenderItemParams<Asset>) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 1.1,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const handleDelete = () => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0,
          duration: 200,

          useNativeDriver: true,
        }),
        //별도 효과 추가 가능
      ]).start(() => deleteImage(getIndex()));
    };

    return (
      <View className="relative mr-2">
        <TouchableOpacity onLongPress={drag} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.Image
            source={{ uri: item.uri }}
            className="w-20 h-20 rounded-xl"
            style={{ transform: [{ scale }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute right-0 -top-5"
          onPress={() => {
            handleDelete();
          }}
        >
          <ImageDeleteIcon />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-col flex-1 w-full h-full pt-8 pl-8 pr-8 bg-white">
        <BackCleanHeader
          onPressBack={() => {
            navigation.goBack();
          }}
        />
        <View className="flex flex-row items-center justify-center w-full h-24 mb-4">
          <TouchableOpacity
            className="flex items-center justify-center w-20 h-20 mr-2 rounded-xl bg-colorBox"
            onPress={pickImages}
          >
            <PostImage className="mb-2" />
            <View className="flex flex-row items-center justify-center w-full">
              <Text
                className={`text-sm ${images.length > 0 ? 'text-main1' : 'text-disabledFont'}`}
              >{`${images.length}/`}</Text>
              <Text className={`text-sm text-disabledFont`}>{`${MAX_IMAGE_COUNT}`}</Text>
            </View>
          </TouchableOpacity>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <DraggableFlatList
              data={images}
              renderItem={renderItem}
              keyExtractor={(item) => `draggable-${item.uri}`}
              horizontal={true}
              onDragEnd={({ data }) => setImages(data)}
              className="flex h-full"
              contentContainerStyle={{
                alignItems: 'center',
                margin: 8,
              }}
            />
          </ScrollView>
        </View>
        <View className="flex-col items-center justify-start flex-1 mb-4">
          <TextInput
            placeholder="내용를 입력해주세요"
            value={postDescription}
            onChangeText={valueHandleDescriptionChange}
            multiline={true}
            className="w-full p-4 pr-8 h-2/3 bg-colorBox text-basicFont rounded-xl"
            textAlignVertical="top"
            numberOfLines={20}
          />
        </View>
        <View className="flex">
          <Pressable
            onPress={handleSubmit}
            className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'} p-4 rounded-xl`}
          >
            <Text className="text-base font-semibold text-center text-white">작성</Text>
          </Pressable>
        </View>
        <ButtonModal
          isVisible={isButtonModalVisible}
          title={modalTitle}
          buttonCount={1}
          submitText="확인"
          closeModal={() => closeModal()}
          onSubmit={() => closeModal()}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FeedCreateScreen;
