import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import {
  View,
  Text,
  LogBox,
  Animated,
  Keyboard,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import BackCleanHeader from 'src/layout/backCleanHeader';

import { uploadAssetImageToS3 } from '../../server/api/image';
import { createPost, updatePost, getDetailPost } from '../../server/api/post';

import ButtonModal from '@components/common/buttonModal';

import { hasRoomState, feedRefreshState, postDetailRefreshState } from '@recoil/recoil';

import { useButtonModal } from '@hooks/useButtonModal';

import { FeedCreateScreenProps } from '@type/param/stack';

import PostImage from '@assets/feedCreate/postImage.svg';
import ImageDeleteIcon from '@assets/feedCreate/imageDeleteIcon.svg';

const IMAGE_UPLOAD_ERROR = '이미지 업로드에 실패했습니다.';
const POST_CREATE_ERROR = '게시글 생성에 실패했습니다.';
const POST_SUCCESS = '게시글이 작성되었습니다.';
const POST_UPDATE_SUCCESS = '게시글이 수정되었습니다.';

const FeedCreateScreen = (props: FeedCreateScreenProps) => {
  const MAX_IMAGE_COUNT = 10;
  const [postDescription, setPostDescription] = React.useState<string>('');
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Asset[]>([]);

  const { mode, postId } = props.route.params;

  const [roomState, setRoomState] = useRecoilState(hasRoomState);
  const [needRefresh, setNeedRefresh] = useRecoilState(feedRefreshState);
  const [needsPostRefresh, setNeedsPostRefresh] = useRecoilState(postDetailRefreshState);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [modalTitle, setModalTitle] = useState<string>('작성 완료');
  const [isGoingBack, setIsGoingBack] = useState<boolean>(false);
  const { navigation } = props;

  useEffect(() => {
    LogBox.ignoreAllLogs();
    if (mode === 'edit') {
      getMyPost(postId!);
    }
  }, []);

  useEffect(() => {
    setIsComplete(postDescription !== '');
  }, [postDescription]);

  const getMyPost = async (postId: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getDetailPost(roomState.roomId, postId);
      const imageList = response.result.imageList.map((url: string) => ({ uri: url } as Asset));
      setImages(imageList);
      setPostDescription(response.result.content);
    } catch (e: any) {
      setModalTitle(POST_CREATE_ERROR);
      handleButtonModalOpen();
    } finally {
      setIsLoading(false);
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

  const createMyPost = useCallback(async () => {
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
  }, [images, postDescription]);

  const updateMyPost = useCallback(async () => {
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
  }, [images, postDescription]);

  useEffect(() => {
    if (isSubmitting) {
      try {
        if (mode === 'create') {
          createMyPost();
        } else {
          updateMyPost();
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [isSubmitting]);

  const handleSubmit = () => {
    setIsSubmitting(true);
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
      <SafeAreaView className="flex-col flex-1 w-full h-full px-8 pt-8 bg-white">
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
            className="w-full p-4 pr-8 h-2/3 rounded-xl bg-colorBox text-basicFont"
            textAlignVertical="top"
            numberOfLines={20}
          />
        </View>
        <View className="flex">
          <Pressable
            onPress={handleSubmit}
            className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}
          >
            <Text className="text-base font-semibold text-center text-white">
              {isSubmitting ? '게시글 작성 중...' : '게시글 작성하기'}
            </Text>
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
