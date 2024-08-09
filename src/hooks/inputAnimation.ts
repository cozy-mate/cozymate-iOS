import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const useInputAnimation = (trigger: boolean, delay: number = 0) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [trigger, delay, opacity, translateY]);

  return {
    opacity,
    translateY,
  };
};
