import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

interface SimpleUserItemProps {
  userData: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  };
  onPress?: any;
}

const SimpleUserItem: React.FC<SimpleUserItemProps> = ({ userData, onPress = () => {} }) => {
  const router = useRouter();

  const handlePress = () => {
    onPress();
    router.push(`/user/${userData.memberId}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="px-[16px] py-[20px] flex flex-row justify-between items-center border border-disabledColor rounded-xl"
    >
      <Text className="Semibold16 text-basicFont mx-[8px]">{userData.nickname}</Text>
      <Text className="Medium16 text-mainColor">{userData.mateEquality}%</Text>
    </Pressable>
  );
};

export default SimpleUserItem;
