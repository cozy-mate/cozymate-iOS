import { Text, View } from 'react-native';

const NoRoommateComponent: React.FC = () => {
  return (
    <View className="flex-1 mt-[32px]">
      <View className="w-full h-full flex items-center justify-center">
        <View className="gap-y-[20px] pb-[50px]">
          <Text className="Medium14 text-disabledFont text-center">
            아직 함께할 룸메이트가 없네요.{'\n'}곧 당신과 잘 맞는 룸메이트가 찾아올 거예요.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NoRoommateComponent;
