

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, ScrollView, Text, TextInput, View, Image, Pressable } from "react-native";
import { z } from "zod";

import GalleryIcon from "@/assets/icons/feed/gallery.svg";
import DeleteImageIcon from "@/assets/images/feed/deleteImage.svg";
import BottomButtonComponent from "@/components/common/bottomButton";
import { EditLayout } from "@/components/common/layout";
import OpacityPressable from "@/components/opacityPressable";
import { useCreatePost } from "@/hooks/post/post";
import { useUploadImagesAndGetKeys } from '@/hooks/s3/s3';
import { showRejectToast } from '@/utils/toast';
import { useMemberStore } from "@/zustand/store";


export default function CreateFeed() {
    const { roomInfo } = useMemberStore();

    type PostForm = {
        content: string;
        images: ImagePicker.ImagePickerAsset[];
    };

    const { control, handleSubmit, getValues, setValue, watch, formState: { isValid } } = useForm<PostForm>({
        mode: 'onChange',
        defaultValues: { content: '', images: [] },
        resolver: zodResolver(z.object({
            content: z.string().min(1),
            images: z.array(z.any()),
        })),
    });

    const images = watch('images');

    const { mutate: createPost, isPending } = useCreatePost({ roomId: roomInfo?.roomId ?? 0 });

    const { mutate: uploadImagesAndGetKeys, isPending: isUploadingImages } = useUploadImagesAndGetKeys({
        onSuccess: (s3Keys) => {
            createPost({
                roomId: roomInfo?.roomId ?? 0,
                content: getValues('content') ?? '',
                imageList: s3Keys,
            });
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
        <EditLayout>
            <View className="flex-1">
                <View className="px-5 pt-5 gap-y-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ width: '100%', height: 80 }} contentContainerStyle={{ alignItems: 'center' }}>
                        <OpacityPressable onPress={pickImages} className="h-[80px] w-[80px] mr-2 bg-colorBox rounded-2xl flex items-center justify-center gap-y-2">
                            <GalleryIcon />
                            <Text className={`Medium12 text-disabledFont`}>{(<Text className={`${images?.length === 0 ? 'text-disabledFont' : 'text-mainColor'}`}>{images?.length ?? 0}</Text>)}/10</Text>
                        </OpacityPressable>
                        {(images ?? []).map((img, idx) => (
                            <View key={img.assetId ?? img.uri} className="relative h-[80px] w-[80px] mr-2 rounded-2xl">
                                <OpacityPressable onPress={() => setPreviewUri(img.uri)}>
                                    <Image source={{ uri: img.uri }} style={{ width: 80, height: 80, borderRadius: 16 }} />
                                </OpacityPressable>
                                <OpacityPressable onPress={() => removeImage(idx)} className="absolute right-[4px] top-[-10px] h-10 w-10 items-center justify-center rounded-full z-10">
                                    <DeleteImageIcon />
                                </OpacityPressable>
                            </View>
                        ))}
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
                    if (isPending) {
                        return '작성중입니다...';
                    }
                    return '작성';
                })()}
                onPress={handleSubmit((data) => uploadImagesAndGetKeys(data.images))}
                disabled={!isValid || isPending || isUploadingImages}
                color={!isValid || isPending || isUploadingImages ? 'GRAY' : 'BLUE'}
            />
            <Modal visible={previewUri !== null} transparent animationType="fade" onRequestClose={() => setPreviewUri(null)}>
                <Pressable className="flex-1 bg-[rgba(0,0,0,0.6)] items-center justify-center" onPress={() => setPreviewUri(null)}>
                    {previewUri && (
                        <Image source={{ uri: previewUri }} style={{ width: 320, height: 320, borderRadius: 16 }} resizeMode="contain" />
                    )}
                </Pressable>
            </Modal>
        </EditLayout >
    )
}