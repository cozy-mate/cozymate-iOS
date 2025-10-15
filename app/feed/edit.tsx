import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import BottomButtonComponent from '@/components/common/bottomButton';
import { DetailLayout } from '@/components/common/layout/detailLayout';
import { useGetMyRoomFeed, useUpdateMyRoomFeed } from '@/hooks/feed/feed';
import { Feed } from '@/server/feed/feed';
import { useMemberStore } from '@/zustand/store';

export default function EditFeed() {

    const { roomInfo } = useMemberStore();

    const { data, isLoading, isError } = useGetMyRoomFeed();

    const {
        control,
        handleSubmit,
        formState: { isValid },
        reset
    } = useForm<Feed>({
        defaultValues: {
            name: data?.result.name,
            description: data?.result.description,
        },
        resolver: zodResolver(z.object({
            name: z.string().min(1),
            description: z.string().min(1),
        })),
        mode: 'all',
    })

    useEffect(() => {
        if (data?.result) {
            reset({
                name: data.result.name,
                description: data.result.description,
            });
        }
    }, [data, reset]);

    const { mutate, isPending } = useUpdateMyRoomFeed();

    return (
        <DetailLayout>
            <View className="flex-1 px-5 pt-5 gap-y-12">
                <View className="gap-y-[12px]">
                    <Text className="Semibold16 text-emphasizedFont mx-[4px]">피드 이름을 입력해주세요</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                editable={!isLoading}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="내용을 입력해주세요"
                                placeholderTextColor={'#ACADB4'}
                                className={`px-[16px] py-[15px] bg-[#F3F6FA] rounded-xl InputMedium14 text-basicFont h-[49px]`}
                            />
                        )}
                    />
                </View>
                <View className="gap-y-[12px]">
                    <Text className="Semibold16 text-emphasizedFont mx-[4px]">피드 설명을 입력해주세요</Text>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                editable={!isLoading}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="내용을 입력해주세요"
                                placeholderTextColor={'#ACADB4'}
                                className={`px-[16px] py-[15px] bg-[#F3F6FA] rounded-xl InputMedium14 text-basicFont h-[49px]`}
                            />
                        )}
                    />
                </View>
            </View>
            <BottomButtonComponent
                buttonText={
                    (() => {
                        if (isLoading) {
                            return '로딩중입니다...'
                        }

                        if (isError) {
                            return '에러가 발생했습니다';
                        }

                        if (isPending) {
                            return '수정중입니다...';
                        }
                        return '확인';
                    })()
                }
                onPress={handleSubmit((data) => mutate({ ...data, roomId: roomInfo?.roomId ?? 0 }))}
                color={!isValid || isPending || isLoading ? 'GRAY' : 'BLUE'}
                disabled={!isValid || isPending || isLoading}
            >
            </BottomButtonComponent>
        </DetailLayout>
    );
};