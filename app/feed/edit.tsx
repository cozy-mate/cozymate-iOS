import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import { EditLayout } from '@/components/common/layout/editLayout';
import OpacityPressable from '@/components/opacityPressable';
import { useGetMyRoomFeed, useUpdateMyRoomFeed } from '@/hooks/feed/feed';
import { Feed } from '@/server/feed/feed';
import { useMemberStore } from '@/zustand/store';

export default function EditFeed() {

    const { roomInfo } = useMemberStore();

    const { data } = useGetMyRoomFeed();

    const {
        control,
        handleSubmit,
        formState: { isValid },
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

    const { mutate, isPending } = useUpdateMyRoomFeed();

    return (
        <EditLayout>
            <View className="flex-1 px-5 pt-5 gap-y-12">
                <View className="gap-y-[12px]">
                    <Text className="Semibold16 text-emphasizedFont mx-[4px]">피드 이름을 입력해주세요</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
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
            <OpacityPressable
                disabled={!isValid || isPending}
                onPress={handleSubmit((data) => mutate({ ...data, roomId: roomInfo?.roomId ?? 0 }))}
                className={`${!isValid || isPending ? 'bg-[#C4C4C4]' : 'bg-mainColor'} py-[17.5px] mx-[20px] my-[8px] rounded-xl`}
            >
                <Text className="Semibold16 text-white text-center">{isPending ? '수정중입니다...' : '확인'}</Text>
            </OpacityPressable>
        </EditLayout>
    );
};