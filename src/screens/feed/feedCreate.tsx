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

import { useHasRoomStore } from '@zustand/room/room';

import { feedRefreshState, postDetailRefreshState } from '@recoil/recoil';

import { useButtonModal } from '@hooks/useButtonModal';

import { FeedCreateScreenProps } from '@type/param/stack';

import PostImage from '@assets/feedCreate/postImage.svg';
import ImageDeleteIcon from '@assets/feedCreate/imageDeleteIcon.svg';

const IMAGE_UPLOAD_ERROR = '이미지 업로드에 실패했습니다.';
const POST_CREATE_ERROR = '게시글 생성에 실패했습니다.';
const POST_SUCCESS = '게시글이 작성되었습니다.';
const POST_UPDATE_SUCCESS = '게시글이 수정되었습니다.';

const FeedCreateScreen = (props: FeedCreateScreenProps) => {
  const { myRoom } = useHasRoomStore();

  const MAX_IMAGE_COUNT = 10;
  const [postDescription, setPostDescription] = React.useState<string>('');
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Asset[]>([]);

  const { mode, postId } = props.route.params;

  const [, setNeedRefresh] = useRecoilState(feedRefreshState);
  const [, setNeedsPostRefresh] = useRecoilState(postDetailRefreshState);

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
      const response = await getDetailPost(myRoom.roomId, postId);
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
        roomId: myRoom.roomId,
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
        roomId: myRoom.roomId,
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
            className="h-20 w-20 rounded-xl"
            style={{ transform: [{ scale }] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute -top-5 right-0"
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
      <SafeAreaView className="mt-2 h-full w-full flex-1 flex-col bg-white">
        <View className="pl-2">
          <BackCleanHeader
            onPressBack={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View className="mb-4 flex h-24 w-full flex-row items-center justify-center px-5">
          <TouchableOpacity
            className="mr-2 flex h-20 w-20 items-center justify-center rounded-xl bg-colorBox"
            onPress={pickImages}
          >
            <PostImage className="mb-2" />
            <View className="flex w-full flex-row items-center justify-center">
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
        <View className="mb-4 flex-1 flex-col items-center justify-start px-5">
          <TextInput
            placeholder="내용를 입력해주세요"
            value={postDescription}
            onChangeText={valueHandleDescriptionChange}
            multiline={true}
            className="h-2/3 w-full rounded-xl bg-colorBox p-4 pr-8 text-basicFont"
            textAlignVertical="top"
            numberOfLines={20}
          />
        </View>
        <View className="flex px-5">
          <Pressable
            onPress={handleSubmit}
            className={`${isComplete ? 'bg-main1' : 'bg-[#C4C4C4]'} rounded-xl p-4`}
          >
            <Text className="text-center text-base font-semibold text-white">
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
