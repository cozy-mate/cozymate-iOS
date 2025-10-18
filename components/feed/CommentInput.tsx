import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import SendDisabledIcon from '@/assets/icons/feed/send-disabled.svg';
import SendIcon from '@/assets/icons/feed/send.svg';



interface CommentInputProps {
    onSubmit: (comment: string) => void;
    placeholder?: string;
    maxLength?: number;
    isDisabled?: boolean;
}

interface CommentForm {
    comment: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
    onSubmit,
    placeholder = '댓글을 입력해주세요',
    maxLength = 200,
    isDisabled = false,
}) => {
    const { control, handleSubmit, reset, watch } = useForm<CommentForm>({
        defaultValues: {
            comment: '',
        },
    });

    const commentValue = watch('comment');
    const isCommentEmpty = !commentValue || commentValue.trim() === '';

    const onCommentSubmit = (data: CommentForm) => {
        if (data.comment.trim()) {
            onSubmit(data.comment.trim());
            reset();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="bg-white border-t border-colorBox"
        >
            <View className="flex-row items-end px-[16px] py-[12px] gap-[8px]">
                <View className="flex-1">
                    <Controller
                        control={control}
                        name="comment"
                        rules={{
                            required: '댓글을 입력해주세요',
                            maxLength: {
                                value: maxLength,
                                message: `${maxLength}자 이하로 입력해주세요`,
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                placeholderTextColor="#ACADB4"
                                multiline
                                maxLength={maxLength}
                                className="px-[16px] py-[12px] bg-[#F3F6FA] rounded-xl InputMedium14 text-basicFont min-h-[44px] max-h-[120px]"
                                style={{ textAlignVertical: 'top' }}
                            />
                        )}
                    />
                </View>

                <Pressable
                    onPress={handleSubmit(onCommentSubmit)}
                    disabled={isCommentEmpty || isDisabled}
                    className={`w-[44px] h-[44px] rounded-xl items-center justify-center`}
                >
                    {
                        isCommentEmpty || isDisabled ? (
                            <SendDisabledIcon
                                width={40}
                                height={40}
                            />
                        ) : (
                            <SendIcon
                                width={40}
                                height={40}
                            />
                        )
                    }
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CommentInput;
