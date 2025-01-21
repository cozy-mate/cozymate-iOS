import { Animated } from 'react-native';
import React, { ReactNode } from 'react';

interface AnimationViewProps {
  isShow: boolean;
  inputAnimation: any;
  children: ReactNode;
}

const AnimationView: React.FC<AnimationViewProps> = ({ isShow, inputAnimation, children }) => {
  return (
    isShow && (
      <Animated.View
        style={{
          opacity: inputAnimation.opacity,
          transform: [{ translateY: inputAnimation.translateY }],
        }}
      >
        {children}
      </Animated.View>
    )
  );
};

export default AnimationView;
