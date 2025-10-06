

import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, ScrollView, Text, TextInput, View, Image, Pressable } from "react-native";

import GalleryIcon from "@/assets/icons/feed/gallery.svg";
import DeleteImageIcon from "@/assets/images/feed/deleteImage.svg";
import { EditLayout } from "@/components/common/layout";
import OpacityPressable from "@/components/opacityPressable";
import { useCreatePost } from "@/hooks/post/post";
import { CreatePostRequest } from "@/server/post/request";
import { generatePresignedUrl } from "@/server/s3/s3";
import { showRejectToast } from '@/utils/toast';
import { useMemberStore } from "@/zustand/store";


export default function CreateFeed() {
    const { roomInfo } = useMemberStore();

    type PostForm = {
        content: string;
        images: ImagePicker.ImagePickerAsset[];
    };

    const { control, handleSubmit, setValue, watch, formState: { isValid } } = useForm<PostForm>({
        mode: 'onChange',
        defaultValues: { content: '', images: [] },
    });

    const images = watch('images');

    const { mutate: createPost, isPending } = useCreatePost({ roomId: roomInfo?.roomId ?? 0 });

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

    const uploadImagesAndGetKeys = async (assets: ImagePicker.ImagePickerAsset[]): Promise<string[]> => {
        if (assets.length === 0) return [];

        const requests = assets.map(asset => {
            const uri = asset.uri;
            const contentType = asset.mimeType ?? (uri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');
            const fileName = asset.fileName ?? uri.split('/').pop() ?? `upload_${Date.now()}`;
            return { fileName, contentType };
        });

        const { result } = await generatePresignedUrl({ requests });
        console.log(result);
        const uploadUrls = result.map(item => item.uploadUrl);
        const s3Keys = result.map(item => item.s3Key);

        const uploadPromises = assets.map(async (asset, index) => {
            const fileResponse = await fetch(asset.uri);
            const blob = await fileResponse.blob();
            const contentType = asset.mimeType ?? (asset.uri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');

            await fetch(uploadUrls[index], {
                method: 'PUT',
                headers: { 'Content-Type': contentType },
                body: blob
            });

            return s3Keys[index];
        });

        return Promise.all(uploadPromises);
    };

    const onSubmit = async (data: PostForm) => {
        if (!roomInfo?.roomId) return;
        if ((data.images?.length ?? 0) === 0) return;

        try {
            const s3Keys = await uploadImagesAndGetKeys(data.images);
            const payload: CreatePostRequest = {
                roomId: roomInfo.roomId,
                content: data.content ?? '',
                imageList: s3Keys,
            };
            createPost(payload);
        } catch (error) {
            console.error(error);
            showRejectToast('이미지 업로드에 실패했어요');
        }



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
                </View >
            </View>
            <OpacityPressable
                disabled={!isValid || isPending || (images?.length ?? 0) === 0}
                onPress={handleSubmit(onSubmit)}
                className={`${!isValid || isPending ? 'bg-[#C4C4C4]' : 'bg-mainColor'} py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
            >
                <Text className="Semibold16 text-white text-center">{isPending ? '작성중입니다...' : '작성'}</Text>
            </OpacityPressable>
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