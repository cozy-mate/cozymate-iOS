import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { checkRoomName } from '@/server/room/room';

interface RoomNameInputComponentProps {
  title: string;
  value: string;
  handleValue: (e: string) => void;
  placeholder: string;
  isError: boolean;
  handleIsError: (e: boolean) => void;
}

const RoomNameInputComponent: React.FC<RoomNameInputComponentProps> = ({
  title,
  value,
  handleValue,
  placeholder,
  isError,
  handleIsError,
}) => {
  const [errorText, setErrorText] = useState<string>('');

  const handleDuplicate = async () => {
    try {
      const response = await checkRoomName(value);
      if (!response.result) {
        handleIsError(true);
        setErrorText('다른 사용자가 이미 사용 중인 방이름이에요!');
      } else {
        handleIsError(false);
        setErrorText('');
      }
    } catch (error) {
      console.error('중복 검사 오류:', error);
    }
  };

  useEffect(() => {
    const roomNameRegex = /^(?!\\s)[가-힣a-zA-Z0-9\\s]+(?<!\\s)$/;

    if (value.length !== 0) {
      if (!roomNameRegex.test(value)) {
        handleIsError(true);
        setErrorText(
          '방 이름은 한글, 영어, 숫자 및 공백만 사용할 수 있어요!\n단, 공백은 처음이나 끝에 올 수 없습니다.',
        );
      } else if (value.length < 2 || value.length > 12) {
        handleIsError(true);
        setErrorText('방 이름은 2 ~ 12글자만 가능해요!');
      } else {
        handleDuplicate();
      }
    } else {
      handleIsError(false);
      setErrorText('');
    }
  }, [value]);

  return (
    <View className="gap-y-[8px]">
      <Text className="text-16 font-600 leading-16 text-basicFont px-1">{title}</Text>
      <TextInput
        value={value}
        onChangeText={handleValue}
        placeholder={placeholder}
        className="rounded-xl bg-colorBox p-4 text-14 font-500 text-basicFont"
      />
      {isError && errorText !== '' && (
        <Text className="text-12 font-500 leading-12 text-warningColor mx-[8px]">{errorText}</Text>
      )}
    </View>
  );
};

export default RoomNameInputComponent;
