import { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

interface ProgressBarComponentProps {
  totalStep: number;
  nowStep: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ totalStep, nowStep }) => {
  const loaderValue = useRef(new Animated.Value(0)).current;
  const [isFull, setIsFull] = useState(false);

  const load = (count: number) => {
    const toValue = (count / totalStep) * 100;
    Animated.timing(loaderValue, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setIsFull(toValue >= 100);
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    load(nowStep);
  }, [nowStep]);

  return (
    <View>
      <View className="h-[8px] bg-colorBox overflow-hidden">
        <Animated.View
          style={[
            {
              width,
              height: 8,
              backgroundColor: '#68A4FF', // 실제 색상값으로 대체
            },
            isFull ? styles.full : styles.notFull,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    borderRadius: 0,
  },
  notFull: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default ProgressBarComponent;
