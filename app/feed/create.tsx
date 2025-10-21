import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';

import GalleryIcon from '@/assets/icons/feed/gallery.svg';
import DeleteImageIcon from '@/assets/images/feed/deleteImage.svg';
import BottomButtonComponent from '@/components/common/bottomButton';
import { DetailLayout } from '@/components/common/layout';
import OpacityPressable from '@/components/opacityPressable';
import { useCreatePost, useGetPostDetail, useUpdatePost } from '@/hooks/post/post';
import { useBuildPostImageKeys } from '@/hooks/s3/s3';
import { showRejectToast } from '@/utils/toast';
import { useMemberStore } from '@/zustand/store';

export default function CreateFeed() {
  const { roomInfo } = useMemberStore();

  const { id } = useLocalSearchParams<{ id: string }>();

  const postId = id ? Number(id) : 0;
  const isEditMode = postId > 0;

  type PostForm = {
    content: string;
    images: (ImagePicker.ImagePickerAsset | string)[];
  };

  const { data } = useGetPostDetail({
    roomId: roomInfo.roomId,
    postId: isEditMode ? postId : 0,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
    getValues,
    reset,
  } = useForm<PostForm>({
    mode: 'onChange',
    defaultValues: { content: data?.result.content ?? '', images: data?.result.imageList ?? [] },
    resolver: zodResolver(
      z.object({
        content: z.string(),
        images: z.array(z.any()),
      }),
    ),
  });

  useEffect(() => {
    if (isEditMode && data?.result) {
      reset({
        content: data.result.content ?? '',
        images: data.result.imageList ?? [],
      });
    }
  }, [isEditMode, data, reset]);

  const images = watch('images');

  const { mutate: createPost, isPending } = useCreatePost({ roomId: roomInfo.roomId });
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost({
    roomId: roomInfo.roomId,
    postId,
  });
  const { mutate: buildPostImageKeys, isPending: isUploadingImages } = useBuildPostImageKeys({
    onSuccess: (response) => {
      const finalImageList = response;

      if (isEditMode) {
        updatePost({
          roomId: roomInfo.roomId,
          postId,
          content: getValues('content') ?? '',
          imageList: finalImageList,
        });
      } else {
        createPost({
          roomId: roomInfo.roomId,
          content: getValues('content') ?? '',
          imageList: finalImageList,
        });
      }
    },
    onError: () => {
      showRejectToast('이미지 업로드에 실패했어요');
    },
  });

  const [previewUri, setPreviewUri] = React.useState<string | null>(null);

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') return;

    const selectionLimit = Math.max(0, 10 - (images?.length ?? 0));
    if (selectionLimit === 0) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit,
      quality: 0.9,
    });
    if (!result.canceled) {
      const next = [...(images ?? []), ...result.assets];
      setValue('images', next, { shouldValidate: true, shouldDirty: true });
    }
  };

  const removeImage = (index: number) => {
    const next = (images ?? []).filter((_, i) => i !== index);
    setValue('images', next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <DetailLayout className="bg-white">
      <View className="flex-1">
        <View className="px-5 pt-5 gap-y-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%', height: 80 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            <OpacityPressable
              onPress={pickImages}
              className="h-[80px] w-[80px] mr-2 bg-colorBox rounded-2xl flex items-center justify-center gap-y-2"
            >
              <GalleryIcon />
              <Text className={`Medium12 text-disabledFont`}>
                {
                  <Text
                    className={`${images?.length === 0 ? 'text-disabledFont' : 'text-mainColor'}`}
                  >
                    {images?.length ?? 0}
                  </Text>
                }
                /10
              </Text>
            </OpacityPressable>
            {(images ?? []).map((img, idx) => {
              const uri = typeof img === 'string' ? img : img.uri;
              const key = typeof img === 'string' ? img : (img.assetId ?? img.uri);
              const cacheKey = uri.split('/').pop()?.split('.')[0];
              return (
                <View key={key} className="relative h-[80px] w-[80px] mr-2 rounded-2xl">
                  <OpacityPressable onPress={() => setPreviewUri(uri)}>
                    <Image
                      source={{ uri, cacheKey }}
                      cachePolicy="memory-disk"
                      recyclingKey={key}
                      style={{ width: 80, height: 80, borderRadius: 16 }}
                    />
                  </OpacityPressable>
                  <OpacityPressable
                    onPress={() => removeImage(idx)}
                    className="absolute right-[4px] top-[-10px] h-10 w-10 items-center justify-center rounded-full z-10"
                  >
                    <DeleteImageIcon />
                  </OpacityPressable>
                </View>
              );
            })}
          </ScrollView>
          <View className="">
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{ flex: 1, minHeight: 200 }}
                  placeholder="내용을 입력해주세요"
                  placeholderTextColor={'#ACADB4'}
                  className={`px-[16px] py-[15px] bg-[#F3F6FA] rounded-xl InputMedium14 text-basicFont`}
                />
              )}
            />
          </View>
        </View>
      </View>
      <BottomButtonComponent
        buttonText={(() => {
          if (isUploadingImages) {
            return '이미지 업로드중입니다...';
          }
          if (isEditMode ? isUpdating : isPending) {
            return isEditMode ? '수정중입니다...' : '작성중입니다...';
          }
          return isEditMode ? '수정' : '작성';
        })()}
        onPress={handleSubmit((data) => buildPostImageKeys(data.images))}
        disabled={!isValid || isUploadingImages || (isEditMode ? isUpdating : isPending)}
        color={
          !isValid || isUploadingImages || (isEditMode ? isUpdating : isPending) ? 'GRAY' : 'BLUE'
        }
      />
      <Modal
        visible={previewUri !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewUri(null)}
      >
        <Pressable
          className="flex-1 bg-[rgba(0,0,0,0.6)] items-center justify-center"
          onPress={() => setPreviewUri(null)}
        >
          {previewUri && (
            <Image
              source={{ uri: previewUri }}
              style={{ width: 320, height: 320, borderRadius: 16 }}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </DetailLayout>
  );
}
